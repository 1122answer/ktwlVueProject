<template>
    <div id="enclosureManager" class="moduleWrap">
        <v-row class="nav-header">
            <v-col span="12">
                <h1>要件信息</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '30px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>要件管理</v-breadcrumb-item>
                    <v-breadcrumb-item>要件信息</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border" ref="boxBorder">
            <div class="tree-drown">
                <v-tree :data="treeData" :showLine="true" @select='selectFu' :class="['box', theme]" v-contextmenu:contextmenu></v-tree>
                <!-- 右键菜单项 -->
                <v-contextmenu ref="contextmenu" :theme="theme">
                    <v-contextmenu-item @click="copyregion">复制区域</v-contextmenu-item>
                    <v-contextmenu-item @click="copygroup">复制分组</v-contextmenu-item>
                </v-contextmenu>
            </div>
            <div class="content-box">
                <div ref="morePanelWrap">
                    <v-more-panel>
                        <v-form slot="form">
                            <v-form-item label="要件标题">
                                <v-input placeholder="请输入规则名称" size="large" v-model="title" style="width:150px"></v-input>
                            </v-form-item>
                            <v-form-item label="要件类型">
                                <v-select placeholder="请选择系统" size="lg" v-model="cconfigType" style="width:150px" :data="[{value:'复印件',label:'复印件'},{value:'原件',label:'原件'}]"></v-select>
                            </v-form-item>
                            <v-form-item label="文档类型">
                                <v-select style="width:150px" size="lg" v-model="fileType" :data="FiletypeSelect"></v-select>
                            </v-form-item>
                            <v-form-item label="是否开启">
                                <v-select style="width:100px" size="lg" v-model="isEnabled" :data="[{value:'true',label:'是'},{value:'false',label:'否'}]"></v-select>
                            </v-form-item>
                        </v-form>
                        <v-button slot="control" size="large" type="primary" icon="search" @click="searchlist" class="margin-right-10" style="margin-top: -2px;">查询</v-button>
                        <v-button type="primary" size="large" class="pull-right" @click="addEncosuer">
                            <v-icon type="plus"></v-icon> 添加</v-button>
                    </v-more-panel>
                </div>
                <div class="container-fluid" ref="containerFluid">
                    <v-data-table :data='loadData' size="small" :columns='columns' ref="encTable" bordered emptyText="暂时找不到你要的信息......" :height="tableBoxHeight">
                        <template slot="td" slot-scope="props">
                            <div v-if="props.column.field=='isEnabled'">
                                <span v-if="props.content=='false'">否</span>
                                <span v-else>是</span>
                            </div>
                            <div v-else-if="props.column.field=='fileType'">
                                <span v-if="props.content==0">图片文件</span>
                                <span v-else-if="props.content==1">文档文件</span>
                                <span v-else-if="props.content==2">视频文件</span>
                                <span v-else>其他文件</span>
                            </div>
                            <div v-else-if="props.column.field=='cconfigType'">
                                <span v-if="props.content=='原件'">原件</span>
                                <span v-else-if="props.content=='复印件'">复印件</span>
                                <span v-else>其他文件</span>
                            </div>
                            <div v-else-if="props.column.field=='operation'" class="text-center">
                                <v-button-group>
                                    <v-button type="info" title="查看详细" @click="detaillist(props.item)">
                                        <v-icon type="file-text"></v-icon>
                                    </v-button>
                                    <v-button type="primary" title="编辑" @click="editlist(props.item)">
                                        <v-icon type="edit"></v-icon>
                                    </v-button>
                                    <v-button type="error" title="删除" @click="deletelist(props.item)">
                                        <v-icon type="delete"></v-icon>
                                    </v-button>
                                </v-button-group>
                            </div>
                            <span v-else v-html="props.content"></span>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </div>
        <Addwidget :visible="visible" @cancel="hideDialog" @ok="okDialog"></Addwidget>
        <copyregion :visible="regioncopy" @cancel="regioncancel" @ok="regionok"></copyregion>
        <copygroup :visible="groupcopy" @cancel="groupcancel" @ok="groupok"></copygroup>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { TreeUtil } from "@/util/TreeUtil.js";
import Addwidget from './enclosureWidget/enclosureAddEdit.vue';
import copyregion from './enclosureWidget/copyedRegion.vue';
import copygroup from './enclosureWidget/copyedGroup.vue';

export default {
    components: {
        Addwidget,
        copyregion,
        copygroup,
    },
    props: {
        theme: 'default',
    },
    computed: {
        ...mapState({
            FiletypeSelect: state => state.enclosureAddModule.FiletypeSelect,
            operateSelect: state => state.enclosureAddModule.operateSelect,
            serchform: state => state.enclosureAddModule.serchform,
        })
    },
    mounted() {
        this.$store.dispatch("enclosureAddModule/Filetype");
        this.$store.dispatch("enclosureAddModule/operateSelect");
        this.$store.dispatch('enclosureListModule/fetchTreeData').then(res => {
            if (res && res.data && res.data.success) {
                TreeUtil.build(res.data.data, this.treeData);
                return this.treeData;
            } else {
                this.treeData = [];
            }
        });
        //给table限制最大高度
        this.$nextTick(() => {
            let tableBoxHeight = this.$refs.boxBorder.scrollHeight - (this.$refs.morePanelWrap.scrollHeight + 18);
            this.tableBoxHeight = tableBoxHeight;
        });
    },
    data: function() {
        return {
            tableBoxHeight:300,
            copyedregion: false, //控制区域能否复制
            regioncopy: false, //区域复制弹窗
            copyedgroup: false, //控制分组能否复制
            groupcopy: false, //分组复制弹窗
            getmenu: null,
            title: "",
            cconfigType: "",
            fileType: "",
            isEnabled: "",
            visible: false,
            name: 'template',
            treeData: [],
            loadData(params) {
                return this.$store.dispatch('enclosureListModule/fetchTable', {
                    pageNo: params.pageNo,
                    pageSize: params.pageSize,
                }).then(res => {
                    return res;
                })
            },
            columns: [
                { title: "要件标题", field: 'title' },
                { title: "要件类型", field: 'cconfigType' },
                { title: "文档类型", field: 'fileType' },
                { title: "页数", field: 'pageCount' },
                { title: "份数", field: 'cconfigCount' },
                { title: "是否开启", field: 'isEnabled' },
                { title: "操作", field: 'operation', width: '180px', className: 'text-center' },
            ],
        };
    },
    methods: {
        // 点击树
        selectFu(param) {
            if (param == [] || param == null || param == "") {
                this.copyedregion = false;
                this.copyedgroup = false;
                return
            };
            this.getmenu = param[0];
            if (param[0].nodeType == "region") {
                this.copyedregion = true;
                this.copyedgroup = false;
            } else if (param[0].nodeType == "group") {
                this.copyedregion = false;
                this.copyedgroup = true;
                this.$store.dispatch("copyedGroupModule/getlist", this.getmenu);
            } else {
                this.copyedregion = false;
                this.copyedgroup = false;
            }
            let opt = [];
            opt.groupId = param[0].groupId;
            opt.regionCode = param[0].regionCode;
            opt.systemId = param[0].systemId;
            this.$store.commit("enclosureListModule/MENUSERCH", opt);
            this.$refs.encTable.reload();
        },
        // 点击添加
        addEncosuer() {
            this.$store.commit("enclosureAddModule/CLEAR_ADDFORM");
            this.visible = true;
        },
        // 编辑
        editlist(event) {
            this.$store.commit("enclosureAddModule/EDITFORM", event);
            this.visible = true;
        },
        // 详情
        detaillist(event) {
            this.$store.commit("enclosureAddModule/EDITFORM", event);
            this.$store.commit("enclosureAddModule/DETAILFORM");
            this.visible = true;
        },
        hideDialog() {
            this.visible = false;
        },
        okDialog() {
            this.$refs.encTable.refresh();
            this.visible = false;
        },
        // 搜索
        searchlist() {
            let opt = [];
            opt.title = this.title;
            opt.cconfigType = this.cconfigType;
            opt.fileType = this.fileType;
            opt.isEnabled = this.isEnabled;
            this.$store.commit("enclosureListModule/SERCH", opt);
            this.$refs.encTable.reload();
        },
        deletelist(data) {
            let me = this;
            this.$modal.confirm({
                title: "系统提示",
                content: "确认删除吗？",
                onOk: function() {
                    me.$store.dispatch("enclosureAddModule/dellist", data.cconfigId).then(res => {
                        if (res.data.success) {
                            me.$refs.encTable.refresh();
                            me.$message.success("删除成功");
                        }
                    });
                },
                onCancel: function() {}
            });
        },
        // 复制区域
        copyregion() {
            if (this.copyedregion) {
                this.regioncopy = true;
                this.$store.commit("copyedRegionModule/GETDATA", this.getmenu);
            } else {
                this.$message.error("请选择复制的区域");
                return
            }
        },
        regioncancel() {
            this.regioncopy = false;
        },
        regionok() {
            this.regioncopy = false;
        },
        //复制分组
        copygroup() {
            if (this.copyedgroup) {
                this.groupcopy = true;
                this.$store.commit("copyedGroupModule/GETDATA", this.getmenu);
            } else {
                this.$message.error("请选择复制的分组");
                return
            }
        },
        groupcancel() {
            this.groupcopy = false;
        },
        groupok() {
            this.groupcopy = false;
        },
    }
}
</script>
<style scoped lang='less'>
</style>