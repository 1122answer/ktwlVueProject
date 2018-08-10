import Vue from "vue";
import api from "@/api/index.js";
import qs from 'qs';
//权限管理模块
export default {
    namespaced: true,
    state: {
        orgTypeId: '',
        name: ''
    },
    actions: {
        fetchOrgTable({ commit, state }, params) {
            return api.request("get", api.getURL('org/list'), {
                page: params.pageNo - 1,
                size: params.pageSize,
                orgTypeId: state.orgTypeId,
                name : state.name,
                sorts: null
            }).then(res => {
                //console.log('res======orgLIst', res.data);
                if (res) {
                    if(res.data.success){
                        return res.data.data;
                    }else{
                        return;
                    }
                }
                
            })
        },
        fetchDepartTable({ commit, state }, params) {
            return api.request("get", api.getURL('org/departList'), {orgId: params,}).then(res => {
                //console.log('res======DepartTable', res.data);
                if (res) {
                    if(res.data.success){
                        return res.data.data;
                    }else{
                        return;
                    }
                }
                
            })
        },
        fetchDelOrg({ commit, state }, params) {
            /*var data =  qs.stringify({
                id: params
            });*/
            return api.request("post", api.getURL("org/del"), {id: params}).then(res => {
                return res;
            });
        },
    },
    mutations: {
        ASSIGN_SEARCH(state,obj){
            state.orgTypeId = obj.orgTypeId;
            state.name = obj.name;
        }
    },
    //getters: {}
};