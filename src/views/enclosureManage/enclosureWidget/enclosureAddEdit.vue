<template>
    <v-modal :title="dialogtitle" :visible="visible" @ok="addOk" @cancel="addCancel" :width="800">
            <v-form direction="horizontal" ref="newruleForm" :model="newruleForm" :rules="rules">
                <v-row>
                  <v-col span="12">
                      <v-form-item label="所属系统" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span v-if="formdisabled">{{newruleForm.systemName}}</span>
                           <v-select v-else placeholder="选择通用系统" size="lg" :data="getsystemSelect" v-model="newruleForm.systemId" style="width:100%" :optionOnChange="true" @change="addsystem"></v-select>
                      </v-form-item> 
                  </v-col> 
                  <v-col span='12'>
                        <v-form-item label="所属区域" :label-col="labelCol" :wrapper-col="wrapperCol">
                          <span v-if="formdisabled">{{newruleForm.regionName}}</span>
                               <v-tree-select v-else placeholder="请选择区域" notfound="无法找到" :data="regionData" size="lg" label="label" :optionOnChange="true" @select="regionChange" style="width:100%;" :allowClear="true" :popupContainer="commandRegion">
                               </v-tree-select>
                               <div id='desSystemRegion'></div>
                       </v-form-item>
                  </v-col>
                  <v-col span="12">
                      <v-form-item label="分组名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="groupId"  has-feedback>
                         <span v-if="formdisabled">{{newruleForm.groupName}}</span>
                         <v-select v-else search placeholder="分组名称" :data="groupSelect" v-model="newruleForm.groupId" :optionOnChange="true" @change="groupchange" size="lg" style="width:100%"></v-select>
                      </v-form-item> 
                  </v-col> 
                  <v-col span="12">
                      <v-form-item label="要件标题" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback prop="title">
                           <span v-if="formdisabled">{{newruleForm.title}}</span>
                           <v-input v-else placeholder="请输入要件标题" size="large" v-model="newruleForm.title" :disabled="formdisabled"></v-input>
                      </v-form-item> 
                  </v-col> 

                  <v-col span="12">
                      <v-form-item label="要件类型" :label-col="labelCol" :wrapper-col="wrapperCol" prop="cconfigType"  has-feedback>
                        <span v-if="watch">{{newruleForm.cconfigType}}</span>
                         <v-select v-else placeholder="要件类型" size="lg" v-model="newruleForm.cconfigType" :data="[{value:'复印件',label:'复印件'},{value:'原件',label:'原件'}]" style="width:100%"></v-select>
                      </v-form-item> 
                  </v-col> 
                  <v-col span="6"> 
                       <v-form-item label="页数" :label-col="labelCol" :wrapper-col="wrapperCol" prop="pageCount">
                       <span v-if="watch">{{newruleForm.pageCount}}</span>
                         <v-input-number v-else :min="1" :max="100" v-model="newruleForm.pageCount"></v-input-number>
                     </v-form-item>
                  </v-col>   
                  <v-col span="6"> 
                       <v-form-item  label="份数" :label-col="labelCol" :wrapper-col="wrapperCol" prop="cconfigCount">
                          <span v-if="watch">{{newruleForm.cconfigCount}}</span>
                          <v-input-number v-else :min="1" :max="100" v-model="newruleForm.cconfigCount"></v-input-number>
                     </v-form-item>
                  </v-col>  
                  <v-col span="12">
                      <v-form-item label="内网操作权限" :label-col="labelCol" :wrapper-col="wrapperCol" prop="operateTypeInter">
                         <v-select placeholder="内网操作权限" size="lg" v-model="newruleForm.operateTypeInter" :data="operateSelect" style="width:100%" :disabled="watch"></v-select>
                      </v-form-item> 
                  </v-col>  
                  <v-col span="12"> 
                       <v-form-item label="排序号" :label-col="labelCol" :wrapper-col="wrapperCol" prop="sortId">
                        <span v-if="watch">{{newruleForm.sortId}}</span>
                         <v-input-number v-else :min="1" :max="500" v-model="newruleForm.sortId" style="width:100%;"></v-input-number>
                     </v-form-item>
                  </v-col>  
                  <v-col span="12">
                      <v-form-item label="外网操作权限" :label-col="labelCol" :wrapper-col="wrapperCol" prop="operateTypeNet">
                         <v-select placeholder="外网操作权限" size="lg"  v-model="newruleForm.operateTypeNet" :data="operateSelect" style="width:100%" :disabled="watch"></v-select>
                      </v-form-item> 
                  </v-col>  
                  <v-col span="12">
                      <v-form-item label="文档类型" :label-col="labelCol" :wrapper-col="wrapperCol" prop="fileType">
                         <v-select placeholder="文档类型" size="lg" v-model="newruleForm.fileType" :data="FiletypeSelect" style="width:100%" :disabled="watch"></v-select>
                      </v-form-item> 
                  </v-col>  
      <!--             <v-col span="12">
                      <v-form-item label="范例" :label-col="labelCol" :wrapper-col="wrapperCol">
                           <v-upload :name="img_type" :action="action" multiple @change="onChange">
                              <v-button type="ghost">
                                <v-icon type="upload"></v-icon>上传文件
                              </v-button>
                          </v-upload>
                      </v-form-item> 
                  </v-col>  
                  <v-col span="12">
                      <v-form-item label="范例说明" :label-col="labelCol" :wrapper-col="wrapperCol" prop="type"  has-feedback>
                         <v-input placeholder="范例说明" size="large"></v-input>
                      </v-form-item> 
                  </v-col>   -->
                  <v-col span="12">
                      <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
                         <span v-if="watch">
                           <span v-if="newruleForm.remark==1">是</span>
                           <span v-else>是</span>
                         </span>

                         <v-switch v-else v-model="newruleForm.isEnabled" :true-value="1" :false-value="0">
                              <span slot="checkedChildren">开</span>
                              <span slot="unCheckedChildren">关</span>
                         </v-switch>
                      </v-form-item> 
                  </v-col>  
                  <v-col span="24">
                      <v-form-item label="备注" :label-col="{span:3}" :wrapper-col="{span:20}">
                         <span v-if="watch">{{newruleForm.remark}}</span>
                         <v-input v-else placeholder="填写备注" type="textarea" size="large" v-model="newruleForm.remark"></v-input>
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
            <v-button key="cancel" type="ghost" size="large" @click="addCancel">
                取消
            </v-button>
            <v-button key="confirm" type="primary" size="large" @click="addOk">
                确定
            </v-button>
        </div>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: ["visible"],
    computed: {
        ...mapState({
           watch:state=>state.enclosureAddModule.watch,
           newruleForm:state=>state.enclosureAddModule.newruleForm,
           FiletypeSelect: state => state.enclosureAddModule.FiletypeSelect,
           operateSelect: state => state.enclosureAddModule.operateSelect,
           groupSelect: state => state.enclosureAddModule.groupSelectlist,
           getsystemSelect: state => state.commonSelect.systemSelect,
           regionData: state => state.commonSelect.regionSelect,
           dialogtitle: state => state.enclosureAddModule.dialogtitle,
           formdisabled: state => state.enclosureAddModule.formdisabled,
        })
    },
    watch:{
      visible(newVal){
        if(newVal){
          this.$store.dispatch("commonSelect/getRegionSelectTree",12);
        }
      }
    },
  mounted() {
    this.$store.dispatch("enclosureAddModule/Filetype");
    this.$store.dispatch("enclosureAddModule/groupSelect");
    this.$store.dispatch("enclosureAddModule/operateSelect");
    this.$store.dispatch("commonSelect/getsystemSelect");

    
  }, 
    data() {
        return {
    commandRegion() {
            var selector = document.getElementById('desSystemRegion');
            return selector;
        },
          // img_type:"file",    //允许上传类型
          // action:"/upload",   //上传路径
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 15
            },
            rules:{
                title: [{
                    required: true,
                    message: '请输入要件标题'
                }],
                groupId: [{
                    required: true,
                    message: '请选择分组'
                }],
                cconfigType: [{
                    required: true,
                    message: '选择要件类型'
                }],
                pageCount: [{
                    required: true,
                    message: '请填写要件页数'
                }],
                cconfigCount: [{
                    required: true,
                    message: '请填写要件份数'
                }],
                operateTypeInter: [{
                    required: true,
                    message: '请选择内网权限'
                }],
                operateTypeNet: [{
                    required: true,
                    message: '请选择外网权限'
                }],
                sortId: [{
                    required: true,
                    message: '请填写排序号'
                }],
                fileType: [{
                    required: true,
                    message: '请选择文档类型'
                }],
              }
        }
    },
    methods: {
        addOk() {
               this.$refs.newruleForm.validate((valid) =>{ 
                if (valid) {
                  if (this.newruleForm.cconfigId==""||this.newruleForm.cconfigId==null) {
                   this.$store.dispatch("enclosureAddModule/addlist").then( res => {
                          if (res.data.success) {
                            this.$emit("ok")
                            this.$message.success("添加成功");
                          }
                       })
                  }else{
                    this.$store.dispatch("enclosureAddModule/editlist").then( res => {
                       if (res.data.success) {
                         this.$emit("ok")
                         this.$message.success("修改成功");
                       }
                    })
                  }
                }else{
                  return
                }
            });
        },
        addCancel() {
           this.$emit('cancel');
        },
        hide(){
           this.$emit('cancel');
        },
        addsystem(data){
           this.$store.commit("enclosureAddModule/ADDSYSTEMID",data);
        },
        regionChange(data){
            this.$store.commit("enclosureAddModule/ADDGETREGION",data);
        },
        groupchange(data){
           this.$store.commit("enclosureAddModule/ADDGROUP",data);
        }
    }
}
</script>
<style scoped lang='less'>
#desSystemRegion {
    position: relative;
}
</style>