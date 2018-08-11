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
        orginMenuList:[],
        menuData: [],
        renderData:[]

    },
    actions: {
        getMenuPermission({ commit, state }, param) {
            return api.request("get", api.getURL("common/menuPermissions")).then(res => {
                if (res) {
                    
                    var mueArr = res.data.data;
                    commit("SET_ORGINMENULIST",mueArr)
                    commit('SEACRH_MENU',"")
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
        },
        SET_ORGINMENULIST(state, data){
            Vue.set(state, 'orginMenuList', data);
        },
        SEACRH_MENU(state,data){
            
            var mueArr= state.orginMenuList.filter((item,index)=>{
                return  item.pid==0 || (item.pid!=0 && item.name.indexOf(data) > -1)
            })

            
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
            //过滤掉没有子集的根节点
            treeArr=treeArr.filter(item=>{
                return item.children.length>0
            })
            //如果再搜索状态，父节点有子节点的话就展开
            treeArr.forEach(item=>{
                if(data != ""){
                    if(item.children.length>0) {
                       Vue.set( item,"expand",true)
                    }
                }else{
                    Vue.set( item,"expand",false)
                }
            })
            console.log('权限=======', treeArr);
            Vue.set(state, 'menuData', treeArr);
        },
        CLICK_MENU(state, data){
            state.menuData.forEach(item=>{
                if(item.id!=data){
                    item.expand=false
                }
            })
        }
    },
    //getters: {}
};