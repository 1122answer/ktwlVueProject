import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
       name:"陈翔"
    },
    actions: {
       // 获取列表
        businessList({ commit, state }, params) {
            console.log(params)
            return api.request("get", api.getURL("log/businesslist"),{
                 page:params.pageNo, //当前页
                 size:params.pageSize
            }).then(res => {
                return res;
            });
        },
        //获取一条数据
        // getBusiness({ commit, state }, param) {
        //     return api.request("post", api.getURL("log/getbusiness"), {
        //          pageNo: params.pageNo, //当前页
        //          pageSize: params.pageSize
        //     }).then(res => {
        //         return res;
        //     });
        // },
    },
    mutations: {
        // CHANGE_BASIC_ID(state, data) {
        //     state.orgId = data.orgId;
        // },
    
    },
    //getters: {}
};