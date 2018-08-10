import Vue from "vue";
import api from "@/api/index.js";
import {TreeUtil} from '@/util/TreeUtil.js'
//行政区域模块
export default {
    namespaced: true,
    state: {
        //表单验证规则
          regionForm: {
            regionId:'',//行政区域编号
            regionCode: '',//行政区域代码
            regionPcode: '',//上级行政区划代码
            name: '',//行政区域名称
            shortName: '',//简称
            sortId:'',//排序编号
            flag: '',//级别
            externalCode1: '',//外部编码1
            externalCode2: '',//外部编码2
            externalCode3: '',//外部编码3
            isEnabled:'',//是否启用
            },
            tree:[],
    },
    actions: {
        //列表获取
        getList({ commit, state }, params) {
            return api
                .request("get", api.getURL("region/list"), {
                    page: params.pageNo - 1,
                    size: params.pageSize,
                    name: state.name,
                })
                .then(res => {
                    if(res.data.success){
                        return res.data.data;
                    }else{
                        return;
                    }
                });
        },

         //列表树获取
        regiontree({ commit, state }, params) {
            return api.request("get", api.getURL("region/regiontree",{
                    
            })).then(res => {
                    if(res.data.success){
                    var treeRes=[];
                    TreeUtil.build(res.data.data,treeRes);
                    var obj ={};
                    obj.totalCount = res.data.data.length;
                    obj.result = res.data.data;
                        return obj;
                    }else{
                        return;
                    }
                });
        },
        

        //新增行政区域
        addRegion({ commit, state },params) {
            return api
                .request("post", api.getURL("region/add"), state.regionForm)
                .then(res => {
                    return res;
                });
        },
        //修改行政区域
        updateRegion({ commit, state },params) {
            state.regionForm.flag=parseInt(state.regionForm.flag);
            return api
                .request("post", api.getURL("region/edit"), state.regionForm)
                .then(res => {
                    return res;
                });
        },
        //获取一条行政区域信息
        getRegion({ commit, state },params) {
            return api
                .request("get", api.getURL("region/getRegion"),{
                    id:params
                })
                .then(res => {
                    state.regionForm.regionId=res.data.data.regionId;
                    state.regionForm.name=res.data.data.name;
                    state.regionForm.regionCode=res.data.data.regionCode;
                    state.regionForm.regionPcode=res.data.data.regionPcode;
                    state.regionForm.shortName=res.data.data.shortName;
                    state.regionForm.sortId=res.data.data.sortId;
                    state.regionForm.flag=res.data.data.flag.toString();
                    state.regionForm.externalCode1=res.data.data.externalCode1;
                    state.regionForm.externalCode2=res.data.data.externalCode2;
                    state.regionForm.externalCode3=res.data.data.externalCode3;
                    state.regionForm.isEnabled=res.data.data.isEnabled;
                    return res;
                });
        },
        // 删除行政区域
        deleteRegion({ commit, state }, params) {   
            return api.request("post", api.getURL("region/del"), {id:params})
                .then(res => {
                    return res;
                });
        },
        // 设置启用状态
        statusRegion({ commit, state }, params) {
            return api.request("post", api.getURL("region/status"),{
                id:params.id,
                flag:params.isEnabled
            })
                .then(res => {
                    return res;
                });
        },
        // 获取级别显示
        enumerate({ commit, state }, params) {
            return api.request("get", api.getURL("common/enumerate"), {
                code: 6,
            }).then(res => {
             let opt = res.data.data.map(item => {
                    return {
                        label: item.text,
                        value: item.value,
                    };
                });
                commit('REGION_lEVEL', opt)
            })
        },
         // 获取上级行政区划代码
        leveltree({ commit, state }, params) {
            return api.request("get", api.getURL("region/leveltree"), {
                level:params.flag,
            }).then(res => {
             let opt = res.data.data.map(item => {
                    return {
                        label: item.name,
                        value: item.regionCode,
                    };
                });
                commit('REGION_TREE', opt)
             })
        },

    },
    mutations: {
        CLEAR_ADD_FORM(state) {
            state.regionForm ={
                regionId:null,//行政区域编号
                regionCode: null,//行政区域代码
                regionPcode: null,//上级行政区划代码
                name: null,//行政区域名称
                shortName: null,//简称
                sortId:null,//排序编号
                flag: "0",//级别
                externalCode1: null,//外部编码1
                externalCode2: null,//外部编码2
                externalCode3: null,//外部编码3
                isEnabled:false,//是否启用
            };
        },
         ASSIGN_SEARCH(state,obj){
            state.name = obj.name;
            state.shortName=obj.shortName;
            state.regionCode=obj.regionCode;
            state.levelvalue=obj.levelvalue;
            state.valueisOpen=obj.valueisOpen;
        },
        REGION_lEVEL(state,obj){
            Vue.set(state, 'enumerate', obj);
        },
        REGION_TREE(state,obj){
            Vue.set(state, 'tree', obj);
        },
    }
}