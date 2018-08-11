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
            if (state.copyRegionForm.srcSystemId==state.copyRegionForm.desSystemId) {
                return false
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
            return api.request("post", api.getURL("paramsConfig/copyRegion"), state.copyRegionForm).then(res => {
                    if (res.data.success==false) {
                        state.copyGroupForm.srcSystemName="通用系统"
                        state.copyGroupForm.srcRegionName="通用区域"
                    }
                return res;
            });
        },
        //根据系统和区域获取分组
        getRigionList({ commit, state }, params) {
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

    },
};