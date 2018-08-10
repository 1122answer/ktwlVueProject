import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
	namespaced: true,
	state: {
        titlename:"添加权限模块",
        disable:false,
		selectmenu:[],
 		AddlistForm:{
            permissionId:"",
             flag:"",
             name:"",
             parentId:"",
             moduleId:"",
             sortId:"",
             url:"",
             remark:"",
             appId:"",
             enabled:true,
  		     systemId: "",
 		     systemName:"",
 		},
		newForm:{
			actionName:"",
			actionId:"",
			enabled:true,
			remark:"",
		},
		perlist:{
	 		pageNo:0,
      	    pageSize:0,
         	result:[
         		
         	],
		},
	},
	actions: {
        // 添加菜单与权限                  
         Addpermissionlist({ commit, state }, params) {
           if (state.AddlistForm.systemId=="") {
              state.AddlistForm.systemId="";
              state.AddlistForm.systemName="";
           }
            return api.request("post", api.getURL("permission/addper"),{
                permissionEntity:state.AddlistForm,
                permissionActionList:state.perlist.result,
            }
            ).then(res => {
                return res;
            });
        },
        // 编辑菜单与权限                  
         Editpermissionlist({ commit, state }, params) {
           if (state.AddlistForm.systemId=="") {
              state.AddlistForm.systemId="";
              state.AddlistForm.systemName="";
           }
            state.AddlistForm.flag=parseInt(state.AddlistForm.flag);
            return api.request("post", api.getURL("permission/editbatch"),{
                permissionEntity:state.AddlistForm,
                permissionActionList:state.perlist.result,
            }
            ).then(res => {
                return res;
            });
        },
        // 获取上级目录                  
         GetUpCataloglist({ commit, state }, params) {
            return api.request("get", api.getURL("permission/list"),{
                flag:1,
                size:1000,
                page:0
            }).then(res => {
                // console.log(res.data.data)
                let opt = res.data.data.result.map(item => {
                    return {
                        label:item.name,
                        value:item.permissionId,
                    };
                });
                commit('SELECT_LIST_REGION',opt)
                return res;
            });
        },

        // 表格中添加获取上级目录
        GetparentId({ commit, state }, params){
            state.AddlistForm.parentId=params.permissionId;
            state.disable=params.disable;
        },
        // 获取一条信息
        Getlist({ commit, state }, params){
            return api.request("get", api.getURL("permission/getdeti"),{
               id:params
            }).then(res=>{
                // console.log(res)
                let index = res.data.data.permissionEntity;
                let list = res.data.data.permissionActionList;
                 state.AddlistForm.permissionId=index.permissionId;
                 state.AddlistForm.parentId=index.parentId;
                 state.AddlistForm.flag=index.flag.toString();
                 state.AddlistForm.name=index.name;
                 state.AddlistForm.systemId=index.systemId;
                 state.AddlistForm.sortId=index.sortId;
                 state.AddlistForm.enabled=index.enabled;
                 state.AddlistForm.appId=index.appId;
                 state.AddlistForm.moduleId=index.moduleId;
                 state.AddlistForm.url=index.url;
                 state.AddlistForm.remark=index.remark;
                
                list.map(item=>{
                    state.perlist.result.push(item)
                })
            })
        },
        // 权限初始列表                  
         permissionList({ commit, state }, params) {
            return state.perlist
        },
        // 添加权限                  
         Addpermission({ commit, state }, params) {
              state.perlist.result.push({
                actionName:params.actionName,
                actionId:params.actionId,
                enabled:params.enabled,
                remark:params.remark
              });
               console.log(state.perlist.result)
            return true
        },
        // 删除权限                  
         Delpermission({ commit, state }, params) {
            let list=state.perlist.result;
            var index = list.indexOf(params); 
                if (index > -1) { 
                return list.splice(index, 1); 
            } 
        },
	},
	mutations: {
		SELECT_LIST_REGION(state, groups) {
            Vue.set(state, 'selectmenu', groups)
        },
        CLEAN_UP_ADDLISTFORM(state, groups){
             state.disable=false;
             state.AddlistForm.permissionId="";
             state.AddlistForm.flag="";
             state.AddlistForm.name="";
             state.AddlistForm.moduleId="";
             state.AddlistForm.appId="";
             state.AddlistForm.parentId="";
             state.AddlistForm.sortId="";
             state.AddlistForm.url="";
             state.AddlistForm.remark="";
             state.AddlistForm.enabled=true;
             state.AddlistForm.systemId= "";
             state.AddlistForm.systemName= "";
             state.perlist.result=[];
        },
        CLEAN_UP_NEWFORM(state, groups){
            state.newForm.actionName="";
            state.newForm.actionId="";
            state.newForm.enabled=true;
            state.newForm.remark="";
        },
        CHENGE_SYS(state, data){
             state.AddlistForm.systemId=data.value;
             state.AddlistForm.systemName=data.label;
        }
	},
	//getters: {}
};
