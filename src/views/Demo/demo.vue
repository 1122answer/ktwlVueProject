<template>
    <div id="dome">
        <!-- button区域 -->
        <div class="btns">
            <h1>按钮</h1>
            <v-button type="primary" size="large">确定</v-button>
            <v-button type="primary"  size="large"><span><i class="anticon anticon-plus"></i> 添加</span></v-button>
            <v-button type="error" size="large">删除</v-button>
            <v-button type="ghost" size="large">取消</v-button>
            <v-button type="primary"  size="large" icon="search"><span>搜索</span></v-button>
            <v-col span="6">
                <v-input-group compact>
                    <v-input placeholder="请输入机构名称" size="large" :style="{width:'64%'}"></v-input>
                    <v-button type="primary" size="large">
                        <v-icon type="search"></v-icon> 查询</v-button>
                </v-input-group>
            </v-col>
            <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
               <v-switch v-model="checked"></v-switch>
            </v-form-item>
        </div>
        <!-- form区域 -->
        <div>
             <h1>表单样式</h1>
             <v-row>
                 <v-form direction="horizontal">
                    <v-col span="12">
                     <v-form-item label="用户名" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <v-select placeholder="请选择活动区域" size="lg" :data="[{value: '1', label: '公司'}, {value: '2', label: '宿舍'}]"></v-select>
                     </v-form-item>
                     <v-form-item label="禁用" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <v-input type="password" placeholder="请输入密码" size="large" disabled></v-input>
                     </v-form-item>
                     <v-form-item label="密码" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <v-input type="password" placeholder="请输入密码" size="large"></v-input>
                     </v-form-item>

                     <v-form-item label="您的性别" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <v-radio-group value="woman" v-model="ruleForm.resource" :data="[{value: 'man', text: '男的'},{value: 'woman', text: '女的'}]"></v-radio-group>
                     </v-form-item>
                 </v-col>
                  <v-col span="12">
                     <v-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol">
                         <v-input type="textarea" placeholder="随便写"></v-input>
                     </v-form-item>

                     <v-form-item label="加工资" :label-col="labelCol" :wrapper-col="wrapperCol">
                         <v-checkbox :value="true">同意</v-checkbox>
                     </v-form-item>

                     <v-form-item label="日期" :label-col="labelCol" :wrapper-col="wrapperCol">
                         <v-date-picker v-model="date" size="lg" style="width:100%;" format="yyyy/MM/dd"></v-date-picker>
                     </v-form-item>

                     <v-form-item label="数字输入(控制输入范围)" :label-col="labelCol" :wrapper-col="wrapperCol">
                         <v-input-number :min="1" :max="1000" style="width:100%;"></v-input-number>
                     </v-form-item>
                  </v-col>
                </v-form>
                 
            </v-row>
        </div>
        <!-- 全局提示 -->
        <div class="btns">
            <h1>全局提示</h1>
              <v-button type="primary"  @click="SuccessMessage('success')">
                 成功
             </v-button>
             <v-button type="primary"  @click="ErrorMessage('error')">
                 失败
             </v-button>
             <v-button type="primary"  @click="WarmMessage('warning')">
                 警告
             </v-button>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: 'this',
    components: {
      
    },
    computed: {
        // ...mapState({

        // })
    },
    mounted() {

    },
    data: () => ({

        checked:false,
        labelCol: {
            span: 6
        },
        wrapperCol: {
            span: 14
        },
        date:"",
        ruleForm:{
            resource:"woman"
        }
    }),
    methods: {
  SuccessMessage(type) {
                this.$message[type]("操作成功");
            },
  ErrorMessage(type) {
                this.$message[type]("操作失败");
            },
  WarmMessage(type) {
                this.$message[type]("警告！不能点击");
            },
    }
}
</script>
<style scoped lang='less'>
 #dome> div{
    margin-top:20px;
 }
 .btns > button{
    margin-left: 20px;
    margin-top:20px;
 }
</style>