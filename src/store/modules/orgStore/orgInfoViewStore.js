import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
        defaultFileList: [{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png'
        }],
        orgViewForm: {
            name: '',
            shortName:'',
            orgTypeId: '',
            orgTypeName:'',
            state: '',
            socialCreditCode: '',
            regionCode: '',
            regionName:'',
            address: '',
            establishDate: '',
            businessTermStartDate: '',
            businessTermEndDate: '',
            corporateCertificationName: '',
            corporateCertificationType: '',
            corporateCertificationId: '',
            corporateBackPhoto: '',
            corporateFrontPhoto: '',
            icon: '',
            socialCreditPhoto: ''
        },
        orgId:'',
        selectOrgTypeList: [],
        addFlag:true
    },
    actions: {
        fetchGetOrg({ commit, state }, id) {
            return api.request("get", api.getURL("org/getOrg"), { id: id }).then(res => {
                if(res.data.success){
                    state.orgViewForm.name = res.data.data.name;
                    state.orgViewForm.shortName = res.data.data.shortName;
                    state.orgViewForm.orgTypeId = res.data.data.orgTypeId;
                    state.orgViewForm.state = res.data.data.state.toString();
                    state.orgViewForm.socialCreditCode = res.data.data.socialCreditCode;
                    state.orgViewForm.regionCode = res.data.data.regionCode;
                    state.orgViewForm.regionName = res.data.data.regionName;
                    state.orgViewForm.address = res.data.data.address;
                    state.orgViewForm.establishDate = res.data.data.establishDate;
                    state.orgViewForm.businessTermStartDate = res.data.data.businessTermStartDate;
                    state.orgViewForm.businessTermEndDate = res.data.data.businessTermEndDate;
                    state.orgViewForm.corporateCertificationName = res.data.data.corporateCertificationName;
                    state.orgViewForm.corporateCertificationType = res.data.data.corporateCertificationType.toString();
                    state.orgViewForm.corporateCertificationId = res.data.data.corporateCertificationId;
                    state.orgViewForm.corporateBackPhoto = res.data.data.corporateBackPhoto;
                    state.orgViewForm.corporateFrontPhoto = res.data.data.corporateFrontPhoto;
                    state.orgViewForm.icon = res.data.data.icon;
                    state.orgViewForm.socialCreditPhoto = res.data.data.socialCreditPhoto;
                    state.orgId = res.data.data.orgId;
                }
                return res;
            });
        },
        fetchOrgType({ commit, state }, params) {
            return api.request("get", api.getURL("org/selectOrgtype")).then(res => {
                let opt = res.data.data.map(item => {
                    return {
                        label: item.text,
                        value: item.value,
                    };
                });
                commit('SELECT_LIST_ORGTYPE', opt)
                return res;
            });
        }
    },
    mutations: {
        CLEAR_FORM(state) {
            state.orgViewForm = {
                name: '',
                shortName:'',
                orgTypeId: '',
                orgTypeName: '',
                state: '',
                socialCreditCode: '',
                regionCode: '',
                regionName: '',
                address: '',
                establishDate: '',
                businessTermStartDate: '',
                businessTermEndDate: '',
                corporateCertificationName: '',
                corporateCertificationType: '',
                corporateCertificationId: '',
                corporateBackPhoto: '',
                corporateFrontPhoto: '',
                icon: '',
                socialCreditPhoto: '',
            }
        },
        SELECT_LIST_ORGTYPE(state, groups) {
            Vue.set(state, 'selectOrgTypeList', groups)
        },
        CHANGE_FLAG(state, data) {
            state.addFlag = data;
        },
        CHANGE_TYPE_NAME(state, data) {
            state.orgViewForm.orgTypeName = data;
        }

    },
    //getters: {}
};