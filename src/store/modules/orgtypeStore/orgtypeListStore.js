import Vue from "vue";
import api from "@/api/index.js";
// import qs from 'qs';
//权限管理模块
export default {
	namespaced: true,
	state:{
		selectRegionList:[],
	},
	actions: {
        // 获取机构注册类型列表                  
         GetOrgTypelist({ commit, state }, params) {
            return api.request("get", api.getURL("common/enumerate"),{code:3}).then(res => {
                let opt = res.data.data.map(item => {
                    return {
                        label: item.text,
                        value: item.value,
                    };
                });
                commit('SELECT_LIST_REGION', opt)
                return res;
            });
        },
		// 获取机构类型列表
        fetchOrgTypeTable({ commit, state }, params) {
            return api
                .request("get", api.getURL("orgtype/list"), {
                    page: params.pageNo - 1,
                    size: params.pageSize,
                    sorts: null,
                    name: null,
                    isEnabled: null
                })
                .then(res => {
                    if (res) {
                        //console.log("res----------->roleList", res.data);
                        //console.log(res)
                    }
                    return res.data.data;
                });
        },
		// 删除机构类型列表
        OrgTypeListDel({ commit, state }, params) {
        	// var data =  qs.stringify({
        	// 	id:params
        	// });
            return api
                .request("post", api.getURL("orgtype/deleted"),{
                    id:params
                })
                .then(res => {
                    return res;
                });
        },
        //改变启用状态
        changeisEnabled({ commit, state }, params) {
            return api
                .request("post", api.getURL("orgtype/enabled"),params)
                .then(data => {
                    return data;
                });
        },

	},
	mutations: {
		SELECT_LIST_REGION(state, groups) {
            Vue.set(state, 'selectRegionList', groups)
        },
	}
	//getters: {}
};
