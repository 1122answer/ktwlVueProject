import Vue from "vue";
import api from "@/api/index.js";
import { TreeUtil } from "@/util/TreeUtil.js";
//模块数据
export default {
    namespaced: true,
    state: {
        searchForm: {
            groupName: null,
            configKey: null,
            configName: null,
            configDesc: null,
            isEnabled: null,
            systemId:null,
            regionCode:null,
            groupId:null,
        },
        treeData: []
    },
    actions: {
        fetchData({ commit, state }, param) {
            return api.request("get", api.getURL("paramsConfig/get"), { param }).then(res => {
                return res;
            });
        },
        fetchParansTable({ commit, state }, params) {
            return api.request("get", api.getURL("paramsConfig/getPageList"), {
                page: params.pageNo - 1,
                size: params.pageSize,
                groupName: state.searchForm.groupName,
                configKey: state.searchForm.configKey,
                configName: state.searchForm.configName,
                configDesc: state.searchForm.configDesc,
                isEnabled: state.searchForm.isEnabled,
                systemId: state.searchForm.systemId,
                regionCode: state.searchForm.regionCode,
                groupId: state.searchForm.groupId
            }).then(res => {
                if (res && res.data && res.data.success) {
                    return res.data.data;
                } else {
                    return [];
                }
            });
        },
        fetchTreeData({ commit, state }, param) {
            return api.request("get", api.getURL("paramsConfig/getTreeData")).then(res => {
                if (res && res.data && res.data.success) {
                    state.treeData = [];
                    TreeUtil.build(res.data.data, state.treeData);
                    return state.treeData;
                } else {
                    state.treeData = [];
                }
            });
        },

        delParamData({ commit, state }, id) {
            return api.request("post", api.getURL("paramsConfig/del"), { id: id }).then(data => {
                return data;
            });
        }
    },
    mutations: {
        INIT_FORM_DATA(state, data) {
        },
        SELECT_TREE_NODE(state, data) {
            if (data==""||data==null||data==undefined) {
                state.searchForm.groupId = null;
                state.searchForm.regionCode = null;
                state.searchForm.systemId = null;
                return
            }
            state.searchForm.groupId = data.groupId;
            if (data.regionCode == "common_area") {
                state.searchForm.regionCode = '';
            } else {
                state.searchForm.regionCode = data.regionCode;
            }
            if (data.systemId == "common_sys") {
                state.searchForm.systemId = '';
            } else {
                state.searchForm.systemId = data.systemId;
            }
        },
    },
    //getters: {}
};
