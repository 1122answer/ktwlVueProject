import Vue from "vue";
import api from "@/api/index.js";
import { TreeUtil } from "@/util/TreeUtil.js";
//模块数据
export default {
    namespaced: true,
    state: {
        searchForm: {
            dictionaryName: '',
            dictionaryKey: '',
            dictType: '',
            isEnabled: '',
            systemId: '',
            regionCode: '',
            groupId: '',
        },
        dictionaryId:"",
        treeData: []
    },
    actions: {
        fetchData({ commit, state }, param) {
            return api.request("get", api.getURL("dictionarymag/get"), {param}).then(res =>{
                return res;
            });
        },
        fetchDicTable({ commit, state }, params) {
            return api.request("get", api.getURL("dictionarymag/getPageList"), {
                page: params.pageNo - 1,
                size: params.pageSize,
                dictionaryName: state.searchForm.dictionaryName,
                dictionaryKey: state.searchForm.dictionaryKey,
                dictType: state.searchForm.dictType,
                isEnabled: state.searchForm.isEnabled,
                systemId: state.searchForm.systemId,
                regionCode: state.searchForm.regionCode,
                dictionaryCode: state.searchForm.groupId,
            }).then(res => {
                if (res && res.data && res.data.success) {
                    if (res.data.data.result.length > 0) {
                       var dic = res.data.data.result[0];
                       state.dictionaryId = dic.dictionaryId;  
                    }
                    return res.data.data;
                } else {
                    return [];
                }
            });
        },
        deldic({commit,state},id){
            return api.request("post",api.getURL("dictionarymag/del"),{
                id:id
            }).then(res=>{
                return res;
            });
        },
        fetchTreeData({ commit, state }, param) {
            return api.request("get", api.getURL("dictionarymag/getTreeData")).then(res =>{
                if (res && res.data && res.data.success) {
                    state.treeData = [];
                    TreeUtil.build(res.data.data, state.treeData);
                    return state.treeData;
                } else {
                    state.treeData = [];
                }
            });
        },
    },
    mutations: {
        INIT_FORM_DATA(state,data){
        
        },
        SELECT_TREE_NODE(state, data) {
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
        CLEAR_DICTIONARY_ID(state, data){
            state.dictionaryId = "";
        }
        
    },
    //getters: {}
};
    