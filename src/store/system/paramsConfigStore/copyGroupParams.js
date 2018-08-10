import Vue from "vue";
import api from "@/api/index.js";
//参数配置模块
export default {
    namespaced: true,
    state: {
        copyRegionForm: {
            groupIds: '',//分组ids
            srcSystemId: '',//来源系统标识
            srcRegionCode: '',//来源区域编码
            desRegionCode: '',//目标区域编码
            desRegionName: '',//目标区域名称
            desSystemId: '',//目标系统标识
            desSystemName: '',//目标系统名称
        },
        srcSystemName:'',//来源系统名称
        srcRegionName:'',//来源区域名称
        selectGroup: [],//选择复制的分组
        groupList:[],//分组列表
        desSystem: [],//系统下来列表
        desRegion: [],//行政区域下来列表
    },
    actions: {
        saveData({ commit, state }, param) {
            return api.request("post", api.getURL("paramsConfig/copyRegion"), state.copyRegionForm).then(res => {
                return res;
            });
        },
        //根据系统和区域获取分组
        getGroupList({commit,state},params){
            return api.request("get",api.getURL("paramsConfig/getGroup"),{
                regionCode:params.regionCode,
                systemId:params.systemId,
            }).then(res =>{
                state.groupList = res.data.data;
                return state.groupList;
            });
        },

        // // 获取行政区域列表
        // getRegionSelectTree({ commit, state }, params) {
        //     return api.request("get", api.getURL("region/selectTree"), {
        //         isEnabled: true
        //     }).then(res => {
        //         console.log(res.data)
        //         var current = {
        //             label: '通用区域',
        //             value: '0',
        //         };
        //         let opt = res.data.data.map(item => {
        //             return {
        //                 label: item.name,
        //                 value: item.regionCode,
        //             };
        //         });
        //         opt.unshift(current);
        //         state.selectRegion = opt;
        //         return opt;
        //         // console.log("regionSelect", opt);
        //         // commit('SELECT_LIST_REGION', opt);
        //     });
        // },
        // //获取系统名称列表
        // getsystemSelect({ commit, state }, params) {
        //     return api.request("get", api.getURL("systemmag/systemlist"), {
        //         isEnabled: "true"
        //     }).then(res => {
        //         // console.log(res.data.data.result)
        //         let opt = res.data.data.result.map(item => {
        //             return {
        //                 label: item.systemName,
        //                 value: item.systemId,
        //             };
        //         });
        //         var current = {
        //             label: '通用系统',
        //             value: '0',
        //         }
        //         opt.unshift(current);
        //         state.selectSystem = opt;
        //         return opt;
        //         // console.log("systemSelect", opt);
        //         // commit('SELECT_LIST_SYSTEM', opt);
        //     })
        // },
        // //获取参数分组列表
        // getGroupSelect({ commit, state }, params) {
        //     return api.request("get", api.getURL("paramsConfig/groupselect"), {
        //     }).then(res => {
        //         let opt = res.data.data.map(item => {
        //             return {
        //                 label: item.value1,
        //                 value: item.dictionaryKey,
        //             };
        //         });
        //         state.selectGroup = opt;
        //         return opt;
        //         // commit('SELECT_LIST_GROUP', opt);
        //     })
        // },
        // //获取操作权限枚举
        // getModifyTypeEnum({ commit, state }, params) {
        //     return api.request("get", api.getURL("common/enumerate"), {
        //         code: 9,
        //     }).then(res => {
        //         if (res && res.data && res.data.success) {
        //             state.selectModifyType = res.data.data;
        //         } else {
        //             state.selectModifyType = [];
        //         }
        //         return res;
        //     })
        // },
    },
    mutations: {
        INIT_FORM_DATA(state, data) {
            state.copyRegionForm.srcSystemId = data.rscSystemId;//来源系统标识
            state.copyRegionForm.srcRegionCode = data.rscRegionCode;//来源区域编码
            state.srcSystemName = data.srcSystemName;
            state.srcRegionName = data.srcRegionName;
        },
        UPDATE_ADD_DEFAULT_DATA(state, data) {
            state.paramConfigForm.groupId = data.groupId;
            state.paramConfigForm.groupName = data.groupName;
            state.paramConfigForm.systemName = data.systemName;
            state.paramConfigForm.systemId = data.systemId;
            state.paramConfigForm.regionName = data.regionName;
            state.paramConfigForm.regionCode = data.regionCode;
        },
        UPDATE_SYSTEM_DATA(state, data) {
            // state.paramConfigForm.systemName = data.label;
            state.paramConfigForm.systemId = data.value;
        },
        UPDATE_REGION_DATA(state, data) {
            state.paramConfigForm.regionCode = data.value;
            // state.paramConfigForm.regionName = data.label;
        },
        UPDATE_GROUP_DATA(state, data) {
            state.paramConfigForm.groupId = data.value;
            state.paramConfigForm.groupName = data.label;
        },
    },
};