import Vue from "vue";
import api from "@/api/index.js";
//短信日志记录模块
export default {
	namespaced: true,
	state: {
		queryFrom: {//查询表单
			smsLogId: "",
			mobile: "",
			displayContent: "",
			status: "",
			startTime: "",
			endTime: "",
		},

		detailsForm: {//详情
			smsLogId: "",
			accountId:"",
			mobile: "",
			content:"",
			displayContent: "",
			status: "",
			createTime: "",
			remark: "",
		},
	},
	actions: {
		// 获取短信记录列表
		getPageList({ commit, state }, params) {
			console.log(params)
			return api.request("get", api.getURL('smsLog/getList'), {
				// currentPage: params.currentPn,
				size: params.pageSize,
				page: params.pageNo - 1,
				smsLogId:state.queryFrom.smsLogId,
				mobile: state.queryFrom.mobile,
				displayContent: state.queryFrom.displayContent,
				status: state.queryFrom.status,
				startTime: state.queryFrom.startTime,
			    endTime: state.queryFrom.endTime
			}).then(res => {
				return res.data.data;
			})
		},
		// 查看详情
		getDetails({ commit, state }, params) {
			state.detailsForm.smsLogId=params.smsLogId;
			state.detailsForm.accountId=params.accountId;
			state.detailsForm.mobile=params.mobile;
			state.detailsForm.content=params.content;
			state.detailsForm.displayContent=params.displayContent;
			state.detailsForm.status=params.status == true ? "发送成功" : "发送失败";
			state.detailsForm.createTime=params.createTime;
			state.detailsForm.remark=params.remark;
		},

	},
	mutations: {
		ASSIGN_SEARCH(state,obj){
            state.queryFrom = obj
		}
	},
	//getters: {}
};

