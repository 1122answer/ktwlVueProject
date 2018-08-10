import Vue from "vue";
import api from "@/api/index.js";

export default {
    namespaced: true,
    state: {
        userForm: {
            accountUser: '',
            password: '',
            state: '1',
            nickName: '',
            regionCode: '',
            gender: '0',
            mobile: '',
            realName: '',
            certificateType: '',
            certificateId: '',
            icon: '',
            email: '',
            address: '',
            deptId : '',
            deptName : '',
            orgId :'',
            orgName : ''
        },
        orgDepartTree: [{
            title: 'parent 1',
            expanded: true,
            children: [{
                title: 'parent 1-0',
                expanded: true,
                children: [{
                    title: 'my leaf',
                }, {
                    title: 'your leaf',
                }, {
                    title: 'self leaf',
                }]
            }, {
                title: 'parent 1-1',
                children: [{
                    title: "<span style='color: #08c'>sss</span>"
                }]
            }, {
                title: 'parent 1-2',
            }]
        }],
        addFlag: true,
        disableBeal: false,
        userId: '',
    },

    actions: {
        fetchUserSave({ commit, state }, param) {
            let usersave = state.userForm;
            usersave.deptId = param.currentDeptId;
            usersave.orgId = param.currentOrgId;
            usersave.orgName = param.currentOrgName;
            usersave.deptName = param.currentDeptName;
            return api.request("post", api.getURL("user/add"), usersave).then(res => {
                return res;
            });
        },
        fetchEditUserSave({ commit, state }, param) {
            let data = state.userForm;
            data.userId = state.userId;
            return api.request("post", api.getURL("user/edit"), data).then(res => {
                return res;
            });
        },
        fetchGetUserInfo({ commit, state }, param) {
            return api.request("get", api.getURL("user/getUser"), param).then(res => {
                console.log(res);
                if (res && res.data.success) {
                    var stateStr = res.data.data.state.toString();
                    var genderStr = res.data.data.gender.toString();
                    if (res.data.data.accountUser) {
                        state.disableBeal = true;
                    }
                    state.userForm.nickName = res.data.data.nickName;
                    state.userForm.regionCode = res.data.data.regionCode;
                    state.userForm.gender = genderStr;
                    state.userForm.mobile = res.data.data.mobile;
                    state.userForm.realName = res.data.data.realName;
                    state.userForm.certificateType = res.data.data.certificateType;
                    state.userForm.certificateId = res.data.data.certificateId;
                    state.userForm.icon = res.data.data.icon;
                    state.userForm.email = res.data.data.email;
                    state.userForm.address = res.data.data.address;
                    state.userForm.accountUser = res.data.data.accountUser;
                    state.userForm.password = '';
                    state.userForm.state = stateStr;
                    state.userId = res.data.data.userId;
                    state.userForm.deptId =res.data.data.deptId;
                    state.userForm.deptName =res.data.data.deptName;
                    state.userForm.orgId=res.data.data.orgId;
                    state.userForm.orgName =res.data.data.orgName;
                }
                return res;
            });
        },
        fetchGetAccount({ commit, state }, ids) {
            return api.request("get", api.getURL("user/getAccount")).then(res => {
                return res;
            })
        },
    },
    mutations: {
        INIT_DATA_STATUS(state, data) {
            state.userForm = {
                accountUser: '',
                password: '',
                state: '1',
                nickName: '',
                regionCode: '',
                gender: '0',
                mobile: '',
                realName: '',
                certificateType: '',
                certificateId: '',
                icon: '',
                email: '',
                address: '',
                /*deptId : '',
                deptName : '',
                orgId :'',
                orgName : ''*/
            }
            state.disableBeal = false;
        },
        CHANGE_FLAG(state, data) {
            state.addFlag = data;
        },
        DIST_ACOUNT_NAME(state, data) {
            state.userForm.accountUser = data;
        },
        CHANGE_TREE_PARAM(state, data){
            state.userForm.deptId= data.treeDeptId
            state.userForm.orgId= data.treeOrgId;
            state.userForm.orgName = data.trreeOrgName;
            state.userForm.deptName =data.treeDeptName;
        },
        CHANGE_REGION_DATA(state, data){
            state.userForm.regionCode = data;
        }
    },
    getters: {}
};