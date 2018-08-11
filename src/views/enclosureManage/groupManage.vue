<template>
    <div id="groupManage" class="moduleWrap">
        <groupManageAdd :visible="visible" @ok="okDialog" @hide="hideDialog"></groupManageAdd>
        <div class="clearfix">
            <h1 class="pull-left margin-bottom-15">分组管理 <span class="user">User Managment</span></h1>
            <v-breadcrumb class="pull-right">
                <v-breadcrumb-item><i class="anticon anticon-home"></i>首页</v-breadcrumb-item>
                <v-breadcrumb-item>系统业务</v-breadcrumb-item>
                <v-breadcrumb-item>分组管理</v-breadcrumb-item>
            </v-breadcrumb>
        </div>
        <div class="box-border" ref="boxBorder">
            <v-more-panel>
                <v-form slot="form">
                    <v-form-item label="所属系统">
                        <v-select style="width:150px" placeholder="请选择" ></v-select>
                    </v-form-item>
                </v-form>
                <v-button slot="control" size="large" type="primary" html-type="button" icon="search">查询</v-button>
                <v-button type="primary" size="large" style="margin-top:2px;" @click="addGroupManage"><span><i class="anticon anticon-plus"></i> 新增</span></v-button>
            </v-more-panel>
            <v-data-table ref="groupTable" :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" bordered emptyText="暂时找不到你要的信息......">
                    <template slot="td" slot-scope="props">
                        <div v-if="props.column.field=='operation'" class="text-center">
                            <v-button-group>
                                <v-button type="info" title="查看详细" @click="detaillist(props.item)">
                                     <v-icon type="file-text"></v-icon>
                                 </v-button>
                                <v-button type="primary" title="编辑" @click="editScriptVariable(props.item)">
                                    <v-icon type="edit"></v-icon>
                                </v-button>
                                <v-button type="error" title="删除" @click="deletaScriptVariable(props.item)">
                                    <v-icon type="delete"></v-icon>
                                </v-button>
                            </v-button-group>
                        </div>
                        <div v-else-if="props.column.field === 'valueType'">
                            <span v-for="etype in valueTypeMap"  v-if="props.content==etype.value">{{etype.text}}</span>
                        </div>
                        <div v-else-if="props.column.field === 'varriableType'">
                            <span v-for="etype in varriableTypeMap"  v-if="props.content==etype.value">{{etype.text}}</span>
                        </div>
                        <span v-else v-html="props.content"></span>
                    </template>
            </v-data-table>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import groupManageAdd from './groupManageWidget/groupManageAdd'

export default {
    name: 'xxx',
    components: {
        groupManageAdd,
    },
    computed: {
        // ...mapState({

        // })
    },
    mounted() {

    },
    data: function() {
        return {
            visible: false,
            name: 'template',
            responseParamsName: {
                total: 'totalCount',
                results: 'result'
            },
            loadData(params) {
                return this.$store.dispatch('userListModule/fetchUserTable', {
                    pageNo: params.pageNo,
                    pageSize: params.pageSize,
                }).then(res => {
                    return res;
                })
            },
            columns: [
                { title: "分类名称", field: 'nickName' },
                { title: "分类描述", field: 'regionCode' },
                { title: "所属系统", field: 'orgName' },
                { title: "是否启用", field: 'deptName' },
                { title: "备注", field: 'realName' },
                { title: "操作", field: 'operation', width: '180px', className: 'text-center' },
            ],
        };
    },
    methods: {
        //添加对话框显示
        addGroupManage() {
            this.visible = true;
            // this.$store.commit('scriptTypeAddModule/CLEAR_ADD_FORM') //清空表单
        },
        okDialog() {
            this.visible = false;
            this.$refs.groupTable.refresh(); //刷新表格数据
        },
        hideDialog() {
            this.visible = false;
        },
    }
}
</script>
<style scoped lang='less'>
</style>