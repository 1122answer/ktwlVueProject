<template>
    <div id="userManage" class="moduleWrap">
        <UserAddEdit :visible="visible" @ok="handleOk" @cancel="handleCancel"></UserAddEdit>
        <userDetails :visible="details" @ok="detailsOk" @hide="detailsCancel"></userDetails>
        <div class="clearfix">
            <h1 class="pull-left margin-bottom-15">用户管理 <span class="user">User Managment</span></h1>
            <v-breadcrumb class="pull-right">
                <v-breadcrumb-item><i class="anticon anticon-home"></i>首页</v-breadcrumb-item>
                <v-breadcrumb-item>组织架构</v-breadcrumb-item>
                <v-breadcrumb-item>用户管理</v-breadcrumb-item>
            </v-breadcrumb>
        </div>
        <div class="box-border" ref="boxBorder">
            <v-row>
                <v-col span="5">
                    <v-tree :data="treeData" :showLine="true" @select='selectFu'></v-tree>
                </v-col>
                <v-col span="19">
                    <div class="container-fluid clearfix padding-bottom-5">
                        <v-row>
                            <v-col span="7">
                                <v-input-group compact>
                                    <v-input placeholder="请输入用户昵称" size="large" :style="{width:'64%'}" v-model="searchUserName"></v-input>
                                    <v-button type="primary" size="large" @click="searchList">
                                        <v-icon type="search"></v-icon> 查询</v-button>
                                </v-input-group>
                            </v-col>
                            <v-col span="12" class="text-right pull-right">
                                <v-button type="primary" @click="addUser" icon="plus" class="margin-right-5" :disabled="addBtnFlag" title="只有选定部门，才能新增用户"><span>添加</span></v-button>
                            </v-col>
                        </v-row>
                    </div>
                    <div class="container-fluid" ref="containerFluid">
                        <v-data-table class="margin-top-15" :data='loadData' size="small" :columns='columns' ref="userTable" bordered @checkall="checkAll" @clickrow="clickRow" @dataloaded="userloaded" emptyText="暂时找不到你要的信息......" :style="{minWidth: '1000px'}" bordered>
                            <template slot="td" slot-scope="props">
                                <div v-if="props.column.field=='operation'" class="text-center" style="position: relative;z-index: 0">
                                    <v-button-group>
                                        <v-button type="info" @click="showDetailsModal(props.item)" title="查看详情">
                                        <v-icon type="file-text"></v-icon>
                                    </v-button>
                                        <v-button type="success" title="绑定角色" @click="bindRole(props.item)">
                                            <v-icon type="solution"></v-icon>
                                        </v-button>
                                        <v-button type="primary" title="编辑用户" @click="editUser(props.item)">
                                            <v-icon type="edit"></v-icon>
                                        </v-button>
                                        <v-button type="error" title="解绑用户" @click="untieUser(props.item)" v-if="props.item.isRelationDepts">
                                            <i class="fa fa-cut"></i>
                                        </v-button>
                                        <v-button type="error" title="删除用户" @click="delUser(props.item)" v-if="!props.item.isRelationDepts">
                                            <v-icon type="delete"></v-icon>
                                        </v-button>
                                    </v-button-group>
                                </div>
                                <div v-else v-html="props.content" @click="test(props.item)"></div>
                            </template>
                        </v-data-table>
                    </div>
                </v-col>
            </v-row>
        </div>
        <BindRole :is-role="roleShow" @ok="roleOk" @cancel="roleCancel"></BindRole>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
import UserAddEdit from './userWidget/userAddEdit'
import BindRole from './userWidget/bindRole'
import userDetails from './userWidget/userDetails'

import { TreeUtil } from "@/util/TreeUtil.js";
export default {
    name: 'userManage',
    components: {
        UserAddEdit,
        BindRole,
        userDetails,
    },
    computed: {
        ...mapState({})
    },
    mounted() {
        this.$store.commit('userListModule/DESTORY_SEARCH_PARAM');
        this.$store.dispatch('userListModule/fetchTreeData').then(res => {
            if (res && res.data.success) {
                var deptArr = res.data.data;
                TreeUtil.build(res.data.data, this.treeData);
                return this.treeData;
            }
        });
        this.$nextTick(() => {
            var tt = this.$refs.boxBorder.scrollHeight;
            this.boxHeight = tt - 72;
            this.$refs.containerFluid.style.maxHeight = this.boxHeight + 'px';
        });
    },
    beforeDestroy() {
        this.$store.commit('userListModule/DESTORY_SEARCH_PARAM');
    },
    data: function() {
        return {
            searchUserName: '',
            visible: false,
            details: false,
            batchIds: [],
            addBtnFlag: true,
            batchDelBtenFlag: true,
            responseParamsName: {
                total: 'totalCount',
                results: 'result'
            },
            loadData(params) {
                return this.$store.dispatch('userListModule/fetchUserTable', {
                    pageNo: params.pageNo,
                    pageSize: params.pageSize,
                }).then(res => {
                    return res;
                })
            },
            columns: [
                { title: "昵称", field: 'nickName' },
                { title: "行政区域", field: 'regionCode' },
                { title: "所属机构", field: 'orgName' },
                { title: "所属部门", field: 'deptName' },
                { title: "真实姓名", field: 'realName' },
                { title: "手机号码", field: 'mobile' },
                { title: "操作", field: 'operation', width: '180px', className: 'text-center' },
            ],
            treeData: [],
            roleShow: false,
            deptShow: false,
            boxHeight: '400px'
        };
    },
    watch: {
        batchIds(curVal, oldVal) {
            if (curVal && curVal.length > 0) {
                this.batchDelBtenFlag = false;
            } else {
                this.batchDelBtenFlag = true;
            }　　　　　　　　　　　　　　　　　
        },
    },
    methods: {
        userloaded() {
            this.batchIds = [];
        },
        handleOk() {
            this.visible = false;
            this.$refs.userTable.reload();
            this.$store.commit('userAddEditModule/INIT_DATA_STATUS');
        },
        handleCancel() {
            this.visible = false;
            this.$store.commit('userAddEditModule/INIT_DATA_STATUS');
        },
        addUser() { //添加用户
            this.$store.commit('userAddEditModule/CHANGE_FLAG', true);
            this.$store.dispatch('commonSelect/getRegionSelectTree', 0).then(res => {
                this.visible = true;
            });
        },
        searchList() {
            this.$store.commit('userListModule/CHANGE_SEARCH_PARAM', this.searchUserName);
            this.$refs.userTable.reload();
        },
        delUser(param) {
            this.$modal.confirm({
                title: '您是否确认要删除“' + param.nickName + '”用户',
                content: '删除之后不能恢复',
                onOk: () => {
                    this.$store.dispatch('userListModule/fetchUserDel', param.userId).then(res => {
                        if (res.data.success) {
                            this.$message['success']("成功删除一条用户信息！");
                            this.$refs.userTable.reload();
                        }
                    })
                },
                onCancel: function() {}
            });
        },
        untieUser(param) {
            var userObj = {};
            userObj.userId = param.userId;
            userObj.orgId = param.orgId;
            userObj.deptId = param.deptId;
            this.$modal.confirm({
                title: '您是否确认要从“' + param.currentDeptName + '”解绑“' + param.nickName + '”用户',
                content: '用户从当前部门移出！',
                onOk: () => {
                    this.$store.dispatch('userListModule/fetchUserUntie', userObj).then(res => {
                        if (res.data.success) {
                            this.$message['success']("用户解绑成功！");
                            this.$refs.userTable.reload();
                        }
                    })
                },
                onCancel: function() {}
            });
        },
        editUser(param) {
            var editUser = {};
            editUser.userid = param.userId;
            editUser.deptid = param.deptId;
            editUser.orgid = param.orgId;
            this.$store.commit('userAddEditModule/CHANGE_FLAG', false);
            this.$store.commit('userAddEditModule/INIT_DATA_STATUS');
            this.$store.dispatch('commonSelect/getRegionSelectTree', 0).then(res => {
                this.$store.dispatch("userAddEditModule/fetchGetUserInfo", editUser).then(res => {
                    this.visible = true;
                });
            });
        },
        checkAll(obj) {
            if (obj) {
                var userArr = this.$refs.userTable.getCheckedData();
                userArr.map(item => {
                    this.batchIds.push(item.userId);
                });
            } else {
                this.batchIds = [];
            }
        },
        clickRow(obj) {
            if (obj.checked == true) {
                this.batchIds.push(obj.row.userId);
            } else if (obj.checked == false) {
                var batchArr = this.batchIds;
                if (batchArr && batchArr.length > 0) {
                    for (var i = 0; i < batchArr.length; i++) {
                        if (obj.row.userId == batchArr[i]) {
                            batchArr.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        },
        deletelist() {
            this.$modal.confirm({
                title: '您是否确认要批量删除用户',
                content: '删除之后不能恢复',
                onOk: () => {
                    this.$store.dispatch('userListModule/fetchUserBatchDel', this.batchIds).then(res => {
                        if (res.data && res.data.success) {
                            this.$message['success']("成功删除用户信息！");
                            this.$refs.userTable.reload();
                            this.batchIds = [];
                        }
                    })
                },
                onCancel: function() {}
            });
        },
        bindRole(param) {
            this.$store.commit('roleModule/CLEAR_STATE'); //清空数据；
            this.$store.commit('roleModule/CHANGE_USERID', {
                userId: param.userId,
                nickName: param.nickName
            });
            this.$store.commit('roleModule/SAVE_PARAM_ID', {
                currentOrgId: param.orgId,
                currentDeptId: param.deptId,
            });
            this.$store.dispatch('roleModule/fetchCheckedList', {
                relationType: 0,
                relationTypeId: param.userId
            }).then(res => {
                if (res.data && res.data.success) {
                    this.roleShow = true;
                    var tTree = res.data.data;
                    if (tTree) {
                        tTree.map(item => {
                            item.title = item.name;
                            if (item.isEnabled == false) {
                                item.disableCheckbox = true;
                            }
                            if (item.isChecked == true) {
                                item.checked = true;
                            }
                        });
                        this.$store.commit('roleModule/CHANGE_TREE_ROLES', tTree);
                    }
                }
            });
        },
        roleOk() {
            this.roleShow = false;
        },
        roleCancel() {
            this.roleShow = false;
        },
        selectFu(obj) {
            if (obj) {
                obj.map(item => {
                    if (item.selected && item.pid != '0' && item.deptId && item.deptName) {
                        this.addBtnFlag = false;
                    } else {
                        this.addBtnFlag = true;
                    }
                    var treeOjb = {};
                    treeOjb.treeOrgId = item.orgId;
                    treeOjb.trreeOrgName = item.orgName;
                    treeOjb.treeDeptId = item.deptId;
                    treeOjb.treeDeptName = item.deptName;
                    this.$store.commit('userListModule/CHANGE_TREE_PARAM', treeOjb);
                    this.$store.commit('userAddEditModule/CHANGE_TREE_PARAM', treeOjb);
                    this.$refs.userTable.reload();
                })
            }
        },
        deptOk() {
            this.deptShow = false;
        },
        deptCancel() {
            this.deptShow = false;
        },
        //显示详情对话框
        showDetailsModal(event) {
            console.log(event);
            this.details = true;
            this.$store.dispatch("userAddEditModule/fetchGetUserInfo",{
                deptid:event.deptId,
                orgid:event.orgId,
                userid:event.userId,
            });
        },
        detailsOk() {
            this.details = false;
        },
        detailsCancel() {
            this.details = false;
        },
    }
}
</script>
<style scoped lang='less'>
</style>
<style type="text/css">
.user {
    color: #ccc;
    font-size: 16px;
}
</style>