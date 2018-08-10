import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
       iptstate:false,
       watch:false,
       sysidstate:false,
       titleName:"新增系统",
       systemForm:{
           createUserId:"",
           systemName:"",
           engName:"",
           systemId:"",
           shortName:"",
           sysDesc:"",
           isEnabled:true,
           modifyType:"",
           sysIcon:"sys",
       },
    },
    actions: {
       // 添加系统管理列表
        AddList({ commit, state }, params) {
             return api.request("post", api.getURL("systemmag/add"),state.systemForm).then(res => {
                
                return res;
             });
        },
       // 编辑系统管理列表
        EditList({ commit, state }, params) {
          // console.log(state.systemForm)
          state.systemForm.modifyType=parseInt(state.systemForm.modifyType);
          console.log(state.systemForm)
             return api.request("post", api.getURL("systemmag/edit"),state.systemForm).then(res => {
                 
                return res;
             });
        },
        // 获取一条数据
        getSystemList({ commit, state }, param) {
              state.sysidstate=true,
            state.titleName="修改系统";
            return api.request("get", api.getURL("systemmag/getlist"),{id:param}).then(res => {
                let index = res.data.data;
               state.systemForm.createUserId=index.createUserId;
               state.systemForm.systemName=index.systemName;
               state.systemForm.engName=index.engName;
               state.systemForm.systemId=index.systemId;
               state.systemForm.shortName=index.shortName;
               state.systemForm.sysDesc=index.sysDesc;
               state.systemForm.isEnabled=index.isEnabled;
               state.systemForm.modifyType=index.modifyType.toString();
               state.systemForm.sysIcon=index.sysIcon;
                return res;
            });
        },
        // 查看列表
        WatchSystemList({ commit, state }, param) {
              state.sysidstate=true,
             state.titleName="查看系统";
                 state.iptstate=true;
                 state.watch=true;
            return api.request("get", api.getURL("systemmag/getlist"),{id:param}).then(res => {
                let index = res.data.data;
               state.systemForm.systemName=index.systemName;
               state.systemForm.engName=index.engName;
               state.systemForm.systemId=index.systemId;
               state.systemForm.shortName=index.shortName;
               state.systemForm.sysDesc=index.sysDesc;
               state.systemForm.isEnabled=index.isEnabled;
               state.systemForm.modifyType=index.modifyType.toString();
               state.systemForm.sysIcon=index.sysIcon;
                return res;
            });
        },
    },
    mutations: {
        // 初始化数据
        CHANGE_BASIC_ID(state, data) {
         state.sysidstate=false;
         state.iptstate=false;
         state.watch=false;
         state.titleName="系统新增";
         state.systemForm.systemName="";
         state.systemForm.createUserId="";
         state.systemForm.engName="";
         state.systemForm.systemId="";
         state.systemForm.shortName="";
         state.systemForm.sysDesc="";
         state.systemForm.isEnabled=true;
         state.systemForm.modifyType="";
         state.systemForm.sysIcon="sys";
        },
    
    },
    //getters: {}
};