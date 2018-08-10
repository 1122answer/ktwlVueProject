import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
        groupForm:{
            srcSystemId:"",
            srcRegionCode:"",
            srcRegionname:"",
            groupId:"",
            groupIdname:"",
            desSystemId:"",
            desSystemName:"",
            desRegionCode:"",
            desRegionName:"",
            cconfigIds:[],
        },
        btnstate:false,
        list:[],

    },
    actions: {
       // // 要件管理确定区域复制
        copyok({ commit, state }, params) {
             return api.request("post", api.getURL("enclosure/groupconfig"),state.groupForm).then(res =>{
                return res;
            });
          },
       // 根据id获取分组下的要件配置
        getlist({ commit,state}, params) {
             return api.request("get", api.getURL("enclosure/getlist"),{
               regionCode:params.regionCode,
               systemId:params.systemId,
               groupId:params.groupId,
             }).then(res =>{
                let opt = res.data.data.map(item=>{
                  state.groupForm.cconfigIds=[]
                  state.groupForm.cconfigIds.push(item.cconfigId)
                  return {
                     value: item.cconfigId,
                     label:item.title,
                    };
                 });
                 commit('FILE_LIST', opt)
            });
          },
    },
    mutations: {
         GETDATA(state, data){
            // console.log(data)
            state.groupForm.srcSystemId=data.systemId;
            state.groupForm.srcRegionCode=data.regionCode;
            state.groupForm.srcRegionname=data.regionName;
            state.groupForm.groupId=data.groupId;
            state.groupForm.groupIdname=data.groupName;
            state.groupForm.desSystemId=data.systemId;
            state.groupForm.desSystemName=data.systemName;
         },
         DES_REGION(state, data){
            state.groupForm.desRegionCode=data.value;
            state.groupForm.desRegionName=data.label;
         },
         FILE_LIST(state, groups){
            Vue.set(state, 'list', groups)
         },
         NOT_CHECKED(state, groups){
            state.groupForm.cconfigIds=[];
            state.btnstate=true;
         },
         ALL_CHECKED(state, groups){
            // console.log(state.list)
            state.groupForm.cconfigIds=[];
            state.list.map(res=>{
              state.groupForm.cconfigIds.push(res.value);
            })
            state.btnstate=false;
         },
         CHECKEDALL_STATE(state, groups){
            state.btnstate=false;
         },
    },
    //getters: {}
};