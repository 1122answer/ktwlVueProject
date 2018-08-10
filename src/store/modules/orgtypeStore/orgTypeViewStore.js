import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
        orgTypeViewForm:{
            name:'',
            registerType:'',
            sortId:0,
            isEnabled:''
        }
    },
    actions: {

        getOrgTypeInfo({ commit, state }, paramArr) {
            return api.request("get", api.getURL("orgtype/getInfo"),{'id':paramArr}).then(res=>{
                commit('SET_ORG_TYPE_INFO',res.data.data);
                return res;
            });
        }
    },
    mutations: {
        SET_ORG_TYPE_INFO(state,data){
            state.orgTypeViewForm.name=data.name;
            state.orgTypeViewForm.registerType=data.registerType;
            state.orgTypeViewForm.sortId=data.sortId;
            state.orgTypeViewForm.isEnabled=data.isEnabled?'是':'否';
        }
        
    }
};
    