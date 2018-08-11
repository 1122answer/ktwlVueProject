import Vue from "vue";
import api from "@/api/index.js";
//业务管理模块
export default {
    namespaced: true,
    state: {
        businessForm:{
            busiCode: '', //业务代码
            busiDescription: '', //业务描述
            busiId: '', // 业务id 
            busiName: '', // 业务名称
            busiTypeId: '', //业务分类唯一ID
            isEnabled: '', // 是否启用
            remark: '', // 备注
            systemId: '', // 所属系统id
            systemName: '', // 所属系统名称
            typeName: '', // 业务分类名称
        },
    },
    actions: {
        // fetchData({ commit, state }, param) {
        //     return api.request("get", api.getURL("houseLayout/get"), {param}).then(res =>{
        //         return res;
        //     });
        // },
        // 获取表格信息
        fetchTable({ commit, state }, params) {
            return api.request("get", api.getURL("business/getpagelist"), {
                page: params.pageNo - 1,
                size: params.pageSize,
                
                // title:state.serchform.title,
                // cconfigType :state.serchform.cconfigType ,
                // fileType:state.serchform.fileType ,
                // isEnabled:state.serchform.isEnabled,
                // systemId:state.serchform.systemId,
                // regionCode:state.serchform.regionCode,
                // groupId:state.serchform.groupId,
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
        // fetchTreeData({ commit, state }, param) {
        //     return api.request("get", api.getURL("enclosure/gettree")).then(res =>{
        //         return res;
        //     });
        // },
    },
    mutations: {
        
    },
    //getters: {}
};
    