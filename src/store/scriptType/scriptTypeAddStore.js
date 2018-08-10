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
        //新增脚本分类
        saveScriptType({ commit, state }) {
            return api
                .request("post", api.getURL("scriptType/add"), state.scriptTypeForm)
                .then(res => {
                    return res;
                });
        },
        //获取列表中一条数据渲染到对话框后进行修改
        getinfo({ commit, state }) {
            return api
                .request("post", api.getURL("scriptType/getinfo"), state.scriptTypeForm)
                .then(res => {
                    return res;
                });
        },
          //获取一条脚本分类信息
        getList({ commit, state }, params) {
            return api
                .request("get", api.getURL("scriptType/getinfo"),{
                    id:params
                })
                .then(res => {
                    state.scriptTypeForm.scriptTypeId=res.data.data.scriptTypeId;
                    state.scriptTypeForm.name=res.data.data.name;
                    state.scriptTypeForm.remark=res.data.data.remark;
                    state.scriptTypeForm.enabled=res.data.data.enabled;
                    return res.data;
                });
        },
        //编辑脚本分类
        update({ commit, state }) {
            return api
                .request("post", api.getURL("scriptType/update"), state.scriptTypeForm)
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