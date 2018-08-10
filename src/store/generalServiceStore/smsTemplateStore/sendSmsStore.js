import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
        name: '管理Store'
    },
    actions: {
        fetchData({ commit, state }, ids) {
            return api.request("get", api.getURL("houseLayout/delete"), {
                ids: ids.join(",")
            });
        },
        fetchPermissionList( { commit, state }, params) {
            return api.request("get", api.getURL('module/list'), {
                currentPage: params.currentPn,
                pageSize: params.pageSize,
                searchWords: state.keyWords
            }).then(res => {
                if(res) {
                    console.log(res)
                }
                return res;
            })
        }
    },
    mutations: {
        
    },
    //getters: {}
};
    