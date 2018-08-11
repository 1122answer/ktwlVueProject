import Vue from "vue";
import api from "@/api/index.js";
import { TreeUtil } from "../../util/TreeUtil.js";

//行政区划下拉列表树
export default {
    namespaced: true,
    state: {
        systemSelect: [],
        regionSelect: [],   //树形的行政区域数据（渲染 v-tree-select使用）
        regionOriginal:[],   //行政区域的原始数据，为了获取行政区域的名称时使用。   Original 原始的
    },
    actions: {
        // 获取行政区域列表
        //如果需要带通用区域，只需params为真
        getRegionSelectTree({ commit, state }, params) {
            console.log(params)
            return api.request("get", api.getURL("region/selectTree"), {
                isEnabled: true
            }).then(res => {
                let opt = res.data.data;
                if(params){
                    let comrigion = {
                        name:"通用区域",
                        regionCode:"",
                        regionId:"",
                        pid:0,
                        id:""
                    }
                    opt.push(comrigion);
                }
                var newDataTree = [];
                TreeUtil.build(opt, newDataTree ,false);
                commit('SELECT_LIST_REGION', newDataTree);
                console.log(newDataTree)
                commit('SET_ORIGINAL_REGION',opt);
            });
        },
        //获取系统名称列表
        getsystemSelect({ commit, state }, params) {
            return api.request("get", api.getURL("systemmag/systemlist"), {
                isEnabled: "true"
            }).then(res => {
                 state.systemSelect=[];
                let opt = res.data.data.result.map(item => {
                    return {
                        label: item.systemName,
                        value: item.systemId,
                    };
                });
                let comsys = {
                    label:"通用系统",
                    value:"",
                }
                opt.push(comsys);
                commit('SELECT_LIST_SYSTEM', opt);
                return res;
            })
        }
    },
    mutations: {
        SELECT_LIST_SYSTEM(state, groups) {
            Vue.set(state, 'systemSelect', groups);
        },
        SELECT_LIST_REGION(state, groups) {
            state.regionSelect=[];
            Vue.set(state, 'regionSelect', groups);
        },
        SET_ORIGINAL_REGION(state,data){
            Vue.set(state, 'regionOriginal', data);
        }
    },
    //getters: {}
};