import Vue from "vue";
import api from "@/api/index.js";
//脚本变量添加模块
export default {
    namespaced: true,
    state: {
        scriptVariableForm: {
                fieldName:null, //字段名称 
                fieldTitle:null,//字段标题 ,
                remark:null,//备注
                scriptTypeId:null,// 所属脚本分类标识 ,
                scriptVariableId:null,//脚本变量标识id ,
                valueType:null,//值类型：字符、数字、日期 ,
                varriableType:0,//变量类型：1.固定值变量（不可修改）；2系统变量（不可修改）；3参数变量 ,
                varriableValue:null,//变量值
            }
    },
    actions: {

        //新增脚本分类
        saveScriptVariable({ commit, state }) {
            return api
                .request("post", api.getURL("scriptVariable/add"), state.scriptVariableForm)
                .then(res => {
                    return res;
                });
        },
          //获取一条脚本分类信息
        getList({ commit, state }, params) {
            return api
                .request("get", api.getURL("scriptVariable/getInfo"),{
                    id:params
                })
                .then(res => {
                    state.scriptVariableForm.fieldName=res.data.data.fieldName;
                    state.scriptVariableForm.fieldTitle=res.data.data.fieldTitle;
                    state.scriptVariableForm.remark=res.data.data.remark;
                    state.scriptVariableForm.scriptTypeId=res.data.data.scriptTypeId;
                    state.scriptVariableForm.scriptVariableId=res.data.data.scriptVariableId;
                    state.scriptVariableForm.valueType=res.data.data.valueType;
                    state.scriptVariableForm.varriableType=res.data.data.varriableType;
                    state.scriptVariableForm.varriableValue=res.data.data.varriableValue;
                    return res.data;
                });
        },
        //编辑脚本分类
        update({ commit, state }) {
            return api
                .request("post", api.getURL("scriptVariable/update"), state.scriptVariableForm)
                .then(res => {
                    return res;
                });
        },
    },
    mutations: {
       CLEAR_ADD_FORM(state) {
            state.scriptVariableForm = {
               fieldName:null, //字段名称 
                fieldTitle:null,//字段标题 ,
                remark:null,//备注
                scriptTypeId:null,// 所属脚本分类标识 ,
                scriptVariableId:null,//脚本变量标识id ,
                valueType:null,//值类型：字符、数字、日期 ,
                varriableType:0,//变量类型：1.固定值变量（不可修改）；2系统变量（不可修改）；3参数变量 ,
                varriableValue:null,//变量值
                
            };
        },
    },
};