<template>
	<div id="businessLog">
		<v-row class="padding-bottom-10">
            <v-col span="12">
                <h1>业务日志</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '38px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>日志管理</v-breadcrumb-item>
                    <v-breadcrumb-item>业务日志</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border padding-10">
            <v-more-panel>
                 <v-form slot="form">
                     <v-form-item label="业务日志">
                         <v-input placeholder="请输入业务日志"></v-input>
                     </v-form-item>
                     <v-form-item label="日志标题">
                         <v-input type="text" placeholder="请输入标题"></v-input>
                     </v-form-item>
                     <v-form-item label="业务名称">
                         <v-input placeholder="请输入机构编码"></v-input>
                     </v-form-item>
                     <v-form-item label="所属系统">
                          <v-select placeholder="请选择所属系统" :data="[{value: '0', label: '未激活'},{value: '1', label: '正常'},{value: '2', label: '冻结'},{value: '3', label: '禁用'}]"   style="width:150px" ></v-select>
                     </v-form-item>
                     <v-form-item label="账号">
                         <v-input placeholder="请输入账号"></v-input>
                     </v-form-item>
                     <v-form-item>
                          <v-date-picker clearable  @change="change" format="yyyy-MM-dd"></v-date-picker>
                          <label> 至 </label>
                          <v-date-picker clearable  @change="change" format="yyyy-MM-dd"></v-date-picker>
                    </v-form-item>
                 </v-form>
                 <v-button slot="control" type="primary" html-type="button" icon="search">查询</v-button>
            </v-more-panel>
            <v-data-table ref="orgtypeTable" :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" class="    margin-top-15" bordered emptyText="暂时找不到你要的信息......">
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
</template>

<script>
  import { mapState } from 'vuex' 

  export default {
    components: {
      //addPane
    },
    computed: {
       ...mapState({
          // name: state => state.businessLogModule.name,
       })
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
            { title: "业务日志ID", field: "name" },
            { title: "日志标题", field: "registerType" },
            { title: "业务名称", field: "createTime" },
            { title: "所属系统", field: "isEnabled" },
            { title: "创建时间", field: "zzzzz" },
            { title: "操作", field: "operation" },
        ],
            // 表格渲染
    responseParamsName: {
            total: 'totalCount',
            results: 'result'
          },
           loadData(params) {
               return this.$store.dispatch('businessLogModule/businessList', {
                   pageNo: params.pageNo, //当前页
                   pageSize: params.pageSize
               }).then(res => {
                    
               })
           },
      };
    },
    methods: {

    }
  }
</script>
<style scoped lang='less'>
.box-border {
    border: 1px solid #e9e9e9;
    border-radius: 3px;
    min-height: 400px;
}
</style>