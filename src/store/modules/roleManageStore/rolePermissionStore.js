import Vue from "vue";
import api from "@/api/index.js";
import qs from 'qs';
export default {
    namespaced: true,
    state: {
        treeData: [],
        roleId: '',
        permissionId: '',
        getRoleArr: []
    },
    actions: {
        //展示权限关系
        getRoleList({ commit, state }, params) {
            return api.request("get", api.getURL("permission/getpermissiontree"), { sysId: null }).then(res => {
                if (res && res.data.success) {
                    var deptArr = res.data.data || [];
                    var rootArr = []; //根节点
                    var leafArr = []; //叶节点
                    var treeArr = []; //树节点
                    deptArr.map((item, index, arr) => {
                        item.title = item.name;
                        item.children = [];
                        if (item.pid == '0') {
                            rootArr.push(item);
                            treeArr.push(item);
                        } else {
                            leafArr.push(item);
                        }
                    });
                    rootArr.map((vItem, index) => {
                        eachLeaf(vItem.id, vItem);
                    });

                    function eachLeaf(paramid, tree) {
                        for (var i = 0; i < leafArr.length; i++) {
                            if (leafArr[i].pid == paramid) {
                                var ctree = {
                                    id: leafArr[i].id,
                                    pid: leafArr[i].pid,
                                    children: [],
                                    title: leafArr[i].name,
                                    name: leafArr[i].name,
                                    systemId: leafArr[i].systemId,
                                    systemName: leafArr[i].systemName,
                                    permissionId: leafArr[i].permissionId,
                                    actionId: leafArr[i].actionId,
                                };
                                eachLeaf(leafArr[i].id, ctree);
                                if (ctree.actionId) { //只做了action  
                                    var getRoleArray = state.getRoleArr;
                                    if (getRoleArray && getRoleArray.length > 0) {
                                        for (var j = 0; j < getRoleArray.length; j++) {
                                            if (getRoleArray[j].allowActions) {
                                                if (/,/im.test(getRoleArray[j].allowActions)) {
                                                    var allowActArr = [];
                                                    allowActArr = getRoleArray[j].allowActions.split(',');
                                                    for (var k = 0; k < allowActArr.length; k++) {
                                                        if (ctree.id == allowActArr[k]) {
                                                            ctree.checked = true;
                                                        }
                                                    }
                                                } else {
                                                    if (ctree.id == getRoleArray[j].allowActions) {
                                                        ctree.checked = true;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                tree.children.push(ctree);
                            }
                        }
                    }
                    state.treeData = treeArr;
                    //console.log("treeArr================", treeArr);
                    treeArr.map(eitem => {
                        if (eitem.children.length == 0) {
                            state.getRoleArr.forEach(cvlue => {
                                if (cvlue.permissionId == eitem.permissionId) {
                                    eitem.checked = true;
                                }
                            });
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
                }
            });
        },
        //设置角色权限关系
        saveRolePermission({ commit, state }, params) {
            return api.request("post", api.getURL("rolepermission/save"), params).then(res => {
                return res;
            });
        },
        fetchGetRolePermission({ commit, state }, id) {
            return api.request("get", api.getURL("rolepermission/getRolePermission"), {
                roleId: id
            }).then(res => {
                if (res && res.data.success) {
                    state.getRoleArr = [];
                    state.getRoleArr = res.data.data;
                }
                //console.log('fetchGetRolePermission', res);
                return res;
            });
        },
    },
    mutations: {
        SELECT_LIST_REGION(state, groups) {
            // console.log(groups)
            Vue.set(state, 'treeData', groups)
        },
        CHANGE_ROLEID(state, data) {
            state.roleId = data;
        }
    },
    // getters: {}
};