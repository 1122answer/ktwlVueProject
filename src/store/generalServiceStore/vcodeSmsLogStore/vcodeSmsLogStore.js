import Vue from "vue";
import api from "@/api/index.js";
//短信日志记录模块
export default {
	namespaced: true,
	state: {
		queryFrom: {//查询表单
			mobile: "",
            displayContent: "",
            vcode:"",
			status: "",
			startCreateTime: "",
			endCreateTime: "",
		},

		detailsForm: {//详情
			smsVcodelogId: "",
			accountId:"",
			mobile: "",
			content:"",
            displayContent: "",
            vcode:"",
            createTime: "",
            timeout:"",
            vtime:"",
			status: "",
			state:"",
			remark: "",
		},
	},
	actions: {
		// 获取短信记录列表
		getPageList({ commit, state }, params) {
			console.log(params)
			return api.request("get", api.getURL('vcodeSmslog/getList'), {
				// currentPage: params.currentPn,
				size: params.pageSize,
				page: params.pageNo - 1,
				mobile: state.queryFrom.mobile,
				displayContent: state.queryFrom.displayContent,
                status: state.queryFrom.status,
                vcode:state.queryFrom.vcode,
				startCreateTime: state.queryFrom.startCreateTime,
			    endCreateTime: state.queryFrom.endCreateTime
			}).then(res => {
				return res.data.data;
			})
		},
		// 查看详情
		getDetails({ commit, state }, params) {
			state.detailsForm.smsVcodelogId=params.smsVcodelogId;
			state.detailsForm.accountId=params.accountId;
			state.detailsForm.mobile=params.mobile;
			state.detailsForm.content=params.content;
            state.detailsForm.displayContent=params.displayContent;
            state.detailsForm.vcode=params.vcode;
            state.detailsForm.timeout=params.timeout;
            state.detailsForm.vtime=params.vtime;
            state.detailsForm.state=params.state == true ? "已验证" : "未验证";
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