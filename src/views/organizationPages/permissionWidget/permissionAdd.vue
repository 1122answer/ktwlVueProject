<template>
    <v-modal :title="titlename"
             :visible="visible"
             :confirmLoading="loading"
             :width=900
             @ok="handleOk"
             @cancel="handleCancel">
    <premissionList
         :visible="permisstion"
          @ok="addOk"
          @cancel="addCancel">
    </premissionList>
<div class="AlertContent">
    <v-form direction="horizontal" :model="AddForm" ref="AddForm" :rules="rules">
       <v-row>
           <v-col span="8">
               <v-form-item label="上级目录" :label-col="{span:6}" :wrapper-col="{span:15}" prop="parentId">
                     <v-select size="large" placeholder="请选择上级目录"  :data="selectmenu" v-model="AddForm.parentId" :disabled="disable"></v-select>
                 </v-form-item>
           </v-col>
           <v-col span="8">
               <v-form-item label="权限类型" :label-col="labelCol" :wrapper-col="wrapperCol" prop="flag">
                     <v-select size="large" placeholder="请选择活动区域" :data="[{value: '2', label: '菜单权限'}, {value: '3', label:'功能权限'}]"  v-model="AddForm.flag"></v-select>
                 </v-form-item>
           </v-col>
           <v-col span="8">
                <v-form-item label="权限名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="name">
                      <v-input placeholder="请输入名称" size="large" v-model="AddForm.name"></v-input>
                 </v-form-item>
           </v-col>
       </v-row>
       <!-- <v-row> -->
         <!--   <v-col span="7">
               <v-form-item label="权限编号" :label-col="labelCol" :wrapper-col="wrapperCol">
                      <v-input placeholder="请输入权限编号" size="large" v-model="AddForm.permissionId"></v-input>
                </v-form-item>
           </v-col> -->
        <!--    <v-col span="7">
               <v-form-item label="上级权限编号" :label-col="{span:6}" :wrapper-col="{span:16}">
                      <v-input size="large" v-model="AddForm.parentId"></v-input>
               </v-form-item>
           </v-col> -->
       <!-- </v-row> -->
       <v-row>
           <v-col span="8">
                <v-form-item label="所属系统" :label-col="labelCol" :wrapper-col="wrapperCol">
                     <v-select size="large" placeholder="请选择所属系统"  :data="getsystemSelect" v-model="AddForm.systemId" :optionOnChange="true" @change="changesystem"></v-select>
                 </v-form-item>
           </v-col>
           <v-col span="8">
                <v-form-item label="排序码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="sortId">
                      <v-input-number :min="1" :max="1000" size="large" v-model="AddForm.sortId"  placeholder="请输入排序码，越小越靠前"></v-input-number>
                 </v-form-item>
           </v-col>
           <v-col span="7">
               <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
                     <v-switch v-model="AddForm.enabled"></v-switch>
                 </v-form-item>
           </v-col>
       </v-row>
       <v-row>
           <v-col span="11">
                 <v-form-item label="后端所属系统" :label-col="{span:6}" :wrapper-col="{span:15}">
                      <v-input placeholder="请输入后端所属系统代码" size="large"  v-model="AddForm.appId"></v-input>
                 </v-form-item>
           </v-col>
           <v-col span="11">
                 <v-form-item label="后端所属模块" :label-col="{span:6}" :wrapper-col="{span:15}">
                      <v-input placeholder="请输入后端所属模块代码" size="large"  v-model="AddForm.moduleId"></v-input>
                 </v-form-item>
           </v-col>
       </v-row>
       <v-row>
           <v-col span="16">
                 <v-form-item label="URL地址" :label-col="{span:3}" :wrapper-col="{span:21}">
                      <v-input placeholder="请输入URL地址" size="large"  v-model="AddForm.url"></v-input>
                 </v-form-item>
           </v-col>
       </v-row>
       <v-row>
           <v-col span="16">
                 <v-form-item label="备注信息" :label-col="{span:3}" :wrapper-col="{span:21}">
                    <v-input type="textarea" v-model="AddForm.remark" placeholder="请输入备注信息" style="resize:none;"></v-input>
                </v-form-item>
           </v-col>
       </v-row>
    </v-form> 
     <div style="border-top:1px solid #f2f2f2;">
        <h4 class="padding-top-20">权限列表</h4>
        <v-row>
            <v-col span="24" class="text-center">
                  <v-button type="primary" class="pull-right" size="large" @click="addDiag"><v-icon type="plus"></v-icon>添加</v-button>
            </v-col>
        </v-row>
        <v-data-table ref="prelistTable" :data="loadData" :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" bordered emptyText="暂时找不到你要的信息......">
           <template slot="td" slot-scope="props">
               <div v-if="props.column.field=='myOperation'">
                  <v-button-group>
                 <!--     <v-button type="primary" title="编辑" @click="editRole(props.item)">
                         <v-icon type="edit"></v-icon>
                     </v-button> -->
                     <v-button type="error" title="删除" @click="deletaRole(props.item)"> 
                         <v-icon type="delete"></v-icon>
                     </v-button>
                  </v-button-group>
             </div>
             <div v-else-if="props.column.field === 'enabled'" @click="getStatus(props.item)">
                 <v-switch v-model="props.content"></v-switch>
             </div>
             <span v-else v-html="props.content"></span>
          </template>
        </v-data-table>
    </div>
</div>
    </v-modal>
</template>
 
<script>
  import premissionList from "./PermissionNew";
 import { mapState } from "vuex";

    export default {
    components: {
          premissionList,
    },
    computed: {
         ...mapState({
         selectmenu: state => state.permissionAddModule.selectmenu,
         AddForm: state => state.permissionAddModule.AddlistForm,
         disable: state => state.permissionAddModule.disable,
         getsystemSelect:state => state.commonSelect.systemSelect,
         titlename:state => state.permissionAddModule.titlename,
         })
    },
        props:["visible"],
      created(){
        this.$store.dispatch("commonSelect/getsystemSelect");
        this.$store.dispatch('permissionAddModule/GetUpCataloglist').then( res => {})
        },
        data () {
            return {
              loading:false,
              checked:false,
          permisstion:false,
                labelCol:{
               span:6
           },
              wrapperCol: {
               span:15
           },
        responseParamsName: {
            total:'totalCount',
            results: 'result'
        },
            rules: {
                parentId:[{
                    required: true,
                    message: '请选择上级目录'
                }],
                flag:[{
                    required: true,
                    message: '请选择权限类型'
                }],
                name:[{
                    required: true,
                    message: '请填写权限名称'
                }],
                sortId:[{
                    required: true,
                    message: '请填写排序码'
                }],
            },
        columns: [
            { title: "操作按钮名称", field:"actionName"},
            { title: "按钮权限编码", field:"actionId"},
            { title: "启用状态", field:"enabled"},
            { title: "备注", field:"remark"},
            { title: "操作", field:"myOperation"},
        ],

        loadData(params) {
            return this.$store.dispatch('permissionAddModule/permissionList',).then(res => {
              // console.log(res)
              return res
            })
         },
        }
        },
        methods: {
            handleOk () {
             this.$refs.AddForm.validate((valid) =>{ 
                 if (valid) {
                  if (this.AddForm.permissionId==""||this.AddForm.permissionId==null) {
                   this.$store.dispatch('permissionAddModule/Addpermissionlist').then( res => {
                          if (res.data.success) {
                            this.$emit("ok")
                            this.$message.success("添加成功");
                          }
                       });
                  }else{
                   this.$store.dispatch('permissionAddModule/Editpermissionlist').then( res => {
                          if (res.data.success) {
                            this.$emit("ok")
                            this.$message.success("修改成功");
                          }
                       });
                 }
                }else{
                  return
                }
            });
                
            },
            submitTable(){
            },
            handleCancel () {
              this.$emit("cancel")
            },
            // 删除权限
            deletaRole(event){
              console.log(event)
                this.$store.dispatch('permissionAddModule/Delpermission',event).then( res => {
                   if (res) {
                    this.$message.success("删除成功");
                  }
                })

            },
            // 添加权限
            addDiag(){
              this.$store.commit("permissionAddModule/CLEAN_UP_NEWFORM");
              this.permisstion = true 
            },
            // 编辑权限
            editDiag(){
              this.permisstion = true 
            },
            addOk(){
              this.$refs.prelistTable.refresh(); //自动执行
              this.permisstion = false 
            },
            addCancel(){
              this.permisstion = false 
            },
            // 选择系统
            changesystem(data){
                this.$store.commit("permissionAddModule/CHENGE_SYS",data)
            }
        }
    }
</script>
<style scoped lang='less'>
    .AlertContent{
        max-height:600px;
        overflow-y:auto;
    }
    .tab-pre tr{
        height: 41px;
    }
</style>