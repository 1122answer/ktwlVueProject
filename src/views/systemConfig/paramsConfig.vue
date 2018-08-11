<template>
    <div id="paramsConfig" class="moduleWrap">
        <v-row class="nav-header">
            <v-col span="12">
                <h1>参数配置</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '30px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>系统配置</v-breadcrumb-item>
                    <v-breadcrumb-item>参数配置</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border" ref="boxBorder">
            <div class="tree-drown">
                <v-tree :data="treeData" :showLine="true" @select="selectFu" :class="['box', theme]" v-contextmenu:contextmenu></v-tree>
                <!-- 右键菜单项 -->
                <v-contextmenu ref="contextmenu" :theme="theme">
                    <v-contextmenu-item @click="copyregion" v-if="copygroupstate">复制区域</v-contextmenu-item>
                    <v-contextmenu-item @click="copygroup" v-if="copyregionstate">复制分组</v-contextmenu-item>
                    <v-contextmenu-item></v-contextmenu-item>
                </v-contextmenu>
            </div>
            <div class="content-box">
                <div ref="morePanelWrap">
                    <v-more-panel>
                        <v-form slot="form" v-model="searchForm" ref="searchForm">
                            <v-form-item label="分组名称" prop="groupName">
                                <v-input placeholder="请输入分组名称" v-model="searchForm.groupName"></v-input>
                            </v-form-item>
                            <v-form-item label="参数编码" prop="configKey">
                                <v-input placeholder="请输入参数编码" v-model="searchForm.configKey"></v-input>
                            </v-form-item>
                            <v-form-item label="参数名称" prop="configName">
                                <v-input placeholder="请输入参数名称" v-model="searchForm.configName"></v-input>
                            </v-form-item>
                            <v-form-item label="参数说明" prop="configDesc">
                                <v-input placeholder="请输入参数说明" v-model="searchForm.configDesc"></v-input>
                            </v-form-item>
                            <v-form-item label="是否开启" prop="isEnabled">
                                <v-select placeholder="请选择是否开启" style="width: 120px;" :data="[{value:'',label:'全部'},{value:true,label:'是'},{value:false,label:'否'}]" v-model="searchForm.isEnabled"></v-select>
                            </v-form-item>
                        </v-form>
                        <v-button type="primary" @click="searchList">
                            <v-icon type="search"></v-icon> 查询</v-button>
                        <!-- <v-button type="primary" :disabled="copyFlag" @click="copyParams" icon="copy" class="margin-left-5" title="复制系统参数">复制</v-button> -->
                        <v-button type="primary" @click="addParams" class="margin-left-5" icon="plus" title="新增系统参数">添加</v-button>
                    </v-more-panel>
                </div>
                <div class="container-fluid" ref="containerFluid">
                    <v-data-table :data='loadData' size="small" :columns='columns' ref="paramsTable" bordered emptyText="暂时找不到你要的信息......" :height="tableBoxHeight">
                        <template slot="td" slot-scope="props">
                            <div v-if="props.column.field=='systemName'">
                                <span v-if="props.item.systemName == null || props.item.systemName == ''">通用系统</span>
                            </div>
                            <div v-if="props.column.field=='operation'" class="text-center">
                                <v-button-group>
                                    <v-button type="info" title="查看详细" @click="viewParam(props.item)">
                                        <v-icon type="file-text"></v-icon>
                                    </v-button>
                                    <v-button v-if="props.item.modifyType != 0" type="primary" title="编辑" @click="editParam(props.item)">
                                        <v-icon type="edit"></v-icon>
                                    </v-button>
                                    <v-button v-if="props.item.modifyType == 2" type="error" title="删除" @click="delParam(props.item)">
                                        <v-icon type="delete"></v-icon>
                                    </v-button>
                                </v-button-group>
                            </div>
                            <div v-else-if="props.column.field === 'isEnabled'">
                                <span v-if="props.content==false"> 否 </span>
                                <span v-else> 是 </span>
                            </div>
                            <span v-else v-html="props.content"></span>
                        </template>
                    </v-data-table>
                </div>
            </div>
            <addEditParams :visible="visible" @cancel="handleCancel" @ok="handleOk" />
            <copyRegionParams :visible="crpvisible" @cancel="crpCancel" @ok="crpOk" />
            <copyGroupParams :visible="cgpvisible" @cancel="cgpCancel" @ok="cgpOk" />
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import addEditParams from "./paramsWidget/addEditParams";
import copyRegionParams from "./paramsWidget/copyRegionParams";
import copyGroupParams from "./paramsWidget/copyGroupParams";
export default {
    name: "paramscongfig",
    components: {
        addEditParams,
        copyRegionParams,
        copyGroupParams
    },
    props: {
        theme: 'default',
    },
    computed: {
        ...mapState({
            searchForm: state => state.prsListModule.searchForm,
            treeData: state => state.prsListModule.treeData,
            systemData: state => state.prsAddEditModule.selectSystem,
            regionData: state => state.prsAddEditModule.selectRegion
        })
    },
    mounted() {
        this.$store.dispatch("prsListModule/fetchTreeData"); //获取左边树
        this.$store.dispatch("prsAddEditModule/getModifyTypeEnum"); //获取操作权限枚举
        this.$store.dispatch("prsAddEditModule/getRegionSelectTree"); //获取行政区域下来列表
        this.$store.dispatch("prsAddEditModule/getsystemSelect"); //获取系统下拉列表
        this.$store.dispatch("prsAddEditModule/getGroupSelect"); //获取分组下拉列表

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
                total: "totalCount",
                results: "result"
            },
            loadData(params) {
                return this.$store.dispatch("prsListModule/fetchParansTable", {
                    pageNo: params.pageNo,
                    pageSize: params.pageSize
                }).then(res => {
                    return res;
                });
            },
            columns: [
                { title: "参数编码", field: "configKey" },
                { title: "参数名称", field: "configName" },
                { title: "参数值1", field: "configValue" },
                { title: "参数说明", field: "configDesc" },
                { title: "所属系统", field: "systemName" },
                { title: "是否开启", field: "isEnabled" },
                {
                    title: "操作",
                    field: "operation",
                    width: "180px",
                    className: "text-center"
                }
            ],
            visible: false,
            crpvisible: false,
            cgpvisible: false,
            copygroupstate: false,
            copyregionstate: false,
            currentData: []
        };
    },
    methods: {
        searchList() {
            this.$refs.paramsTable.reload();
        },
        selectFu(selectedNodes) {
            let selectNode = selectedNodes[0];
            this.$store.commit("prsListModule/SELECT_TREE_NODE", selectNode);
            this.$refs.paramsTable.reload();
            if (selectNode == undefined) {
                this.copygroupstate = false;
                this.copyregionstate = false;
                return
            }
            if (selectNode.nodeType == "region") {
                this.copygroupstate = true;
                this.copyregionstate = false;
                this.$store.dispatch("copyRegionParamsModule/getRigionList", selectNode);
            } else if (selectNode.nodeType == "group") {
                this.copygroupstate = false;
                this.copyregionstate = true;
                this.$store.dispatch("copyGroupParamsModule/getGroupList", selectNode);
                this.$store.dispatch("copyGroupParamsModule/getItemList", selectNode);
            } else {
                this.copygroupstate = false;
                this.copyregionstate = false;
            }
        },
        delParam(param) {
            //删除数据
            this.$modal.confirm({
                title: "删除参数",
                content: "确认删除该条参数吗？",
                onOk: () => {
                    this.$store
                        .dispatch("prsListModule/delParamData", param.configId)
                        .then(res => {
                            if (res.data && res.data.success) {
                                this.$message["success"](res.data.data, 1);
                                this.$refs.paramsTable.refresh();
                            }
                        });
                },
                onCancel: function() {}
            });
        },
        handleCancel() {
            this.visible = false;
        },
        handleOk() {
            this.visible = false;
            this.$refs.paramsTable.reload();
        },
        crpCancel() {
            this.crpvisible = false;
        },
        crpOk() {
            this.crpvisible = false;
            this.$refs.paramsTable.reload();
        },

        viewParam(param) {
            //显示详情
            this.visible = true;
            this.$store.commit("prsAddEditModule/ADD_EDIT_FLAG", 1);
            this.$store.commit("prsAddEditModule/RECORD_DATA", param.configId);
            this.$store.dispatch("prsAddEditModule/fetchgetData", param.configId);
        },
        editParam(param) {
            //编辑
            this.visible = true;
            this.$store.commit("prsAddEditModule/ADD_EDIT_FLAG", 3);
            this.$store.commit("prsAddEditModule/RECORD_DATA", param.configId);
            this.$store.dispatch("prsAddEditModule/fetchgetData", param.configId);
        },
        addParams() {
            //新增
            this.visible = true;
            this.$store.commit("prsAddEditModule/ADD_EDIT_FLAG", 2);
        },
        // 复制区域
        copyregion() {
            this.crpvisible = true;
        },
        // 复制分组
        copygroup() {
            this.cgpvisible = true;
        },
        cgpCancel() {
            this.cgpvisible = false;
        },
        cgpOk() {
            this.cgpvisible = false;
            this.$refs.paramsTable.reload();
        },
    }
};
</script>
<style scoped lang='less'>
.copybtn {
    margin-top: 3px;
}
</style>