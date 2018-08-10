import Vue from "vue";
import api from "@/api/index.js";
import { DataUtil } from "@/util/DataUtil.js";

//模块数据
export default {
    namespaced: true,
    state: {
        currentUser: {
            accountUser: '',
            nickName: '',
            realName: '',
            icon: '',
            orgName: '',
            deptName: '',
        },
        menuData: []
    },
    actions: {
        getMenuPermission({ commit, state }, param) {
            return api.request("get", api.getURL("common/menuPermissions")).then(res => {
                if (res) {
                    
                    var mueArr = res.data.data;
                    var oldArr = mueArr || [], //存储原数据
                        rootArr = [], //存储根节点数据
                        leafArr = [], //存储非根数据，用于后期遍历树
                        treeArr = []; //存储将要构建的树

                    //将根数据和非根数据进行归类，并构建树的根节点
                    oldArr.map((item, index, arr) => {
                        item.href = item.url; //TODO
                        item.children = [];
                        if (item.pid == '0') {
                            rootArr.push(item); //归类根节点数据
                            treeArr.push(item); //构建树的根
                        } else {
                            leafArr.push(item); //归类非根节点数据
                        }
                    });
                    //遍历所有根节点，构建树
                    treeArr.map((vItem, index) => {
                        eachLeaf(vItem);
                        //移除空子节点集合
                        /*if (vItem.children.length == 0) {
                            delete vItem.children;
                        }*/
                    });
                    /**
                     * 构建子节点树
                     * @param {*} tree 子节点树
                     */
                    function eachLeaf(tree) {
                        leafArr.map((leafItem, index) => {
                            if (leafItem.pid == tree.id) {
                                var ctree = DataUtil.deepCopy(leafItem);
                                ctree.children = [];
                                eachLeaf(ctree);
                                //移除空子节点集合
                                if (ctree.children.length == 0) {
                                    delete ctree.children;
                                }
                                tree.children.push(ctree);
                            }
                        });
                    }
                    console.log('权限=======', treeArr);
                    commit('SET_MENU_PEIMISSION', treeArr);
                }
                return res;
            });
        },
        getCurrentUser({ commit, state }, param) {
            return api.request("get", api.getURL("common/currentUser")).then(res => {
                if (res) {
                    console.log('getCurrentUser=======', res.data.data);
                    if(!res.data.data.icon){
                        res.data.data.icon = './imges/icon-header.png';
                    }
                    commit('SET_CURRENT_USER', res.data.data);
                }
                return res;
            });
        },
    },
    mutations: {
        INIT_FORM_DATA(state, data) {
            state.menuData = [];
            state.currentUser = {
                accountUser: '',
                nickName: '',
                realName: '',
                icon: '',
                orgName: '',
                deptName: '',
            };
        },
        SET_CURRENT_USER(state, data) {
            Vue.set(state, 'currentUser', data);
        },
        SET_MENU_PEIMISSION(state, data) {
            Vue.set(state, 'menuData', data);
        }/* ,
        SEACRH_MENU(state,data){
            
            state.menuData= state.menuData.filter((item,index)=>{
                return  item.name.indexOf(data) > -1

            })
        } */
    },
    //getters: {}
};