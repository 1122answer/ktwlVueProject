import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
        btntype:false,
       copyregionForm:{
          comesys:"",
          srcSystemId:"",
          srcRegionCode:"",
          comerigion:"",
          desRegionCode:"",
          desRegionName:"",
          desSystemId:"",
          desSystemName:"",
          groupIds:[],
       }, 
       list:[],     //获取区域列表
       checkedall:[],  //存数据
    },
    actions: {
       // 要件管理确定区域复制
        copyok({ commit, state }, params) {
             return api.request("post", api.getURL("enclosure/enccopyregion"),state.copyregionForm).then(res =>{
                return res;
            });
            },
    },
    mutations: {
        GETDATA(state, data){
             console.log(data)
            state.copyregionForm.comesys=data.systemName;
            state.copyregionForm.comerigion=data.regionName;
            state.copyregionForm.srcSystemId=data.systemId;
            state.copyregionForm.srcRegionCode=data.regionCode;
            state.list=[];
            state.checkedall=[];
            data.children.map(item=>{
                let regionlist = {};
                regionlist.label=item.groupName;
                regionlist.value=item.groupId;
                state.list.push(regionlist)
                state.copyregionForm.groupIds.push(item.groupId)
             });
            state.copyregionForm.groupIds=state.checkedall;
        },
         NOTCHECKED(state, data){
            state.copyregionForm.groupIds=[];
            state.btntype=true;
         },
         ALLCHECKED(state, data){
            state.btntype=false;
            state.copyregionForm.groupIds=[];
            state.checkedall.map(res=>{
                state.copyregionForm.groupIds.push(res)
            })
         },
         BTNSTATE(state, data){
            state.btntype=false;
         },
         GET_DESSYSTEM(state, data){
            state.copyregionForm.desSystemId=data.value;
            state.copyregionForm.desSystemName=data.label;
         },
         GET_DESREGION(state, data){
            state.copyregionForm.desRegionCode=data.value;
            state.copyregionForm.desRegionName=data.label;
         },

    },
    //getters: {}
};