<template>
    <div id="orgTypeManage" class="moduleWrap">
        <v-row class="nav-header">
            <v-col span="12">
                <h1>机构类型</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '30px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>组织机构</v-breadcrumb-item>
                    <v-breadcrumb-item>机构类型</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border" ref="boxBorder">
            <div ref="morePanelWrap">
                <v-more-panel>
                    <v-button type="primary" size="large" class="pull-right" @click="showorgtypeadd"><v-icon type="plus"></v-icon> 添加</v-button>
                </v-more-panel>
            </div>
            <div class="container-fluid" ref="containerFluid">
                <v-data-table ref="orgtypeTable" :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" bordered emptyText="暂时找不到你要的信息......" :height="tableBoxHeight">
                    <template slot="td" slot-scope="props">
                        <div v-if="props.column.field=='operation'" class="text-center">
                            <v-button-group>
                                <v-button type="success" title="绑定角色" @click="bindRole(props.item)">
                                    <v-icon type="solution"></v-icon>
                                </v-button>
                                <v-button type="info" title="查看机构类型" @click="viewOrgType(props.item)">
                                    <v-icon type="file-text"></v-icon>
                                </v-button>
                                <v-button type="primary" title="编辑机构类型" @click="editlist(props.item)">
                                    <v-icon type="edit"></v-icon>
                                </v-button>
                                <v-button type="error" title="删除机构类型" @click="delist(props.item)">
                                    <v-icon type="delete"></v-icon>
                                </v-button>
                            </v-button-group>
                        </div>
                        <div v-else-if="props.column.field === 'isEnabled'" class="text-center">
                            <v-switch v-model="props.content" @change="changeisEnabled(props.content,props.item)">
                                <span slot="checkedChildren">开</span>
                                <span slot="unCheckedChildren">关</span>
                            </v-switch>
                        </div>
                        <span v-else v-html="props.content"></span>
                    </template>
                </v-data-table>
            </div>
        </div>
        <orgwidgetadd :visible="visible" @hide="hideDialog" @ok="okDialog"></orgwidgetadd>
        <BindOrgTypeRole :visible="orgTypeBeal" @ok="orgTypeOk" @cancel="orgTypeCancel"></BindOrgTypeRole>
        <OrgTypeView :visible="viewBeal" @cancel="typeViewCancel"></OrgTypeView>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import orgwidgetadd from "./orgtypewidget/orgtypewidgetadd"
import BindOrgTypeRole from './orgtypewidget/bindOrgTypeRole.vue'
import OrgTypeView from './orgtypewidget/orgTypeView.vue'

export default {
    name: 'orgTypeManage',
    components: {
        orgwidgetadd,
        BindOrgTypeRole,
        OrgTypeView
    },
    computed: {
        ...mapState({
            rootName: state => state.orgtypeStoreModule.orgtypeForm,
        })
    },
    mounted() {
        //给table限制最大高度
        this.$nextTick(() => {
            let tableBoxHeight = this.$refs.boxBorder.scrollHeight - (this.$refs.morePanelWrap.scrollHeight + 18);
            this.tableBoxHeight = tableBoxHeight;
        });
    },
    data: function() {
        return {
            tableBoxHeight: 300,
            visible: false,
            orgTypeBeal: false,
            viewBeal: false,
            // 表格渲染
            responseParamsName: {
                total: 'totalCount',
                results: 'result'
            },
            loadData(params) {
                return this.$store.dispatch('orgtypeListStore/fetchOrgTypeTable', {
                    pageNo: params.pageNo, //当前页
                    pageSize: params.pageSize
                }).then(res => {
                    this.$store.dispatch('orgtypeListStore/GetOrgTypelist').then(orgTypeRes => {
                        for (var i = 0; i < res.result.length; i++) {
                            for (var j = 0; j < orgTypeRes.data.data.length; j++) {
                                if (res.result[i].registerType == orgTypeRes.data.data[j].value) {
                                    res.result[i].registerType = orgTypeRes.data.data[j].text;
                                    continue;
                                }
                            }
                        }
                    })
                    return res;
                })
            },
            columns: [
                { title: "机构类型名称", field: "name" },
                { title: "机构注册类型", field: "registerType" },
                { title: "创建时间", field: "createTime" },
                { title: "是否启用", field: "isEnabled", width: "90px", className: "text-center" },
                { title: "操作", field: "operation", width: "150px", className: "text-center" },
            ]
        };
    },
    methods: {
        // 添加table数据
        showorgtypeadd() {
            this.$store.commit("orgtypeAddEditStore/CLEAR_FORM");
            this.visible = true;
        },
        hideDialog() {
            this.visible = false
        },
        okDialog() {
            this.$refs.orgtypeTable.refresh();
            this.visible = false
        },
        // 编辑修改机构类型
        editlist(event) {
            this.visible = true;
            let orgtypeid = event.orgTypeId;
            this.$store.dispatch("orgtypeAddEditStore/GetOrgTypelist", orgtypeid).then();
        },
        // 删除机构类型
        delist(event) {
            let me = this;
            let orgtypeid = event.orgTypeId;
            console.logorgtypeid
            this.$modal.confirm({
                title: "系统提示",
                content: "是否确认删除" + event.name,
                onOk: function() {
                    me.$store.dispatch("orgtypeListStore/OrgTypeListDel", orgtypeid).then(res => {
                        if (res.data.success) {
                            me.$refs.orgtypeTable.refresh();
                            me.$message.success("删除成功");
                        }
                    });

                },
                onCancel: function() {}
            });
        },
        // 修改状态orgTypeId
        changeisEnabled(event, data) {
            this.$store.dispatch("orgtypeListStore/changeisEnabled", {
                id: data.orgTypeId,
                flag: event
            }).then(res => {
                if (res.data.success) {
                    this.$message.success("修改状态成功")
                }
            });
        },
        orgTypeOk() {
            this.orgTypeBeal = false;
        },
        orgTypeCancel() {
            this.orgTypeBeal = false;
        },
        bindRole(param) {
            this.$store.commit('orgTypeRoleModule/ASSIGN_ROW_VAL', param);
            this.$store.dispatch('orgTypeRoleModule/getOrgTypeRole', param.orgTypeId).then(res => {
                this.orgTypeBeal = true;
            });
        },
        viewOrgType(param) {
            this.$store.dispatch('orgTypeViewModule/getOrgTypeInfo', param.orgTypeId).then(res => {
                if (res) {
                    this.viewBeal = true;
                }
            });
        },
        typeViewCancel() {
            this.viewBeal = false;
        }
    }
}
</script>
<style scoped lang='less'>
</style>