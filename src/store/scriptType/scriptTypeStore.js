import Vue from "vue";
import api from "@/api/index.js";
//脚本分类模块
export default {
    namespaced: true,
    state: {
        scriptTypeForm: {
                scriptTypeId:null,//脚本分类标识
                name:null,//脚本分类名称
                remark:null,//备注
                enabled:null,//是否启停用，0为停用，1为启用
            }
    },
    actions: {
       // 获取列表
        getPageList({ commit, state }, params) {
            return api.request("get", api.getURL("scriptType/getlist"),{
                 name:state.scriptTypeForm.name,
                 page:params.pageNo - 1, //当前页
                 size:params.pageSize
            }).then(res => {
                console.log(res)
                return res.data.data;
            });
        },
         // 删除脚本分类
        deleteScriptType({ commit, state }, params) {
                
            return api.request("post", api.getURL("scriptType/delete"), {id:params})
                .then(res => {
                    return res;
                });
        },
          // 设置启用状态
        status({ commit, state }, params) {
            return api.request("post", api.getURL("scriptType/status"),{
                id:params.id,
                flag:params.enabled
            })
                .then(res => {
                    return res;
                });
        },
        
    },
    mutations: {
       CLEAR_ADD_FORM(state) {
            state.scriptTypeForm = {
                enabled: false,
                name: "",
                remark: "",
                
            };
        },
    },
};