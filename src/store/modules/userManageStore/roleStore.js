import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
        userId: '',
        treeRoles: [],
        userName: '',
        orgId: '',
        deptId: ''
    },
    actions: {
        fetchAllRoles({ commit, state }, param) {
            return api.request("get", api.getURL("roleRelative/getAllRoles"),param).then(res=>{
                return res;
            });
        },
        fetchCheckedList({ commit, state }, param) {
            param.orgId = state.orgId;
            param.deptId = state.deptId;
            return api.request("get", api.getURL("roleRelative/getCheckedList"),param).then(res=>{
                return res;
            });
        },
        fetchRoleSave({ commit, state }, paramArr) {
            return api.request("post", api.getURL("roleRelative/bindRoleSave"),paramArr).then(res=>{
                return res;
            });
        },
    },
    mutations: {
        CLEAR_STATE(state, data){
            state.userId= '';
            state.userName= '';
            state.treeRoles= [];
        },
        CHANGE_USERID(state, data){
            state.userId= data.userId
            state.userName= data.nickName;
        },
        CHANGE_TREE_ROLES(state,data){
            state.treeRoles = data;
        },
        SAVE_PARAM_ID(state,data){
            state.orgId =data.currentOrgId;
            state.deptId =data.currentDeptId;
        }
    },
    //getters: {}
};