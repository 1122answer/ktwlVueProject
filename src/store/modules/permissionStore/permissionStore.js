import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
	namespaced: true,
	state: {

	},
	actions: {
		// 获取权限列表
		fetchPermissionList( { commit, state }, params) {
			//console.log(params)
			return api.request("get", api.getURL('permission/list'), {
				// currentPage: params.currentPn,
				size: 1000000000,
				page: params.pageNo-1
			}).then(res => {
				return res.data.data;
			})
		},
		// 删除权限列表
		 delPermissionList( { commit, state }, params) {
		 	//console.log(params)
			return api.request("post", api.getURL('permission/del'),params).then(res => {
				return res;
			})
		},
		// 权限启用状态
		EnabledPermission( { commit, state }, params) {
			return api.request("post", api.getURL('permission/status'),params).then(res => {
				return res;
			})
		}
	},
	mutations: {
		// CHANGE_PERMISSION_KEYWORDS(state, words) {
		// 	state.keyWords = words
		// }
	},
	//getters: {}
};
