<template>
    <div id="roleManage.vue" class="moduleWrap">
        <roleAddModal :visible="visible" @ok="okDialog" @hide="hideDialog"></roleAddModal>
        <roleAssignPermissions :visible="permission" @ok="permissionOk" @hide="permissionCancel"></roleAssignPermissions>
        <roleDetailsModal :visible="details" @ok="detailsOk" @hide="detailsCancel"></roleDetailsModal>
        <v-row class="padding-bottom-10">
            <v-col span="12">
                <h1>角色管理</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right">
                    <v-breadcrumb-item><i class="anticon anticon-home"></i>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>组织架构</v-breadcrumb-item>
                    <v-breadcrumb-item>角色管理</v-breadcrumb-item>
                    <v-breadcrumb-item>角色列表</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border padding-10" ref="boxBorder">
            <v-row>
                <v-col class="pull-left" span='24'>
                    <v-col span="6">
                        <v-input-group compact>
                            <v-input placeholder="请输入角色名称" size="large" :style="{width:'64%'}" v-model="searchName"></v-input>
                            <v-button type="primary" size="large" @click="searchTable">
                                <v-icon type="search"></v-icon> 查询</v-button>
                        </v-input-group>
                    </v-col>
                    <v-col span="18" class="text-right">
                        <v-button type="primary" size="large" @click="showModalRole"><span><i class="anticon anticon-plus"></i> 添加</span></v-button>
                    </v-col>
                </v-col>
            </v-row>
            <div class="container-fluid" ref="containerFluid">
                <v-data-table ref="roleTable" :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" bordered emptyText="暂时找不到你要的信息......">
                    <template slot="td" slot-scope="props">
                        <div v-if="props.column.field=='operation'" class="text-center">
                            <v-button-group>
                                <v-button type="info" @click="showDetailsModal(props.item)" title="查看详情">
                                    <v-icon type="file-text"></v-icon>
                                </v-button>
                                <v-button type="success" title="分配权限" @click="showAssignModal(props.item)">
                                    <v-icon type="api"></v-icon>
                                </v-button>
                                <!-- <v-dropdown trigger="click" :data="data" style="height:28px;width:60px; background-color:#108ee9;line-height: 28px;text-align: center;" class="pull-left" @item-click="itemClick" :divided="true">
                                    <span @click="bindClick(props.item)">
                                        <a href="javascript:void(0)" class="ant-dropdown-link ant-dropdown-trigger" style="color:#fff;">
                                            绑定 <v-icon type="down"></v-icon>
                                        </a>
                                    </span>
                                </v-dropdown> -->
                                <v-button type="primary" title="编辑" @click="editRole(props.item)">
                                    <v-icon type="edit"></v-icon>
                                </v-button>
                                <v-button type="error" title="删除" @click="deletaRole(props.item)">
                                    <v-icon type="delete"></v-icon>
                                </v-button>
                            </v-button-group>
                        </div>
                        <div v-else-if="props.column.field === 'enabled'" class="text-center">
                            <v-switch v-model="props.content" @change="getStatus(props.item)">
                                <span slot="checkedChildren">开</span>
                                <span slot="unCheckedChildren">关</span>
                            </v-switch>
                        </div>
                        <span v-else v-html="props.content"></span>
                    </template>
                </v-data-table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
import roleAddModal from './rolewidgets/roleAddModal'
import roleAssignPermissions from './rolewidgets/roleAssignPermissions'
import roleDetailsModal from './rolewidgets/roleDetailsModal'
export default {
    name: 'this',
    components: {
        //addPane
        roleAddModal,
        roleAssignPermissions,
        roleDetailsModal,
    },
    computed: {
        /*...mapState({
        })*/
    },
    mounted() {
        this.$nextTick(() => {
            var tt = this.$refs.boxBorder.scrollHeight;
            this.boxHeight = tt - 72;
            this.$refs.containerFluid.style.maxHeight = this.boxHeight + 'px';
        });
    },
    data: function() {
        return {
            permission: false,
            details:false,
            searchName: "",
            name: 'roleManage',
            visible: false,
            checkStatus: 1,
            responseParamsName: {
                total: 'totalCount',
                results: 'result'
            },
            // 下拉框數據
            loadData(params) {
                return this.$store.dispatch('roleManageModule/fetchRoleTable', {
                    pageNo: params.pageNo, //当前页
                    pageSize: params.pageSize
                }).then(res => {
                    //console.log(res);
                    return res;
                })
            },
            columns: [
                { title: "角色名称", field: 'name' },
                { title: "备注信息", field: 'remark' },
                { title: "是否启用", field: 'enabled', width: '90px', className: 'text-center' },
                { title: "操作", field: 'operation', width: '250px', className: 'text-center' },
            ],
            /*data: [
                { content: '绑定类型', id: 1 },
                { content: '绑定机构', id: 2 },
                { content: '绑定部门', id: 3 },
            ],*/
        };
    },
    methods: {
        //显示添加和编辑对话框
        showModalRole() {
            this.$store.commit('roleManageModule/CLEAR_ADD_FORM') //清空表单
            this.visible = true;
        },
        okDialog() {
            this.visible = false;
            this.$refs.roleTable.reload();
        },
        hideDialog() {
            this.visible = false;
        },
        //显示分配权限对话框
        showAssignModal(param) {
            //console.log('showAssignModal', param);
            this.$store.commit('rolePermissionModule/CHANGE_ROLEID', param.roleId);
            this.$store.dispatch('rolePermissionModule/fetchGetRolePermission', param.roleId).then(res => {
                this.$store.dispatch("rolePermissionModule/getRoleList", event.roleId).then(res => {
                    this.permission = true;
                });
            });

        },
        permissionOk() {
            this.permission = false;
        },
        permissionCancel() {
            this.permission = false;
        },

         //显示添加和编辑对话框
        showDetailsModal(event) {
            this.details = true;
            this.$store.dispatch("roleManageModule/getRoleList", event.roleId);
        },
        detailsOk() {
            this.details = false;
            this.$refs.roleTable.reload();
        },
        detailsCancel() {
            this.details = false;
        },

        //查询角色
        searchTable(params) {
            let obj = {};
            obj.name = this.searchName;
            this.$store.commit('roleManageModule/ASSIGN_SEARCH', obj);
            this.$refs.roleTable.reload();
        },
        // 编辑修改角色
        editRole(event) {
            this.visible = true;
            this.$store.dispatch("roleManageModule/getRoleList", event.roleId).then();
        },
        // 删除角色
        deletaRole(event) {
            //console.log(event.roleId);
            let me = this;
            this.$modal.confirm({
                title: "系统提示",
                content: "是否确认删除" + event.name,
                onOk: function() {
                    me.$store.dispatch("roleManageModule/deleteRole", event.roleId).then(res => {
                        if (res.data.success) {
                            me.$refs.roleTable.refresh();
                            me.$message.success("删除成功");
                        }
                    });
                },
                onCancel: function() {
                    //console.log("点击取消");
                }
            });
        },
        //设置启用状态
        getStatus(data) {
            // console.log(data)
            this.$store.dispatch("roleManageModule/statusRole", {
                isEnabled: !data.enabled,
                id: data.roleId
            }).then(res => {
                if (res.data && res.data.success) {
                    this.$message['success'](res.data.data,1);
                    this.$refs.roleTable.refresh();
                }
            }); //传switch控件的值到管理界面
        },
        //下拉框条目点击事件
        /*itemClick(param) {
            if (param.content == "绑定类型") {
                this.$store.dispatch('bindEntityModule/fetchorgTypeData').then(res=>{
                    this.orgTypeBeal = true;
                });
            } else if (param.content == "绑定机构") {
                this.orgBeal = true;
            } else if (param.content == "绑定部门") {
                this.deptBeal = true;
            }
        },
        bindClick(rowParam) {
            this.$store.commit('bindEntityModule/FIX_ROW_VAL',rowParam);
        },*/

    }
}
</script>
<style scoped lang='less'>
</style>