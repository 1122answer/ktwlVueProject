import Vue from "vue";
import api from "@/api/index.js";
//模块数据
export default {
    namespaced: true,
    state: {
        buildAddForm: {
            address: '',
            buildingTitle: '',
            buildingUnit: '',
            projectCode: '',
            projectId: '',
            projectTitle: '',
            regionCode: '',
            regionName: '',
            roadno: '',
            roadnoExt: '',
        },
        currentAddress: '',
        buildingId:'',
        delBuildAddress:'',
    },
    actions: {
        buildSaveData({ commit, state }, param) {
            var data = state.buildAddForm;
            data.address = state.currentAddress;
            return api.request("post", api.getURL("mpbuild/add"), data).then(res => {
                return res;
            });
        },
        buildDel({ commit, state }, param) {
            return api.request("post", api.getURL("mpbuild/del"),{'id':state.buildingId}).then(res => {
                if (res) {
                    return res;
                }
            });
        },
    },
    mutations: {
        INIT_FORM_DATA(state, data) {
            
        },
        CHANGE_ADDRESS(state, data) {
            state.currentAddress = data;
        },
        CHANGE_FORM(state, data) {
            state.buildAddForm.address = data.location;
            state.buildAddForm.projectCode = data.projectCode;
            state.buildAddForm.projectId = data.projectId;
            state.buildAddForm.projectTitle = data.projectTitle;
            state.buildAddForm.regionCode = data.regionCode;
            state.buildAddForm.regionName = data.regionName;
            state.buildAddForm.roadno = data.roadno;
            state.buildAddForm.roadnoExt = data.roadnoExt;
        },
        SET_BUILDING_ID(state, data){
            state.buildingId = data.buildingId ;
            state.delBuildAddress = data.address;
        },
    },
    //getters: {}
};