<template>
    <div id="permissionsManage">
        <!-- 添加权限与菜单弹窗 -->
        <preAdd :visible="visible" @ok="handleOk" @cancel="handleCancel"></preAdd>
        <!-- 添加目录弹窗 -->
        <Catalog :visible="catalogAlert" @ok="catalogOk" @cancel="catalogCancel"> </Catalog>
        <permissionDetails :visible="details" @ok="detailsOk" @hide="detailsCancel"></permissionDetails>
        <v-row class="padding-bottom-10">
            <v-col span="12">
                <h1 @click="demoClick">权限管理</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '38px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>组织机构</v-breadcrumb-item>
                    <v-breadcrumb-item>权限管理</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border padding-10">
            <div class="clearfix padding-bottom-5">
                <div class="list-org-box" v-show='listFlag'>
                    <v-row :gutter="16">
                        <v-col span="4">
                            <v-select search :style="{width:'100%'}" size="lg"></v-select>
                        </v-col>
                        <v-col span="6">
                            <v-input-group compact>
                                <v-input v-model="words" placeholder="请输入权限名称" size="large" :style="{width:'64%'}"></v-input>
                                <v-button @click="search" type="primary" size="large">
                                    <v-icon type="search"></v-icon> 查询
                                </v-button>
                            </v-input-group>
                        </v-col>
                        <v-col span="10" class="pull-right text-right">
                            <v-button type="primary" @click="addCatalogDiag" class="margin-right-5">
                                <v-icon type="folder-add"></v-icon> 添加目录</v-button>
                            <v-button type="primary" @click="addListDiag" class="margin-right-5">
                                <v-icon type="plus"></v-icon>添加权限模块</v-button>
                        </v-col>
                    </v-row>
                    <v-data-table ref="PerTable" size="small" :data='loadData' :responseParamsName="responseParamsName" :columns='columns' class="margin-top-15" bordered :treeOption='treeOption' tree-table :pagination="false" emptyText="暂时找不到你要的信息......">
                        <template slot="td" slot-scope="props">
                            <div v-if="props.column.field=='operation'" class="text-center">
                                <v-button-group v-if="props.item.flag=='1'">
                                    <v-button type="primary" title="查看详情" @click="showDetails(props.item)">
                                        <v-icon type="file-text"></v-icon>
                                    </v-button>
                                    <v-button type="primary" title="新增目录" @click="CatalogItemDiag(props.item)">
                                        <v-icon type="folder-add"></v-icon>
                                    </v-button>
                                    <v-button type="primary" title="新增权限" @click="addItemDiag(props.item)">
                                        <v-icon type="plus"></v-icon>
                                    </v-button>
                                    <v-button type="primary" title="编辑" @click="editCatalog(props.item)">
                                        <v-icon type="edit"></v-icon>
                                    </v-button>
                                    <v-button type="error" title="删除" @click="deletelist(props.item)">
                                        <v-icon type="delete"></v-icon>
                                    </v-button>
                                </v-button-group>
                                <v-button-group v-if="props.item.flag!='1'">
                                    <v-button type="primary" title="编辑" @click="editoperssion(props.item)">
                                        <v-icon type="edit"></v-icon>
                                    </v-button>
                                    <v-button type="error" title="删除" @click="deletelist(props.item)">
                                        <v-icon type="delete"></v-icon>
                                    </v-button>
                                </v-button-group>
                            </div>
                            <div v-else-if="props.column.field === 'enabled'" class="text-center">
                                <v-switch v-model="props.content" @change="changeEnabled(props.content,props.item)">
                                    <span slot="checkedChildren">开</span>
                                    <span slot="unCheckedChildren">关</span>
                                </v-switch>
                            </div>
                            <span v-else v-html="props.content"></span>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
import preAdd from "./permissionWidget/permissionAdd";
import Catalog from "./permissionWidget/CatalogAdd";
import permissionDetails from "./permissionWidget/permissionDetails";

import api from "@/api/index.js";

export default {
    components: {
        preAdd,
        Catalog,
        permissionDetails,
    },
    computed: {
        // ...mapState({
        // }),
    },
    data: () => ({
        switch: null,
        catalogAlert: false,
        details: false,
        words: '',
        name: "permissionsManage",
        visible: false,
        listFlag: true,
        changeModel: false,
        responseParamsName: {
            total: 'totalCount',
            results: 'result'
        },
        loadData(params) {
            return this.$store.dispatch('permissionModule/fetchPermissionList', {
                pageNo: params.pageNo,
                pageSize: params.pageSize
            }).then(res => {
                res.result.map(item => {
                    if (item.parentId == '0') {
                        item.pid = 0;
                        item.isparent = true;
                    } else {
                        item.pid = item.parentId
                    }
                    item.departFlag = false;
                    item.orgFlag = true;
                });
                console.log('fetchDepartList', res);
                return res;
            })
        },
        columns: [
            { title: "权限名称", field: "name" },
            { title: "所属系统名称", field: "systemName" },
            { title: "后端所属模块代码", field: "moduleId" },
            { title: "图标", field: "icon" },
            { title: "地址", field: "url" },
            { title: "备注", field: "remark" },
            { title: "是否启用", field: "enabled", className: "text-center", width: "90px" },
            { title: "操作", field: "operation", width: "250px", className: "text-center" },
        ],
        treeOption: {
            idKey: 'permissionId',
            pidKey: 'pid',
            indent: 4,
            position: 0,
            sortKey: "", // 启用客户端节点排序，指定排序的字段
            order: 'asc', // 排序的顺序,
            isAsync: false,
            loadChildren: null
        }
    }),
    methods: {
        // 条件搜索
        search() {
            this.$store.commit('permissionModule/CHANGE_PERMISSION_KEYWORDS', this.words)
            this.$refs.PerTable.refresh(); //自动执行 loadData方法
        },
        // 添加目录
        addCatalogDiag() {
            this.$store.commit("CatalogAddModule/CLEAN_UP");
            this.catalogAlert = true;
        },
        editCatalog(event) {
            this.$store.commit("CatalogAddModule/CLEAN_UP");
            this.catalogAlert = true;
            return this.$store.dispatch('CatalogAddModule/Getlist', event.permissionId)
        },
        // 表格中添加一级目录
        CatalogItemDiag(event) {
            this.catalogAlert = true;
            this.$store.commit("CatalogAddModule/CLEAN_UP");
            return this.$store.dispatch('CatalogAddModule/GetparentId', event.permissionId)
        },
        catalogOk() {

            this.$refs.PerTable.refresh(); //自动执行 loadData方法
            this.catalogAlert = false;
        },
        catalogCancel() {
            this.catalogAlert = false;
        },

        // 显示详情
        showDetails(event) {
            console.log(event)
            this.details = true;
            return this.$store.dispatch('CatalogAddModule/Getlist', event.permissionId)
        },
        detailsOk() {
            this.details = false;
        },
        detailsCancel() {
            this.details = false;
        },


        // 添加权限模块及权限模块确认取消操作
        addListDiag() {
            this.$store.commit("permissionAddModule/CLEAN_UP_ADDLISTFORM");
            this.visible = true;
        },
        // 添加权限模块赋值
        addItemDiag(event) {
            this.visible = true;
            this.$store.commit("permissionAddModule/CLEAN_UP_ADDLISTFORM");
            return this.$store.dispatch('permissionAddModule/GetparentId', {
                permissionId: event.permissionId,
                disable: true,
            })
        },
        // 编辑权限模块
        editoperssion(event) {
            this.visible = true;
            this.$store.commit("permissionAddModule/CLEAN_UP_ADDLISTFORM");
            this.$store.dispatch('permissionAddModule/Getlist', event.permissionId)
        },
        editListDiag() {
            this.visible = true;
        },
        handleOk() {
            this.visible = false;
            this.$refs.PerTable.refresh(); //自动执行

        },
        handleCancel() {
            this.visible = false;
        },

        // 删除操作
        deletelist(data) {
            let me = this;
            this.$modal.confirm({
                title: "系统提示",
                content: "是否确认删除" + data.name,
                onOk: function() {
                    return me.$store.dispatch('permissionModule/delPermissionList', {
                        id: data.permissionId
                    }).then(res => {
                        console.log(res)
                        if (res.data.success) {
                            me.$message.success("删除成功");
                            me.$refs.PerTable.refresh(); //自动执行 loadData方法
                        } else {
                            me.$message.success(res.data.data);
                        }
                        return res;
                    })
                },
            });
        },
        changeEnabled(event, data) {
            return this.$store.dispatch('permissionModule/EnabledPermission', {
                flag: event,
                id: data.permissionId
            }).then(data => {
                if (data.data.success) {
                    this.$message.success("状态修改成功")
                }
            })
        }
    }
};
</script>
<style scoped lang='less'>
.demo-table tr th,
.demo-table tr td {
    line-height: 40px;
}

li.ant-dropdown-menu-item {
    display: block;
    width: 68px;
    text-align: center;
}

a.handle-tip {
    color: #333;
    display: inline-block;
    line-height: 38px;
}

a.handle-tip:hover {
    color: #108ee9;
}
</style>