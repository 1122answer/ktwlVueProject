import Vue from "vue";
import api from "@/api/index.js";
//模块数据
export default {
    namespaced: true,
    state: {
        projectForm: {
            areaCovered: 0, //占地面积 
            comprisingArea: 0, //套内面积 ,
            constructionArea: 0, //建筑面积 ,
            constructorName: '', //施工单位名称 ,
            developer: '', //开发商 ,
            greeningRate: 0, //绿化率 ,
            houseCount: 0, //套数 ,
            location: '', //坐落 ,
            locationSource: 0, //项目坐落来源 ,
            projectDesc: '', //项目简介 ,
            projectTitle: '', //项目标题 ,
            projectType: '', //项目类型 ,
            recordDate: '', //报告日期
            regionCode: '', //行政区划编码 ,
            regionName: '', //行政区划名称 ,
            road: '', //道路 ,
            roadno: '', //号 ,
            roadnoExt: '', //附号 ,
        }
    },
    actions: {
        projectSaveData({ commit, state }, param) {
            return api.request("get", api.getURL("mpproject/add"), state.projectForm).then(res => {
                return res;
            });
        },
        fetchTable({ commit, state }, params) {
            return api.request("get", api.getURL("houseLayout/list"), {
                page: params.pageNo - 1,
                size: params.pageSize,
            }).then(res => {
                if (res && res.data && res.data.success) {
                    return res.data.data;
                } else {
                    return [];
                }
            });
        },
    },
    mutations: {
        INIT_FORM_DATA(state, data) {

        }
    },
    //getters: {}
};