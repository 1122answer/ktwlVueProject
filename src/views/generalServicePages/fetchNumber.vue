<template>
    <div class="moduleWrap">
        <numAddEdit :visible="visible" @addCancel="hideDialog" @ok="okDialog"></numAddEdit>
        <v-row class="nav-header">
            <v-col span="12">
                <h1>取号配置</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '30px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>通用服务</v-breadcrumb-item>
                    <v-breadcrumb-item>取号配置</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border" ref="boxBorder">
            <div ref="morePanelWrap">
                <v-more-panel>
                    <v-form slot="form">
                        <v-form-item label="选择系统">
                            <v-select placeholder="请选择系统" size="lg" :data="getsystemSelect" v-model="searchSystemId" style="width:150px"></v-select>
                        </v-form-item>
                        <v-form-item label="行政区域">
                            <v-tree-select size="lg" :data="getRegionSelect" v-model="searchRegionCode" style="width:150px" :allowClear="true" @select="regionchange" @clear="clearregion" :optionOnChange="true"></v-tree-select>
                        </v-form-item>
                        <v-form-item label="规则编号">
                            <v-input placeholder="请输入规则编号" size="large" :style="{width:'100%'}" v-model="searchRuleCode"></v-input>
                        </v-form-item>
                        <v-form-item label="规则名称">
                            <v-input placeholder="请输入规则名称" size="large" :style="{width:'100%'}" v-model="searchRuleName"></v-input>
                        </v-form-item>
                    </v-form>
                    <v-button slot="control" size="large" type="primary" html-type="button" icon="search" @click="searchTable">查询</v-button>
                    <v-button type="primary" size="large" class="pull-right" @click="addTnRule" style="margin-top:2px;">
                        <v-icon type="plus"></v-icon> 添加</v-button>
                </v-more-panel>
            </div>
            <div class="container-fluid" ref="containerFluid">
                <v-data-table :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" bordered ref="tnTable" emptyText="暂时找不到你要的信息......" :height="tableBoxHeight">
                    <template slot="td" slot-scope="props">
                        <div v-if="props.column.field=='operation'" class="text-center">
                            <v-button-group>
                                <v-button type="info" @click="showDetailsModal(props.item)" title="查看详情">
                                    <v-icon type="file-text"></v-icon>
                                </v-button>
                                <v-button type="primary" title="编辑" @click="editTnRule(props.item)">
                                    <v-icon type="edit"></v-icon>
                                </v-button>
                                <v-button type="primary" title="取号" @click="getnumber(props.item)">
                                    <v-icon type="key"></v-icon>
                                </v-button>
                                <v-button type="error" title="删除" @click="delTnRule(props.item)">
                                    <v-icon type="delete"></v-icon>
                                </v-button>
                            </v-button-group>
                        </div>
                        <div v-else-if="props.column.field === 'isEnabled'">
                            <v-switch v-model="props.content" @change="changeEnabled(props.content,props.item)">
                                <span slot="checkedChildren">开</span>
                                <span slot="unCheckedChildren">关</span>
                            </v-switch>
                        </div>
                        <span v-else v-html="props.content"></span>
                    </template>
                </v-data-table>
            </div>
        </div>
        <v-modal title="输入取号数量进行取号" :visible="getnumberddilog" @ok="getnumberddilogOk" @cancel="getnumberddilogCancel" :width="600">
            <v-row>
                <v-input-group compact class="text-center">
                    <v-input-number placeholder="取号数量" :min="0" style="width:150px;" size="large" v-model="getnumberForm.num" :max="100"></v-input-number>
                    <v-button size="large" type="primary" @click="getnumberbtn">取号测试</v-button>
                </v-input-group>
            </v-row>
            <div style="max-height:300px;overflow:auto;">
                <v-row class="padding-top-25">
                    <v-col span="8" v-for="site in number" class="text-center">
                        <span>{{site}}</span>
                    </v-col>
                </v-row>
            </div>
            <div slot="footer">
                <v-button key="cancel" type="ghost" size="large" @click="getnumberddilogCancel">
                    返 回
                </v-button>
            </div>
        </v-modal>
    </div>
</template>
<script>
import { mapState } from "vuex";
import numAddEdit from './takeNumberWidget/tnRuleEdit.vue'

export default {
    components: {
        numAddEdit,
    },
    computed: {
        ...mapState({
            name: state => state.takeNumberListModule.name,
            getsystemSelect: state => state.commonSelect.systemSelect,
            getRegionSelect: state => state.commonSelect.regionSelect,
            getnumberForm: state => state.takeNumberListModule.getnumberForm,
            number: state => state.takeNumberListModule.number,
        })
    },
    mounted() {
        this.$store.dispatch("commonSelect/getsystemSelect");
        this.$store.dispatch("commonSelect/getRegionSelectTree", true);
        //给table限制最大高度
        this.$nextTick(() => {
            let tableBoxHeight = this.$refs.boxBorder.scrollHeight - (this.$refs.morePanelWrap.scrollHeight + 18);
            this.tableBoxHeight = tableBoxHeight;
        });
    },
    data: function() {
        return {
            tableBoxHeight:300,
            getnumberddilog: false,
            visible: false,
            searchRegionCode: null,
            searchSystemId: null,
            searchRuleCode: null,
            searchRuleName: null,
            checkType: "checkbox",
            currentData: [],
            loadData(params) {
                return this.$store
                    .dispatch("takeNumberListModule/getTnRuleList", {
                        pageNo: params.pageNo,
                        pageSize: params.pageSize
                    })
                    .then(res => {
                        return res;
                    });
            },
            responseParamsName: {
                total: "totalCount",
                results: "result"
            },
            columns: [
                { title: "规则编号", field: "ruleCode" },
                { title: "规则名称", field: "ruleName" },
                {
                    title: "所属系统",
                    field: "systemName"
                },
                { title: "行政区域名称", field: "regionName" },
                { title: "备注", field: "remark" },
                { title: "是否启用", field: "isEnabled" },
                {
                    title: "操作",
                    field: "operation",
                    width: "180px",
                    className: "text-center"
                }
            ]
        };
    },
    methods: {
        searchTable() {
            let query = {};
            query.regionCode = this.searchRegionCode;
            query.systemId = this.searchSystemId;
            query.ruleCode = this.searchRuleCode;
            query.ruleName = this.searchRuleName;
            this.$store.commit("takeNumberListModule/ASSIGN_SEARCH", query);
            this.$refs.tnTable.reload();
        },
        // 添加取号配置表
        addTnRule() {
            this.$store.commit("takeNumberAddModule/CLEAR_ADDFORM");
            this.visible = true;
        },
        // 编辑列表
        editTnRule(item) {
            this.$store.commit("takeNumberAddModule/CLEAR_ADDFORM");
            this.$store.dispatch("takeNumberAddModule/getnumberList", item.tnRuleId).then(res => {
                this.visible = true;
            })
        },
        showDetailsModal(item) {
            this.$store.commit("takeNumberAddModule/CLEAR_ADDFORM");
            this.$store.dispatch("takeNumberAddModule/showDetailsModal", item.tnRuleId).then(res => {
                this.visible = true;
            })
        },
        delTnRule(item) {
            this.$modal.confirm({
                title: "您是否要删除此规则",
                content: "删除之后不能恢复",
                onOk: () => {
                    this.$store
                        .dispatch("takeNumberListModule/delTnRule", item.tnRuleId)
                        .then(res => {
                            if (res.data.success) {
                                this.$message.success("删除成功");
                                this.$refs.tnTable.reload();
                            }
                        });
                },
                onCancel: function() {}
            });
        },
        changeEnabled(event, item) {
            console.log(item.isEnabled);
            let params = {
                isEnabled: !item.isEnabled,
                tnRuleId: item.tnRuleId
            };
            this.$store
                .dispatch("takeNumberListModule/changeEnabled", params)
                .then(res => {
                    if (res.data.success) {
                        item.isEnabled = params.isEnabled;
                    }
                });
        },
        hideDialog() {
            this.visible = false;
        },
        okDialog() {
            this.visible = false;
            this.$refs.tnTable.reload();
        },

        regionchange(data) {
            console.log(data)
            this.searchRegionCode = data.regionCode;
        },
        clearregion() {
            this.searchRegionCode = null;
        },
        // 取号弹窗
        getnumber(data) {
            this.getnumberddilog = true;
            this.$store.commit("takeNumberListModule/CLEAR_DATA")
            this.$store.dispatch("takeNumberListModule/getdata", data)
        },
        getnumberddilogOk() {
            this.getnumberddilog = false;
        },
        getnumberddilogCancel() {
            this.getnumberddilog = false;
        },
        // 取号
        getnumberbtn() {
            this.$store.dispatch("takeNumberListModule/getnumber")
        },
    }
};
</script>
<style scoped lang='less'>
</style>