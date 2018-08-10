<template>
    <v-modal title="添加目录"
             :visible="visible"
             @ok="catalogOk"
             @cancel="catalogCancel">
        <v-form direction="horizontal" :model="catalogForm" :rules="rules" ref="catalogForm">
           <v-row>
              <v-form-item label="名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="name">
                  <v-input placeholder="请输入名称" size="large"  v-model="catalogForm.name"></v-input>
              </v-form-item>
           </v-row>
           <v-row>
              <v-form-item label="排序码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="sortId">
                 <v-input-number :min="1" :max="1000" size="large" placeholder="请输入排序码，越小越靠前"  v-model="catalogForm.sortId"></v-input-number>
             </v-form-item>
          </v-row>
            <v-row>
              <v-form-item label="上级目录" :label-col="labelCol" :wrapper-col="wrapperCol" prop="parentId">
                    <v-select  placeholder="" :data="selectmenu" size="lg" v-model="catalogForm.parentId" style="width:100%;"  :disabled="disState"></v-select>
               </v-form-item>
           </v-row>
            <v-row>
              <v-form-item label="所属系统" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <v-select :data="getsystemSelect" size="lg" v-model="catalogForm.systemId" style="width:100%;" :optionOnChange="true" @change="changesystem"></v-select>
               </v-form-item>
           </v-row>
          <v-row>
             <v-form-item label="图标" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <v-input placeholder="请选择图标" size="large"  v-model="catalogForm.icon"></v-input>
             </v-form-item>
          </v-row>
           <v-row>
             <v-col span="24">
                       <v-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol">
                          <v-input type="textarea" placeholder="备注" style="resize:none;" v-model="catalogForm.remark"></v-input>
                      </v-form-item>
                 </v-col>
           </v-row>
           <v-row>
             <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <v-switch v-model="catalogForm.enabled"></v-switch>
               </v-form-item>
            </v-row>
        </v-form>
    </v-modal>
</template>
<script >
import { mapState } from "vuex";
    export default {
    computed: {
         ...mapState({
        getsystemSelect:state => state.commonSelect.systemSelect,
        selectmenu: state => state.CatalogAddModule.selectmenu,
        catalogForm: state => state.CatalogAddModule.catalogForm,
        disState: state => state.CatalogAddModule.disable,
         })
    },
        props:["visible"],
      created(){
        this.$store.dispatch("commonSelect/getsystemSelect");
        this.$store.dispatch('CatalogAddModule/GetUpCataloglist').then( res => {

        });
    },
        data () {
            return {
             checked: false,
             labelCol:{
             span:6
           },
           wrapperCol: {
               span:15
           },
             ruleForm:{
             Name:"",
           },
          rules:{
            name:[{
                required: true,
                message: '请填写名称'
            }],
            sortId:[{
                required: true,
                message: '请填写排序码'
            }], 
            parentId:[{
                required: true,
                message: '请选择上级目录'
            }]
        },
        }
        },
        methods: {
            catalogOk () {
            this.$refs.catalogForm.validate((valid) =>{ 
                if (valid) {
                  if (this.catalogForm.permissionId==""||this.catalogForm.permissionId==null) {
                   this.$store.dispatch('CatalogAddModule/AddCataloglist').then( res => {
                          if (res.data.success) {
                            this.$emit("ok")
                            this.$message.success("添加成功");
                          }
                       });
                  }else{
                   this.$store.dispatch('CatalogAddModule/EditCataloglist').then( res => {
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
            catalogCancel () {
                this.$emit("cancel")
            },
            changesystem(data){
                this.$store.commit("CatalogAddModule/CHANGE_SYS",data)
            },
        }
    }
</script>