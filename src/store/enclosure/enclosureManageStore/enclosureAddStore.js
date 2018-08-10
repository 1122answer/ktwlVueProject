import Vue from "vue";
import api from "@/api/index.js";
//模块数据
export default {
    namespaced: true,
    state: {
        watch:false,
    	dialogtitle:"新增要件信息",
    	formdisabled:false,
    	groupSelectlist:[],
        FiletypeSelect:[],
        operateSelect:[],
        newruleForm:{
        	systemId:"",
        	systemName:"",
        	regionCode:"",
        	regionName:"",
        	groupId:"",
        	groupName:"",
        	title:"",
        	cconfigType:"",
        	pageCount:"",
        	cconfigCount:"",
        	operateTypeInter:1,
        	operateTypeNet:2,
        	sortId:"",
        	fileType:0,
        	isEnabled:false,
        	remark:"",
        	cconfigId:"",
        },
    },
    actions: {
        // 获取文件类型列表
        Filetype({ commit, state }, params) {
            return api.request("get", api.getURL("enclosure/fileSel"), {
                selectCode:2
            }).then(res => {
            	console.log(res)
                let opt = res.data.data.map(item => {
                    return {
                        label: item.text,
                        value: item.value,
                    };
                });
                commit('SELECT_FILE_SELECT', opt)
            });
        },
        // 获取操作权限列表
        operateSelect({ commit, state }, params) {
            return api.request("get", api.getURL("enclosure/fileSel"), {
                selectCode:1
            }).then(res => {
                let opt = res.data.data.map(item => {
                    return {
                        label: item.text,
                        value: item.value,
                    };
                });
                commit('SELECT_OPERATE', opt)
            });
        },
        // 获取分组下拉
        groupSelect({ commit, state }, params) {
            return api.request("get", api.getURL("enclosure/group")).then(res => {
                let opt = res.data.data.map(item => {
                    return {
                        label: item.value1,
                        value: item.dictionaryKey,
                    };
                });
                commit('SELECT_GROUPS', opt)
            });
        },
        // 添加列表
        addlist({ commit, state }, params){
        	 return api.request("post", api.getURL("enclosure/add"),state.newruleForm).then(res=>{
					return res
        	 })
        },
        // 编辑列表
        editlist({ commit, state }, params){
        	console.log(state.newruleForm)
        	 return api.request("post", api.getURL("enclosure/edit"),state.newruleForm).then(res=>{
        	 	return res
        	 })
        },
        // 删除列表
        dellist({ commit, state }, params){
        	 return api.request("post", api.getURL("enclosure/del"),{
        	 	id:params
        	 }).then(res=>{
        	 	  return res
        	 })
        },

    },
    mutations: {
        SELECT_FILE_SELECT(state,data){
          Vue.set(state, 'FiletypeSelect',data)
        },
        SELECT_OPERATE(state,data){
          Vue.set(state, 'operateSelect', data)
        },
        SELECT_GROUPS(state,data){
          Vue.set(state, 'groupSelectlist', data)
        },
        ADDSYSTEMID(state,params){
        	if (params==undefined) {
        		state.newruleForm.systemId="";
        		state.newruleForm.systemName="";
        	}else{
        		state.newruleForm.systemId=params.value;
        		state.newruleForm.systemName=params.label;
        	}
        },
        ADDGETREGION(state,params){
        	if (params==undefined) {
        		state.newruleForm.regionCode="";
        		state.newruleForm.regionName="";
        	}else{
        		state.newruleForm.regionCode=params.value;
        		state.newruleForm.regionName=params.label;
        	}
        },
        ADDGROUP(state,params){
        	if (params==undefined) {
        		state.newruleForm.groupId="";
        		state.newruleForm.groupName="";
        	}else{
        		state.newruleForm.groupId=params.value;
        		state.newruleForm.groupName=params.label;
        	}
        },
        CLEAR_ADDFORM(state,params){
            state.formdisabled=false;
            state.watch=false;
        	state.dialogtitle="新增要件类型";
        	state.newruleForm.systemId="";
        	state.newruleForm.systemName="";
        	state.newruleForm.regionCode="";
        	state.newruleForm.regionName="";
        	state.newruleForm.groupId="";
        	state.newruleForm.groupName="";
        	state.newruleForm.title="";
        	state.newruleForm.cconfigType="";
        	state.newruleForm.cconfigCount=1;
        	state.newruleForm.pageCount=1;
        	state.newruleForm.operateTypeInter=1;
        	state.newruleForm.operateTypeNet=1;
        	state.newruleForm.sortId="";
        	state.newruleForm.fileType=0;
        	state.newruleForm.isEnabled=true;
        	state.newruleForm.remark="";
        	state.newruleForm.cconfigId="";

        },
        EDITFORM(state,params){
        	state.dialogtitle="修改要件类型";
            state.formdisabled=false;
            state.watch=false;
        	state.newruleForm.systemId=params.systemId;
        	state.newruleForm.systemName=params.systemName;
        	state.newruleForm.regionCode=params.regionCode;
        	state.newruleForm.regionName=params.regionName;
        	state.newruleForm.groupId=params.groupId;
        	state.newruleForm.groupName=params.groupName;
        	state.newruleForm.title=params.title;
        	state.newruleForm.cconfigType=params.cconfigType;
        	state.newruleForm.cconfigCount=params.cconfigCount;
        	state.newruleForm.pageCount=params.pageCount;
        	state.newruleForm.operateTypeInter=params.operateTypeInter;
        	state.newruleForm.operateTypeNet=params.operateTypeNet;
        	state.newruleForm.sortId=params.sortId;
        	state.newruleForm.fileType=params.fileType;
        	state.newruleForm.isEnabled=params.isEnabled;
        	state.newruleForm.cconfigId=params.cconfigId;
        	state.newruleForm.remark=params.remark;
        },
        DETAILFORM(state,params){
        	state.dialogtitle="查看要件类型";
            state.formdisabled=true;
        	state.watch=true;
        	state.newruleForm.systemId=params.systemId;
        	state.newruleForm.systemName=params.systemName;
        	state.newruleForm.regionCode=params.regionCode;
        	state.newruleForm.regionName=params.regionName;
        	state.newruleForm.groupId=params.groupId;
        	state.newruleForm.groupName=params.groupName;
        	state.newruleForm.title=params.title;
        	state.newruleForm.cconfigType=params.cconfigType;
        	state.newruleForm.cconfigCount=params.cconfigCount;
        	state.newruleForm.pageCount=params.pageCount;
        	state.newruleForm.operateTypeInter=params.operateTypeInter;
        	state.newruleForm.operateTypeNet=params.operateTypeNet;
        	state.newruleForm.sortId=params.sortId;
        	state.newruleForm.fileType=params.fileType;
        	state.newruleForm.isEnabled=params.isEnabled;
        	state.newruleForm.cconfigId=params.cconfigId;
        	state.newruleForm.remark=params.remark;
        },
    },
    //getters: {}
};
    