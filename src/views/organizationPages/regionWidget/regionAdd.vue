<template>
    <v-modal title="新增" :visible="visible" :confirmLoading="regionbutstate" @ok="handleOk" @cancel="handleCancel" :width="700">
        <v-form direction="horizontal" :model="regionForm" :rules="rules" ref="regionForm">
             <v-row>
                <v-col span="11">
                    <v-form-item label="行政区划代码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="regionCode" has-feedback>
                        <v-input placeholder="请输入行政区划代码" v-model="regionForm.regionCode" ></v-input>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="简称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="shortName" has-feedback>
                        <v-input placeholder="请输入简称" v-model="regionForm.shortName" ></v-input>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="级别" :label-col="labelCol" :wrapper-col="wrapperCol" prop="flag" has-feedback>
                        <v-select :data="enumerate" v-model="regionForm.flag"  placeholder="请选择级别" @change="change"></v-select>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="上级行政区划代码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="regionPcode" has-feedback>
                        <v-select :data="leveltree" search placeholder="请选择上级行政区划代码" v-model="regionForm.regionPcode" :disabled="disabledvalue"></v-select>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="行政区域名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="name" has-feedback>
                        <v-input placeholder="请输入行政区域名称" v-model="regionForm.name" ></v-input>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="外部编码1":label-col="labelCol" :wrapper-col="wrapperCol">
                        <v-input placeholder="请输入外部编码1" v-model="regionForm.externalCode1" prop="externalCode1" ></v-input>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="外部编码2" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <v-input placeholder="请输入外部编码2" v-model="regionForm.externalCode2" prop="externalCode2" ></v-input>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="外部编码3" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <v-input placeholder="请输入外部编码3" v-model="regionForm.externalCode3" prop="externalCode3" ></v-input>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <v-switch v-model="regionForm.isEnabled" prop="isEnabled" ></v-switch>
                    </v-form-item>
                </v-col>
                <!-- <v-col span="11">
                    <v-form-item label="修改类型" :label-col="labelCol" :wrapper-col="wrapperCol">
                         <v-select  :data="updataType"></v-select>
                    </v-form-item>
                </v-col> -->
            </v-row>
        </v-form>
    </v-modal>
</template>

<script >
import { mapState } from 'vuex'
    export default {
    computed: {
        ...mapState({
         regionForm: state => state.reginMenageListModule.regionForm,
         enumerate: state => state.reginMenageListModule.enumerate,
         leveltree: state=>state.reginMenageListModule.tree,


        })
    },

        mounted() {
            this.$store.dispatch("reginMenageListModule/enumerate");
            this.$store.dispatch("reginMenageListModule/leveltree",{
               flag:3
            });
      },
        props: ["visible"],
        data () {
            return {
                regionbutstate: false,
                // visible: false
                 flag:0,
                disabledvalue: false,

                labelCol:{
                    span:10
                },
                wrapperCol:{
                    span:14
                },

               
                 //修改类型
                // updataType: [{
                //     value: '1',
                //     label: '读取'
                // }, {
                //     value: '2',
                //     label: '修改',
                //     // disabled: true
                // }, {
                //     value: '3',
                //     label: '删除'
                // }],
                //表单验证数据
               
                rules: {
                    regionCode: [{
                        required: true,
                        message: '请输入行政区划代码'
                    }],
                    regionPcode: [{
                        required: true,
                        message: '请输入上级行政区划代码'
                    }],
                    name: [{
                        required: true,
                        message: '请输入行政区域名称'
                    }],
                    shortName: [{
                        required: true,
                        message: '请输入简称'
                    }],
                    flag: [{
                        required: true,
                        message: '请选择级别'
                    }]
                },

             }
        },

        methods: {
          handleOk() {
            this.$refs['regionForm'].validate(valid => { //表单验证
                if (valid) {
                      //添加行政区域
                      this.regionbutstate = true;
                       if(this.regionForm.regionId==null || this.regionForm.regionId==""){
                          this.$store.dispatch('reginMenageListModule/addRegion').then(res => {
                          this.regionbutstate = false;
                         if (res.data.success) {
                            this.$message.success("添加成功")
                            this.$emit('ok');
                         }else{
                            this.$message.error(res.data.data)
                         }
                          })
                       }
                       else{
                        //修改行政区域
                        this.$store.dispatch('reginMenageListModule/updateRegion').then(res=>{
                        this.regionbutstate = false;
                            if (res.data.success) {
                                 this.$message.success("修改成功")
                                 this.$emit('ok');
                            }else{
                                this.$message.error(res.data.data)
                            }
                        })
                       }
                 }
            });
             
          },

          handleCancel() {
            this.$emit('hide');
         },
        
         change(val){
            this.flag=val;
            this.$store.dispatch("reginMenageListModule/leveltree",{
               flag:this.flag
            });
            // console.log(val);
            if (val==0) {
                this.disabledvalue=true;
                this.rules.regionPcode[0].required=false;
            }else{
                this.disabledvalue=false;
                this.rules.regionPcode[0].required=true;
            }
         }
        }
    }
</script>