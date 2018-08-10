import Vue from "vue";
import api from "@/api/index.js";
//模块数据
export default {
    namespaced: true,
    state: {
        batchAddForm: {
            buildingCode: 0,
            buildingId: '',
            buildingTitle: '',
            buildingUnit: '',
            regionCode: '',
            regionName: '',
            floorCount: 0,
            floorInit: 0,
            houseCount: 0,
            houseInit: 0,
            unitCount: 0,
            unitInit: 0
        },
    },
    actions: {
        fetchSaveData({ commit, state }, param) {
            return api.request("post", api.getURL("mphouse/createhouse"), state.batchAddForm).then(res =>{
                return res;
            });
        },
        fetchTable({ commit, state }, params) {
            return api.request("get", api.getURL("houseLayout/list"), {
                page: params.pageNo - 1,
                size: params.pageSize,
                
            }).then(res => {
                if (res && res.data && res.data.success) {
                    return res.data.data;
                } else {
                    return [];
                }
            });
        },
    },
    mutations: {
        INIT_FORM_DATA(state,data){
        
        },
        CHANGE_BUILDING_DATA(state,data){
            state.batchAddForm.buildingCode = data.buildingCode;
            state.batchAddForm.buildingId = data.buildingId;
            state.batchAddForm.buildingTitle = data.buildingTitle;
            state.batchAddForm.buildingUnit = data.buildingUnit;
            state.batchAddForm.regionCode = data.regionCode;
            state.batchAddForm.regionName = data.regionName;
        }
    },
    //getters: {}
};
    