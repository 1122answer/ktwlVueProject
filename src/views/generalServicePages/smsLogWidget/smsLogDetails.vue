<template>
    <v-modal title="详情" :visible="visible" @cancel="cancel" :confirm-loading="asyncConfirmLoading">
        <v-form direction="horizontal" class="alert-content" :model="detailsForm" ref="detailsForm">
            <v-form-item class="itempadding" label="短信记录ID" prop="smsLogId" :label-col="labelCol" :wrapper-col="wrapperCol">
                <span class="ant-form-text" id="smsLogId" name="smsLogId">{{detailsForm.smsLogId}}</span>
            </v-form-item>
            <v-form-item class="itempadding" label="手机号码" prop="mobile" :label-col="labelCol" :wrapper-col="wrapperCol">
                <span class="ant-form-text" id="mobile" name="mobile">{{detailsForm.mobile}}</span>
            </v-form-item>
            <v-form-item class="itempadding" label="用户账户" prop="accountId" :label-col="labelCol" :wrapper-col="wrapperCol">
                <span class="ant-form-text" id="accountId" name="accountId">{{detailsForm.accountId}}</span>
            </v-form-item>
            <v-form-item class="itempadding" label="发送内容" prop="content" :label-col="labelCol" :wrapper-col="wrapperCol">
                <span class="ant-form-text" id="content" name="content">{{detailsForm.content}}</span>
            </v-form-item>
            <v-form-item class="itempadding" label="显示文本" prop="displayContent" :label-col="labelCol" :wrapper-col="wrapperCol">
                <span class="ant-form-text" id="displayContent" name="displayContent">{{detailsForm.displayContent}}</span>
            </v-form-item>
            <v-form-item class="itempadding" label="发送时间" prop="createTime" :label-col="labelCol" :wrapper-col="wrapperCol">
                <span class="ant-form-text" id="createTime" name="createTime">{{detailsForm.createTime}}</span>
            </v-form-item>
            <v-form-item class="itempadding" label="发送状态" prop="status" :label-col="labelCol" :wrapper-col="wrapperCol">
                 <span class="ant-form-text" id="status" name="status">{{detailsForm.status}}</span>
            </v-form-item>
            <v-form-item class="itempadding" label="备注" prop="remark" :label-col="labelCol" :wrapper-col="wrapperCol">
                <span class="ant-form-text" id="remark" name="remark">{{detailsForm.remark}}</span>
            </v-form-item>
        </v-form>
        <div slot="footer">
            <v-button key="cancel" type="ghost" size="large" @click="cancel">
                关闭
            </v-button>
        </div>
    </v-modal>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
export default {
  props: ["visible"],
  components: {
    //addPane
  },
  computed: {
    ...mapState({
      detailsForm: state => state.smsLogModule.detailsForm
    })
  },
  data() {
    return {
        labelCol:{
            span:6
        },
        wrapperCol:{
            span:14
        },
      asyncConfirmLoading: false
    };
  },
  methods: {
    cancel() {
      this.asyncConfirmLoading = false;
      this.$emit("cancel");
    }
  }
};
</script>
<style scoped lang='less'>
  .itempadding{
      padding:0px;
      margin:0px;
  }
</style>
