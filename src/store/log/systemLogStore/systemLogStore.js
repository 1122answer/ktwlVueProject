import Vue from "vue";
import api from "@/api/index.js";
//系统日志接口模块
export default {
    namespaced: true,
    state: {
        logTypeMap:[],
        logSelectList:[],
         //表单验证规则
          systemLogForm: {
            systemLogId:'', //系统日志id
            systemId:'',//所属系统id
            systemName: '',//所属系统名称
            type:0,//日志类型 1：提示信息、2：调试信息、3：警告信息、4：错误信息、5：框架层错误信息
            sessionId:'',//会话序号
            userId:'',// 用户序号
            userInfo:'',//用户信息（账号、名字等）
            createTime:'',//创建时间
            url:'',//地址
            message:'',//日志信息
            description:'',//日志描述
            body:'',//日志详情
            startTime:'',//开始时间
            endTime:'',//结束时间
            }
    },
    actions: {
       // 获取列表
        getPageList({ commit, state }, params) {
            if (state.systemLogForm.type==""||state.systemLogForm.type==null) {
                state.systemLogForm.type=0;
            }
             if (state.systemLogForm.systemName==""||state.systemLogForm.systemName==null) {
                state.systemLogForm.systemName=0;
            }
            return api.request("get", api.getURL("log/systemloglist"),{
                 systemId:state.systemLogForm.systemId,
                 userId:state.systemLogForm.userId,
                 sessionId:state.systemLogForm.sessionId,
                 type:state.systemLogForm.type,
                 startTime:state.systemLogForm.startTime,
                 endTime:state.systemLogForm.endTime,

                 page:params.pageNo, //当前页
                 size:params.pageSize
            }).then(res => {
                console.log(res);
                return res.data.data;
            });
        },
        //获取系统日志单条数据
        getSystemLog({ commit, state }, params) {
            return api.request("get", api.getURL("log/getsystemlog"),{
                 id:params,
            }).then(res => {
                    state.systemLogForm.systemLogId=res.data.data.systemLogId;
                    state.systemLogForm.systemName=res.data.data.systemName;
                    let typeItem = state.logTypeMap.find(i=>{
                        return i.value == res.data.data.type ;
                    })
                    state.systemLogForm.type=typeItem.text;
                    state.systemLogForm.sessionId=res.data.data.sessionId;
                    state.systemLogForm.userId=res.data.data.userId;
                    state.systemLogForm.createTime=res.data.data.createTime;
                    state.systemLogForm.url=res.data.data.url;
                    state.systemLogForm.message=res.data.data.message;
                    state.systemLogForm.description=res.data.data.description;
                    state.systemLogForm.body=res.data.data.body;
                return res;
            });
        },
       // 获取日志类型显示
        enumerate({ commit, state }, params) {
            return api.request("get", api.getURL("common/enumerate"), {
                code: 7,
            }).then(res=>{
                state.logTypeMap=[];
                res.data.data.map(item=>{
                    item.label = item.text;
                    state.logTypeMap.push(item);
                })
                return state.logTypeMap;
            })
        },
        //获取所属系统下拉列表
        getSelectList({ commit, state }, params){
            return api.request("get", api.getURL("systemmag/getselectlist"), {
            }).then(res=>{
                state.logSelectList=[];
                res.data.data.map(item=>{
                    item.label = item.text;
                    state.logSelectList.push(item);
                })
                return res;
            })
        },
    },
    mutations: {
       // SYSTEM_LOG_TYPE(state,obj){
       //      Vue.set(state, 'enumerate', obj);
       //  },
        ASSIGN_SEARCH(state,obj){
            state.type = obj.type;
            state.description = obj.description;
            state.userId = obj.userId;
            state.systemName = obj.systemName;
            // state.startDate = obj.startDate;
            // state.endDate = obj.endDate;

           
        },
    },
};