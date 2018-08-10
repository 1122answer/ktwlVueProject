import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
	namespaced: true,
	state: {
		rowVal: null,
		treeData: [],
	},
	actions: {
		getOrgRole({ commit, state }, id) {
			return api.request("get", api.getURL("roleRelative/getCheckedList"),{
				relationType : 2,
				relationTypeId : id
			}).then(res =>{
				//console.log(res);
				if(res && res.data.success){
					var orgtypeArr = res.data.data || [];
					if(orgtypeArr.length==0){
						this.$message.error('当前没有角色信息，请先创建角色！')
					}
					orgtypeArr.map(item =>{
						item.title = item.name;
						if(item.isChecked){
							item.checked = true;
						}
						if(item.isEnabled){
							item.disabled = true;
						}
					});
					state.treeData = [];
					state.treeData = orgtypeArr;
				}
				return res;
			});
		},
		saveOrgRole({ commit, state }, paramArr) {
            return api.request("post", api.getURL("roleRelative/bindRoleSave"),paramArr).then(res=>{
                return res;
            });
        },
	},
	mutations: {
		ASSIGN_ROW_VAL(state,data){
			state.rowVal = null;
			state.rowVal = data;
		}
		
	},
	//getters: {}
};
	