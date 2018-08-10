import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'

import Login from '@/login.vue' //导入登陆模块
import ManageApp from '@/manageApp.vue' //导入管理平台
import View from '@/manageApp.vue'
import PermissionsManage from '@/views/organizationPages/permissions.vue'
import DepartManage from '@/views/organizationPages/departManage.vue'
import OrgTypeManage from '@/views/organizationPages/orgTypeManage.vue'
import OrgManage from '@/views/organizationPages/orgManage.vue'
import RoleManage from '@/views/organizationPages/roleManage.vue'
import UserManage from '@/views/organizationPages/userManage.vue'
import RegionManage from '@/views/organizationPages/regionManage.vue'
import InterfaceLog from '@/views/logPages/interfaceLog.vue'
import BusinessLog from '@/views/logPages/businessLog.vue'
import SystemLog from '@/views/logPages/systemLog.vue'
import FetchNumber from '@/views/generalServicePages/fetchNumber.vue'
import SmsDiary from '@/views/generalServicePages/smsDiary.vue'
import SmsTplmanage from '@/views/generalServicePages/smsTplmanage.vue'
import ValidateSmsLog from '@/views/generalServicePages/validateSmsLog.vue'
import ParamsConfig from '@/views/systemConfig/paramsConfig.vue'
import DicManage from '@/views/systemConfig/dicManage.vue'
import SysManage from '@/views/systemConfig/sysManage.vue'
import MessageMag from '@/views/messageMager/messageMag.vue'
import HouseManage from '@/views/houseManage/houseManage.vue'
import EnclosuereManage from '@/views/enclosureManage/enclosureManage.vue'  //要件管理
import BusinessManage from '@/views/enclosureManage/businessManage'     //业务管理
import GroupManage from '@/views/enclosureManage/groupManage.vue'   //分组管理
import scriptType from '@/views/script/scriptType.vue'
import scriptVariable from '@/views/script/scriptVariable.vue'
//dome页面 
import Demo from '@/views/Demo/demo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login', //url 路径
      name: 'login',
      component: Login
    },
    {
      path: '/view',
      name: 'view',
      component:View,
      children: [
          {
            path: "permissionsManage",
            name: "permissionsManage",
            component: PermissionsManage,
            meta: { description: "权限管理", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "departManage",
            name: "departManage",
            component: DepartManage,
            meta: { description: "部门管理", requiresAuth: true }
          },
          {
            path: "orgTypeManage",
            name: "orgTypeManage",
            component: OrgTypeManage,
            meta: { description: "机构类型", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "orgManage",
            name: "orgManage",
            component: OrgManage,
            meta: { description: "机构管理", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "userManage",
            name: "userManage",
            component: UserManage,
            meta: { description: "用户管理", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "roleManage",
            name: "roleManage",
            component: RoleManage,
            meta: { description: "角色管理", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "regionManage",
            name: "regionManage",
            component: RegionManage,
            meta: { description: "行政区域", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "businessLog",
            name: "businessLog",
            component: BusinessLog,
            meta: { description: "业务日志", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "interfaceLog",
            name: "interfaceLog",
            component: InterfaceLog,
            meta: { description: "接口日志", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "systemLog",
            name: "systemLog",
            component: SystemLog,
            meta: { description: "系统日志", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "fetchNumber",
            name: "fetchNumber",
            component: FetchNumber,
            meta: { description: "取号配置", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "smsTplmanage",
            name: "smsTplmanage",
            component: SmsTplmanage,
            meta: { description: "短信模板管理", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "smsDiary",
            name: "smsDiary",
            component: SmsDiary,
            meta: { description: "短信日志", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "validateSmsLog",
            name: "validateSmsLog",
            component: ValidateSmsLog,
            meta: { description: "验证码短信日志", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "paramsConfig",
            name: "paramsConfig",
            component: ParamsConfig,
            meta: { description: "参数配置", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "dicManage",
            name: "dicManage",
            component: DicManage,
            meta: { description: "字典管理", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "sysManage",
            name: "sysManage",
            component: SysManage,
            meta: { description: "系统管理", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "MessageMag",
            name: "MessageMag",
            component: MessageMag,
            meta: { description: "消息管理", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "houseManage",
            name: "houseManage",
            component: HouseManage,
            meta: { description: "房源管理", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "enclosuereManage",
            name: "enclosuereManage",
            component: EnclosuereManage,
            meta: { description: "要件管理", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "businessManage",
            name: "businessManage",
            component: BusinessManage,
            meta: { description: "业务管理", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "groupManage",
            name: "groupManage",
            component: GroupManage,
            meta: { description: "分组管理", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "scriptType",
            name: "scriptType",
            component: scriptType,
            meta: { description: "脚本分类", requiresAuth: true } //关于路由的补充说明
          },
          {
            path: "scriptVariable",
            name: "scriptVariable",
            component: scriptVariable,
            meta: { description: "脚本变量", requiresAuth: true } //关于路由的补充说明
          }
      ]
    },
    {
      path: '/view', //url 路径
      name: 'view',
      component: View,
      children:[
          {
            path: "demo",
            name: "demo",
            component: Demo,
            meta: { description: "常用布局", requiresAuth: true } //关于路由的补充说明
          },
      ]

    },
    {
      path: "/view",
      name: 'view',
      component:View,
      children:[
          {
            path: "index",
            name: "index",
            component: Home,
            meta: { description: "首页", requiresAuth: true } //关于路由的补充说明
          },
      ]
    },
  ]
})
