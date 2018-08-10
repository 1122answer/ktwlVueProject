import Vue from 'vue';
import Vuex from 'vuex';
import api from "@/api/index.js";


import loginModule from './modules/loginStore.js'
//========组织机构========
import orgtypeAddEditStore from './modules/orgtypeStore/orgtypeAddEditStore.js' //机构类型添加
import orgtypeListStore from './modules/orgtypeStore/orgtypeListStore.js' //机构类型列表页
import orgTypeRoleModule from './modules/orgtypeStore/orgTypeRoleStore.js' //机构类型绑定角色
import orgTypeViewModule from './modules/orgtypeStore/orgTypeViewStore.js'//机构类型查看

import orgListModule from './modules/orgStore/orgListStore' //机构列表
import orgAddEditModule from './modules/orgStore/orgAddEditStore' //机构新增和修改
import orgRoleModule from './modules/orgStore/orgRoleStore.js' //机构绑定角色
import orgInfoViewModule from './modules/orgStore/orgInfoViewStore.js' //机构信息查看

import departmentModule from './modules/deptStore/departmentStore' //部门
import bindUserModule from './modules/deptStore/bindUserStore' //部门绑定用户
import deptRoleModule from './modules/deptStore/deptRoleStore.js' //部门绑定角色

import permissionModule from './modules/permissionStore/permissionStore.js' //权限管理数据相关
import CatalogAddModule from './modules/permissionStore/CatalogAdd.js' //权限管理添加一级菜单
import permissionAddModule from './modules/permissionStore/permissionAdd.js' //权限管理添加权限列表
import permissionNewModule from './modules/permissionStore/permissionNew.js' //权限管理添加权限

import roleManageModule from './modules/roleManageStore/roleStore.js' //角色
import rolePermissionModule from './modules/roleManageStore/rolePermissionStore.js' //分配角色

import userListModule from './modules/userManageStore/userListStore.js' //用户列表
import userAddEditModule from './modules/userManageStore/userAddEditSotre.js' //用户新增和修改
import roleModule from './modules/userManageStore/roleStore.js' //用户绑定角色

import reginMenageListModule from './modules/reginManageStore/reginMenageList.js' //行政区域列表



//========日志查询========
import businessLogModule from './log/businessLogStore/businessLogStroe.js' //业务日志列表页
import interfaceLogModule from './log/interfaceLogStore/interfaceLogStore.js' //接口日志列表
import systemLogModule from './log/systemLogStore/systemLogStore.js' //系统日志列表


//========通用服务========
import takeNumberListModule from './generalServiceStore/takeNumber/takeNumerList.js' //取号列表
import takeNumberAddModule from './generalServiceStore/takeNumber/takeNumerEdit.js' //取号列表

//短信记录
import smsLogModule from './generalServiceStore/smsLogStore/smsLogStore.js' //短信记录列表
//验证码短信记录
import vcodeSmsLogModule from './generalServiceStore/vcodeSmsLogStore/vcodeSmsLogStore.js' //验证码短信记录列表
//短信模板
import smsTemplateStoreModule from './generalServiceStore/smsTemplateStore/smsTemplateStore.js' //短信模板列表
import smsTemplateEditModule from './generalServiceStore/smsTemplateStore/smsTemplateEdit.js' //短信模板编辑

//========系统配置========
import SystemMagModule from './system/SystemMagStore/SystemMagList.js' //系统管理列表页
import SystemMagAddEditModule from './system/SystemMagStore/SystemAddEdit.js' //系统管理列表页/sys/system/getlist
import prsListModule from './system/paramsConfigStore/prsListStore.js' //参数配置列表
import prsAddEditModule from './system/paramsConfigStore/paramAddEditView.js' //参数配置编辑
import copyRegionParamsModule from './system/paramsConfigStore/copyRegionParams.js' //参数配置编辑
import copyGroupParamsModule from './system/paramsConfigStore/copyGroupParams.js' //参数配置编辑

//=======字典管理=========
import dicListModule from './system/dictionaryMagStore/dicListStore.js' //参数配置列表
import dicAddModule from './system/dictionaryMagStore/dicAddStore.js' //参数配置列表
//==========消息管理============
import msgMagModule from './message/messageMagStore/messageStore.js'
import msgAddEditModule from './message/messageMagStore/msgAddEditStore.js' //消息新增和修改

//=======要件管理=========
import enclosureListModule from './enclosure/enclosureManageStore/enclosureListStore.js'    //要件列表
import enclosureAddModule from './enclosure/enclosureManageStore/enclosureAddStore.js'    //要件列表
import copyedRegionModule from './enclosure/enclosureManageStore/copyedRegion.js'    //复制区域
import copyedGroupModule from './enclosure/enclosureManageStore/copyedGroup.js'    //复制分组

//=======房屋信息=========
import houseManageModule from './houseManage/houseManageStore.js'
import addHouseModule from './houseManage/addHouseStore.js'
import batchAddHouseModule from './houseManage/batchAddHouseStore.js'
import addBuildModule from './houseManage/addBuildStore.js'
import addEditProjectModule from './houseManage/addEditProjectStore.js'
import setHouseModule from './houseManage/setHouseStore.js'

//=======脚本分类=========
import scriptTypeModule from './scriptType/scriptTypeStore.js'
import scriptTypeAddModule from './scriptType/scriptTypeAddStore.js'

//=======脚本变量=========
import scriptVariableModule from './scriptVariable/scriptVariableStore.js'
import scriptVariableAddModule from './scriptVariable/scriptVariableAddStore.js'

//==========公共组件============

import commonSelect from './common/commonSelect.js' //行政区划下拉树
import globalPermissonModule from './common/globalPermission.js'


Vue.use(Vuex)
// Vuex 可以理解成新的全局变量的实现方式，所有组件共享
//windows.nameNice = 'sklj'
export default new Vuex.Store({
    namespaced: true,
    state: {
        currentUserName: '超级管理员'
    },
    mutations: {
        //改变其状态需要执行的方法  改变数据的操作
        SET_GLOBAL_NAME(state, data) {
            state.nameNice = '改变后的名字'
        },
        CHANGE_LOGIN_NAME(state, loginName) {
            state.currentUserName = loginName;
        },
    },
    actions: {

    },
    modules: {
        loginModule,
        permissionNewModule,
        permissionAddModule,
        CatalogAddModule,
        permissionModule,
        roleManageModule,
        rolePermissionModule,

        orgtypeListStore,
        orgtypeAddEditStore,
        //日志管理
        businessLogModule,
        //系统管理
        SystemMagModule,
        SystemMagAddEditModule,
        //参数配置
        prsListModule,
        prsAddEditModule,
        copyRegionParamsModule,
        copyGroupParamsModule,

        orgTypeRoleModule,
        orgTypeViewModule,
        orgListModule,
        orgAddEditModule,
        orgRoleModule,
        orgInfoViewModule,

        departmentModule,
        bindUserModule,
        deptRoleModule,

        userListModule,
        userAddEditModule,
        roleModule,
        bindUserModule,
        reginMenageListModule,
        takeNumberListModule, //取号模块
        takeNumberAddModule, //取号添加

        //短信记录
        smsLogModule,
        //验证码短信记录
        vcodeSmsLogModule,
        //短信模板
        smsTemplateStoreModule,
        //短信模板编辑
        smsTemplateEditModule,

        reginMenageListModule, //行政区域
        //日志管理
        businessLogModule,
        interfaceLogModule,
        systemLogModule,

        //消息管理
        msgMagModule,
        msgAddEditModule,

        dicListModule,
        dicAddModule,
        //要件管理
        enclosureListModule,
        enclosureAddModule,
        copyedRegionModule,
        copyedGroupModule,
        //房屋信息
        houseManageModule,
        addHouseModule,
        batchAddHouseModule,
        addBuildModule,
        addEditProjectModule,
        setHouseModule,

        //脚本分类
        scriptTypeModule,
        scriptTypeAddModule,
        //脚本变量
        scriptVariableModule,
        scriptVariableAddModule,

        ////////////////公共组件
        commonSelect,
        globalPermissonModule,
    }
})