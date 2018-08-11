<template>
    <v-modal title="新增规则" :visible="visible" @ok="addOk" @cancel="addCancel" :maskClosable="false">
        <div class="numadd">
            <v-form direction="horizontal" :model="newruleForm" :rules="rules" ref="newruleForm">
                <v-row>
                   <v-form-item label="类型" :label-col="labelCol" :wrapper-col="wrapperCol" prop="type"  has-feedback>
                      <v-select placeholder="类型" size="lg" v-model="newruleForm.type" :data="getruleSelect" style="width:100%" @change="rulestate"></v-select>
                   </v-form-item>  
                </v-row>
                <v-row>
                   <v-form-item v-if="longer" label="长度" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback prop="length">
                        <v-input-number placeholder="请输入长度" :min="1"  size="large"  :max="10" v-model="newruleForm.length" ></v-input-number>
                   </v-form-item>  
                </v-row>
                <v-row>
                   <v-form-item  v-if="string" label="字符" :label-col="labelCol" :wrapper-col="wrapperCol" prop="fixed" has-feedback>
                       <v-input placeholder="请输入字符" size="large" v-model="newruleForm.fixed" :style="{width:'100%'}"></v-input>
                   </v-form-item>  
                </v-row>
                <v-row>
                   <v-form-item v-if="none" label="变更清零" :label-col="labelCol" prop="previousClean" :wrapper-col="wrapperCol"  has-feedback>
                       <v-select placeholder="" size="lg"  v-model="newruleForm.previousClean" :data="[{value: 'true', label: '是'}, {value: 'false', label: '否'}]"></v-select>
                   </v-form-item>  
                </v-row>
            </v-form>
        </div>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: ["visible"],
    computed: {
        ...mapState({
           getruleSelect: state => state.takeNumberAddModule.rulesSelect,
           newruleForm: state => state.takeNumberAddModule.newruleForm,
        })
    },
  mounted() {
    this.$store.dispatch("takeNumberAddModule/ruleSelect");
  },
    data() {
        return {
             longer:true, 
             string:false, 
             none:false, 
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 15
            },
            rules:{
                type: [{
                    required: true,
                    message: '请选择规则编号'
                }],
                length: [{
                    required: true,
                    message: '请输入长度'
                }],
                fixed: [{
                    required: true,
                    message: '请输入字符'
                }],
                previousClean: [{
                    required: true,
                    message: '请选择是否变更清零'
                }],
              }
        }
    },
    methods: {
        addOk() {
            this.$refs.newruleForm.validate((valid) => {
            if (valid) {
                return this.$store.dispatch('takeNumberAddModule/addruleTable').then(res => {
                   this.$emit('ok');
                })
            } 
          })
        },
        addCancel() {
            // this.$refs['ruleForm'].resetFields();
           this.$emit('cancel');
        },
        rulestate(data){
                this.newruleForm.length="";
                this.newruleForm.fixed="";
                this.newruleForm.previousClean="";
            if (data=="0"||data=="6") {
                this.longer=true;
                this.string=false;
                this.none=false; 
            }else if(data=="5"){
                this.longer=false;
                this.string=true;
                this.none=false; 
            }else{
                this.longer=false;
                this.string=false;
                this.none=true; 
            }
        },
    }
}
</script>