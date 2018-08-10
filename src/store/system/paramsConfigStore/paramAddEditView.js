import Vue from "vue";
import api from "@/api/index.js";
//参数配置模块
export default {
    namespaced: true,
    state: {
        titleName: '详情',
        addFlag: 1,//显示状态 1-详情， 2-添加， 3-编辑
        paramConfigForm: {
            configId: '',//参数id
            configKey: '',//参数编码
            configName: '',//参数名称
            configDesc: '',//参数描述
            configValue: '',//参数值
            configValue2: '',//参数值2
            configValue3: '',//参数值3
            groupId: '',//分组ID
            groupName: '',//分组名称
            isEnabled: false,
            modifyType: '',//修改类型
            regionCode: '',//行政区域编码
            regionName: '',//行政区域名称
            remark: '',//备注
            systemId: '',//所属系统Id
            systemName: '',//所属系统名称
        },
        modifyTypeText: '可修改删除',//当前参数操作权限描述
        modifyTypeValue: 2,//当前参数操作权限值
        configId: '',
        selectGroup: [],//分组
        selectSystem: [],//系统下来列表
        selectRegion: [],//行政区域下来列表
        selectModifyType: [],//操作权限
    },
    actions: {
        addSaveData({ commit, state }, param) {
            if (state.paramConfigForm.systemId == '0') {
                state.paramConfigForm.systemId = '';
                state.paramConfigForm.systemName = '';
            }
            if (state.paramConfigForm.regionCode == '0') {
                state.paramConfigForm.regionCode = '';
                state.paramConfigForm.regionName = '';
            }
            return api.request("post", api.getURL("paramsConfig/add"), state.paramConfigForm).then(res => {
                return res;
            });
        },
        editSaveData({ commit, state }, param) {
            var data = state.paramConfigForm;
            if (data.systemId == '0') {
                data.systemId = '';
                data.systemName = '';
            }
            if (data.regionCode == '0') {
                data.regionCode = '';
                data.regionName = '';
            }
            data.configId = state.configId;
            return api.request("post", api.getURL("paramsConfig/update"), data).then(res => {
                return res;
            });
        },
        fetchgetData({ commit, state }, ids) {
            return api.request("get", api.getURL('paramsConfig/getParam'), { id: ids }).then(res => {
                console.log('fetchgetData', res);
                if (res.data && res.data.success) {
                    state.paramConfigForm.configId = res.data.data.configId;
                    state.paramConfigForm.configKey = res.data.data.configKey;
                    state.paramConfigForm.configName = res.data.data.configName;
                    state.paramConfigForm.configDesc = res.data.data.configDesc;
                    state.paramConfigForm.configValue = res.data.data.configValue;
                    state.paramConfigForm.configValue2 = res.data.data.configValue2;
                    state.paramConfigForm.configValue3 = res.data.data.configValue3;
                    state.paramConfigForm.groupId = res.data.data.groupId;
                    state.paramConfigForm.groupName = res.data.data.groupName;
                    state.paramConfigForm.isEnabled = res.data.data.isEnabled;
                    let typeItem = state.selectModifyType.find(i => {
                        return i.value == res.data.data.modifyType;
                    })
                    state.modifyTypeText = typeItem.text;
                    state.paramConfigForm.modifyType = state.modifyTypeValue = res.data.data.modifyType;
                    state.paramConfigForm.regionCode = res.data.data.regionCode;
                    state.paramConfigForm.regionName = (res.data.data.regionName == null || res.data.data.regionName == '') ? "通用系统" : res.data.data.regionName;
                    state.paramConfigForm.remark = res.data.data.remark;
                    state.paramConfigForm.systemId = res.data.data.systemId;
                    state.paramConfigForm.systemName = (res.data.data.systemName == null || res.data.data.systemName == '') ? "通用系统" : res.data.data.systemName;

                }
                return res;
            });
        },

        // 获取行政区域列表
        getRegionSelectTree({ commit, state }, params) {
            return api.request("get", api.getURL("region/selectTree"), {
                isEnabled: true
            }).then(res => {
                console.log(res.data)
                var current = {
                    label: '通用区域',
                    value: '0',
                };
                let opt = res.data.data.map(item => {
                    return {
                        label: item.name,
                        value: item.regionCode,
                    };
                });
                opt.unshift(current);
                state.selectRegion = opt;
                return opt;
                // console.log("regionSelect", opt);
                // commit('SELECT_LIST_REGION', opt);
            });
        },
        //获取系统名称列表
        getsystemSelect({ commit, state }, params) {
            return api.request("get", api.getURL("systemmag/systemlist"), {
                isEnabled: "true"
            }).then(res => {
                // console.log(res.data.data.result)
                let opt = res.data.data.result.map(item => {
                    return {
                        label: item.systemName,
                        value: item.systemId,
                    };
                });
                var current = {
                    label: '通用系统',
                    value: '0',
                }
                opt.unshift(current);
                state.selectSystem = opt;
                return opt;
                // console.log("systemSelect", opt);
                // commit('SELECT_LIST_SYSTEM', opt);
            })
        },
        //获取参数分组列表
        getGroupSelect({ commit, state }, params) {
            return api.request("get", api.getURL("paramsConfig/groupselect"), {
            }).then(res => {
                let opt = res.data.data.map(item => {
                    return {
                        label: item.value1,
                        value: item.dictionaryKey,
                    };
                });
                // state.selectGroup = opt;
                commit('SELECT_LIST_GROUP', opt);
                return opt;
            })
        },
        //获取操作权限枚举
        getModifyTypeEnum({ commit, state }, params) {
            return api.request("get", api.getURL("common/enumerate"), {
                code: 9,
            }).then(res => {
                if (res && res.data && res.data.success) {
                    state.selectModifyType = res.data.data;
                } else {
                    state.selectModifyType = [];
                }
                return res;
            })
        },
    },
    mutations: {
        ADD_EDIT_FLAG(state, data) {
            state.addFlag = data;
            switch (data) {
                case 1:
                    state.titleName = '详情';
                    break;
                case 2:
                    state.titleName = '添加';
                    break;
                case 3:
                    state.titleName = '修改';
                    break;
            }
        },
        INIT_FORM_DATA(state, data) {
            state.paramConfigForm.configId = '';
            state.paramConfigForm.configKey = '';
            state.paramConfigForm.configName = '';
            state.paramConfigForm.configDesc = '';
            state.paramConfigForm.configValue = '';
            state.paramConfigForm.configValue2 = '';
            state.paramConfigForm.configValue3 = '';
            state.paramConfigForm.groupId = '';
            state.paramConfigForm.groupName = '';
            state.paramConfigForm.isEnabled = false;
            state.paramConfigForm.modifyType = '';
            state.paramConfigForm.regionCode = '';
            state.paramConfigForm.regionName = '';
            state.paramConfigForm.remark = '';
            state.paramConfigForm.systemId = '';
            state.paramConfigForm.systemName = '';
        },
        UPDATE_ADD_DEFAULT_DATA(state, data) {
            state.paramConfigForm.groupId = data.groupId;
            state.paramConfigForm.groupName = data.groupName;
            state.paramConfigForm.systemName = data.systemName;
            state.paramConfigForm.systemId = data.systemId;
            state.paramConfigForm.regionName = data.regionName;
            state.paramConfigForm.regionCode = data.regionCode;
        },
        UPDATE_MODIFYTYPE_DATA(state, data) {
            state.paramConfigForm.modifyType = data.value;
        },
        UPDATE_SYSTEM_DATA(state, data) {
            // state.paramConfigForm.systemName = data.label;
            state.paramConfigForm.systemId = data.value;
        },
        UPDATE_REGION_DATA(state, data) {
            state.paramConfigForm.regionCode = data.value;
            // state.paramConfigForm.regionName = data.label;
        },
        UPDATE_GROUP_DATA(state, data) {
            state.paramConfigForm.groupId = data.value;
            state.paramConfigForm.groupName = data.label;
        },
        RECORD_DATA(state, data) {
            state.configId = data;
        },

        // SELECT_LIST_SYSTEM(state, groups) {
        //     Vue.set(state, 'selectSystem', groups)
        // },

        // SELECT_LIST_REGION(state, groups) {
        //     Vue.set(state, 'selectRegion', groups)
        // },
        SELECT_LIST_GROUP(state, groups) {
            Vue.set(state, 'selectGroup', groups)
        },
    },
};