import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
        name: '管理Store',
        orgId: '',
        deptId: '',
        deptName: '',
        orgName:'',
        treeUsers: [],
    },
    actions: {
        fetchSaveData({ commit, state }, param) {
        	var dataSave = {};
        	dataSave.relation = param;
        	dataSave.deptId = state.deptId;
        	dataSave.orgId = state.orgId;
            dataSave.deptName = state.deptName;
            dataSave.orgName =state.orgName
            return api.request("post", api.getURL("department/bindUser"), dataSave).then(res => {
                return res;
            });
        },
        fetchDeptUser({ commit, state }, params) {
            return api.request("get", api.getURL('department/getAllUser'), {
                orgId: state.orgId,
                deptId: state.deptId,
            }).then(res => {
                if (res && res.data.success) {
                    var subtoal = res.data.data || [];
                    var onlyUserId = [];
                    var interFlag = 1;
                    subtoal.map(item => {
                        var sigle = {};
                        /*if(onlyUserId.length == 0) {
                            onlyUserId.push(item.userId);
                            interFlag = 1;
                        } else {
                            for (var i = 0; i < onlyUserId.length; i++) {
                                if (onlyUserId[i] == item.userId) {
                                    interFlag = 0;
                                }
                            }
                        }*/
                        if (interFlag) {
                            if (item.realName) {
                                sigle.title = item.nickName + "（" + item.realName + "）";
                            } else {
                                sigle.title = item.nickName;
                            }
                            sigle.isBelongDept = item.isBelongDept;
                            sigle.userId = item.userId;
                            if (item.isBelongDept && item.isRelationDepts) {
                                sigle.checked = true;
                            }
                            if (item.isBelongDept && item.isRelationDepts == false) {
                                sigle.checked = true;
                                sigle.disabled = true;
                            }
                            state.treeUsers.push(sigle);
                        }
                    });
                    return subtoal;
                }
            })
        }
    },
    mutations: {
        CHANGE_BASIC_ID(state, data) {
            state.orgId = data.orgId;
            state.deptId = data.deptId;
            state.deptName = data.deptName;
            state.orgName = data.orgName;
        },
        INIT_DATA(state) {
            state.orgId = '';
            state.deptId = '';
            state.deptName = '';
            state.orgName = '';
            state.treeUsers = [];
            state.userBox = [];
        },
        CHANGE_USERID(state, data) {
            state.userBox = [];
            state.userBox = data;
        }
    },
    //getters: {}
};