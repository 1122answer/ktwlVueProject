<template>
    <div id="regionManage" class="moduleWrap">
        <v-row class="nav-header">
            <v-col span="12">
                <h1>行政区域</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '30px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>组织架构</v-breadcrumb-item>
                    <v-breadcrumb-item>行政区域</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border" ref="boxBorder">
            <div ref="morePanelWrap">
                <v-more-panel>
                <!-- <v-form slot="form">
                     <v-form-item label="行政区域名称">
                         <v-input placeholder="请输入行政区域名称" v-model="searchname"></v-input>
                     </v-form-item>
                     <v-form-item label="简称">
                         <v-input type="text" placeholder="请输入简称" v-model="shortName"></v-input>
                     </v-form-item>
                     <v-form-item label="行政区划代码">
                         <v-input placeholder="请输入参数名称" v-model="regionCode"></v-input>
                     </v-form-item>
                     <v-form-item label="级别">
                        <v-select style="width: 100px;"  :data="level" v-model="levelvalue" @change="change"></v-select>
                     </v-form-item>
                     <v-form-item label="是否开启">
                        <v-select style="width: 100px;" :data="isOpen" v-model="valueisOpen" @change="changeOpen"></v-select>
                     </v-form-item>
                 </v-form>
                 <v-button slot="control"  size="large" type="primary" html-type="button" icon="search" @click="searchTable">查询</v-button> -->
                <v-button type="primary" size="large" class="pull-right" @click="showAddModal" style="margin-top:2px;">
                    <v-icon type="plus"></v-icon> 新增</v-button>
                </v-button>
            </v-more-panel>
            </div>
            <div class="container-fluid clearfix" ref="containerFluid">
                <v-data-table ref="reginTable" :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" tree-table :tree-option='treeOption' bordered :pagination='false' :currentData.sync='currentData' emptyText="暂时找不到你要的信息......" :height="tableBoxHeight">
                    <template slot="td" slot-scope="props">
                        <div v-if="props.column.field=='operation'" class="text-center">
                            <v-button-group>
                                <v-button type="info" @click="showDetailsModal(props.item)" title="查看详情">
                                    <v-icon type="file-text"></v-icon>
                                </v-button>
                                <v-button type="primary" title="修改" @click="getRegion(props.item)">
                                    <v-icon type="edit"></v-icon>
                                </v-button>
                                <v-button type="error" title="删除" @click="deletaRegion(props.item)">
                                    <v-icon type="delete"></v-icon>
                                </v-button>
                            </v-button-group>
                        </div>
                        <div v-else-if="props.column.field === 'isEnabled'" class="text-center">
                            <v-switch v-model="props.content" @change="setStatus(props.content,props.item)">
                                <span slot="checkedChildren">开</span>
                                <span slot="unCheckedChildren">关</span>
                            </v-switch>
                        </div>
                        <div v-else-if="props.column.field === 'flag'">
                            <span v-if="props.content==0"> 省</span>
                            <span v-else-if="props.content==1">市</span>
                            <span v-else-if="props.content==2">区/县</span>
                            <span v-else-if="props.content==3">乡/镇</span>
                        </div>
                        <span v-else v-html="props.content"></span>
                    </template>
                </v-data-table>
            </div>
        </div>
        <regionAdd :visible="visible" @ok="okAddDialog" @hide="hideAddDialog"></regionAdd>
        <regionDetails :visible="details" @hide="hideDetailsDialog"></regionDetails>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import regionAdd from './regionWidget/regionAdd'
import regionDetails from './regionWidget/regionDetails'
import { TreeUtil } from '@/util/TreeUtil.js'
export default {
    components: {
        regionAdd,
        regionDetails,
    },
    computed: {
        // ...mapState({
        // })
    },
    mounted() {
        this.$nextTick(() => {
            let tableBoxHeight = this.$refs.boxBorder.scrollHeight - (this.$refs.morePanelWrap.scrollHeight + 18);
            this.tableBoxHeight = tableBoxHeight;
        });
    },
    data: function() {
        return {
            tableBoxHeight: '',
            searchname: '',
            shortName: '',
            regionCode: '',
            visible: false,
            details: false,
            currentData: [],
            responseParamsName: {
                total: 'totalCount',
                results: 'result'
            },
            columns: [
                { title: "行政区域名称", field: 'name' },
                { title: "简称", field: 'shortName' },
                { title: "行政区划代码", field: 'regionCode' },
                { title: "级别", field: 'flag' },
                { title: "是否启用", field: 'isEnabled', width: "90px", className: "text-center" },
                { title: "操作", field: 'operation', width: "150px", className: "text-center" },
            ],
            //树列表
            treeOption: {
                idKey: 'id',
                pidKey: 'pid',
                indent: 4,
                position: 0,
                sortKey: "", // 启用客户端节点排序，指定排序的字段
                order: 'asc', // 排序的顺序,
                isAsync: false,
                loadChildren: null
            },
            //级别
            level: [{
                value: '0',
                label: '全部'
            }, {
                value: '1',
                label: '省',
            }, {
                value: '2',
                label: '市'
            }, {
                value: '3',
                label: '区/县'
            }, {
                value: '4',
                label: '乡/镇'
            }],
            levelvalue: '0',
            //是否开启
            isOpen: [{
                value: '0',
                label: '全部'
            }, {
                value: '1',
                label: '是',
            }, {
                value: '2',
                label: '否'
            }],
            valueisOpen: '0',
            //表格数据加载
            loadData(params) {
                return this.$store.dispatch('reginMenageListModule/regiontree').then(res => {
                    return res;
                })
            },
        };
    },
    methods: {

        //添加对话框显示
        showAddModal() {
            this.$store.commit('reginMenageListModule/CLEAR_ADD_FORM') //清空表单
            this.visible = true;
        },
        okAddDialog() {
            this.visible = false;
            this.$refs.reginTable.refresh(); //刷新表格数据
        },
        hideAddDialog() {
            this.visible = false;
        },
        //详情对话框显示
        showDetailsModal(event) {
            this.details = true;
            this.$store.dispatch("reginMenageListModule/getRegion", event.regionId);
        },
        hideDetailsDialog() {
            this.details = false;
        },
        //级别选中
        change(val) {
            console.log(val);
        },
        //是否启用选中
        changeOpen(val) {
            console.log(val);
        },
        // 删除行政区域
        deletaRegion(event) {
            let me = this;
            this.$modal.confirm({
                title: "删除",
                content: "确认删除吗？将删除包含的下级区域。",
                onOk: function() {
                    me.$store.dispatch("reginMenageListModule/deleteRegion", event.regionId).then(res => {
                        if (res.data.success) {
                            me.$refs.reginTable.refresh();
                            me.$message.success("删除成功");
                        }
                    });
                    me.$message.success("删除成功");
                },
                onCancel: function() {
                    console.log("点击取消");
                }
            });
        },
        //获取一条行政区域数据渲染给表单，然后进行修改
        getRegion(event) {
            this.visible = true;
            this.$store.dispatch("reginMenageListModule/getRegion", event.regionId);
        },
        //设置启用状态
        setStatus(event, data) {
            this.$store.dispatch("reginMenageListModule/statusRegion", {
                isEnabled: event,
                id: data.regionId
            }).then(res => {
                if (res.data.success) {
                    this.$message.success("修改状态成功")
                }
            }); //传switch控件的值到管理界面
        },
        //查询行政区域
        searchTable() {
            let obj = {};
            obj.name = this.searchName;
            obj.shortName = this.shortName;
            obj.regionCode = this.regionCode;
            obj.levelvalue = this.levelvalue;
            obj.valueisOpen = this.valueisOpen;
            this.$store.commit('reginMenageListModule/ASSIGN_SEARCH', obj);
            this.$refs.reginTable.reload();
        },

    }
}
</script>
<style scoped lang='less'>
</style>