<template>
    <div id="systemLog" class="moduleWrap">
         <systemLogDetails :visible="visible" @ok="okDialog" @hide="hideDialog"></systemLogDetails>
        <v-row  class="nav-header">
            <v-col span="12">
                <h1>系统日志</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '38px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>日志管理</v-breadcrumb-item>
                    <v-breadcrumb-item>系统日志</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border"  ref="boxBorder">
            <div  ref="morePanelWrap">
                <v-more-panel>
                    <v-form slot="form">
                        <v-form-item label="日志类型" prop="type">
                            <v-select placeholder="请选择日志类型" :data="logTypeMap" style="width:150px" v-model="systemLogForm.type"></v-select>
                        </v-form-item>
                        <!--  <v-form-item label="日志描述">
                            <v-input type="text" placeholder="请输入日志描述"></v-input>
                        </v-form-item> -->
                        <v-form-item label="用户序列号">
                            <v-input placeholder="请输入用户序列号"></v-input>
                        </v-form-item>
                        <v-form-item label="所属系统">
                            <v-select placeholder="请选择所属系统" :data="logSelectList"   style="width:150px" v-model="systemLogForm.systemName"></v-select>
                        </v-form-item>
                        <v-form-item>
                            <v-date-picker clearable v-model="systemLogForm.startTime" @change="change" format="yyyy-MM-dd"></v-date-picker>
                            <label> 至 </label>
                            <v-date-picker clearable v-model="systemLogForm.endTime" @change="change" format="yyyy-MM-dd"></v-date-picker>
                        </v-form-item>
                    </v-form>
                    <v-button slot="control" type="primary" html-type="button" icon="search" @click="searchTable">查询</v-button>
                </v-more-panel>
            </div>
            <div class="container-fluid" ref="containerFluid">
                <v-data-table ref="systemLogTable" :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" bordered emptyText="暂时找不到你要的信息......">
                    <template slot="td" slot-scope="props">
                        <div v-if="props.column.field=='operation'" class="text-center">
                            <v-button-group>
                                <v-button type="primary" title="详情" @click="showDetailsModal(props.item)">
                                    <v-icon type="file-text"></v-icon>
                                </v-button>
                            </v-button-group>
                        </div>
                        <div v-else-if="props.column.field === 'type'">
                            <span v-for="etype in logTypeMap"  v-if="props.content==etype.value">{{etype.text}}</span>
                        </div>
                        <div v-else-if="props.column.field === 'description'" class="log">
                            <span v-html="props.content"></span>
                        </div>
                        <span v-else v-html="props.content"></span>
                    </template>
                </v-data-table>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import systemLogDetails from './systemLogWidget/systemLogDetails'

export default {
    name: 'login',
    components: {
        systemLogDetails,
    },
    computed: {
        ...mapState({
            systemLogForm: state => state.systemLogModule.systemLogForm,
            logTypeMap: state => state.systemLogModule.logTypeMap,
            logSelectList: state => state.systemLogModule.logSelectList
        })
    },
    mounted() {
        this.$store.dispatch('systemLogModule/enumerate');
        this.$store.dispatch('systemLogModule/getSelectList');
    },
    data: function() {
        return {
            name: 'template',
            logType:'',//日志类型
            logDesc:'',//日志描述
            userId:'',//用户序列号
            systemSelectList:'',//所属系统
            startDate:'',//开始日期
            endDate:'',//结束日期
            visible: false,
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 15
            },
            columns: [
            { title: "系统日志ID", field: "systemLogId" },
            { title: "日志类型", field: "type" },
            { title: "所属系统", field: "systemName" },
            { title: "创建时间", field: "createTime" },
            { title: "用户序号", field: "userId" },
            { title: "日志描述", field: "description",width:"300px"},
            { title: "操作", field: "operation",className: 'text-center'},
        ],
         responseParamsName: {
            total: 'totalCount',
            results: 'result'
          },
          loadData(params) {
               return this.$store.dispatch('systemLogModule/getPageList', {
                   pageNo: params.pageNo, //当前页
                   pageSize: params.pageSize
               }).then(res => {
                console.log(res);
                    return res
               })
           }
        };
    },
    methods: {
        change(time) {
            console.log('change:', time)
        },
        //添加对话框显示
        showDetailsModal(event) {
            this.visible = true;
            this.$store.dispatch("systemLogModule/getSystemLog", event.systemLogId);
        },
        okDialog() {
            this.visible = false;
            // this.$refs.reginTable.refresh(); //刷新表格数据
        },
        hideDialog() {
            this.visible = false;
        },
        //查询系统日志
        searchTable() {
            // return this.$store.dispatch('systemLogModule/getPageList', {
            //        pageNo: params.pageNo, //当前页
            //        pageSize: params.pageSize,
            //        type:params.logType,
            //        description:params.logDesc,
            //        userId:params.userId,
            //        systemName:params.systemName,
            //    }).then(res => {
            //     console.log(res);
            //         return res
            //    })
            this.$refs.systemLogTable.reload();
        },
    }
}
</script>
<style type="text/css">
       .log span{
        display: inline-block;
        width: 300px;
        white-space:normal;
        word-break:break-all;
        word-wrap:break-word; 
       }
</style>
<style scoped lang='less'>
 
</style>