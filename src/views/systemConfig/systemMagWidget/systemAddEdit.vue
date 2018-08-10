<template>
    <v-modal :title="titleName"  :visible="visible" @ok="customFooterOk" @cancel="customFooterCancel" @editbtn="editbtn" :width="700" >
        <v-form direction="horizontal" :model="systemForm" :rules="rules" ref="systemForm">
           <v-row>
               <v-col span="11">
                   <v-form-item label="系统名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="systemName" has-feedback>
                       <v-input placeholder="请输入系统名称" size="large" v-model="systemForm.systemName" :disabled="iptstate"></v-input>
                   </v-form-item>
               </v-col>
               <v-col span="11">
                   <v-form-item label="英文名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="engName" has-feedback>
                       <v-input placeholder="请输入英文名称" size="large" v-model="systemForm.engName" :disabled="iptstate"></v-input>
                   </v-form-item>
               </v-col>
               <v-col span="11">
                   <v-form-item label="系统编号" :label-col="labelCol" :wrapper-col="wrapperCol" prop="systemId" has-feedback>
                       <v-input placeholder="请输入系统编号" size="large" v-model="systemForm.systemId" :disabled="sysidstate"></v-input>
                   </v-form-item>
               </v-col>
               <v-col span="11">
                   <v-form-item label="系统简称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="shortName" has-feedback>
                       <v-input placeholder="请输入系统简称" size="large" v-model="systemForm.shortName" :disabled="iptstate"></v-input>
                   </v-form-item>
               </v-col>
               <v-col span="11">
                   <v-form-item label="系统描述" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback>
                       <v-input placeholder="请输入系统描述" size="large" v-model="systemForm.sysDesc" :disabled="iptstate"></v-input>
                   </v-form-item>
               </v-col>
               <v-col span="11">
                   <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback>
                       <v-switch v-model="systemForm.isEnabled">
                             <span slot="checkedChildren">开</span>
                             <span slot="unCheckedChildren">关</span>
                       </v-switch>
                   </v-form-item>
               </v-col>
               <v-col span="11">
                   <v-form-item label="操作权限" :label-col="labelCol" :wrapper-col="wrapperCol" prop="modifyType" has-feedback>
                      <v-select  v-model="systemForm.modifyType"size="lg" placeholder="请选择操作权限" :data="[{value: '0', label: '只读'}, {value:'1', label:'可修改'},{value:'2', label:'可修改删除'}]" :disabled="sysidstate"></v-select>
                   </v-form-item>
               </v-col>
               <v-col span="11">
                   <v-form-item label="系统图标" :label-col="labelCol" :wrapper-col="wrapperCol" prop="sysIcon" has-feedback>
                       <div style="width:80px; height: 80px">
                          <v-upload :name="name" :action="action" drag @change="onChange" v-model="systemForm.sysIcon">
                             <v-icon type="plus"></v-icon>
                         </v-upload>
                       </div>
                   </v-form-item>
               </v-col>
           </v-row>
        </v-form> 
         <div slot="footer" v-if="watch">
            <v-button key="confirm" type="primary" size="large" @click="hide">
                返回
            </v-button>
       <!--      <v-button key="confirm" type="primary" size="large" @click="editbtn">
                修改
            </v-button> -->
        </div>
         <div slot="footer" v-else>
            <v-button key="cancel" type="ghost" size="large" @click="customFooterCancel">
                取消
            </v-button>
            <v-button key="confirm" type="primary" size="large" @click="customFooterOk">
                确定
            </v-button>
        </div>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'

export default {
    // name: 'this',
    props: ["visible"],
    computed: {
        ...mapState({
            systemForm:state => state.SystemMagAddEditModule.systemForm,
            titleName:state => state.SystemMagAddEditModule.titleName,
            iptstate:state => state.SystemMagAddEditModule.iptstate,              //弹窗允许输入状态
            watch:state => state.SystemMagAddEditModule.watch,                 //弹窗确定按钮
            sysidstate:state => state.SystemMagAddEditModule.sysidstate,                 //禁用id输入框
        }), 
    },
    data: function() {
        return {
           name: 'file',           //上传的类型
           action: '/upload',      //上传的地址
          rolebutstate:false,
            title:"添加",
            rules: {
                systemName: [{
                    required: true,
                    message: '请输入角色名称'
                }],
                engName: [{
                    required: true,
                    message:'请输入英文名称'
                }],
                systemId: [{
                    required: true,
                    message: '请输入系统编号'
                }],
                shortName: [{
                    required: true,
                    message: '请输入系统简称'
                }],
                modifyType: [{
                    required: true,
                    message: '请选择操作权限'
                }],
                sysIcon: [{
                    required: true,
                    message: '请上传系统图标'
                }],
            },
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 15
            },
        };
    },

    methods: {
        customFooterOk() {
              this.$refs['systemForm'].validate((valid) => {
                   if (valid) {  
                    if (this.systemForm.createUserId==""||this.systemForm.createUserId==null) {
                       this.$store.dispatch("SystemMagAddEditModule/AddList").then(res=>{
                           if (res.data.success) {
                              this.$message.success("添加成功");
                              this.$emit('ok');
                           }
                       });
                    }else{
                      this.$store.dispatch("SystemMagAddEditModule/EditList").then(res=>{
                         if (res.data.success) {
                            this.$message.success("修改成功");
                            this.$emit('ok');
                         }
                      })
                    }
                        
                  }else{
                    return
                  }
              })
         },

        customFooterCancel() {
            this.$emit('cancel');
        },
        hide(){
          this.$emit('cancel');
        },
        onChange(data){
          // alert(123)
          console.log(data)
        },
        editbtn(){
          this.$emit('editbtn');
        }
    }
}
</script>