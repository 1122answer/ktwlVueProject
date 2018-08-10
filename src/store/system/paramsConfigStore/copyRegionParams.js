import Vue from "vue";
import api from "@/api/index.js";
//参数配置模块
export default {
    namespaced: true,
    state: {
        copyRegionForm: {
            srcSystemId: '',//来源系统标识
            srcSystemName: "",//来源系统名称
            srcRegionCode: '',//来源区域编码
            srcRegionName: '',//来源区域名称

            desRegionCode: '',//目标区域编码
            desRegionName: '',//目标区域名称
            desSystemId: '',//目标系统标识
            desSystemName: '',//目标系统名称
            groupIds:[],//分组ids
        },
        list:[],
        checkedall:[],
    },
    actions: {
        saveData({ commit, state }, param) {
            if (state.copyRegionForm.desRegionCode=="" && state.copyRegionForm.desSystemId=="") {
                let flag =1 
            }
            if (state.copyRegionForm.srcSystemId=="" && state.copyRegionForm.srcRegionCode=="") {
                let flag =1 
            }
            if(state.copyRegionForm.srcSystemId==""){
                state.copyRegionForm.srcSystemName="";
            }
            if(state.copyRegionForm.srcRegionCode==""){
                state.copyRegionForm.srcRegionName="";
            }
            if(state.copyRegionForm.desRegionCode==""){
                state.copyRegionForm.desRegionName="";
            }
            if(state.copyRegionForm.desSystemId==""){
                state.copyRegionForm.desSystemName="";
            }
            // return api.request("post", api.getURL("paramsConfig/copyRegion"), state.copyRegionForm).then(res => {
            //     return res;
            // });
        },
        //根据系统和区域获取分组
        getGroupList({ commit, state }, params) {
            console.log(params)
            state.copyRegionForm.srcSystemId=params.systemId;
            state.copyRegionForm.srcSystemName=params.systemName;
            if (params.systemName=="") {
                state.copyRegionForm.srcSystemName="通用系统";
            }
            state.copyRegionForm.srcRegionCode=params.regionCode;
            state.copyRegionForm.srcRegionName=params.regionName;
            if (params.regionName=="") {
                state.copyRegionForm.srcRegionName="通用区域";
            }
            state.list=[];
            state.checkedall=[];
            params.children.map(res=>{
                let regionlist = {};
                regionlist.label=res.groupName;
                regionlist.value=res.groupId;
                state.checkedall.push(res.groupId);
                state.list.push(regionlist)
            })
            state.copyRegionForm.groupIds=state.checkedall;
        },
        checked_or_not({ commit, state }, params){
            if (state.copyRegionForm.groupIds.length == state.checkedall.length) {
               state.copyRegionForm.groupIds=[];
            }else{
                state.copyRegionForm.groupIds=[];
                state.checkedall.map(res=>{
                    state.copyRegionForm.groupIds.push(res)
                })
            }
            
        }
    },
    mutations: {
        // 选择目标系统
        DESSYSTEM_CHANGE(state, data){
            state.copyRegionForm.desSystemId=data.value;
            state.copyRegionForm.desSystemName=data.label;
        },
        DESREGION_CHANGE(state, data){
            state.copyRegionForm.desRegionCode=data.value;
            state.copyRegionForm.desRegionName=data.label;
        },
        //初始化来源数据
        // INIT_FORM_DATA(state, data) {
        //     state.copyRegionForm.srcSystemId = data.systemId;//来源系统标识
        //     state.copyRegionForm.srcRegionCode = data.regionCode;//来源区域编码
        //     state.copyRegionForm.srcSystemName = data.systemName;
        //     state.copyRegionForm.srcRegionName = data.regionName;
        // },
        // UPDATE_ADD_DEFAULT_DATA(state, data) {
        //     state.paramConfigForm.groupId = data.groupId;
        //     state.paramConfigForm.groupName = data.groupName;
        //     state.paramConfigForm.systemName = data.systemName;
        //     state.paramConfigForm.systemId = data.systemId;
        //     state.paramConfigForm.regionName = data.regionName;
        //     state.paramConfigForm.regionCode = data.regionCode;
        // },
        // //初始化目标系统
        // INIT_DES_SYSTEM_DATA(state, data) {
        //     state.desSystem = data;
        // },

        // //初始化目标区域
        // INIT_DES_REGION_DATA(state, data) {
        //     state.desRegion = data;
        // },

        // UPDATE_DES_SYSTEM_DATA(state, data) {
        //     // state.paramConfigForm.systemName = data.label;
        //     state.copyRegionForm.systemId = data.value;
        // },
        // UPDATE_DES_REGION_DATA(state, data) {
        //     state.copyRegionForm.regionCode = data.value;
        //     // state.paramConfigForm.regionName = data.label;
        // },
        // UPDATE_GROUP_DATA(state, data) {
        //     state.paramConfigForm.groupId = data.value;
        //     state.paramConfigForm.groupName = data.label;
        // },
    },
};