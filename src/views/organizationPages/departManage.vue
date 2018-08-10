<template>
    <div id="departManage">
        <v-row class="padding-bottom-10">
            <v-col span="12">
                <h1>部门管理</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '38px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>组织机构</v-breadcrumb-item>
                    <v-breadcrumb-item>部门管理</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border padding-10">
            <div class="clearfix padding-bottom-5">
                <div class="list-org-box">
                    <v-row :gutter="16">
                        <v-col span="5">
                            <v-select search :style="{width:'100%'}" :data="selectOrg" size="lg" placeholder="请选择机构" @change="orgchange" :allowClear='false' :value="searchOrgId" :optionOnChange="true"></v-select>
                        </v-col>
                        <v-col span="10" class="pull-right text-right">
                            <v-button type="primary" class="margin-right-5" @click="addDepartment" title="新增部门（机构下的一级部门">
                                <v-icon type="plus"></v-icon> 添加部门</v-button>
                        </v-col>
                    </v-row>
                    <v-data-table :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" bordered ref="departTable" :treeOption='treeOption' tree-table :pagination='false' emptyText="暂时找不到你要的信息......">
                        <!--  -->
                        <template slot="td" slot-scope="props">
                            <div v-if="props.column.field=='operation'" class="text-center">
                                <v-button-group>
                                    <v-button type="success" title="绑定角色" @click="bindRole(props.item)">
                                        <v-icon type="solution"></v-icon>
                                    </v-button>
                                    <v-button type="success" title="绑定用户" @click="bindUser(props.item)">
                                        <v-icon type="usergroup-add"></v-icon>
                                    </v-button>
                                    <v-button type="primary" title="新增(子)部门" @click="addDepartment(props.item)">
                                        <v-icon type="plus"></v-icon>
                                    </v-button>
                                    <v-button type="primary" title="编辑部门" @click="editdepartWid(props.item)">
                                        <v-icon type="edit"></v-icon>
                                    </v-button>
                                    <v-button type="error" title="删除部门" @click="delDepart(props.item)">
                                        <v-icon type="delete"></v-icon>
                                    </v-button>
                                </v-button-group>
                            </div>
                            <div v-else-if="props.column.field === 'enabled'" class="text-center">
                    <v-switch v-model="props.content" @change="changeisEnabled(props.content,props.item)">
                        <span slot="checkedChildren">开</span>
                        <span slot="unCheckedChildren">关</span>
                    </v-switch>
                </div>
                            <span v-else v-html="props.content"></span>
                        </template>
                    </v-data-table>
                </div>
                <!-- 新增部门 -->
                <DepartmentWidget :is-depart="departShow" @ok="depaprtmentOk" @cancel="depaprtmentCancel"></DepartmentWidget>
                <BindUser :is-user="userShow" @ok="userOk" @cancel="userCancel"></BindUser>
                <BindDeptRole :visible="deptBeal" @ok="deptOk" @cancel="deptCancel"></BindDeptRole>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import DepartmentWidget from '@/views/organizationPages/departWidget/departmentWidget';
import BindUser from './departWidget/bindUser';
import BindDeptRole from './departWidget/bindDeptRole.vue'
import axios from 'axios';
export default {
    name: 'departManage',
    components: {
        DepartmentWidget,
        BindUser,
        BindDeptRole
    },
    computed: {
        ...mapState({
            selectOrg: state => state.departmentModule.selectOrg,
            searchOrgId: state => state.departmentModule.searchOrgId,
        }),
    },
    mounted() {
        this.$nextTick(function() {
            this.$store.dispatch('departmentModule/fetchOrgData').then(res => {
                res.map(item => {
                    item.label = item.text;
                });
            });
        })
    },
    data: function() {
        return {
            addBtnFlag: true,
            departShow: false,
            userShow:false,
            deptBeal:false,  //绑定角色
            loadData(params) {
                return this.$store.dispatch('departmentModule/fetchDepartList', {
                    pageNo: params.pageNo - 1,
                    pageSize: 1000000
                }).then(res => {
                    res.result.map(item => {
                        if (item.parentId == '0') {
                            item.pid = 0;
                            item.isparent = true;
                        } else {
                            item.pid = item.parentId;
                        }
                    });
                    return res;
                })
            },
            responseParamsName: {
                total: 'totalCount',
                results: 'result'
            },
            columns: [
                { title: "部门名称", field: 'name' },
                { title: "所属机构", field: 'orgName', },
                { title: "备注", field: 'remark', },
                { title: "是否启用", field: 'enabled', width: '90px',className: 'text-center' },
                { title: "操作", field: 'operation', width: '220px', className: 'text-center' },
            ],
            treeOption: {
                idKey: 'deptId',
                pidKey: 'pid',
                indent: 4,
                position: 0,
                sortKey: "", // 启用客户端节点排序，指定排序的字段
                order: 'asc', // 排序的顺序,
                isAsync: false,
                loadChildren: null
            }
        }
    },
    methods: {
        addDepartment(param) { //添加部门
            this.departShow = true;
            this.$store.commit('departmentModule/CHANGE_ADD_FLAG', true);
            this.$store.commit('departmentModule/ADD_STATE_ORG_ID'); //赋值orgId
            this.$store.dispatch('departmentModule/fetchParentDept').then(res => {});
            if (param.deptId) {
                this.$store.commit('departmentModule/ADD_STATE_DEPT_ID', {
                    parentId: param.deptId,
                    parentName: param.name
                });
            }
        },
        depaprtmentOk() { //部门保存
            this.departShow = false;
            this.$refs.departTable.reload();
        },
        depaprtmentCancel() { //部门取消
            this.departShow = false;
        },
        editdepartWid(param) { //编辑部门
            this.$store.commit('departmentModule/CHANGE_ADD_FLAG', false);
            this.$store.dispatch('departmentModule/fetchGetData', param.deptId).then(res => {
                if (res && res.data && res.data.data.parentId != '0') {
                    this.$store.dispatch('departmentModule/fetchParentDept').then(respon => {
                        if (respon) {
                            respon.map(item => {
                                if (item.deptId == param.parentId) {
                                    this.$store.commit('departmentModule/ADD_STATE_DEPT_ID', {
                                        parentId: param.parentId,
                                        parentName: item.name
                                    });
                                    this.departShow = true;
                                }
                            });
                        }
                    });
                } else {
                    this.departShow = true;
                }
                return res;
            });
        },
        delDepart(param) {
            this.$modal.confirm({
                title: '您是否确认要删除此部门',
                content: '删除之后不能恢复',
                onOk: () => {
                    this.$store.dispatch('departmentModule/fetchDepartDel', param.deptId).then(res => {
                        if (res.data && res.data.success) {
                            this.$message['success']("成功删除一条部门信息");
                            this.$refs.departTable.refresh();
                        }
                    });
                },
                onCancel: function() {}
            });
        },
        changeisEnabled(event,data){
            console.log('changeisEnabled',data);
            this.$store.dispatch("departmentModule/changeisEnabled",{
                id:data.deptId,
                flag:event,
            }).then(res=>{
                if (res.data.success) {
                    this.$message.success("修改状态成功")
                }
            });
        },
        orgchange(valObj) {
            if (valObj && valObj.selected) {
                this.$store.commit('departmentModule/CHANGE_ORG_ID', { orgId: valObj.value, orgName: valObj.text });
                this.addBtnFlag = false;
                this.$refs.departTable.reload();
            } else {
                this.$store.commit('departmentModule/CHANGE_ORG_ID', '000q_q');
                this.addBtnFlag = true;
                this.$refs.departTable.reload();

            }
        },
        bindUser(param){ 
            this.$store.commit('bindUserModule/CHANGE_BASIC_ID',{
                orgId: param.orgId,
                deptId: param.deptId,
                deptName: param.name,
                orgName: param.orgName
            });
            this.$store.dispatch('bindUserModule/fetchDeptUser').then(res => {
                if(res && res.length >0){
                    this.userShow = true;
                }else{
                    this.$message.error("当前机构下没有用户，请先创建用户信息！");
                }
                
            });
            
        },
        userCancel(){
            this.userShow = false;
        },
        userOk(){
            this.userShow = false;
        },
        deptOk() {
            this.deptBeal = false;
        },
        deptCancel() {
            this.deptBeal = false;
        },
        bindRole(param){
            console.log('bindRole',param);
            this.$store.commit('deptRoleModule/ASSIGN_ROW_VAL',param);
            this.$store.dispatch('deptRoleModule/getDeptRole',param.deptId).then(res =>{
                this.deptBeal = true;
            });
        }
    }
}
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