<template>
    <div id="systemLogDetail">   
        <v-modal title="详情" :visible="visible" @ok="handleOk" @cancel="handleCancel" :width=800>
        <v-form direction="horizontal" :model="systemLogForm" ref="systemLogForm">

            <v-row>
                <v-col span="12">
                    <v-form-item label="系统日志id" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span style="border: none;width:100%">{{systemLogForm.systemLogId}}</span>
                    </v-form-item>
                </v-col>
                <v-col span="12">
                    <v-form-item label="会话序号" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span style="border: none;width:100%">{{systemLogForm.sessionId}}</span>
                    </v-form-item>
                </v-col>
            </v-row>

            <v-row>
                <v-col span="12">
                    <v-form-item label="用户序号" :label-col="labelCol" :wrapper-col="wrapperCol">
                         <span style="border: none;width:100%">{{systemLogForm.userId}}</span>
                    </v-form-item>
                </v-col>
                <v-col span="12">
                    <v-form-item label="所属系统" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span style="border: none;width:100%">{{systemLogForm.systemName}}</span>
                    </v-form-item>
                </v-col>
            </v-row>

            <v-row>
                <v-col span="12">
                    <v-form-item label="创建时间" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span style="border: none;width:100%">{{systemLogForm.createTime}}</span>
                    </v-form-item>
                </v-col>
                <v-col span="12">
                    <v-form-item label="日志类型" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span style="border: none;width:100%">{{systemLogForm.type}}</span>
                    </v-form-item>
                </v-col>
            </v-row>

            <v-row>
                <v-col span="12">
                    <v-form-item label="用户账号" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span style="border: none;width:100%">{{systemLogForm.userInfo}}</span>
                    </v-form-item>
                </v-col>
                <v-col span="12">
                    <v-form-item label="用户名字" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span style="border: none;width:100%" readonly>{{systemLogForm.userInfo}}</span>
                    </v-form-item>
                </v-col>
            </v-row>

            <v-row>
                 <v-col span="24">
                    <v-form-item label="地址" :label-col="{span:3}" :wrapper-col="{span:21}">
                        <span style="border: none;width:100%">{{systemLogForm.url}}</span>
                    </v-form-item>
                </v-col>
            </v-row>

            <v-row>
                <v-col span="24">
                    <v-form-item label="日志信息" :label-col="{span:3}" :wrapper-col="{span:21}">
                        <span style="border: none;width:100%">{{systemLogForm.message}}</span>
                    </v-form-item>
                </v-col>
            </v-row>

            <v-row>
                <v-col span="24">
                    <v-form-item label="日志描述" :label-col="{span:3}" :wrapper-col="{span:21}">
                        <span style="border: none;width:100%" >{{systemLogForm.description}}</span>
                    </v-form-item>
                </v-col>
            </v-row>

            <v-row>
                <v-col span="24">
                    <v-form-item label="日志详情" :label-col="{span:3}" :wrapper-col="{span:21}">
                        <span style="border: none;width:100%">{{systemLogForm.body}}</span>
                    </v-form-item>
                </v-col>
            </v-row>
            
        </v-form>
        <div slot="footer">
            <!--  <v-button key="cancel" type="ghost" size="large" @click="customFooterCancel">
                返 回
            </v-button> -->
        </div>
         </v-modal>
    </div>
</template>

<script >
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      systemLogForm: state => state.systemLogModule.systemLogForm,
      logTypeMap: state => state.systemLogModule.logTypeMap
    })
  },
  mounted() {},
  props: ["visible"],
  data() {
    return {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18
      }
    };
  },

  methods: {
    handleOk() {
      this.$emit("ok");
    },

    handleCancel() {
      this.$emit("hide");
    }
  }
};
</script>
<style>
    #systemLogDetail .ant-form-item{margin-bottom: 2px;}
</style>