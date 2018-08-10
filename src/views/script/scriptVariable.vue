<template>
    <div id="scriptVariable.vue">
      <scriptVariableAdd :visible="visible" @ok="okDialog" @hide="hideDialog"></scriptVariableAdd>
        <v-row class="padding-bottom-10">
            <v-col span="12">
                <h1>脚本变量</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right">
                    <v-breadcrumb-item><i class="anticon anticon-home"></i>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>脚本</v-breadcrumb-item>
                    <v-breadcrumb-item>脚本变量</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border padding-10">
            <v-more-panel>
                 <v-form slot="form">
                     <v-form-item label="所属脚本分类" prop="type">
                        <v-select :data="selectlist" v-model="scriptVariableForm.scriptTypeId" style="width:150px" placeholder="请选择所属脚本分类" ></v-select>
                     </v-form-item>
                     <v-form-item label="字段名称">
                         <v-input placeholder="请输入字段名称" v-model="scriptVariableForm.fieldName"></v-input>
                     </v-form-item>
                     <v-form-item label="字段标题">
                          <v-input placeholder="请输入字段标题" v-model="scriptVariableForm.fieldTitle"></v-input>
                     </v-form-item>
                 </v-form>
                 <v-button slot="control" type="primary" html-type="button" icon="search" @click="searchTable">查询</v-button>
                 <v-button type="primary" size="large" @click="showAddModal"><span><i class="anticon anticon-plus"></i> 添加</span></v-button>
            </v-more-panel>
             
              <v-data-table ref="scriptVariable" :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" bordered emptyText="暂时找不到你要的信息......">
                <template slot="td" slot-scope="props">
                    <div v-if="props.column.field=='operation'" class="text-center">
                        <v-button-group>
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
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
import scriptVariableAdd from './scriptVariableWidget/scriptVariableAdd'
export default {
    name: 'this',
    components: {
       scriptVariableAdd,
    },
    computed: {
        ...mapState({
          scriptVariableForm: state => state.scriptVariableModule.scriptVariableForm,
          valueTypeMap: state => state.scriptVariableModule.valueTypeMap,
          varriableTypeMap: state => state.scriptVariableModule.varriableTypeMap,
          selectlist: state => state.scriptVariableModule.selectlist,
        })
    },
    mounted() {
        this.$store.dispatch('scriptVariableModule/enumerate');
        this.$store.dispatch('scriptVariableModule/vartenumerate');
        this.$store.dispatch('scriptVariableModule/getselectlist');
    },
    data: function() {
        return {
            visible: false,
            responseParamsName: {
                  total: 'totalCount',
                  results: 'result'
              },
           // 列表数据渲染
            loadData(params) {
                return this.$store.dispatch('scriptVariableModule/getpagelist', {
                    pageNo: params.pageNo, //当前页
                    pageSize: params.pageSize
                }).then(res => {
                    // console.log(res);
                    return res;
                })
            },
            columns: [
                { title: "字段名称", field: 'fieldName' },
                { title: "字段标题", field: 'fieldTitle' }, 
                { title: "备注", field: 'remark' },
                // { title: "所属脚本分类", field: 'scriptTypeId'},
                // { title: "脚本变量标识id", field: 'scriptVariableId'},
                { title: "值类型", field: 'valueType'},
                { title: "变量类型", field: 'varriableType'},
                { title: "变量值", field: 'varriableValue'},
                { title: "操作", field: 'operation', className: 'text-center' },
            ],

        };
    },
    methods: {
       //添加对话框显示
        showAddModal() {
            this.visible = true;
            this.$store.commit('scriptVariableAddModule/CLEAR_ADD_FORM') //清空表单
        },
        okDialog() {
            this.visible = false;
            this.$refs.scriptVariable.refresh(); //刷新表格数据
        },
        hideDialog() {
            this.visible = false;
        },
        //查询脚本变量
        searchTable() {
            this.$refs.scriptVariable.reload();
        },
        // 删除脚本分类
        deletaScriptVariable(event) {
            //console.log(event.roleId);
            let me = this;
            this.$modal.confirm({
                title: "系统提示",
                content: "是否确认删除" + event.fieldName,
                onOk: function() {
                    me.$store.dispatch("scriptVariableModule/deleteScriptVariable", event.scriptVariableId).then(res => {
                        if (res.data.success) {
                            me.$refs.scriptVariable.refresh();
                            me.$message.success("删除成功");
                        }
                    });
                },
                onCancel: function() {
                    //console.log("点击取消");
                }
            });
        },
         // 编辑修改脚本分类
        editScriptVariable(event) {
            console.log(event.scriptVariableId);
            this.visible = true;
            this.$store.dispatch("scriptVariableAddModule/getList", event.scriptVariableId).then();
        },
    }
}
</script>
<style scoped lang='less'>
</style>