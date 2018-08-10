import Vue from "vue";
import api from "@/api/index.js";
//模块数据
export default {
    namespaced: true,
    state: {
        asyncProject: [],
        buildArr: [],
        floors: [], //层数
        noUnitHouses: [],
        units: [], //单元
        houses: [],
        chooseHouse: [], //选定的房屋
    },
    actions: {
        fetchProjectData({ commit, state }, param) {
            return api.request("get", api.getURL("mpproject/getAll")).then(res => {
                if (res) {
                    commit('CHANGE_LIST', res.data.data);
                }
                return res;
            });
        },
        fetchBuildData({ commit, state }, param) {
            return api.request("get", api.getURL("mpbuild/getPageList"), { projectId: param }).then(res => {
                if (res && res.data && res.data.data) {
                    res.data.data.map(item => {
                        item.title = item.buildingTitle + item.buildingUnit;
                        item.children = [];
                        //state.buildArr.push(item);
                        commit('ADD_BUILD_DATA', item);
                    });
                    return res.data.data;
                }
            });
        },
        fetchUnitData({ commit, state }, param) {
            return api.request("get", api.getURL("mpunit/getPageList"), { buidingId: param }).then(res => {
                if (res && res.data && res.data.data) {
                    res.data.data.map(item => {
                        item.title = item.unitName;
                    });
                    return res.data.data;
                }
            });
        },
        fetchGetHouse({ commit, state }, params) {
            return api.request("get", api.getURL("mphouse/gethouse"), params).then(res => {
                if (res && res.data && res.data.success) {
                    var floorArr = res.data.data.floor;
                    console.log('fetchGetHouse', res.data.data);
                    var unitArr = res.data.data.unit;
                    unitArr.map(item => {
                        item.children = [];
                        for (var i = 1; i < floorArr.length; i++) {
                            var floors = [];
                            res.data.data.house.forEach(currentValue => {
                                currentValue.isActive = false;
                                if (item.unitNo == currentValue.unitNo && floorArr[i].floor == currentValue.floor) {
                                    floors.push(currentValue);
                                }
                            });
                            item.children.push(floors);
                        }
                        item.maxHouse = 2;
                    });
                    commit('SET_FLOOR_DATA', res.data.data.floor);
                    commit('SET_UNIT_DATA', unitArr);
                    console.log('单元房间数据', unitArr);
                    commit('SET_NOUNITHOUSE_DATA', res.data.data.noUnitHouse);
                    commit('SET_HOUSES_DATA', res.data.data.house)
                    return res.data.data;
                }
            });
        },
        delHouseData({ commit, state }, param) {
            var ids = [];
            state.chooseHouse.map(item => {
                ids.push(item.houseId);
            });
            return api.request("post", api.getURL("mphouse/del"), { 'ids': ids }).then(res => {
                if (res) {
                    return res;
                }
            });
        },
    },
    mutations: {
        INIT_FORM_DATA(state, data) {

        },
        CHANGE_LIST(state, data) {
            data.map(item => {
                item.title = item.projectTitle;
                item.children = [];
            });
            Vue.set(state, 'asyncProject', data);
        },
        ADD_BUILD_DATA(state, data) {
            state.buildArr.push(data);
        },
        SET_FLOOR_DATA(state, data) {
            Vue.set(state, 'floors', data);
        },
        SET_UNIT_DATA(state, data) {
            Vue.set(state, 'units', data);
        },
        SET_NOUNITHOUSE_DATA(state, data) {
            Vue.set(state, 'noUnitHouses', data);
        },
        SET_HOUSES_DATA(state, data) {
            Vue.set(state, 'houses', data);
        },
        CHOOSE_HOUSE_ID(state, data) {
            state.chooseHouse = [];
            state.houses.map(item => {
                if (item.isActive == true) {
                    state.chooseHouse.push(item);
                }
            });
        },
        WETHER_CHOOSE(state, data) {
            state.houses.map(item => {
                item.isActive = data.flag;
            });
        },
        RESET_DATA(state, data) {
            state.chooseHouse = [];
            state.asyncProject = [];
            state.buildArr = [];
            state.floors = [];
            state.noUnitHouses = [];
            state.units = [];
            state.houses = [];
            state.chooseHouse = [];
        }
    },
    //getters: {}
};