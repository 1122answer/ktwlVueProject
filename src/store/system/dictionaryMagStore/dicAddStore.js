import Vue from "vue";
import api from "@/api/index.js";
import { TreeUtil } from "@/util/TreeUtil.js";
//模块数据
export default {
    namespaced: true,
    state: {
        listdetail:false,
        disablenum:false,
        pagetitle:"编辑字典",
        treeDicKeys: [],
        treeDicAllDatas:[],
        newdicForm:{
            dictionaryKey:"",
            value1:"",
            value2:"",
            value3:"",
            isEnabled:true,
            modifyType:2,
            remark:"",
            sortId:"",
            dictionaryName:"",
            dictionaryCode:"",
            systemId:"",
            systemName:"",
            regionCode:"",
            regionName:"",
            remark:"重要数据，不要删除，不要关闭启用！",
            dictType:0,
            dictionaryId:"",
            treeDicDatas:[],
        },
        dicTable:{
            pageNo:0,
            pageSize:0,
            result:[]
        },
        adddicForm:{
            dictionaryName:"",
            dictionaryCode:"",
            systemId:"",
            systemName:"",
            regionCode:"",
            regionName:"",
            remark:"",
            dictType:0,
        },
        dictionaryId:"",
        desRegion: {
            regionCode:"",
            regionName:"", 
        },
    },
    actions: {
         addList({ commit, state }, param) {
            let newtable = state.dicTable.result;
            if (state.adddicForm.systemId == '' || state.adddicForm.systemId == null) {
                state.adddicForm.systemId = '';
                state.adddicForm.systemName = '';
            }
            if (state.adddicForm.regionCode == '' || state.adddicForm.regionCode == null) {
                state.adddicForm.regionCode = '';
                state.adddicForm.regionName = '';
            }
            if (newtable.length>=1) {
                 for (var i = 0; i < newtable.length; i++) {
                    let index = newtable[i];
                    index.sortId=i;
                    index.dictionaryName = state.adddicForm.dictionaryName;
                    index.dictionaryCode = state.adddicForm.dictionaryCode;
                    index.systemId = state.adddicForm.systemId;
                    index.systemName = state.adddicForm.systemName;
                    index.regionCode = state.adddicForm.regionCode;
                    index.regionName = state.adddicForm.regionName;
                    index.dictType = state.adddicForm.dictType;
                 };  

             }
            return api.request("post", api.getURL("dictionarymag/addlist"), newtable).then(res => {
                return res;
            });
         },
         fetchDicKeys({ commit, state }, params) {
            return api.request("get", api.getURL('dictionarymag/group'), {
               systemId: state.newdicForm.systemId,
               dictionaryCode: state.newdicForm.dictionaryCode,
               regionCode: state.newdicForm.regionCode
            }).then(res => {
                if (res && res.data.success) {
                    var subtoal = res.data.data || [];
                    state.treeDicKeys = [];
                    state.newdicForm.treeDicDatas = [];
                    state.treeDicAllDatas = [];
                    subtoal.map(item => {
                            var sigle = {};
                            sigle.label = item.dictionaryKey;
                            sigle.value = item.dictionaryKey;
                            state.treeDicKeys.push(sigle);
                            state.newdicForm.treeDicDatas.push(item.dictionaryKey);
                            state.treeDicAllDatas.push(item.dictionaryKey);
                    });
                    return subtoal;
                }
            });
        },
         addsingle({ commit, state }, param) {
            state.newdicForm.dictionaryId = null;
            return api.request("post", api.getURL("dictionarymag/add"),
                    state.newdicForm
               ).then(res => {
                  return res;
               });
         },
          editList({ commit, state }, param) {
            return api.request("post", api.getURL("dictionarymag/edit"),
                    state.newdicForm
               ).then(res => {
                  return res;
               });
          },
          getnumberList({ commit, state }, param) {
            state.pagetitle="编辑字典";
            state.disablenum=true;
            state.listdetail = false;
            return api.request("get", api.getURL("dictionarymag/getParam"),{
                id:param
            }).then(res=>{
                if (res.data.success) {
                state.newdicForm.dictionaryKey=res.data.data.dictionaryKey;
                state.newdicForm.value1=res.data.data.value1;
                state.newdicForm.value2=res.data.data.value2;
                state.newdicForm.value3=res.data.data.value3;
                state.newdicForm.isEnabled=res.data.data.isEnabled;
                state.newdicForm.modifyType=res.data.data.modifyType;
                state.newdicForm.remark=res.data.data.remark;
                state.newdicForm.sortId=res.data.data.sortId;
                state.newdicForm.dictionaryName=res.data.data.dictionaryName;
                state.newdicForm.dictionaryCode=res.data.data.dictionaryCode;
                state.newdicForm.systemId=res.data.data.systemId;
                state.newdicForm.systemName=res.data.data.systemName;
                state.newdicForm.regionCode=res.data.data.regionCode;
                state.newdicForm.regionName=res.data.data.regionName;
                state.newdicForm.remark=res.data.data.remark;
                state.newdicForm.dictType=res.data.data.dictType;
                state.newdicForm.dictionaryId=res.data.data.dictionaryId;  
                }
                return res;
            })
        },
        copyGroup({ commit, state }, param) {
            return api.request("post", api.getURL("dictionarymag/getRegionData"),{
                desRegionCode:state.desRegion.regionCode,
                desRegionName:state.desRegion.regionName,
                dictionaryCode:state.newdicForm.dictionaryCode,
                srcRegionCode:state.newdicForm.regionCode,
                srcSystemId:state.newdicForm.systemId,
                dictionaryKeys:state.newdicForm.treeDicDatas,
            }).then(res=>{
                if (res.data.success) {
                    console.log(res);
                }
                return res;
            })
        },
        copynumberList({ commit, state }, param) {
            state.pagetitle="复制字典";
            state.disablenum=false;
            state.listdetail = false;
            return api.request("get", api.getURL("dictionarymag/getParam"),{
                id:param
            }).then(res=>{
                if (res.data.success) {
                state.newdicForm.dictionaryKey=res.data.data.dictionaryKey;
                state.newdicForm.value1=res.data.data.value1;
                state.newdicForm.value2=res.data.data.value2;
                state.newdicForm.value3=res.data.data.value3;
                state.newdicForm.isEnabled=res.data.data.isEnabled;
                state.newdicForm.modifyType=res.data.data.modifyType;
                state.newdicForm.remark=res.data.data.remark;
                state.newdicForm.sortId=res.data.data.sortId;
                state.newdicForm.dictionaryName=res.data.data.dictionaryName;
                state.newdicForm.dictionaryCode=res.data.data.dictionaryCode;
                state.newdicForm.systemId=res.data.data.systemId;
                state.newdicForm.systemName=res.data.data.systemName;
                state.newdicForm.regionCode=res.data.data.regionCode;
                state.newdicForm.regionName=res.data.data.regionName;
                state.newdicForm.remark=res.data.data.remark;
                state.newdicForm.dictType=res.data.data.dictType;
                state.newdicForm.dictionaryId=res.data.data.dictionaryId;  
                }
                return res;
            })
        },
        showDetailsModal({ commit, state }, param) {
            state.pagetitle="查看字典";
            state.disablenum=true;
            state.listdetail=true;
            return api.request("get", api.getURL("dictionarymag/getParam"),{
                id:param
            }).then(res=>{
                if (res.data.success) {
                state.newdicForm.dictionaryKey=res.data.data.dictionaryKey;
                state.newdicForm.value1=res.data.data.value1;
                state.newdicForm.value2=res.data.data.value2;
                state.newdicForm.value3=res.data.data.value3;
                state.newdicForm.isEnabled=res.data.data.isEnabled;
                state.newdicForm.modifyType=res.data.data.modifyType;
                state.newdicForm.remark=res.data.data.remark;
                state.newdicForm.sortId=res.data.data.sortId;
                state.newdicForm.dictionaryName=res.data.data.dictionaryName;
                state.newdicForm.dictionaryCode=res.data.data.dictionaryCode;
                state.newdicForm.systemId=res.data.data.systemId;
                state.newdicForm.systemName=res.data.data.systemName;
                state.newdicForm.regionCode=res.data.data.regionCode;
                state.newdicForm.regionName=res.data.data.regionName;
                state.newdicForm.remark=res.data.data.remark;
                state.newdicForm.dictType=res.data.data.dictType;
                state.newdicForm.dictionaryId=res.data.data.dictionaryId;  
                }
                return res;
            })
        },
        newdicTable({ commit, state }, params) {
              state.dicTable.result=params;
        },
       // 添加规则列表
        adddicTable({ commit, state }, params) {
            let index = {
                  dictionaryKey:state.newdicForm.dictionaryKey,
                  value1:state.newdicForm.value1,
                  value2:state.newdicForm.value2,
                  value3:state.newdicForm.value3,
                  isEnabled:state.newdicForm.isEnabled,
                  modifyType:state.newdicForm.modifyType,
                  remark:state.newdicForm.remark,
            }
            state.dicTable.result.push(index);
        },
        takedicTable({ commit, state }, params) {
            return state.dicTable;
        },
        // 添加获取系统名
        getsysList({ commit, state }, param) {
              state.adddicForm.systemId = param.value;
              state.adddicForm.systemName = param.label;
        },
        // 添加中获取行政区域
        getregionList({ commit, state }, param){
           state.adddicForm.regionCode = param.value;
           state.adddicForm.regionName = param.label;
        },
        getDesRegionList({ commit, state }, param){
           state.desRegion.regionCode = param.value;
           state.desRegion.regionName = param.label;
        },
    },
    mutations: {
        NEWDICFORM_CLEAR(state, groups) {
            state.newdicForm.dictionaryKey="";
            state.newdicForm.value1="";
            state.newdicForm.value2="";
            state.newdicForm.value3="";
            state.newdicForm.isEnabled=true;
            state.newdicForm.modifyType=2;
            state.newdicForm.remark="重要数据，不要删除，不要关闭启用！";
            state.newdicForm.treeDicDatas = [];
        },
        CLEAR_ADDFORM(state, data) {
            state.adddicForm.dictionaryName = "";
            state.adddicForm.dictionaryCode = "";
            state.adddicForm.systemId = "";
            state.adddicForm.systemName = "";
            state.adddicForm.regionCode = "";
            state.adddicForm.regionName = "";
            state.adddicForm.remark = "";
            state.adddicForm.dictType = 0;

            state.newdicForm.dictionaryKey = "";
            state.newdicForm.value1 = "";
            state.newdicForm.value2 = "";
            state.newdicForm.value3 = "";
            state.newdicForm.isEnabled = true;
            state.newdicForm.modifyType = 2;
            state.newdicForm.remark = "";
            state.newdicForm.sortId = "";
            state.newdicForm.dictionaryName = "";
            state.newdicForm.dictionaryCode = "";
            state.newdicForm.systemId = "";
            state.newdicForm.systemName = "";
            state.newdicForm.regionCode = "";
            state.newdicForm.regionName = "";
            state.newdicForm.remark = "重要数据，不要删除，不要关闭启用！";
            state.newdicForm.dictType = 0;
            state.newdicForm.treeDicDatas = [];
         
            state.dicTable.result = [];
            state.dicTable.pageSize = 0;
            state.dicTable.pageNo = 0;
        },
        CLICK_ROW_DATA(state, data) {
            state.newdicForm.dictionaryKey = data.dictionaryKey;
            state.newdicForm.value1 = data.value1;
            state.newdicForm.value2 = data.value2;
            state.newdicForm.value3 = data.value3;
            state.newdicForm.isEnabled = data.isEnabled;
            state.newdicForm.modifyType = data.modifyType;
            state.newdicForm.remark = data.remark;
            state.newdicForm.sortId = data.sortId;
            state.newdicForm.dictionaryName = data.dictionaryName;
            state.newdicForm.dictionaryCode = data.dictionaryCode;
            state.newdicForm.systemId = data.systemId;
            state.newdicForm.systemName = data.systemName;
            state.newdicForm.regionCode = data.regionCode;
            state.newdicForm.regionName = data.regionName;
            state.newdicForm.remark = data.remark;
            state.newdicForm.dictType = data.dictType;
            state.newdicForm.dictionaryId = data.dictionaryId;
        },
        CLEAR_COPY_GROUP(state, data) {
            state.desRegion.regionCode = "";
            state.desRegion.regionName = "";
        },
        DICTIONARYID(state, data) {
            state.dictionaryId = data;
        },
        CLEAR_TREE_DICKEY(state, data) {
            state.treeDicKeys = [];
        },
        UPDATE_TREEDIC_DATA(state, data) {
            state.newdicForm.treeDicDatas = [];
            for (let i = 0; i < data.length; i++) {
               state.newdicForm.treeDicDatas.push(data[i])
            }
        }
    },
    //getters: {}
};
    