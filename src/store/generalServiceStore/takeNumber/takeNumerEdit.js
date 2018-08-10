import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
        disablenum:false,
        pagetitle:"新增配置",
        listdetail:false,
        ruleTable:{
            pageNo:0,
            pageSize:0,
            result:[]
        },
        rulesSelect:[],
        newruleForm:{
            type:0,
            fixed:"",
            previousClean:"",
            length:""
        },
        addruleForm:{
            ruleCode:"",
            ruleName:"",
            systemId:'',
            systemName:'',
            regionCode:'',
            regionName:'',
            remark:"",
            isEnabled:true,
            tnRuleId:"",
            regionId:"",
        }
    },
    actions: {
        //添加配置列表
         addList({ commit, state }, param) {
             let newtable = state.ruleTable.result; 
            if (newtable.length>=1) {
                 for (var i = 0; i < newtable.length; i++) {
                    let index = newtable[i];
                    index.sortId=i;
                 };  
             }
             for (var i = 0; i < newtable.length; i++) {
                 for (var j = 0; j < state.rulesSelect.length; j++) {
                     if (newtable[i].type==state.rulesSelect[j].label) {
                           newtable[i].type=state.rulesSelect[j].value 
                     }
                 }
             }
             // console.log(state.addruleForm)
             if (state.addruleForm.systemId=="") {
                state.addruleForm.systemId='';
                state.addruleForm.systemName='';
             }
             if (state.addruleForm.regionCode=="") {
                state.addruleForm.regionCode='';
                state.addruleForm.regionName='';
             }
            return api.request("post", api.getURL("takeNumber/tnRuleAdd"),{
                    tnKeyList:state.ruleTable.result,
                    tnRule:state.addruleForm
               }) 
            },
        //编辑配置列表
         editList({ commit, state }, param) {
             let newtable = state.ruleTable.result; 
            if (newtable.length>=1) {
                 for (var i = 0; i < newtable.length; i++) {
                    let index = newtable[i];
                    index.sortId=i;
                 };  
             }
             for (var i = 0; i < newtable.length; i++) {
                 for (var j = 0; j < state.rulesSelect.length; j++) {
                     if (newtable[i].type==state.rulesSelect[j].label) {
                           newtable[i].type=state.rulesSelect[j].value 
                     }
                 }
             }
             if (state.addruleForm.systemId=="") {
                state.addruleForm.systemId='';
                state.addruleForm.systemName='';
             }
             if (state.addruleForm.regionCode=="") {
                state.addruleForm.regionCode='';
                state.addruleForm.regionName='';
             }
            return api.request("post", api.getURL("takeNumber/tnRuleUpdate"),{
                    tnKeyList:state.ruleTable.result,
                    tnRule:state.addruleForm
               }) 
            },
        // 获取配置列表中一条数据
        getnumberList({ commit, state }, param) {
            state.pagetitle="编辑配置";
            state.disablenum=true;
            return api.request("get", api.getURL("takeNumber/getTnRule"),{
                id:param
            }).then(res=>{
                let index = res.data.data.tnRule
                state.addruleForm.ruleCode=index.ruleCode;
                state.addruleForm.ruleName=index.ruleName;
                state.addruleForm.systemId=index.systemId;
                state.addruleForm.systemName=index.systemName;
                state.addruleForm.regionCode=index.regionCode;
                state.addruleForm.regionName=index.regionName;
                state.addruleForm.remark=index.remark;
                state.addruleForm.isEnabled=index.isEnabled;
                state.addruleForm.tnRuleId=index.tnRuleId;

                let ruletable = res.data.data.tnKeyList
                ruletable.map(res=>{
                    state.ruleTable.result.push(res);
                })
            })
        },
        // 查看配置详情
        showDetailsModal({ commit, state }, param) {
            state.pagetitle="查看配置";
            state.disablenum=true;
            state.listdetail=true;
            return api.request("get", api.getURL("takeNumber/getTnRule"),{
                id:param
            }).then(res=>{
                let index = res.data.data.tnRule
                state.addruleForm.ruleCode=index.ruleCode;
                state.addruleForm.ruleName=index.ruleName;
                state.addruleForm.systemId=index.systemId;
                state.addruleForm.systemName=index.systemName;
                state.addruleForm.regionCode=index.regionCode;
                state.addruleForm.regionName=index.regionName;
                state.addruleForm.remark=index.remark;
                state.addruleForm.isEnabled=index.isEnabled;
                state.addruleForm.tnRuleId=index.tnRuleId;

                let ruletable = res.data.data.tnKeyList
                ruletable.map(res=>{
                    state.ruleTable.result.push(res);
                })
            })
        },
        // 添加获取系统名
        getsysList({ commit, state }, param) {
            state.addruleForm.systemId = param.value;
            state.addruleForm.systemName = param.label;
              
        },
        // 添加中获取行政区域
        getregionList({ commit, state }, param){
           state.addruleForm.regionCode = param.value;
           state.addruleForm.regionName = param.label;
           state.addruleForm.regionId = param.id;
        },
       // 获取规则列表
        takeruleTable({ commit, state }, params) {
            return state.ruleTable
  
        },
        //获取下拉规则
        ruleSelect({ commit, state }, param) {
            return api.request("get", api.getURL("takeNumber/getruleSelect"),{
                code:4,
            }).then(res => {
              let obj = res.data.data.map(item=>{
                    return {
                        label:item.text,
                        value:item.value,
                    }
                });
               commit('SELECT_LIST_NUMRULE', obj)
            });

        },
        // 添加规则列表
        addruleTable({ commit, state }, params) {
            let index = {
                  type:state.newruleForm.type,
                  fixed:state.newruleForm.fixed,
                  previousClean:state.newruleForm.previousClean,
                  length:state.newruleForm.length,
            }
            state.ruleTable.result.push(index)
        },
        // 新规则列表
        newruleTable({ commit, state }, params) {
              state.ruleTable.result=params;
        },
    },
    mutations: {
        // 获取规则编号
         SELECT_LIST_NUMRULE(state, groups) {
            Vue.set(state, 'rulesSelect', groups)
        },
        // 清空添加规则列表
         NEWRULEFORM_CLEAR(state, groups) {
            state.newruleForm.fixed="";
            state.newruleForm.previousClean="";
            state.newruleForm.length="";
        },
        // 初始化添加表单
        CLEAR_ADDFORM(state, data){
            state.disablenum=false;
            state.listdetail=false;
            state.pagetitle="添加配置";
            state.addruleForm.ruleCode="";
            state.addruleForm.ruleName="";
            state.addruleForm.systemId='';
            state.addruleForm.systemName='';
            state.addruleForm.regionCode='';
            state.addruleForm.regionName='';
            state.addruleForm.regionId="";
            state.addruleForm.remark="";
            state.addruleForm.isEnabled=true;
            state.addruleForm.tnRuleId="";
            state.ruleTable.result=[];
        },
    
    },
    //getters: {}
};