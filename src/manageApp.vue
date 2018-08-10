<template>
    <div id="components-layout-demo-top-side">
        <v-layout>
            <v-header class="bg-primary">
                <div class="logo"><img src="./assets/logo.png" alt="logo"></div>
                <h2 class="title">开拓未来xx平台</h2>
                <ul class="navbar-custom-menu" title="退出" @click="logOutPlatform">
                    <li class="name"> <v-icon type="logout"></v-icon> 退出系统</li>
                </ul>
                <h5 class="welcome">欢迎 <b v-text="currentUser.accountUser"></b> 进入系统</h5>
            </v-header>
            <v-content>
                <v-layout style="background: #fff;">
                    <v-sider :width="240" style="background:#fff;border-right:1px solid #f2f2f2;height:100%;background:#f9f9f9;">
                        <div class="user-infor padding-top-20">
                            <div class="user-icon">
                                <img src="./imges/icon-header.png" alt="占位图">
                                <img :src="currentUser.icon">
                            </div>
                            <div class="user-panel">
                                <p><span class="post" v-text="currentUser.nickName"></span><span class="manager" v-text="currentUser.name"></span></p>
                                <p class="enterprise">
                                    <span>机构名称</span>
                                    <span v-text="currentUser.currentOrgName"></span>
                                </p>
                                <p class="enterprise">
                                    <span>部门名称</span>
                                    <span v-text="currentUser.currentDeptName"></span>
                                </p>
                            </div>
                            <v-row class="margin-top-20 padding-left-20">
                                <v-input-group compact>
                                    <v-input placeholder="请输入菜单名称" :style="{width:'70%'}" v-model="serchKeyWord" ></v-input>
                                    <v-button size="" @click="search(serchKeyWord)">
                                        <v-icon type="search"></v-icon>
                                    </v-button>
                                </v-input-group>
                            </v-row>
                        </div>
                        <div class="" style="border:none;margin-top:10px;height: calc(100% - 140px);width:100%;">
                            <happy-scroll color="#ddd" size="5" resize>
                                <v-menu mode="inline" :data="menuData" style="background:rgb(249,249,249)">
                                    <template slot-scope="{data}">
                                        <i style="font-size:10px;" class="spec-icon-item" v-if="data.icon" :class="'anticon anticon-' + data.icon"></i>
                                        <router-link class="spec-icon-item link-item" :to="data.href" style="display:inline;font-size:12px;font-weight:400;">{{data.name}}</router-link>
                                    </template>
                                    <template slot-scope="{data}" slot="sub">
                                        <i v-if="data.icon" :class="'anticon anticon-' + data.icon"></i>
                                        <span>{{data.name}}</span>
                                    </template>
                                </v-menu>
                            </happy-scroll>
                         </div>
                    </v-sider>
                    <v-content :style="{ padding: '10px 15px',height:'100%',overflow:'auto' }">
                        <router-view></router-view>
                    </v-content>
                </v-layout>
            </v-content>
            <v-footer :style="{ textAlign: 'center' ,padding: '10px'}">
                © 所有版权信息归属开拓未来信息技术有限公司所有 . 2018
            </v-footer>
        </v-layout>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { DataUtil } from "@/util/DataUtil.js";
export default {
    name: "this",
    components: {
        //addPane
    },
    computed: {
        ...mapState({
            currentUser: state => state.globalPermissonModule.currentUser,
            menuData: state => state.globalPermissonModule.menuData
        }),
        fliterMenu:function(){
            var self=this;

              var fliterMenu;
             var childrenArr=[];
             fliterMenu= this.menuData.filter((element,index) => {
               /* var  arr=[];
               arr = JSON.parse(JSON.stringify(element.children)).filter(ele=>{
                   return ele.name.indexOf(self.serchKeyWord) > -1
               })
               if(arr.length>0) childrenArr.push( JSON.parse(JSON.stringify(arr)))  */
               return element.name.indexOf(self.serchKeyWord) > -1
            });
            //fliterMenu=JSON.parse(JSON.stringify(fliterMenu));
             fliterMenu.forEach((element,index) => {
                //element.children=[];
                //element.children=JSON.parse(JSON.stringify(childrenArr[index]))
                //element.expand=true
            });  
           console.log(this.menuData)
            //console.log(childrenArr)
            console.log(fliterMenu) 
 
            return fliterMenu
        }
    },
    mounted() {
        this.$store.commit('globalPermissonModule/INIT_FORM_DATA'); //清空用户和权限数据
        this.$store.dispatch('globalPermissonModule/getMenuPermission'); //请求权限数据
        this.$store.dispatch('globalPermissonModule/getCurrentUser'); //请求当前用户的数据
    },
    data: function() {
        return {
            customCollapsed: false,
            serchKeyWord:'',
           /*  menuData: [{
                    name: "组织架构",
                    icon: "setting",
                    expand: false,
                    children: [{
                            name: "机构类型管理",
                            href: '/view/orgTypeManage'
                        },
                        {
                            name: "机构管理",
                            href: '/view/orgManage'
                        },
                        {
                            name: "部门管理",
                            href: '/view/departManage'
                        },
                        {
                            name: "权限管理",
                            selected: false,
                            href: '/view/permissionsManage'
                        },
                        {
                            name: "角色管理",
                            href: '/view/roleManage'
                        },
                        {
                            name: "用户管理",
                            href: '/view/userManage'
                        },
                        {
                            name: "行政区域",
                            href: '/view/regionManage'
                        }

                    ]
                },
                {
                    name: "日志查询",
                    icon: "book",
                    expand: false,
                    children: [{
                        name: "业务日志",
                        href: '/view/businessLog'
                    }, {
                        name: "接口日志",
                        href: '/view/interfaceLog'
                    }, {
                        name: "系统日志",
                        href: '/view/systemLog'
                    }]
                },
                {
                    name: "通用服务",
                    icon: "star-o",
                    expand: false,
                    children: [{
                        name: "取号配置",
                        href: '/view/fetchNumber'
                    }, {
                        name: "短信模板管理",
                        href: '/view/smsTplmanage'
                    }, {
                        name: "短信日志",
                        href: '/view/smsDiary'
                    }, {
                        name: "验证码短信日志",
                        href: '/view/validateSmsLog'
                    }]
                },
                {
                    name: "系统配置",
                    icon: "tool",
                    expand: false,
                    children: [{
                        name: "参数配置",
                        href: '/view/paramsConfig'
                    }, {
                        name: "字典管理",
                        href: '/view/dicManage'
                    }, {
                        name: "系统管理",
                        href: '/view/sysManage'
                    }]
                },
                {
                    name: "消息管理",
                    icon: "notification",
                    expand: false,
                    children: [{
                        name: "消息管理",
                        href: '/view/MessageMag'
                    }, ]
                },
                {
                    name: "房源管理",
                    expand: false,
                    icon: "home",
                    children: [{
                        name: "房屋信息",
                        href: '/view/houseManage'
                    }, ]
                },
                {
                    name: "要件管理",
                    expand: false,
                    icon: "hdd",
                    children: [{
                        name: "要件信息",
                        href: '/view/enclosuereManage'
                    }, {
                        name: "业务管理",
                        href: '/view/businessManage'
                    },{
                        name: "分组管理",
                        href: '/view/groupManage'
                    }]
                },
                {
                    name: "脚本",
                    expand: false,
                    icon: "api",
                    children: [{
                        name: "脚本分类",
                        href: '/view/scriptType'
                    }, {
                        name: "脚本变量",
                        href: '/view/scriptVariable',
                    }, ]
                },
                {
                    name: "示例demo",
                    expand: false,
                    icon: "setting",
                    children: [{
                        name: "常用布局",
                        href: '/view/demo'
                    }, ]
                }
            ] */
        };
    },
    methods: {
        toggle() {
            this.customCollapsed = !this.customCollapsed;
        },
        logOutPlatform() {
            this.$router.push({ path: '/login' });
        },
        search(word){
            console.log(word)
            console.log(this.menuData)
        },
        fnDeepClone(obj){
            var result = typeof obj.splice === 'function'?[]:{},
            key;
            if (obj && typeof obj === 'object'){
                for (key in obj ){
                    if (obj[key] && typeof obj[key] === 'object'){
                        result[key] = this.fnDeepClone(obj[key]);//如果对象的属性值为object的时候，递归调用deepClone，即再把某个值对象复制一份到新的对象的对应值中
                    }else{
                        result[key] = obj[key];//如果对象的属性值不为object的时候，直接复制参数对象的每一个键/值到新对象对应的键/值中
                    }
                    
                }
                return result;
            }
            return obj;
        }
    }
};
</script>
<style scoped lang='less'>
#components-layout-demo-top-side {
    height: 100%;
    .ant-layout {
        height: 100%;
    }
    .ant-layout-content {
        height: calc(100% - 64px);
        padding-bottom: 38px;
    }
    .logo {
        width: 45px;
        height: 31px;
        font-size: 20px;
        border-radius: 6px;
        margin: 20px 14px 0 0;
        float: left;
        line-height: 31px;
        text-align: center;
    }
    .title {
        width: 200px;
        float: left;
        color: #fff;
    }
    .welcome {
        float: right;
        margin-right: 50px;
        color: #fff;
    }
    .user-icon {
        height: 60px;
        width: 60px;
        border-radius: 30px;
        position: absolute;
        overflow: hidden;
        top: 0;
        margin-left: 20px;
        margin-top: 20px;
    }
    .user-icon img {
        width: 100%;
        height: 100%;
    }
    .user-panel {
        padding-left: 90px;
        padding-top: 8px;
        font-weight: bold;
    }
    .user-panel .post {
        padding-right: 10px;
        padding-left: 20px;
    }
    .user-panel .enterprise {
        position: relative;
        height: 18px;
    }
    .user-panel .enterprise i {
        font-size: 16px;
        position: absolute;
    }
    .user-panel .enterprise span {
        padding-left: 20px;
        display: inline-block;
        width: 140px;
    }
    .navbar-custom-menu {
        height: 50px;
        float: right;
        margin-top: 10px;
        cursor: pointer;
        margin-right: -10px;
    }
    .navbar-custom-menu>.icon {
        height: 30px;
        width: 30px;
        border-radius: 15px;
    }
    .navbar-custom-menu>li {
        float: left;
    }
    .navbar-custom-menu>.icon img {
        height: 30px;
        width: 30px;
        border-radius: 15px;
    }
    .navbar-custom-menu>.name {
        position: relative;
        top: -10px;
        left: 10px;
    }
    .ant-layout-footer {
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    .happy-scroll-strip--vertical{
        z-index: 2;
    }
}
</style>