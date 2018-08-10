<template>
    <v-modal title="新增字典" :visible="visible" @ok="addOk" @cancel="addCancel">
        <div class="dicadd">
            <v-form direction="horizontal" :model="newdicForm" :rules="rules" ref="newdicForm">
                <v-row>
                   <v-form-item  label="字典参数" :label-col="labelCol" :wrapper-col="wrapperCol" prop="dictionaryKey" has-feedback>
                      <v-input placeholder="请输入字典参数" size="large"  :style="{width:'100%'}" v-model="newdicForm.dictionaryKey"></v-input>
                   </v-form-item>  
                </v-row>
                <v-row>
                   <v-form-item  label="值1" :label-col="labelCol" :wrapper-col="wrapperCol" prop="value1" has-feedback>
                       <v-input placeholder="值1" size="large"  :style="{width:'100%'}" v-model="newdicForm.value1"></v-input>
                   </v-form-item>  
                </v-row>
                <v-row>
                   <v-form-item  label="值2" :label-col="labelCol" :wrapper-col="wrapperCol" prop="value2" has-feedback>
                       <v-input placeholder="值2" size="large"  :style="{width:'100%'}" v-model="newdicForm.value2"></v-input>
                   </v-form-item>  
                </v-row>
                <v-row>
                   <v-form-item  label="值3" :label-col="labelCol" :wrapper-col="wrapperCol" prop="value3" has-feedback>
                       <v-input placeholder="值3" size="large"  :style="{width:'100%'}" v-model="newdicForm.value3" ></v-input>
                   </v-form-item>  
                </v-row>
                <v-row>
                   <v-form-item  label="是否开启" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback prop="isEnabled">
                        <v-switch v-model="newdicForm.isEnabled">
                                <span slot="checkedChildren">开</span>
                                <span slot="unCheckedChildren">关</span>
                         </v-switch>
                   </v-form-item>  
                </v-row>
                <v-row>
                   <v-form-item  label="操作权限" :label-col="labelCol" :wrapper-col="wrapperCol" prop="modifyType" has-feedback>
                       <v-select placeholder="请选择操作权限" style="width: 140px;" :data="[{value:0,label:'只读'},{value:1,label:'修改'},{value:2,label:'修改/删除'}]" v-model="newdicForm.modifyType" ></v-select>
                   </v-form-item>  
                </v-row>
                <v-row>
                   <v-form-item  label="备注" :label-col="labelCol" :wrapper-col="wrapperCol" prop="remark" has-feedback>
                       <v-input type="textarea" placeholder="备注" size="large"  :style="{width:'100%'}" v-model="newdicForm.remark"></v-input>
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
          newdicForm: state => state.dicAddModule.newdicForm,
        })
    },
  mounted() {
    
  },
    data() {
        return {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 15
            },
            rules:{
               dictionaryKey: [{
                    required: true,
                    message: '请输入字典参数'
                }],
                value1: [{
                    required: true,
                    message: '请输入值1'
                }],
            }
        }
    },
    methods: {
        addOk() {
            this.$refs.newdicForm.validate((valid) => {
            if (valid) {
                return this.$store.dispatch('dicAddModule/adddicTable').then(res => {
                   this.$emit('ok');
                });
            } 
          })
        },
        addCancel() {
            this.$emit('cancel');
        },
    }
}
</script>