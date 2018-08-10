import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
        addFlag: true,
        smsTplForm: {
            templateCode: '',
            encoded: '',
            channelId: 'string',
            systemId: '',
            systemName: '',
            templateText: '',
            enabled: false,
            remark: '',
            defaultParam: ''
        },
        selectSystem: [],
        smsTemplateId: ''
    },
    actions: {
        addSaveData({ commit, state }, param) {
            return api.request("post", api.getURL("smsTemplate/add"), state.smsTplForm).then(res => {
                return res;
            });
        },
        editSaveData({ commit, state }, param) {
            var data = state.smsTplForm;
            data.smsTemplateId = state.smsTemplateId;
            return api.request("post", api.getURL("smsTemplate/update"), data).then(res => {
                return res;
            });
        },
        fetchgetData({ commit, state }, ids) {
            return api.request("get", api.getURL('smsTemplate/getInfo'), { id: ids }).then(res => {
                console.log('fetchgetData',res);
                if(res.data && res.data.success){
                     state.smsTplForm.templateCode = res.data.data.templateCode;
                     state.smsTplForm.encoded = res.data.data.encoded;
                     state.smsTplForm.channelId = res.data.data.channelId;
                     state.smsTplForm.systemId = res.data.data.systemId;
                     state.smsTplForm.systemName = res.data.data.systemName;
                     state.smsTplForm.templateText = res.data.data.templateText;
                     state.smsTplForm.enabled = res.data.data.enabled;
                     state.smsTplForm.remark = res.data.data.remark; 
                }
                return res;
            });
        },
        getSystemData({ commit, state }, param) {
            return api.request("get", api.getURL("smsTemplate/getSelectList")).then(res => {
                if(res && res.data && res.data.success){
                    state.selectSystem = res.data.data;
                }else{
                    state.selectSystem = [];
                }
                return res;
            });
        },
    },
    mutations: {
        ADD_EDIT_FLAG(state, data) {
            state.addFlag = data;
        },
        INIT_FORM_DATA(state, data) {
            state.smsTplForm.templateCode = '';
            state.smsTplForm.encoded = '';
            state.smsTplForm.channelId = 'string';
            state.smsTplForm.systemId = '';
            state.smsTplForm.systemName = '';
            state.smsTplForm.templateText = '';
            state.smsTplForm.enabled = false;
            state.smsTplForm.remark = '';
            state.smsTplForm.defaultParam = '';
        },
        UPDATE_SYSTEM_DATA(state, data){
            state.smsTplForm.systemId = data.value;
            state.smsTplForm.systemName = data.text;
        },
        RECORD_DATA(state, data){
            state.smsTemplateId = data;
        }
    },
    //getters: {}
};