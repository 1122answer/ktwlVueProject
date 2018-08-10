<template>
    <div id="scriptType.vue">
      <scriptTypeAdd :visible="visible" @ok="okDialog" @hide="hideDialog"></scriptTypeAdd>
        <v-row class="padding-bottom-10">
            <v-col span="12">
                <h1>脚本分类</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right">
                    <v-breadcrumb-item><i class="anticon anticon-home"></i>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>脚本</v-breadcrumb-item>
                    <v-breadcrumb-item>脚本分类</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border padding-10">
             <v-row>
                <v-col class="pull-left" span='24'>
                    <v-col span="6">
                        <v-input-group compact>
                            <v-input placeholder="请输入脚本分类名称" size="large" :style="{width:'64%'}" v-model="scriptTypeForm.name"></v-input>
                            <v-button type="primary" size="large" @click="searchTable">
                                <v-icon type="search"></v-icon> 查询</v-button>
                        </v-input-group>
                    </v-col>
                    <v-col span="18" class="text-right">
                        <v-button type="primary" size="large" @click="showAddModal"><span><i class="anticon anticon-plus"></i> 添加</span></v-button>
                    </v-col>
                </v-col>
            </v-row>
              <v-data-table ref="scriptType" :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" bordered emptyText="暂时找不到你要的信息......">
                <template slot="td" slot-scope="props">
                    <div v-if="props.column.field=='operation'" class="text-center">
                        <v-button-group>
                            <v-button type="primary" title="编辑" @click="editScriptType(props.item)">
                                <v-icon type="edit"></v-icon>
                            </v-button>
                            <v-button type="error" title="删除" @click="deletaScriptType(props.item)">
                                <v-icon type="delete"></v-icon>
                            </v-button>
                        </v-button-group>
                    </div>
                    <div v-else-if="props.column.field === 'enabled'" class="text-center">
                        <v-switch v-model="props.content" @change="getStatus(props.item)">
                            <span slot="checkedChildren">开</span>
                            <span slot="unCheckedChildren">关</span>
                        </v-switch>
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
import scriptTypeAdd from './scriptTypeWidget/scriptTypeAdd'

export default {
    name: 'this',
    components: {
       scriptTypeAdd,
    },
    computed: {
        ...mapState({
          scriptTypeForm: state => state.scriptTypeModule.scriptTypeForm,
        })
    },
    mounted() {},
    data: function() {
        return {
            visible: false,
            responseParamsName: {
                  total: 'totalCount',
                  results: 'result'
              },
           // 下拉框數據
            loadData(params) {
                return this.$store.dispatch('scriptTypeModule/getPageList', {
                    pageNo: params.pageNo, //当前页
                    pageSize: params.pageSize
                }).then(res => {
                    // console.log(res);
                    return res;
                })
            },
            columns: [
                { title: "脚本分类名称", field: 'name' },
                { title: "备注", field: 'remark' },
                { title: "是否启用", field: 'enabled', width: '90px', className: 'text-center' },
                { title: "操作", field: 'operation', className: 'text-center' },
            ],

        };
    },
    methods: {
       //添加对话框显示
        showAddModal() {
            this.visible = true;
            this.$store.commit('scriptTypeAddModule/CLEAR_ADD_FORM') //清空表单
        },
        okDialog() {
            this.visible = false;
            this.$refs.scriptType.refresh(); //刷新表格数据
        },
        hideDialog() {
            this.visible = false;
        },
        //查询脚本分类
        searchTable() {
            this.$refs.scriptType.reload();
        },
        // 删除脚本分类
        deletaScriptType(event) {
            //console.log(event.roleId);
            let me = this;
            this.$modal.confirm({
                title: "系统提示",
                content: "是否确认删除" + event.name,
                onOk: function() {
                    me.$store.dispatch("scriptTypeModule/deleteScriptType", event.scriptTypeId).then(res => {
                        if (res.data.success) {
                            me.$refs.scriptType.refresh();
                            me.$message.success("删除成功");
                        }
                    });
                },
                onCancel: function() {
                    //console.log("点击取消");
                }
            });
        },
         //设置启用状态
        getStatus(data) {
            // console.log(data)
            this.$store.dispatch("scriptTypeModule/status", {
                enabled: !data.enabled,
                id: data.scriptTypeId
            }).then(res => {
                if (res.data && res.data.success) {
                    this.$message['success'](res.data.data,1);
                    this.$refs.scriptType.refresh();
                }
            }); //传switch控件的值到管理界面
        },
        // 编辑修改脚本分类
        editScriptType(event) {
            this.visible = true;
            this.$store.dispatch("scriptTypeAddModule/getList", event.scriptTypeId).then();
        },
    }
}
</script>
<style scoped lang='less'>
</style>