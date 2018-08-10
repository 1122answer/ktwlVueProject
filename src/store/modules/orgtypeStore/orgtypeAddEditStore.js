import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
	namespaced: true,
	state:{
		  orgtypeForm: {
            orgTypeId:null,
            isEnabled: false,
            name: "",
            registerType: 0,
            sortId: 0
        }
	},
	actions: {
        //添加机构类型列表
        AddOrgTypelist({ commit, state }, params) {
            return api.request("post", api.getURL("orgtype/add"),state.orgtypeForm).then(res => {
                  return res;
                });
        },
        //获取一条机构类型数据
        GetOrgTypelist({ commit, state }, params) {
            return api.request("get", api.getURL("orgtype/getInfo"),{
                    id:params
                })
                .then(res => {
                       console.log(res.data)
                     if (res.data.success) {
                        state.orgtypeForm.sortId = res.data.data.sortId;
                        state.orgtypeForm.orgTypeId = res.data.data.orgTypeId;
                        state.orgtypeForm.name = res.data.data.name;
                        state.orgtypeForm.registerType = res.data.data.registerType;
                        state.orgtypeForm.isEnabled = res.data.data.isEnabled;
                     }
                    return res;
                });
        },
        //编辑机构类型列表
        EdtiOrgTypelist({ commit, state }, params) {
            return api.request("post", api.getURL("orgtype/edit"),state.orgtypeForm)
                .then(res => {
                    return res.data;
                });
        },
	},
	mutations: {
	   	CLEAR_FORM (state,data){  
            state.orgtypeForm.sortId = '0';
            state.orgtypeForm.orgTypeId =null;
	   		state.orgtypeForm.name = '' ;
	   		state.orgtypeForm.registerType = '0' ;
	   		state.orgtypeForm.isEnabled = false;
	   	},
        

	}
	//getters: {}
};
