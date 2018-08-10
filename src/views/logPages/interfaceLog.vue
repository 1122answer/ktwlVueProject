<template>
	<div id="interfaceLog">
		<v-row class="padding-bottom-10">
            <v-col span="12">
                <h1>接口日志</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '38px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>日志管理</v-breadcrumb-item>
                    <v-breadcrumb-item>接口日志</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border padding-10">
            <v-more-panel>
                 <v-form slot="form">
                     <v-form-item label="所属系统">
                          <v-select placeholder="请选择所属系统" :data="[{value: '0', label: '全部系统'},{value: '1', label: '系统A'},{value: '2', label: '系统B'},{value: '3', label: '系统C'}]"   style="width:150px" ></v-select>
                     </v-form-item>
                     <v-form-item label="会话序号">
                         <v-input type="text" placeholder="请输入会话序号"></v-input>
                     </v-form-item>
                     <v-form-item label="用户序列">
                         <v-input placeholder="请输入用户序列"></v-input>
                     </v-form-item>
                      <v-form-item label="帐号">
                         <v-input placeholder="请输入帐号"></v-input>
                     </v-form-item>
                      <v-form-item>
                          <v-date-picker clearable @change="change" format="yyyy-MM-dd"></v-date-picker>
                          <label> 至 </label>
                          <v-date-picker clearable @change="change" format="yyyy-MM-dd"></v-date-picker>
                    </v-form-item>
                 </v-form>
                 <v-button slot="control" type="primary" html-type="button" icon="search">查询</v-button>
            </v-more-panel>
            <v-data-table ref="orgtypeTable" :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" bordered emptyText="暂时找不到你要的信息......">
                <template slot="td" slot-scope="props">
                    <div v-if="props.column.field=='operation'">
                        <v-button-group>
                            <v-button type="primary" title="详情" @click="editlist(props.item)">
                                <v-icon type="edit"></v-icon>
                            </v-button>
                        </v-button-group>
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

  export default {
    name: 'login',
    components: {
    },
    computed: {
    },
    mounted() {
      
    },
    data: function() {
      return {
         labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 15
            },
            columns: [
            { title: "接口日志ID", field: "interfaceLogId" },
            { title: "所属系统", field: "systemName" },
            { title: "会话序号", field: "sessionId" },
            { title: "用户序号", field: "userId" },
            { title: "账户", field: "userInfo" },
            { title: "创建时间", field: "createTime" },
            { title: "操作", field: "operation" },
        ],
         name: 'template',
         date1: '2015-12-06',
         responseParamsName: {
            total: 'totalCount',
            results: 'result'
          },
         loadData(params) {
             return this.$store.dispatch('interfaceLogModule/getPageList', {
                 pageNo: params.pageNo, //当前页
                 pageSize: params.pageSize
             }).then(res => {
                console.log(res);
                 return res;
             })
         },
      };
    },
    methods: {
        change(time) {
            console.log('change:', time)
        },
    }
  }
</script>
<style scoped lang='less'>
    
</style>