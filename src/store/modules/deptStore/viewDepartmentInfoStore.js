import Vue from "vue";
import api from "@/api/index.js";
//部门信息查看
export default {
  namespaced: true,
  state: {
    DepartmentInfoForm: {
      deptId: "",
      parentId: "",
      orgId: "",
      name: "",
      orgName: "",
      remark: "",
      createUserId: "",
      createTime: "",
      modifyUserId: "",
      modifyTime: "",
      enabled: true,
      parentName:""
    },
    isChild:false
  },
  actions: {
    getDeptInfo({ commit, state }, param) {
      return api
        .request("get", api.getURL("department/getDepart"), { deptId: param })
        .then(res => {
          commit("SET_Department_INFO", res.data.data);
          return res;
        });
    }
  },
  mutations: {
    SET_Department_INFO(state, data) {
      state.DepartmentInfoForm.deptId=data.deptId;
      state.DepartmentInfoForm.name=data.name;
      state.DepartmentInfoForm.enabled=data.enabled?'是':'否';
      state.DepartmentInfoForm.remark=data.remark;
      state.DepartmentInfoForm.orgId=data.orgId;
      state.DepartmentInfoForm.orgName=data.orgName;
      if(data.parentId=="0"||data.parentId==0){
        state.isChild=false;
      }else{
        state.isChild=true;
      }
    },
    CLEAR_PARENT_DEPT(){
      state.DepartmentInfoForm.parentId="0";
      state.isChild=false;
    },
    SET_PARENT_VALUE(state,data){
      state.DepartmentInfoForm.parentId=data.parentId;
      state.DepartmentInfoForm.parentName=data.parentName;
    }
  }
};
