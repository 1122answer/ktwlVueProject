import Vue from "vue";
import api from "@/api/index.js";
//取号
export default {
    namespaced: true,
    state: {
        systemId:null,
        ruleCode:null,
        ruleName:null,
        regionCode:null,
        isEnabled:null,
        getnumberForm:{
            tnRuleCode:"",
            num:"",
            regionCode:"",
        },
        number:[],
    },
    actions: {
       // 获取列表
        getTnRuleList({ commit, state }, params) {            
            return api.request("get", api.getURL("takeNumber/getTnRuleList"),{
                 page:params.pageNo-1, //当前页
                 size:params.pageSize,
                 systemId:state.systemId,
                 ruleCode:state.ruleCode,
                 ruleName:state.ruleName,
                 regionCode:state.regionCode,
                 isEnabled:state.isEnabled
            }).then(res => {
                console.log(res)
                return res.data.data;
            });
        },
        delTnRule({commit,state},id){
            return api.request("post",api.getURL("takeNumber/tnRuleDelete"),{
                id:id
            }).then(res=>{
                return res;
            });
        },
        changeEnabled({commit,state},params){
            return api.request("post",api.getURL("takeNumber/tnRuleStatus"),{
                flag:params.isEnabled,
                id:params.tnRuleId
            }).then(res=>{
                return res;
            });
        },
        getdata({commit,state},params){
            state.getnumberForm.tnRuleCode=params.ruleCode;
            state.getnumberForm.regionCode=params.regionCode;
        },
        getnumber({commit,state},params){
            return api.request("get",api.getURL("takeNumber/takeMultiNumber"),state.getnumberForm).then(res=>{
                state.number = res.data.data
                return res;
            });
        },
    },  
    mutations: {
        ASSIGN_SEARCH(state,obj){
           state.systemId=obj.systemId,
           state.ruleCode=obj.ruleCode,
           state.ruleName=obj.ruleName,
           state.regionCode=obj.regionCode
        },
        CLEAR_DATA(state,obj){
            state.number=[];
            state.getnumberForm.tnRuleCode="";
            state.getnumberForm.regionCode="";
            state.getnumberForm.num="";
        },
    
    },
    //getters: {}
};