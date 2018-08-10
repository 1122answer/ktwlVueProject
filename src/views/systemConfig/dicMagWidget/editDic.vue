<template>
    <v-modal :title="pagetitle" :visible="visible" @ok="addOk" @cancel="addCancel" :width="600">
        <div class="dicedit">
            <v-form direction="horizontal" :model="newdicForm" :rules="rules" ref="newdicForm">
                <v-row>
                    <v-col span='12'>
                        <v-form-item label="所属系统" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback prop="systemId">
                            <v-select placeholder="请选择系统" :optionOnChange="true" v-model="newdicForm.systemId" :data="getsystemSelect" size="lg" style="width:100%" @change="choicesys" :disabled="listetail"></v-select>
                        </v-form-item>
                    </v-col>
                    <v-col span='12'>
                        <v-form-item label="行政区域" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback prop="regionCode">
                            <v-select :data="getRegionSelect" :optionOnChange="true" v-model="newdicForm.regionCode" size="lg" @change="selectRegionCode" style="width:100%" :disabled="listetail"></v-select>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='12'>
                        <v-form-item label="字典名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="dictionaryName">
                            <span v-if="listetail==true" class="ant-form-text" v-text="newdicForm.dictionaryName"></span>
                            <v-input v-if="listetail==false" placeholder="请选择字典名称" size="large" maxlength="20" v-model="newdicForm.dictionaryName":disabled="listetail" ></v-input>
                        </v-form-item>
                    </v-col>
                    <v-col span='12'>
                        <v-form-item label="字典编码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="dictionaryCode">
                           <span v-if="listetail==true" class="ant-form-text" v-text="newdicForm.dictionaryCode"></span>
                           <v-input v-if="listetail==false" placeholder="请选择字典编码" size="large" maxlength="20" v-model="newdicForm.dictionaryCode" :disabled="listetail"></v-input>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='12'>
                   <v-form-item  label="字典参数" :label-col="labelCol" :wrapper-col="wrapperCol" prop="dictionaryKey" has-feedback>
                      <span v-if="listetail==true" class="ant-form-text" v-text="newdicForm.dictionaryKey"></span>
                      <v-input v-if="listetail==false" placeholder="请输入字典参数" size="large"  :style="{width:'100%'}" v-model="newdicForm.dictionaryKey" :disabled="listetail"></v-input>
                   </v-form-item>  
                    </v-col>
                    <v-col span='12'>
                        <v-form-item label="调用方式" :label-col="labelCol" :wrapper-col="wrapperCol" prop="dictType">
                            <span  v-if="newdicForm.dictType=='0'&&listetail==true">正常</span>
                            <span  v-else-if="newdicForm.dictType=='1'&&listetail==true">接口</span>
                            <span  v-else-if="newdicForm.dictType=='2'&&listetail==true">数据库</span>
                            <v-select  v-if="listetail==false" placeholder="请选择调用方式" notfound="无法找到" :data="[{value:'0',label:'正常'},{value:'1',label:'接口'},{value:'2',label:'数据库'}]" size="lg" v-model="newdicForm.dictType" :disabled="listetail"></v-select>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                   <v-col span='12'>
                   <v-form-item  label="值1" :label-col="labelCol" :wrapper-col="wrapperCol" prop="value1" has-feedback>
                       <span v-if="listetail==true" class="ant-form-text" v-text="newdicForm.value1"></span>
                       <v-input v-if="listetail==false" placeholder="值1" size="large"  :style="{width:'100%'}" v-model="newdicForm.value1" :disabled="listetail"></v-input>
                   </v-form-item>  
                   </v-col>
                   <v-col span='12'>
                   <v-form-item  label="值2" :label-col="labelCol" :wrapper-col="wrapperCol" prop="value2" has-feedback>
                       <span v-if="listetail==true" class="ant-form-text" v-text="newdicForm.value2"></span>
                       <v-input v-if="listetail==false" placeholder="值2" size="large"  :style="{width:'100%'}" v-model="newdicForm.value2" :disabled="listetail"></v-input>
                   </v-form-item>  
                   </v-col>
                </v-row>
                <v-row>
                    <v-col span='12'>
                        <v-form-item  label="值3" :label-col="labelCol" :wrapper-col="wrapperCol" prop="value3" has-feedback>
                        <span v-if="listetail==true" class="ant-form-text" v-text="newdicForm.value3"></span>
                       <v-input v-if="listetail==false" placeholder="值3" size="large"  :style="{width:'100%'}" v-model="newdicForm.value3" :disabled="listetail"></v-input>
                       </v-form-item> 
                    </v-col>
                    <v-col span='12'>
                       <v-form-item  label="是否开启" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback prop="isEnabled">
                        <span v-if="newdicForm.isEnabled==0&&listetail==true"> 否 </span>
                        <span v-else-if="newdicForm.isEnabled==1&&listetail==true"> 是 </span>
                        <v-switch v-if="listetail==false" v-model="newdicForm.isEnabled" :disabled="listetail">
                                <span slot="checkedChildren">开</span>
                                <span slot="unCheckedChildren">关</span>
                         </v-switch>
                        </v-form-item>  
                    </v-col>
                </v-row>
                <v-row >
                   <v-form-item v-if="disablenum==true" label="备注" :label-col="{span:3}" :wrapper-col="{span:20}" prop="remark" has-feedback>
                       <v-input  v-if="listetail==false" type="textarea" placeholder="备注" size="large"  :style="{width:'100%'}" v-model="newdicForm.remark" :disabled="listetail"></v-input>
                      <span v-if="listetail==true" class="ant-form-text" v-text="newdicForm.remark"></span>
                   </v-form-item>
                   <v-col span='12' v-if="disablenum==false">
                      <v-form-item  label="备注" :label-col="labelCol" :wrapper-col="wrapperCol" prop="remark" has-feedback>
                       <v-input type="textarea" placeholder="备注" size="large"  :style="{width:'100%'}" v-model="newdicForm.remark"></v-input>
                      </v-form-item>  
                   </v-col>
                   <v-col span='12' v-if="disablenum==false">
                      <v-form-item  label="操作权限" :label-col="labelCol" :wrapper-col="wrapperCol" prop="modifyType" has-feedback>
                       <v-select placeholder="请选择操作权限" style="width: 140px;" :data="[{value:0,label:'只读'},{value:1,label:'修改'},{value:2,label:'修改/删除'}]" v-model="newdicForm.modifyType" ></v-select>
                      </v-form-item> 
                   </v-col>  
                </v-row>
            </v-form>
        </div>
        <div slot="footer">
            <v-button v-if="listetail==true" key="cancel" type="ghost" size="large" @click="customFooterCancel">
                关 闭
            </v-button>
            <v-button v-if="listetail==false" key="cancel" type="ghost" size="large" @click="customFooterCancel"> 取消 </v-button>
            <v-button v-if="listetail==false" key="confirm" type="primary" size="large" @click="saveOk">保存 </v-button>
        </div>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: ["visible"],
    computed: {
      ...mapState({
          getsystemSelect: state => state.commonSelect.systemSelect,
          getRegionSelect: state => state.commonSelect.regionSelect,
          newdicForm: state => state.dicAddModule.newdicForm,
          adddicForm: state => state.dicAddModule.adddicForm,
          pagetitle: state => state.dicAddModule.pagetitle,
          disablenum: state => state.dicAddModule.disablenum,
          listetail: state => state.dicAddModule.listdetail,
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
                span: 16
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
        customFooterCancel() {
          this.$emit('cancel');
        },
        addOk() {
            this.$refs.newdicForm.validate((valid) => {
            if (valid) {
                return this.$store.dispatch('dicAddModule/editList').then(res => {
                   if (res.data.success) {
                      this.$emit('ok');
                      this.$message.success("编辑成功");
                   }
                });
            } 
          })
        },
        saveOk() {
           this.$refs.newdicForm.validate((valid) => {
            if (valid) {
                return this.$store.dispatch('dicAddModule/editList').then(res => {
                   if (res.data.success) {
                      this.$emit('ok');
                      this.$message.success("编辑成功");
                   }
                });
            } 
          })
        },
        addCancel() {
            this.$emit('cancel');
        },
                // 获取系统
        choicesys(data) {
            return this.$store.dispatch('dicAddModule/getsysList', data);
        },
        // 获取行政区域
        selectRegionCode(data) {
            return this.$store.dispatch('dicAddModule/getregionList', data);
        },
    }
}
</script>