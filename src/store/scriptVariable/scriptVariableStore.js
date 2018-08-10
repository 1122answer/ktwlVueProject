import Vue from "vue";
import api from "@/api/index.js";
//脚本变量模块
export default {
    namespaced: true,
    state: {
        valueTypeMap:[],
        varriableTypeMap:[],
        selectlist:[],
        scriptVariableForm: {
                fieldName:null, //字段名称 
                fieldTitle:null,//字段标题 ,
                remark:null,//备注
                scriptTypeId:"4028998164f4bb320164f4c79f5d0002",// 所属脚本分类标识 ,
                scriptVariableId:null,//脚本变量标识id ,
                valueType:null,//值类型：字符、数字、日期 ,
                varriableType:0,//变量类型：1.固定值变量（不可修改）；2系统变量（不可修改）；3参数变量 ,
                varriableValue:null,//变量值
            }
    },
    actions: {
       // 获取列表
        getpagelist({ commit, state }, params) {
            return api.request("get", api.getURL("scriptVariable/getpagelist"),{
                 scriptTypeId:state.scriptVariableForm.scriptTypeId,
                 fieldName:state.scriptVariableForm.fieldName,
                 fieldTitle:state.scriptVariableForm.fieldTitle,
                 page:params.pageNo - 1, //当前页
                 size:params.pageSize
            }).then(res => {
                return res.data.data;
            });
        },

        // 获取脚本变量的值类型
        enumerate({ commit, state }, params) {
            return api.request("get", api.getURL("common/scenumerate"), {
                code: 5,
            }).then(res=>{
                state.valueTypeMap=[];
                res.data.data.map(item=>{
                    item.label = item.text;
                    state.valueTypeMap.push(item);
                })
                return state.valueTypeMap;
            })
        },
        //获取脚本变量的变量类型
        vartenumerate({ commit, state }, params) {
            return api.request("get", api.getURL("common/scenumerate"), {
                code: 3,
            }).then(res=>{
                state.varriableTypeMap=[];
                res.data.data.map(item=>{
                    item.label = item.text;
                    state.varriableTypeMap.push(item);
                })
                return state.varriableTypeMap;
            })
        },

         // 删除脚本变量
        deleteScriptVariable({ commit, state }, params) {
                
            return api.request("post", api.getURL("scriptVariable/delete"), {id:params})
                .then(res => {
                    return res;
                });
        },
         // 获取所属脚本分类下来列表
        getselectlist({ commit, state }, params) {
            return api.request("get", api.getURL("scriptType/getselectlist"), {
                
            }).then(res=>{
                console.log(res);
                 let opt = res.data.data.map(item => {
                    return {
                        label:item.name,
                        value:item.scriptTypeId,
                    };
                });
               
                commit('SELECT_LIST_VARIABLE', opt)
            })
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
        SELECT_LIST_VARIABLE(state, groups) {
            Vue.set(state, 'selectlist', groups)
        },

    },
};