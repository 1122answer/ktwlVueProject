import Vue from "vue";
import api from "@/api/index.js";
//模块数据
export default {
    namespaced: true,
    state: {
        addSingHouseForm: {
            buildingCode: '',
            buildingId: '',
            buildingTitle: '',
            buildingUnit: '',
            regionCode: '',
            regionName: '',
            floor: 0,
            floorId: '',
            floorSuffix: '',
            houseNo: 0,
            housePrefix: '',
            unitCode: '',
            unitId: '',
            unitNo: 0,
        },
        unitOpts: [],
        floorOpts: []
    },
    actions: {
        fetchSaveData({ commit, state }, param) {
            return api.request("get", api.getURL("mphouse/createhouse"), state.addSingHouseForm).then(res => {
                return res;
            });
        },
        fetchUnitData({ commit, state }, param) {
            return api.request("get", api.getURL("mpunit/getPageList"), {buidingId: state.addSingHouseForm.buildingId}).then(res => {
                if(res){
                    //console.log('fetchUnitData', res.data.data);
                    commit('CHANGE_UNITOPTS',res.data.data);
                }
                return res;
            });
        },
        fetchFloorData({ commit, state }, params) {
            return api.request("get", api.getURL("mpunit/getFloorData"), {buidingId: state.addSingHouseForm.buildingId}).then(res => {
                if (res && res.data && res.data.success) {
                    console.log('fetchFloorData',res.data.data);
                    commit('CHANGE_FLOOR_OPTS',res.data.data);
                } 
                return res;
            });
        },
    },
    mutations: {
        INIT_FORM_DATA(state, data) {
        },
        CHANGE_SINGHOUSE_DATA(state,data){
            console.log('addHOuseStore', data);
            state.addSingHouseForm.buildingCode = data.buildingCode;
            state.addSingHouseForm.buildingId = data.buildingId;
            state.addSingHouseForm.buildingTitle = data.buildingTitle;
            state.addSingHouseForm.buildingUnit = data.buildingUnit;
            state.addSingHouseForm.regionCode = data.regionCode;
            state.addSingHouseForm.regionName = data.regionName;
        },
        CHANGE_UNIT_DATA(state, data){
            state.addSingHouseForm.unitCode = data.unitCode;
            state.addSingHouseForm.unitId = data.unitId;
            state.addSingHouseForm.unitNo = data.unitNo;
        },
        CHANGE_UNITOPTS(state,data){
            Vue.set(state,'unitOpts',data);
        },
        CHANGE_FLOOR_OPTS(state,data){
            Vue.set(state,'floorOpts',data);
        }
    },
    //getters: {}
};