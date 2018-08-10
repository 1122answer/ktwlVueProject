import Vue from "vue";
import api from "@/api/index.js";
//日志接口模块
export default {
    namespaced: true,
    state: {
    },
    actions: {
       // 获取列表
        getPageList({ commit, state }, params) {
            console.log(params);
            return api.request("get", api.getURL("log/interfacelist"),{
                 page:params.pageNo, //当前页
                 size:params.pageSize
            }).then(res => {
                return res.data.data;
            });
        },
        
    },
    mutations: {
       
    },
};