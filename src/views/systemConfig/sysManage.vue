<template>
    <div id="businessLog">
        <systemAddEdit :visible="visible"  @ok="handleOk" @cancel="handleCancel" @editbtn="editbtn"></systemAddEdit>
        <v-row class="padding-bottom-10">
            <v-col span="12">
                <h1>系统管理</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '38px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>系统配置</v-breadcrumb-item>
                    <v-breadcrumb-item>系统管理</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border padding-10">
            <v-more-panel>
                 <v-form slot="form">
                     <v-form-item label="系统编号">
                         <v-input placeholder="请输入系统编号" v-model="searchForm.systemId"></v-input>
                     </v-form-item>
                     <v-form-item label="系统名称">
                         <v-input type="text" placeholder="请输入标题" v-model="searchForm.systemName"></v-input>
                     </v-form-item>
                     <v-form-item label="系统简称">
                         <v-input placeholder="请输入机构编码" v-model="searchForm.shortName"></v-input>
                     </v-form-item>
                     <v-form-item label="英文名称">
                         <v-input placeholder="请输入账号" v-model="searchForm.engName"></v-input>
                     </v-form-item>
                     <v-form-item label="是否开启">
                          <v-select placeholder="" v-model="searchForm.isEnabled" :data="[{value:'true', label: '是'},{value: 'false', label: '否'}]"   style="width:150px" ></v-select>
                     </v-form-item>
                 </v-form>
                 <v-button slot="control" size="large" type="primary" html-type="button" icon="search" @click="searchlist">查询</v-button>
                 <v-button type="primary" size="large" class="pull-right" @click="showsystemadd" style="margin-top:2px;">
                       <v-icon type="plus"></v-icon> 添加</v-button>
                 </v-button>
            </v-more-panel>
            <v-data-table ref="systemTable" :data="loadData" :responseParamsName="responseParamsName" :columns='columns' size="small" class="    margin-top-15" bordered emptyText="暂时找不到你要的信息......">
                <template slot="td" slot-scope="props">
                    <div v-if="props.column.field=='operation'" class="text-center">
                        <v-button-group>
                            <v-button type="info" title="查看详情" @click="findlist(props.item)">
                                <v-icon type="file-text"></v-icon>
                            </v-button>
                            <v-button type="primary" title="编辑" @click="editlist(props.item)" v-if="props.item.modifyType!='0'">
                                <v-icon type="edit"></v-icon>
                            </v-button>  
                            <v-button  v-if="props.item.modifyType!='0' && props.item.modifyType=='2'" type="error" title="删除" @click="dellist(props.item)">
                                <v-icon type="delete"></v-icon>
                            </v-button>
                        </v-button-group>
                    </div>
                   <div v-else-if="props.column.field === 'isEnabled'">
                   <!--      <v-switch v-model="props.content" @change="changeisEnabled(props.item)">
                             <span slot="checkedChildren">开</span>
                             <span slot="unCheckedChildren">关</span>
                        </v-switch> -->
                        <span v-if="props.content==false">
                            否
                        </span>
                        <span v-else>
                            是
                        </span>
                    </div>
                    <span v-else v-html="props.content"></span>
                </template>
            </v-data-table>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex' 
  import systemAddEdit from "./systemMagWidget/systemAddEdit"

  export default {
    components: {
      //addPane
      systemAddEdit,
    },
    computed: {
       ...mapState({
          searchForm: state => state.SystemMagModule.searchForm,
       })
    },
    mounted() {
      
    },
    data: function() {
      return {
            visible:false,
            labelCol: {
                span: 9
            },
            wrapperCol: {
                span: 15
            },
         columns: [
            { title: "系统编号", field: "systemId" },
            { title: "系统名称", field: "systemName" },
            { title: "系统简称", field: "shortName" },
            { title: "英文名称", field: "engName" },
            { title: "是否开启", field: "isEnabled" },
            { title: "操作", field: "operation",width:"150px",className: 'text-center' },
        ],
            // 表格渲染
    responseParamsName: {
            total: 'totalCount',
            results: 'result'
          },
           loadData(params) {
               return this.$store.dispatch('SystemMagModule/SystemList', {
                   pageNo: params.pageNo-1, //当前页
                   pageSize: params.pageSize
               }).then(res => {
                    return res.data.data
               })
           },
      };
    },
    methods: {
        // 添加
     showsystemadd(){
        this.$store.commit("SystemMagAddEditModule/CHANGE_BASIC_ID");
        this.visible=true;
     },
     // 弹窗确定
     handleOk(){
        this.visible=false;
        this.$refs.systemTable.refresh();
     },
     // 弹窗取消
     handleCancel(){
         this.visible=false;
     },
     // 弹窗点击编辑
     editbtn(){
         this.visible=false;
         this.$store.commit("SystemMagAddEditModule/CHANGE_BASIC_ID");
     },
     // 查看详情
     findlist(event){
        this.visible=true;
        return this.$store.dispatch("SystemMagAddEditModule/WatchSystemList",event.systemId).then(res=>{
        })
     },
     // 编辑列表
     editlist(event){
        this.$store.commit("SystemMagAddEditModule/CHANGE_BASIC_ID");
        this.visible=true;
        return this.$store.dispatch("SystemMagAddEditModule/getSystemList",event.systemId)
     },
     // 删除列表
     dellist(event){
        let me = this;
        this.$modal.confirm({
             title: "系统提示",
             content: "是否确认删除"+event.systemName,
             onOk: function() {
                 me.$store.dispatch("SystemMagModule/SystemListDel",event.systemId).then(res => {
                 });

             },
             onCancel: function() {
             }
         });
     },
     searchlist(){
        this.$refs.systemTable.reload();
     },
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