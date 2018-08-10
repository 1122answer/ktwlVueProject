import Vue from "vue";
import api from "@/api/index.js";
import qs from 'qs';
//权限管理模块
export default {
    namespaced: true,
    state: {
        departmentForm: {
            enabled: false,
            name: "",
            orgId: "",
            orgName: "",
            parentId: "0",
            remark: "",
            parentName: ""
        },
        isChild: true,
        addFlag: true,
        selectOrg: [],
        searchOrgId: '',
        searchOrgName: '',
        parentIdList: [],
        updataDeptId: ''
    },
    actions: {
        fetchGetData({ commit, state }, ids) {
            return api.request("get", api.getURL("department/getDepart"), {
                deptId: ids
            }).then(res => {
                if (res.data && res.data.success) {
                    state.departmentForm.orgName = res.data.data.orgName;
                    state.departmentForm.parentName = res.data.data.parentName;
                    state.departmentForm.name = res.data.data.name;
                    state.departmentForm.enabled = res.data.data.enabled;
                    state.departmentForm.remark = res.data.data.remark;
                    state.departmentForm.orgId = res.data.data.orgId;
                    state.departmentForm.parentId = res.data.data.parentId;
                    state.updataDeptId = res.data.data.deptId;
                    if (res.data.data.parentId == false) {
                        state.isChild = false;
                    } else {
                        state.isChild = true;
                    }
                }
                return res;
            });
        },
        fetchDepartmentSave({ commit, state }, ids) {
            var data = state.departmentForm;
            data.parentName = null;
            /*console.log('departmentForm_save',data);
            return;*/
            return api.request("post", api.getURL("department/add"), data).then(res => {
                return res;
            });
        },
        fetchDepartDel({ commit, state }, params) {
            return api.request("post", api.getURL("department/del"), { id: params }).then(res => {
                return res;
            });
        },
        fetchDepartEdit({ commit, state }, ids) {
            var data = state.departmentForm;
            data.parentName = null;
            data.deptId = state.updataDeptId;
            /*console.log('fetchDepartEdit',data);
            return;*/
            return api.request("post", api.getURL("department/edit"), data).then(res => {
                return res;
            });
        },
        fetchDepartList({ commit, state }, params) { //部门列表
            var oid = state.searchOrgId;
            if (oid) {
                return api.request("get", api.getURL('department/list'), {
                    page: params.pageNo,
                    size: params.pageSize,
                    orgId: oid
                }).then(res => {
                    if (res) {
                        if (res.data && res.data.success) {
                            
                            return res.data.data;

                        } else {
                            return;
                        }
                    }
                    return res;
                });
            }
        },
        fetchOrgData({ commit, state }, params) {
            return api.request("get", api.getURL('department/orglist'), ).then(res => {
                if (res) {
                    if (res.data.success) {
                        if (res.data.data && res.data.data.length > 0) {
                            state.searchOrgId = res.data.data[0].value;
                            state.searchOrgName = res.data.data[0].text;
                            state.selectOrg = res.data.data;
                        }
                        res.data.data.map(item => {
                            item.label = item.text;
                        });
                        return res.data.data;
                    } else {
                        return;
                    }
                }

            })
        },
        changeisEnabled({ commit, state }, params) {
            return api.request("post", api.getURL("department/status"), params).then(data => {
                return data;
            });
        },
        fetchParentDept({ commit, state }, params) { //请求上级部门
            return api.request("get", api.getURL('department/parentDept'), { orgId: state.searchOrgId }).then(res => {
                if (res) {
                    if (res.data.success) {
                        var deptArr = res.data.data;
                        var rootArr = []; //根节点
                        var leafArr = []; //叶节点
                        var treeArr = []; //树节点
                        deptArr.map((item, index, arr) => {
                            item.title = item.name;
                            item.children = [];
                            if (item.parentId == '0') {
                                rootArr.push(item);
                                treeArr.push(item);
                            } else {
                                leafArr.push(item);
                            }
                        });

                        rootArr.map((vItem, index) => {
                            eachLeaf(vItem.deptId, vItem);
                        });

                        function eachLeaf(paramid, tree) {
                            for (var i = 0; i < leafArr.length; i++) {
                                if (leafArr[i].parentId == paramid) {
                                    var ctree = { deptId: tree.deptId, parentId: tree.deptId, children: [], title: leafArr[i].name, name: leafArr[i].name };
                                    eachLeaf(leafArr[i].deptId, ctree);
                                    tree.children.push(ctree);
                                }
                            }
                        }
                        state.parentIdList = treeArr;

                        treeArr.map(eitem => {
                            if (eitem.children.length == 0) {
                                delete eitem.children;
                            } else {
                                eachSubset(eitem);
                            }
                        });

                        function eachSubset(subItem) {
                            var subson = subItem.children;
                            for (var i = 0; i < subson.length; i++) {
                                if (subson[i].children.length == 0) {
                                    delete subson[i].children;
                                } else {
                                    eachSubset(subson[i]);
                                }
                            }
                        }
                        return res.data.data;
                    } else {
                        return;
                    }
                }

            })
        },
    },
    mutations: {
        CLEAR_FORM(state) {
            state.departmentForm = {
                orgId: '',
                parentId: '0',
                orgName: '',
                enabled: false,
                remark: '',
                parentName: ""
            }
        },
        UPDATE_ORG_VAL(state, obj) {
            state.departmentForm.orgName = obj.orgName;
            state.departmentForm.orgId = obj.orgId;
            state.departmentForm.parentName = obj.parentName;
            state.departmentForm.parentId = obj.parentId;
            state.isChild = obj.childFlag;
        },
        CHANGE_ADD_FLAG(state, data) {
            state.addFlag = data;
            state.isChild = data;
        },
        CHANGE_ORG_ID(state, data) {
            state.searchOrgId = data.orgId;
            state.searchOrgName = data.orgName;
        },
        ADD_STATE_ORG_ID(state) {
            state.departmentForm.orgId = state.searchOrgId;
            state.departmentForm.orgName = state.searchOrgName;
        },
        ADD_STATE_DEPT_ID(state, data) {
            if (data) {
                state.departmentForm.parentId = data.parentId;
                state.departmentForm.parentName = data.parentName;
            } else {
                state.departmentForm.parentId = '0';
                state.departmentForm.parentName = '';
            }

        }
    },
    //getters: {}
};