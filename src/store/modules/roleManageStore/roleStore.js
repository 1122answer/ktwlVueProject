import Vue from "vue";
import api from "@/api/index.js";
import qs from 'qs';

export default {
    namespaced: true,
    state: {
        roleForm: {
            createTime: null,
            createUserId: null,
            deleted: true,
            enabled: null,
            modifyTime: null,
            modifyUserId: null,
            name:"",
            remark: "",
            roleId: null
        }
    },
    actions: {
        //新增角色
        saveAddRole({ commit, state }) {
            return api
                .request("post", api.getURL("role/add"), state.roleForm)
                .then(res => {
                    return res;
                });
        },
        //编辑角色
        edtiRoleList({ commit, state }) {
            return api
                .request("post", api.getURL("role/editrole"), state.roleForm)
                .then(res => {
                    return res;
                });
        },
         //获取一条角色信息
        getRoleList({ commit, state }, params) {
            return api
                .request("get", api.getURL("role/getinfo"),{
                    id:params
                })
                .then(res => {
                    state.roleForm.roleId=res.data.data.roleId;
                    state.roleForm.name=res.data.data.name;
                    state.roleForm.remark=res.data.data.remark;
                    state.roleForm.enabled=res.data.data.enabled;
                    return res.data;
                });
        },

        fetchInfoById( { commit, state }, id) {
            return api.request("get", api.getURL('role/detail'), {
                 id: id
            }).then(res => {
                commit('SET_ROLE_FORM', res.data)
                return res;
            })
        },
        //角色列表获取
        fetchRoleTable({ commit, state }, params) {
            return api
                .request("get", api.getURL("role/list"), {
                    page: params.pageNo - 1,
                    size: params.pageSize,
                    name: state.name,
                })
                .then(res => {
                    if(res.data.success){
                        return res.data.data;
                    }else{
                        return;
                    }
                });
        },
        // 删除角色关系
        deleteRole({ commit, state }, params) {
                
            return api.request("post", api.getURL("role/delete"), {id:params})
                .then(res => {
                    return res;
                });
        },
         // 设置启用状态
        statusRole({ commit, state }, params) {
            return api.request("post", api.getURL("role/status"),{
                id:params.id,
                flag:params.isEnabled
            })
                .then(res => {
                    return res;
                });
        },
    },

    mutations: {
        INIT_DATA_STATUS(state, data) {},
        SET_ROLE_FORM(state, data) {
            // data = {
            //     createTime: null,
            //     createUserId: null,
            //     deleted: true,
            //     enabled: true,
            //     modifyTime: null,
            //     modifyUserId: null,
            //     name: "",
            //     remark: "",
            //     roleId: null
            // }
            Vue.set(state, 'roleForm', data)
        },
        CLEAR_ADD_FORM(state) {
            state.roleForm = {
                createTime: null,
                createUserId: null,
                enabled: false,
                modifyTime: null,
                modifyUserId: null,
                name: "",
                remark: "",
                roleId: null
            };
        },
         ASSIGN_SEARCH(state,obj){
            state.name = obj.name;
        },
    },

    getters: {}
};
