import Vue from "vue";
import api from "@/api/index.js";
import qs from 'qs';
import { TreeUtil } from "@/util/TreeUtil.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
        msgForm: {
            messageFrom: '',
            messageType: '',
            title: '',
            content: '',
            busiId: '',
            busiName: '',
            busiType: '',
            thumb: '',
            link: '',
            success: '',
            remark: '',
            pushPackage: '',
            isRevoke: '',
            revokeTime: '',
            isTop: '',
            topDealine: '',
            userList: []
        },
        treeData: []
    },
    actions: {
        fetchAddSave({ commit, state }, ids) {
            let data = state.msgForm;
            if (data.isTop == true) {
                data.isTop = 1;
            } else {
                data.isTop = 0;
            }
            return api.request("post", api.getURL("messagemag/add"), data).then(res => {
                return res;
            });
        },
        fetchGetMsg({ commit, state }, id) {
            return api.request("get", api.getURL("messagemag/getlist"), { id: id }).then(res => {
                if (res && res.data && res.data.success) {
                    state.msgForm.messageFrom = res.data.data.messageFrom;
                    state.msgForm.messageType = res.data.data.messageType;
                    state.msgForm.title = res.data.data.title;
                    state.msgForm.content = res.data.data.content;
                    state.msgForm.busiId = res.data.data.busiId;
                    state.msgForm.busiName = res.data.data.busiName;
                    state.msgForm.busType = res.data.data.busType;
                    state.msgForm.thumb = res.data.data.thumb;
                    state.msgForm.link = res.data.data.link;
                    state.msgForm.remark = res.data.data.remark;
                    state.msgForm.pushPackage = res.data.data.pushPackage;
                    state.msgForm.isTop = res.data.data.isTop.toString();
                    state.msgForm.topDealine = res.data.data.topDealine;
                    state.messageId = res.data.data.messageId;
                }
                return res;
            });
        },
        fetchUpdateSave({ commit, state }, ids) {
            let data = state.msgForm;
            data.messageId = state.messageId;
            return api.request("post", api.getURL("messagemag/edit"), data).then(res => {
                return res;
            });
        },
        initTreeData({ commit, state }, id) {
            return api.request("get", api.getURL("org/getorgdeptusertree")).then(res => {
                if (res && res.data && res.data.success) {
                    var deptArr = res.data.data;
                    TreeUtil.build(res.data.data, state.treeData);
                }
                return res;
            });
        },
    },
    mutations: {
        CLEAR_FORM(state) {
            state.msgForm = {
                messageFrom: '',
                messageType: '',
                title: '',
                content: '',
                busiId: '',
                busiName: '',
                busiType: '',
                thumb: '',
                link: '',
                success: '',
                remark: '',
                pushPackage: '',
                isRevoke: '',
                revokeTime: '',
                isTop: '',
                topDealine: '',
            }
        },
        INIT_TREE_DATA(state) {
            state.treeData = [];
        },
        CHANGE_USER_LIST(state, data) {
            state.msgForm.userList = [];
            state.msgForm.userList = data;
        },
        CHANGE_MESSAGE_CONTENT(state, data){
            state.msgForm.content = data;
        },
        CHANGE_MESSAGE_FROM(state, data){
            state.msgForm.messageFrom = data;
        },
        CHANGE_BUSINESS_DATA(state,data){
            state.msgForm.busiId= data.busiId;
            state.msgForm.busiName = data.busiName;
        }
    },
    //getters: {}
};