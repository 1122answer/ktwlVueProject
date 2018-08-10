import Vue from "vue";
import api from "@/api/index.js";
import qs from 'qs';
//权限管理模块
export default {
    namespaced: true,
    state: {
          searchForm:{
            messageType:null,
            title: null,
            busiId: null,
            isRevoke: null,
         },
         msgForm: {
            messageId: '',
            messageFrom: '',
            messageType:'',
            title: '',
            content:'',
            busiId: '',
            busiName: '',
            busiType: '',
            thumb: '',
            link: '',
            success: 1,
            remark: '',
            pushPackage: '',
            isRevoke: 0,
            isTop: 0,
            topDealine: '',
            userList: {
                userId: '',
                userName: '',
            },
        },
        searchPushForm:{
            messageId:'',
            isView:1,
        },
        msgpushForm: {
            messageDetailId:'',
            messageId:'',
            userId:'',
            userName:'',
            isView:'',
            viewTime:'',
            createTime:'',
        },
        messageId:'',
        totalCount:0,
        viewCount:0,
    },
    actions: {
        fetchMsgTable({ commit, state }, params) {
            if (typeof(state.searchForm.messageType) == 'string') {
                state.searchForm.messageType = null;
            }
            if (typeof(state.searchForm.isRevoke) == 'string') {
                state.searchForm.isRevoke = null;
            }
            return api.request("get", api.getURL('messagemag/msglist'), {
                title:state.searchForm.title,
                messageType:state.searchForm.messageType,
                isRevoke:state.searchForm.isRevoke,
                busiId:state.searchForm.busiId,
                page:params.pageNo - 1, //当前页
                size:params.pageSize
            }).then(res => {
                //console.log('res======orgLIst', res.data);
                if (res) {
                    if(res.data.success){
                        //console.log(res.data.data);
                        return res.data.data;
                    }else{
                        return;
                    }
                }
                
            })
        },
        fetchMsgPushTable({ commit, state }, params) {
            return api.request("get", api.getURL('messagemag/msgpushlist'), {
                messageId:state.messageId,
                isView:-1,
                page:params.pageNo - 1, //当前页
                size:params.pageSize
            }).then(res => {
                //console.log('res======orgLIst', res.data);
                if (res) {
                    if(res.data.success){
                        //console.log(res.data.data);
                        return res.data.data;
                    }else{
                        return;
                    }
                }
                
            })
        },
        modifyViewStatus({ commit, state }, params) {
            //console.log("addSave",state.orgForm);
            return api.request("post", api.getURL("messagemag/isview"), {id: params, flag: true}).then(res => {
                return res;
            });
        },
        modifyRevokeStatus({ commit, state }, params) {
            //console.log("addSave",state.orgForm);
            return api.request("post", api.getURL("messagemag/revoke"), {id: params, flag: true}).then(res => {
                return res;
            });
        },
        fetchGetMsg({ commit, state }, id) {
            return api.request("get", api.getURL("messagemag/getlist"), { id: id }).then(res => {
                if(res.data.success){
                    state.msgForm.messageId = res.data.data.messageId;
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
                    state.msgForm.isRevoke = res.data.data.isRevoke;
                    state.msgForm.topDealine = res.data.data.topDealine;
                    state.messageId = res.data.data.messageId;
                }
                return res;
            });
        },
    },
    mutations: {
        CLEAR_FORM(state) {
            state.msgForm = {
                messageId: '',
                messageFrom: '',
                messageType:'',
                title: '',
                content:'',
                busiId: '',
                busiName: '',
                busiType: '',
                thumb: '',
                link: '',
                success: 1,
                remark: '',
                pushPackage: '',
                isRevoke: 0,
                isTop: 0,
                topDealine: '',
                userList: {
                   userId: '',
                   userName: '',
                },
            }
        },
        SAVE_MESSAGEID(state, messageId) {
            state.messageId = messageId;
        },
        SAVE_VIEWCOUNT(state, viewCount) {
            state.viewCount = viewCount;
        }, 
        SAVE_TOTALCOUNT(state,totalCount) {
            state.totalCount = totalCount;
        } 
    },
    //getters: {}
};