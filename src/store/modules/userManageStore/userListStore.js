import Vue from "vue";
import api from "@/api/index.js";
import qs from 'qs';

export default {
    namespaced: true,
    state: {
        searchName: '',
        currentDeptId: '',
        currentOrgId:'',
        currentOrgName:'',
        currentDeptName: ''
    },
    actions: {
        fetchUserTable({ commit, state }, params) {
            return api.request("get", api.getURL("user/list"), {
                page: params.pageNo - 1,
                size: params.pageSize,
                sorts: null,
                nickName: state.searchName,
                deptId: state.currentDeptId,
                orgId: state.currentOrgId
            }).then(res => {
                if (res) {
                    if (res.data.success) {
                        return res.data.data;
                    } else {
                        return;
                    }
                }
            });
        },
        fetchUserDel({ commit, state }, params) {
            return api.request("post", api.getURL("user/del"), {id: params}).then(res => {
                return res;
            });
        },
        fetchUserUntie({ commit, state }, params) {
            return api.request("post", api.getURL("user/untie"), params).then(res => {
                return res;
            });
        },
        fetchUserBatchDel({ commit, state }, params) {
            return api.request("post", api.getURL("user/batchdel"), {ids: params}).then(res => {
                return res;
            });
        },
        fetchTreeData({ commit, state }, params) {
            return api.request("get", api.getURL("user/treeOrg")).then(res => {
                return res;
            });
        },
    },
    mutations: {
        INIT_DATA_STATUS(state, data) {

        },
        CHANGE_SEARCH_PARAM(state, data) {
            state.searchName = data;
        },
        DESTORY_SEARCH_PARAM(state, data) {
            state.searchName = '';
        },
        CHANGE_TREE_PARAM(state, data){
            state.currentDeptId= data.treeDeptId
            state.currentOrgId= data.treeOrgId;
            state.currentOrgName = data.trreeOrgName;
            state.currentDeptName =data.treeDeptName;
        }
    },
    getters: {}
};