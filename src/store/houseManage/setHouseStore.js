import Vue from "vue";
import api from "@/api/index.js";
//模块数据
export default {
    namespaced: true,
    state: {
        setHouseForm: {
            comprisingArea: 0,
            constructionArea: 0,
            remark: '',
            roomMode: '', //户型结构显示值 ,
            roomModeValue: 0, //户型结构枚举值,
            roomType: '', //户型,
            structure: '', // 房屋结构,
            useRange: '', // 用途
            houseFloor: [],
        },
        spcHouse: {
            cellid: '',
            houseCode: '',
            structure: '',
            constructionArea: '',
            useRange: '',
            comprisingArea: '',
            roomType: '',
            roomMode: ''
        },
        roomTypeData: [],
        roomModeData: [],
        useRangeData: [],
        structureData: [],
    },
    actions: {
        setHouseSave({ commit, state }, param) {
            return api.request("post", api.getURL("mphouse/setHouseProp"), state.setHouseForm).then(res => {
                return res;
            });
        },
        getHouseInfo({ commit, state }, param) {
            return api.request("get", api.getURL("mphouse/getHouseInfo"), {
                houseId: param,
            }).then(res => {
                if (res && res.data && res.data.success) {
                    state.spcHouse = null;
                    state.spcHouse = res.data.data;
                    return res.data.data;
                }
            });
        },
        getRoomTypeData({ commit, state }, param) {
            return api.request("get", api.getURL("dictionarymag/group"), {
                dictionaryCode: 'sys_room_type',
                systemId: '',
                regionCode: ''
            }).then(res => {
                if (res && res.data && res.data.success) {
                    var dicData = res.data.data;
                    if(dicData && dicData.length>0){
                        commit('SET_ROOM_TYPE',dicData);
                    }
                    return res.data.data;
                }
            });
        },
        getRoomModeData({ commit, state }, param) {
            return api.request("get", api.getURL("dictionarymag/group"), {
                dictionaryCode: 'sys_room_mode',
                systemId: '',
                regionCode: ''
            }).then(res => {
                if (res && res.data && res.data.success) {
                    var dicData = res.data.data;
                    if(dicData && dicData.length>0){
                        commit('SET_ROOM_MODE',dicData);
                    }
                    return res.data.data;
                }
            });
        },
        getUseRangeData({ commit, state }, param) {
            return api.request("get", api.getURL("dictionarymag/group"), {
                dictionaryCode: 'sys_mp_houseuse',
                systemId: '',
                regionCode: ''
            }).then(res => {
                if (res && res.data && res.data.success) {
                    var dicData = res.data.data;
                    if(dicData && dicData.length>0){
                        commit('SET_USE_HOUSE_RANGE',dicData);
                    }
                    return res.data.data;
                }
            });
        },
        getStructureData({ commit, state }, param) {
            return api.request("get", api.getURL("dictionarymag/group"), {
                dictionaryCode: 'sys_mp_structor',
                systemId: '',
                regionCode: ''
            }).then(res => {
                if (res && res.data && res.data.success) {
                    var dicData = res.data.data;
                    if(dicData && dicData.length>0){
                        commit('SET_CONTRUCT_DATA',dicData);
                    }
                    return res.data.data;
                }
            });
        },
    },
    mutations: {
        INIT_FORM_DATA(state, data) {
            state.setHouseForm = {
                comprisingArea: 0,
                constructionArea: 0,
                remark: '',
                roomMode: '', //户型结构显示值 ,
                roomModeValue: 0, //户型结构枚举值,
                roomType: '', //户型,
                structure: '', // 房屋结构,
                useRange: '', // 用途
                houseFloor: [],
            };
            state.spcHouse = {
                cellid: '',
                houseCode: '',
                structure: '',
                constructionArea: '',
                useRange: '',
                comprisingArea: '',
                roomType: '',
                roomMode: ''
            };
        },
        CHANGE_MODE_TYPE(state, data) {
            state.setHouseForm.roomMode = data.roomMode;
            state.setHouseForm.roomModeValue = data.roomModeValue;
        },
        CREATE_HOUSEFLOOR(state, data) {
            state.setHouseForm.houseFloor = [];
            data.map(item => {
                if (item.isActive) {
                    var obj = {};
                    obj.houseId = item.houseId;
                    obj.floor = item.floor;
                    state.setHouseForm.houseFloor.push(obj);
                }
            });
        },
        SET_USE_HOUSE_RANGE(state, data){
            Vue.set(state,'useRangeData',data);
        },
        SET_ROOM_TYPE(state,data){
            Vue.set(state,'roomTypeData',data);
        },
        SET_ROOM_MODE(state,data){
            Vue.set(state,'roomModeData',data);
        },
        SET_CONTRUCT_DATA(state,data){
            Vue.set(state,'structureData',data);
        },
    },
    //getters: {}
};