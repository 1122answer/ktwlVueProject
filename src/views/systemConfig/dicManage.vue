<template>
    <div id="interfaceLog" class="moduleWrap">
        <v-row class="nav-header">
            <v-col span="12">
                <h1>字典管理</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '30px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>系统配置</v-breadcrumb-item>
                    <v-breadcrumb-item>字典管理</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border" ref="boxBorder">
            <div class="tree-drown">
                <v-tree :data="treeData" :showLine="true" @select='selectFu' :class="['box', theme]" v-contextmenu:contextmenu></v-tree>
                <!-- 右键菜单项 -->
                <v-contextmenu ref="contextmenu" :theme="theme">
                    <v-contextmenu-item @click="copygroup">复制分组</v-contextmenu-item>
                </v-contextmenu>
            </div>
            <div class="content-box">
                <div ref="morePanelWrap">
                    <v-more-panel>
                        <v-form slot="form">
                            <v-form-item label="字典名称">
                                <v-input placeholder="请输入字典名称" v-model="searchForm.dictionaryName" size="large"></v-input>
                            </v-form-item>
                            <v-form-item label="字典参数">
                                <v-input placeholder="请输入字典参数" v-model="searchForm.dictionaryKey" size="large"></v-input>
                            </v-form-item>
                            <v-form-item label="调用方式">
                                <v-select placeholder="请选择调用方式" style="width: 120px;" :data="[{value:null,label:'全部'},{value:'0',label:'正常'},{value:'1',label:'接口'},{value:'2',label:'数据库'}]" v-model="searchForm.dictType" size="lg">
                                </v-select>
                            </v-form-item>
                            <v-form-item label="是否开启">
                                <v-select placeholder="请选择是否开启" style="width: 100px;" :data="[{value:'',label:'全部'},{value:true,label:'是'},{value:false,label:'否'}]" v-model="searchForm.isEnabled" size="lg"></v-select>
                            </v-form-item>
                            <v-button type="primary" @click="searchList" size="large">
                                <v-icon type="search"></v-icon> 查询</v-button>
                        </v-form>
                        <v-button type="primary" @click="addParams" class="margin-right-5" title="新增字典组和项" size="large">添加字典</v-button>
                        <v-button type="primary" title="新增字典组和项" :disabled="true" size="large">添加项</v-button>
                    </v-more-panel>
                </div>
                <div class="container-fluid" ref="containerFluid">
                    <v-data-table :data='loadData' size="small" :columns='columns' ref="dicTable" bordered @clickrow="clickrowFu" :currentData.sync="currentData" emptyText="暂时找不到你要的信息......" :height="tableBoxHeight">
                        <template slot="td" slot-scope="props">
                            <div v-if="props.column.field=='operation'" class="text-center">
                                <v-button-group>
                                    <v-button type="info" title="查看详细" @click="showDetail(props.item)">
                                        <v-icon type="file-text"></v-icon>
                                    </v-button>
                                    <v-button type="primary" title="编辑" @click="editParam(props.item)" v-if="props.item.modifyType!='0'">
                                        <v-icon type="edit"></v-icon>
                                    </v-button>
                                    <v-button type="error" title="删除" @click="delParam(props.item)" v-if="props.item.modifyType!='0' && props.item.modifyType=='2'">
                                        <v-icon type="delete"></v-icon>
                                    </v-button>
                                </v-button-group>
                            </div>
                            <div v-else-if="props.column.field === 'isEnabled'">
                                <span v-if="props.content==false"> 否 </span>
                                <span v-else> 是 </span>
                            </div>
                            <div v-else-if="props.column.field === 'dictType'">
                                <span v-if="props.content==0"> 正常 </span>
                                <span v-else-if="props.content==1"> 接口 </span>
                                <span v-else-if="props.content==2"> 数据库 </span>
                            </div>
                            <div v-else-if="props.column.field === 'systemName'">
                                <span v-if="props.content==''"> 通用系统 </span>
                                <span v-else v-html="props.content"></span>
                            </div>
                            <span v-else v-html="props.content"></span>
                        </template>
                    </v-data-table>
                </div>
                <AddWidget :is-dic="dicShow" @ok="handleOk" @cancel="handleCancel"></AddWidget>
                <EditWidget :visible="visible" @ok="editOk" @cancel="editCancel"></EditWidget>
                <CopyWidget :visible="copyShow" @ok="copyOk" @cancel="copyCancel"></CopyWidget>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { TreeUtil } from "@/util/TreeUtil.js";
import AddWidget from './dicMagWidget/addEditDic.vue'
import EditWidget from './dicMagWidget/editDic.vue'
import CopyWidget from './dicMagWidget/copyDic.vue'
export default {
    name: 'login',
    components: {
        //addPane
        AddWidget,
        EditWidget,
        CopyWidget,
    },
    computed: {
        ...mapState({
            searchForm: state => state.dicListModule.searchForm,
            newdicForm: state => state.dicAddModule.newdicForm,
            treeData: state => state.dicListModule.treeData,
            dictionaryId: state => state.dicListModule.dictionaryId,
        })
    },
    props: {
        theme: 'default',
    },
    mounted() {
        this.$store.dispatch('dicListModule/fetchTreeData').then(res => {
            return [];
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
            responseParamsName: {
                total: 'totalCount',
                results: 'result',
            },
            copyedgroup: false, //控制分组能否复制
            visible: false,
            dicShow: false,
            copyShow: false,
            copyFlag: true,
            addBtnFlag: true,
            selectNode: null,
            loadData(params) {
                return this.$store.dispatch('dicListModule/fetchDicTable', {
                    pageNo: params.pageNo,
                    pageSize: params.pageSize,

                }).then(res => {
                    //console.log('list', res);
                    return res;
                })
            },
            columns: [
                { title: "字典参数", field: 'dictionaryKey' },
                { title: "值1", field: 'value1' },
                { title: "调用方式", field: 'dictType' },
                { title: "所属系统", field: 'systemName' },
                { title: "备注", field: 'remark' },
                { title: "是否开启", field: 'isEnabled' },
                { title: "操作", field: 'operation', width: '180px', className: 'text-center' },
            ],
            copyTxt: '复制',
            dropDownData: [
                { content: '复制区域' },
                { content: '复制分组' },
                { content: '复制项' },
            ],
            currentData: []
        };
    },
    methods: {
        copyClick(data) {

        },
        searchList() {
            this.$refs.dicTable.reload();
        },
        selectFu(selectedNodes) {
            if (selectedNodes == [] || selectedNodes == null || selectedNodes == "") {
                this.copyedgroup = false;
                return
            };
            if (selectedNodes[0].nodeType == "region") {
                this.copyedgroup = false;
            } else if (selectedNodes[0].nodeType == "group") {

                this.copyedgroup = true;
            } else {
                this.copyedgroup = false;
            }
            this.selectNode = selectedNodes[0];
            if (this.selectNode.nodeType == "system") {
                this.copyFlag = true;
                this.addBtnFlag = true;
            } else if (this.selectNode.nodeType == "region") {
                this.copyFlag = false;
                this.addBtnFlag = true;
            } else if (this.selectNode.nodeType == "group") {
                this.copyFlag = false;
                this.addBtnFlag = false;
            }
            this.$store.commit("dicListModule/SELECT_TREE_NODE", this.selectNode);
            this.$refs.dicTable.reload();
        },
        addParams() {
            this.dicShow = true;
        },
        clickrowFu(data) {
            if (data && data.checked) {
                this.copyFlag = false;
            } else {
                this.copyFlag = true;
            }
            this.$store.commit("dicAddModule/CLICK_ROW_DATA", data.row);
            this.$store.commit("dicAddModule/DICTIONARYID", data.row.dictionaryId);
        },
        handleCancel() {
            this.dicShow = false;
        },
        handleOk() {
            this.$store.dispatch('dicListModule/fetchTreeData');
            this.$refs.dicTable.reload();
            this.dicShow = false;
        },
        editCancel() {
            this.visible = false;
        },
        editOk() {
            this.$store.dispatch('dicListModule/fetchTreeData');
            this.$refs.dicTable.reload();
            this.visible = false;
        },
        copyOk() {
            this.copyShow = false;
            this.$refs.dicTable.reload();
            this.$store.dispatch('dicListModule/fetchTreeData');
        },
        copyCancel() {
            this.copyShow = false;
            this.$refs.dicTable.reload();
        },
        // 编辑列表
        editParam(item) {
            this.$store.commit("dicAddModule/CLEAR_ADDFORM");
            this.$store.dispatch("dicAddModule/getnumberList", item.dictionaryId).then(res => {
                this.visible = true;
            });
        },
        showDetail(item) {
            this.$store.commit("dicAddModule/CLEAR_ADDFORM");
            this.$store.dispatch("dicAddModule/showDetailsModal", item.dictionaryId).then(res => {
                this.visible = true;
            });
        },
        delParam(item) {
            this.$modal.confirm({
                title: "您是否要删除此规则",
                content: "删除之后不能恢复",
                onOk: () => {
                    this.$store
                        .dispatch("dicListModule/deldic", item.dictionaryId)
                        .then(res => {
                            if (res.data.success) {
                                this.$message.success("删除成功");
                                this.$refs.dicTable.reload();
                                this.$store.dispatch('dicListModule/fetchTreeData');
                            }
                        });
                },
                onCancel: function() {}
            });
        },
        copygroup(data) {
            if (this.copyedgroup) {
                this.$store.commit("dicAddModule/CLEAR_ADDFORM");
                this.$store.dispatch("dicAddModule/copynumberList", this.dictionaryId).then(res => {
                    this.$store.dispatch('dicAddModule/fetchDicKeys', {}).then(res => {
                        this.copyShow = true;
                    });
                });
            } else {
                this.$message.error("请选择复制的分组");
                return
            }
        },
    }
}
</script>
<style scoped lang='less'>
</style>