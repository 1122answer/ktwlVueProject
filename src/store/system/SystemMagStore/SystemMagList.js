import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
     searchForm:{
        systemId:"",
        systemName:"",
        shortName:"",
        engName:"",
        isEnabled:"",
     },
    },
    actions: {
       // 获取列表
        SystemList({ commit, state }, params) {
            console.log(params)
            return api.request("get", api.getURL("systemmag/systemlist"),{
                 systemId:state.searchForm.systemId,
                 systemName:state.searchForm.systemName,
                 shortName:state.searchForm.shortName,
                 engName:state.searchForm.engName,
                 isEnabled:state.searchForm.isEnabled,
                 page:params.pageNo, //当前页
                 size:params.pageSize
            }).then(res => {
                console.log(res)
                return res;
            });
        },
        SystemAll({ commit, state }, params) {
            return api.request("get", api.getURL("systemmag/getAll"),{
            }).then(res => {
                console.log(res);
                return res;
            });
        },
       // 删除系统列表
        SystemListDel({ commit, state }, params) {
            console.log(params)
            return api.request("post", api.getURL("systemmag/del"),{id:params
            }).then(res => {
                return res;
            });
        },
    },
    mutations: {
        // CHANGE_BASIC_ID(state, data) {
        //     state.orgId = data.orgId;
        // },
    
    },
    //getters: {}
};