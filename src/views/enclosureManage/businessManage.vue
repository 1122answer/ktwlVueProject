<template>
    <div id="groupManage" class="moduleWrap">
        <businessAddEdit :visible="visible" @ok="okDialog" @hide="hideDialog"></businessAddEdit>
        <div class="clearfix">
            <h1 class="pull-left margin-bottom-15">业务管理 <span class="user">User Managment</span></h1>
            <v-breadcrumb class="pull-right">
                <v-breadcrumb-item><i class="anticon anticon-home"></i>首页</v-breadcrumb-item>
                <v-breadcrumb-item>系统业务</v-breadcrumb-item>
                <v-breadcrumb-item>业务管理</v-breadcrumb-item>
            </v-breadcrumb>
        </div>
        <div class="box-border" ref="boxBorder">
            <v-row>
               <v-col span="4">
                   <!-- <v-tree :data="treeData" :showLine="true" @select='selectFu' :class="['box', theme]" v-contextmenu:contextmenu></v-tree> -->
               </v-col>
               <v-col span="20">
                 <v-more-panel>
                     <v-form slot="form">
                         <v-form-item label="业务名称">
                             <v-input placeholder="请输入字段名称"></v-input>
                         </v-form-item>
                         <v-form-item label="业务描述">
                              <v-input placeholder="请输入字段标题"></v-input>
                         </v-form-item>
                         <v-form-item label="是否开启" prop="type">
                            <v-select style="width:150px" placeholder="请选择" ></v-select>
                         </v-form-item>
                     </v-form>
                     <v-button slot="control" size="large" type="primary" html-type="button" icon="search">查询</v-button>
                     <v-button type="primary" size="large" style="margin-top:2px;" @click="addBusiness"><span><i class="anticon anticon-plus"></i> 新增</span></v-button>
                 </v-more-panel>
                <v-data-table ref="businessTable" :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" bordered emptyText="暂时找不到你要的信息......">
                    <template slot="td" slot-scope="props">
                        <div v-if="props.column.field=='operation'" class="text-center">
                            <v-button-group>
                                <v-button type="info" title="查看详细" @click="detaillist(props.item)">
                                     <v-icon type="file-text"></v-icon>
                                 </v-button>
                                <v-button type="primary" title="编辑" @click="editScriptVariable(props.item)" v-if="props.item.varriableType!=1 && props.item.varriableType!=2">
                                    <v-icon type="edit"></v-icon>
                                </v-button>
                                <v-button type="error" title="删除" @click="deletaScriptVariable(props.item)" v-if="props.item.varriableType!=1 && props.item.varriableType!=2">
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
                </v-col>
            </v-row>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import businessAddEdit from './businessWidget/businessAddEdit'
export default {
    name: 'xxx',
    components: {
        businessAddEdit,
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
                return this.$store.dispatch('businessListModule/fetchTable', {
                    pageNo: params.pageNo,
                    pageSize: params.pageSize,
                }).then(res => {
                    return res;
                })
            },
            columns: [
                { title: "业务名称", field: 'nickName' },
                { title: "业务描述", field: 'regionCode' },
                { title: "所属分类", field: 'orgName' },
                { title: "是否开启", field: 'deptName' },
                { title: "操作", field: 'operation', width: '180px', className: 'text-center' },
            ],
        };
    },
    methods: {
        //添加对话框显示
        addBusiness() {
            this.visible = true;
            // this.$store.commit('scriptTypeAddModule/CLEAR_ADD_FORM') //清空表单
        },
        okDialog() {
            this.visible = false;
            this.$refs.businessTable.refresh(); //刷新表格数据
        },
        hideDialog() {
            this.visible = false;
        },
    }
}
</script>
<style scoped lang='less'>
</style>