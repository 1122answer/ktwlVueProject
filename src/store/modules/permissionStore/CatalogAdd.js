import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
	namespaced: true,
	state: {
    disable:true,
		selectmenu:[],
		catalogForm:{
            parentId:"",
            permissionId:"",
            name:"",
            sortId:"",
            icon:"",
            remark:"",
            enabled:false,
            flag:1,
            systemId:"",
            systemName:"",

		}
	},
	actions: {
        // 获取上级目录                  
         GetUpCataloglist({ commit, state }, params) {
            return api.request("get", api.getURL("permission/list"),{
                flag:1,
                size:1000,
                page:0
            }).then(res => {
              console.log(res)
                let opt = res.data.data.result.map(item => {
                    return {
                        label:item.name,
                        value:item.permissionId,
                    };
                });
                var none = {label:"一级目录",value:"0"};
                opt.push(none)
                commit('SELECT_LIST_REGION',opt)
                return res;
            });
        },
        // 添加目录                  
         AddCataloglist({ commit, state }, params) {
           if (state.catalogForm.systemId=="") {
              state.catalogForm.systemId="";
              state.catalogForm.systemName="";
           }
            return api.request("post", api.getURL("permission/add"),{
                  parentId:state.catalogForm.parentId,
                  name:state.catalogForm.name,
                  sortId:state.catalogForm.sortId,
                  icon:state.catalogForm.icon,
                  remark:state.catalogForm.remark,
                  enabled:state.catalogForm.enabled,
                  flag:1,
                  systemId:state.catalogForm.systemId,
                  systemName:state.catalogForm.systemName,
            }
            ).then(res => {
                return res;
            });
        },
        // 编辑目录                  
         EditCataloglist({ commit, state }, params) {
           if (state.catalogForm.systemId=="") {
              state.catalogForm.systemId="";
              state.catalogForm.systemName="";
           }
            return api.request("post", api.getURL("permission/edit"),{
                  permissionId:state.catalogForm.permissionId,
                  parentId:state.catalogForm.parentId,
                  name:state.catalogForm.name,
                  sortId:state.catalogForm.sortId,
                  icon:state.catalogForm.icon,
                  remark:state.catalogForm.remark,
                  enabled:state.catalogForm.enabled,
                  flag:1,
                  systemId:state.catalogForm.systemId,
                  systemName:state.catalogForm.systemName,
            })
        },
        // 添加时获取上级目录
        GetparentId({ commit, state }, params){
            state.disable=true,
            state.catalogForm.parentId=params;
        },
        // 获取一条数据
        Getlist({ commit, state }, params){
            return api.request("get", api.getURL("permission/getlist"),{
               id:params
            }).then(res=>{
                let index = res.data.data;
                state.catalogForm.permissionId=index.permissionId;
                state.catalogForm.parentId=index.parentId;
                state.catalogForm.name=index.name;
                state.catalogForm.sortId=index.sortId;
                state.catalogForm.icon=index.icon;
                state.catalogForm.remark=index.remark;
                state.catalogForm.enabled=index.enabled;
                state.catalogForm.systemId=index.systemId;
                state.catalogForm.systemName=index.systemName;
            })
        },
	},
	mutations: {
    SELECT_LIST_REGION(state, groups) {
      // console.log(groups)
            Vue.set(state, 'selectmenu', groups)
        },
    CLEAN_UP(state, groups) {
           state.disable=false,
           state.catalogForm.parentId="";
           state.catalogForm.permissionId="";
           state.catalogForm.name="";
           state.catalogForm.sortId="";
           state.catalogForm.icon="";
           state.catalogForm.remark="";
           state.catalogForm.enabled=false;
           state.catalogForm.flag=1;
           state.catalogForm.systemId="";
           state.catalogForm.systemName="";
        },
        CHANGE_SYS(state,data){
            state.catalogForm.systemId=data.value;
            state.catalogForm.systemName=data.label;
        }
	},
	//getters: {}
};
