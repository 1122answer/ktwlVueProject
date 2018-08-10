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
        orgForm: {
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
        selectRegionList: [],
        addFlag:true,
        IDType:[],
    },
    actions: {
        fetchAddSave({ commit, state }, ids) {
            return api.request("post", api.getURL("org/add"), state.orgForm).then(res => {
                return res;
            });
        },
        fetchGetOrg({ commit, state }, id) {
            return api.request("get", api.getURL("org/getOrg"), { id: id }).then(res => {
                if(res.data.success){
                    state.orgForm.name = res.data.data.name;
                    state.orgForm.shortName = res.data.data.shortName;
                    state.orgForm.orgTypeId = res.data.data.orgTypeId;
                    state.orgForm.orgTypeName = res.data.data.orgTypeName;
                    state.orgForm.state = res.data.data.state.toString();
                    state.orgForm.socialCreditCode = res.data.data.socialCreditCode;
                    state.orgForm.regionCode = res.data.data.regionCode;
                    state.orgForm.regionName = res.data.data.regionName;
                    state.orgForm.establishDate = res.data.data.establishDate;
                    state.orgForm.businessTermStartDate = res.data.data.businessTermStartDate;
                    state.orgForm.businessTermEndDate = res.data.data.businessTermEndDate;
                    state.orgForm.corporateCertificationName = res.data.data.corporateCertificationName;
                    state.orgForm.corporateCertificationType = res.data.data.corporateCertificationType.toString();
                    state.orgForm.corporateCertificationId = res.data.data.corporateCertificationId;
                    state.orgForm.corporateBackPhoto = res.data.data.corporateBackPhoto;
                    state.orgForm.corporateFrontPhoto = res.data.data.corporateFrontPhoto;
                    state.orgForm.icon = res.data.data.icon;
                    state.orgForm.socialCreditPhoto = res.data.data.socialCreditPhoto;
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
                commit('SELECT_LIST_REGION', opt)
                return res;
            });
        },
        fetchUpdateSave({ commit, state }, ids) {
            let data= state.orgForm;
            data.orgId= state.orgId;
            return api.request("post", api.getURL("org/edit"), data).then(res => {
                return res;
            });
        },
        getIDType({ commit, state }, ids){
            return api.request("get", api.getURL("dictionarymag/group"), {
                systemId: '',
                regionCode: '',
                dictionaryCode: 'corporate_certificat',
            }).then(res => {
                console.log('证件类型',res.data.data);
                return res;
            });
        }
    },
    mutations: {
        CLEAR_FORM(state) {
            state.orgForm = {
                name: '',
                shortName:'',
                orgTypeId: '',
                orgTypeName: '',
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
                socialCreditPhoto: '',
            }
        },
        SELECT_LIST_REGION(state, groups) {
            Vue.set(state, 'selectRegionList', groups)
        },
        CHANGE_FLAG(state, data) {
            state.addFlag = data;
        },
        CHANGE_TYPE_NAME(state, data) {
            state.orgForm.orgTypeName = data;
        },
        CHANGE_REGION_DATA(state, data){
            state.orgForm.regionCode = data.regionCode;
            state.orgForm.regionName = data.regionName;
        }

    },
    //getters: {}
};