import Vue from "vue";
import api from "@/api/index.js";
//参数配置模块
export default {
    namespaced: true,
    state: {
        copyGroupForm: {
            srcSystemId: '',//来源系统标识
            srcSystemName: '',//来源系统标识
            srcRegionCode: '',//来源区域编码
            srcRegionName: '',//来源区域编码
            desSystemId: '',//目标系统标识
            desSystemName: '',//目标系统名称
            groupId: '',//分组id

            desRegionCode: '',//目标区域编码
            desRegionName: '',//目标区域名称

            configKeys: [],//分组ids
        },
        list:[],  //分组下的列表
        checkedall:[],   //储存全选数据
    },
    actions: {
        saveData({ commit, state }, param) {
            if (state.copyGroupForm.srcRegionCode==state.copyGroupForm.desRegionCode) {
              return false
            }
            if (state.copyGroupForm.srcSystemId=="") {
                state.copyGroupForm.srcSystemName=""
            }
            if (state.copyGroupForm.srcRegionCode=="") {
                state.copyGroupForm.srcRegionName=""
            }
            return api.request("post", api.getURL("paramsConfig/copyGroup"), state.copyGroupForm).then(res => {
                    if (res.data.success==false) {
                        state.copyGroupForm.srcSystemName="通用系统"
                        state.copyGroupForm.srcRegionName="通用区域"
                    }
                return res;
            });
        },
        //根据系统和区域获取分组
        getGroupList({commit,state},params){
            state.copyGroupForm.srcSystemId = params.systemId;//来源系统标识
            state.copyGroupForm.srcSystemName = params.systemName;//来源系统名称
            if (params.systemId=="") {
                state.copyGroupForm.srcSystemName="通用系统"
            }
            state.copyGroupForm.srcRegionCode = params.regionCode;//来源区域编码
            state.copyGroupForm.srcRegionName = params.regionName;//来源区域名称
            if (params.systemId=="") {
                state.copyGroupForm.srcRegionName="通用区域"
            }
            state.copyGroupForm.desSystemId = params.systemId;
            state.copyGroupForm.desSystemName = params.systemName;
            state.copyGroupForm.groupId = params.groupId;
        },
        getItemList({commit,state},params){
            return api.request("get", api.getURL("paramsConfig/getPageList"), {
                systemId:params.systemId,
                regionCode:params.regionCode,
                groupId:params.groupId
            }).then(res=>{
                state.list=[];
                state.checkedall=[];
                let index = res.data.data.result;
                console.log(index)
                index.map(item=>{
                    let grouplist = {};
                    grouplist.value=item.configKey;
                    grouplist.label=item.configName;
                    state.checkedall.push(item.configKey)
                    state.list.push(grouplist);
                })
                state.copyGroupForm.configKeys=state.checkedall;
            })
        },
        checked_or_not({ commit, state }, params){
            if (state.copyGroupForm.configKeys.length == state.checkedall.length) {
               state.copyGroupForm.configKeys=[];
            }else{
                state.copyGroupForm.configKeys=[];
                state.checkedall.map(res=>{
                    state.copyGroupForm.configKeys.push(res)
                })
            }
            
        },

    },
    mutations: {
        GET_DES_REGION(state, data) {
            state.copyGroupForm.desRegionCode = data.regionCode;
            state.copyGroupForm.desRegionName = data.title;
        },

    },
};