<template>
    <div id="orgManage">
        <v-row class="padding-bottom-10">
            <v-col span="12">
                <h1>机构管理</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '38px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>组织机构</v-breadcrumb-item>
                    <v-breadcrumb-item>机构管理</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border padding-10">
            <div class="clearfix padding-bottom-5">
                <div class="list-org-box">
                    <v-row :gutter="16">
                        <v-col span="4">
                            <v-select search :style="{width:'100%'}" :data="selectOrgType" size="lg" placeholder="请选择机构类型" v-model="searchOrgTypeId"></v-select>
                        </v-col>
                        <v-col span="6">
                            <v-input-group compact>
                                <v-input placeholder="请输入机构名称" size="large" :style="{width:'64%'}" v-model="searchName"></v-input>
                                <v-button type="primary" size="large" @click="searchTable">
                                    <v-icon type="search"></v-icon> 查询</v-button>
                            </v-input-group>
                        </v-col>
                        <v-col span="10" class="pull-right text-right">
                            <v-button type="primary" size="large" class="margin-right-5" @click="addOrgBrief">
                                <v-icon type="plus"></v-icon> 添加机构</v-button>
                        </v-col>
                    </v-row>
                    <v-data-table :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" bordered ref="orgTable" emptyText="暂时找不到你要的信息......">
                        <template slot="td" slot-scope="props">
                            <div v-if="props.column.field=='operation'" class="text-center">
                                <v-button-group>
                                    <v-button type="success" title="绑定角色" @click="bindRole(props.item)">
                                        <v-icon type="solution"></v-icon>
                                    </v-button>
                                    <v-button type="info" title="查看机构信息" @click="orgInfoViewShow(props.item)">
                                        <v-icon type="file-text"></v-icon>
                                    </v-button>
                                    <v-button type="primary" title="编辑机构" @click="editOrgBrief(props.item)">
                                        <v-icon type="edit"></v-icon>
                                    </v-button>
                                    <v-button type="error" title="删除机构" @click="delOrgWid(props.item)">
                                        <v-icon type="delete"></v-icon>
                                    </v-button>
                                </v-button-group>
                            </div>
                            <span v-else v-html="props.content"></span>
                        </template>
                    </v-data-table>
                </div>
                <OrgWidget :is-org="orgShow" @ok="hideOrgOk" @cancel="hideOrgDialog"></OrgWidget>
                <BindOrgRole :visible="orgBeal" @ok="orgOk" @cancel="orgCancel"></BindOrgRole>
                <OrgInfoView :visible="orgInfoView" @cancel="orgInfoViewCancel"></OrgInfoView>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import UserAddEdit from "@/views/organizationPages/userWidget/userAddEdit";
import OrgWidget from "./orgWidget/orgAddEditWidget.vue";
import BindOrgRole from "./orgWidget/bindOrgRole.vue";
import OrgInfoView from "./orgWidget/orgInfoView.vue";
import axios from "axios";
import api from "@/api/index.js";
export default {
    name: "this",
    components: {
        UserAddEdit,
        OrgWidget,
        BindOrgRole,
        OrgInfoView
    },
    computed: {
        ...mapState({
            selectOrgType: state => state.orgAddEditModule.selectRegionList
        })
    },
    mounted() {},
    data: function() {
        return {
            searchOrgTypeId: "",
            searchName: "",
            orgBeal: false, //绑定角色
            orgShow: false,
            orgInfoView: false, //查看机构信息
            data: [
                { content: "新增", divided: true },
                { content: "修改", divided: true },
                { content: "删除", divided: true }
            ],
            loadData(params) {
                return this.$store
                    .dispatch("orgListModule/fetchOrgTable", {
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
                { title: "机构名称", field: "name" },
                { title: "所属机构类型", field: "orgTypeName", width: "220px" },
                {
                    title: "社会统一信用编码",
                    field: "socialCreditCode",
                    width: "220px"
                },
                { title: "机构成立日期", field: "establishDate", width: "220px" },
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
            let obj = {};
            obj.orgTypeId = this.searchOrgTypeId;
            obj.name = this.searchName;
            this.$store.commit("orgListModule/ASSIGN_SEARCH", obj);
            this.$refs.orgTable.reload();
        },
        addOrgBrief() { /*新增机构*/
            this.$store.commit("orgAddEditModule/CLEAR_FORM");
            this.$store.commit("orgAddEditModule/CHANGE_FLAG", true);
            this.orgShow = true;
        },
        editOrgBrief(params) { //编辑机构
            this.$store.commit("orgAddEditModule/CLEAR_FORM");
            this.$store.commit("orgAddEditModule/CHANGE_FLAG", false);
            this.$store.dispatch("orgAddEditModule/fetchGetOrg", params.orgId).then(res => {
                this.orgShow = true;
            });
        },
        hideOrgOk() {
            //机构ok
            this.orgShow = false;
            this.$refs.orgTable.reload();
        },
        hideOrgDialog() {
            //机构取消
            this.orgShow = false;
        },
        delOrgWid(param) {
            //删除机构
            this.$modal.confirm({
                title: "您是否确认要删除此机构",
                content: "删除之后不能恢复",
                onOk: () => {
                    this.$store.dispatch("orgListModule/fetchDelOrg", param.orgId).then(res => {
                        if (res.data.success) {
                            this.$message["success"]("成功删除一条机构信息");
                            this.$refs.orgTable.reload();
                        }
                    });
                },
                onCancel: function() {}
            });
        },
        orgOk() {
            this.orgBeal = false;
        },
        orgCancel() {
            this.orgBeal = false;
        },
        bindRole(param) {
            this.orgBeal = true;
            this.$store.commit("orgRoleModule/ASSIGN_ROW_VAL", param);
            this.$store.dispatch("orgRoleModule/getOrgRole", param.orgId).then(res => {
                this.orgBeal = true;
            });
        },
        orgInfoViewShow(param) {  //查看机构
            console.log(param)
            this.$store.dispatch("orgInfoViewModule/fetchOrgType", param.orgTypeId).then(result => {
                if (result) {
                    this.$store.dispatch("orgInfoViewModule/fetchGetOrg", param.orgId).then(res => {
                        if (res) {
                            this.orgInfoView = true;
                        }
                    });
                }
            });
        },
        orgInfoViewCancel() {
            this.orgInfoView = false;
        }
    }
};
</script>
<style scoped lang='less'>
.demo-table tr th,
.demo-table tr td {
    line-height: 24px;
}
li.ant-dropdown-menu-item {
    display: block;
    width: 68px;
    text-align: center;
}
a.handle-tip {
    color: #333;
    display: inline-block;
    line-height: 24px;
}
a.handle-tip:hover {
    color: #108ee9;
}
</style>