import Vue from "vue";
import api from "@/api/index.js";
//权限管理模块
export default {
    namespaced: true,
    state: {
       templateCode:'',
       encoded:'',
       templateText:'',
       systemId:''
    },
    actions: {
        fetchSMStable({ commit, state }, params) {
            return api.request("get", api.getURL("smsTemplate/getList"), {
                page: params.pageNo-1,
                size: params.pageSize,
                sort: null,
                smsTemplateId: null,    //短信模板id   
                encoded: state.encoded,        //短信模板编码
                templateCode: state.templateCode,   // 短信模板ID          
                templateText: state.templateText,    //短信模板内容
                channelId: null,         //短信渠道
                systemId: state.systemId,            //所属系统Id
                systemName: null,        //所属系统名称
                isEnabled: null    //是否启用
            }).then(res =>{
                console.log('fetchSMStable',res);
                if(res && res.data.success){
                    return res.data.data;
                }else{
                    return [];
                }
                
            });
        },
        changeisEnabled({ commit, state }, params) {
            return api .request("post", api.getURL("smsTemplate/status"),params).then(data => {
                return data;
            });
        },
        fetchDelSmsTpl({ commit, state }, id) {
            return api .request("post", api.getURL("smsTemplate/delete"),{id:id}).then(data => {
                return data;
            });
        },
    },
    mutations: {
        CHANGE_SEARCH_PARAMS(state,data){
            state.templateCode = data.templateCode;
            state.encoded = data.encoded;
            state.templateText = data.templateText;
            state.systemId = data.systemId;
        }
        
    },
    //getters: {}
};
    