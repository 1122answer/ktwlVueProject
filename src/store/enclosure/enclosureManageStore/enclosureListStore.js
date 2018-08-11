import Vue from "vue";
import api from "@/api/index.js";
//模块数据
export default {
    namespaced: true,
    state: {
        serchform:{
            title:null,
            cconfigType :null,
            fileType :null,
            isEnabled :null,
            regionCode:null,
            systemId:null,
            groupId:null
        },
    },
    actions: {
        fetchData({ commit, state }, param) {
            return api.request("get", api.getURL("houseLayout/get"), {param}).then(res =>{
                return res;
            });
        },
        // 获取表格信息
        fetchTable({ commit, state }, params) {
            return api.request("get", api.getURL("enclosure/getpagelist"), {
                page: params.pageNo - 1,
                size: params.pageSize,
                title:state.serchform.title,
                cconfigType :state.serchform.cconfigType ,
                fileType:state.serchform.fileType ,
                isEnabled:state.serchform.isEnabled,
                systemId:state.serchform.systemId,
                regionCode:state.serchform.regionCode,
                groupId:state.serchform.groupId,
            }).then(res => {
                if (res && res.data && res.data.success) {
                    return res.data.data;
                } else {
                    return {
                        pageNo:0,
                        pageSize:10,
                        result:[]
                    };
                }
            });
        },
        // 获取树信息
        fetchTreeData({ commit, state }, param) {
            return api.request("get", api.getURL("enclosure/gettree")).then(res =>{
                return res;
            });
        },
    },
    mutations: {
        SERCH(state,data){
             state.serchform.title=data.title;
             state.serchform.cconfigType=data.cconfigType;
             state.serchform.fileType=data.fileType;
             state.serchform.isEnabled=data.isEnabled;
        },
        MENUSERCH(state,data){
             state.serchform.systemId=data.systemId;
             state.serchform.regionCode=data.regionCode;
             state.serchform.groupId=data.groupId;
        }
    },
    //getters: {}
};
    