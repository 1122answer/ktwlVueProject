<template>
    <div id="validateSmsLog">
        <validateSmsLogDetails :visible="visible" @cancel="handleCancel">
        </validateSmsLogDetails>
        <v-row class="padding-bottom-10">
            <v-col span="12">
                <h1>验证码短信日志</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '38px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>通用服务</v-breadcrumb-item>
                    <v-breadcrumb-item>验证码短信日志</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border padding-10">
            <div class="clearfix padding-bottom-5">
                <div class="list-org-box" v-show='listFlag'>
                    <v-more-panel>
                        <v-form slot="form" v-model="queryForm" ref="queryForm">
                            <v-form-item label="手机号码" prop="mobile">
                                <v-input placeholder="请输入手机号码" v-model="queryForm.mobile"></v-input>
                            </v-form-item>
                            <v-form-item label="显示文本" prop="displayContent">
                                <v-input placeholder="请输入短信描述" v-model="queryForm.displayContent"></v-input>
                            </v-form-item>
                            <v-form-item label="验证码" prop="vcode">
                                <v-input placeholder="请输入验证码" v-model="queryForm.vcode"></v-input>
                            </v-form-item>
                            <v-form-item label="发送状态" prop="status">
                                <v-select placeholder="全部" :data="[{value: true, label: '发送成功'}, {value: false, label:'发送失败'}]" style="width: 80px;" v-model="queryForm.status"></v-select>
                            </v-form-item>
                            <v-form-item>
                                <v-date-picker clearable v-model="queryForm.startCreateTime" @change="changeStart"></v-date-picker>
                                <label> 至 </label>
                                <v-date-picker clearable v-model="queryForm.endCreateTime" @change="changeEnd"></v-date-picker>
                            </v-form-item>
                        </v-form>
                        <v-button type="primary" html-type="button" @click="search" slot="control">
                            <v-icon type="search"></v-icon>查询</v-button>
                    </v-more-panel>
                    <v-data-table :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" bordered ref="smsLogTable" emptyText="暂时找不到你要的信息......">
                        <template slot="td" slot-scope="props">
                            <div v-if="props.column.field=='vstatus'" class="text-left">
                                <span class="ant-form-text text-left">{{props.item.status == true ? "成功" : "失败"}}</span>
                            </div>
                            <div v-if="props.column.field=='operation'" class="text-center">
                                <v-button-group>
                                    <v-button type="primary" title="详情" @click="smsLogDetails(props.item)">
                                        <v-icon type="file-text"></v-icon>
                                    </v-button>
                                </v-button-group>
                            </div>
                            <span v-else v-html="props.content"></span>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import axios from "axios";
import api from "@/api/index.js";
import validateSmsLogDetails from "./validateSmsLogWidget/validateSmsLogDetails";
export default {
  name: "this",
  components: {
    validateSmsLogDetails
  },
  computed: {
    ...mapState({
      queryForm: state => state.vcodeSmsLogModule.queryFrom
    })
  },
  mounted() {},
  data: () => ({
    name: "validateSmsLog",
    visible: false,
    listFlag: true,
    responseParamsName: {
      total: "totalCount",
      results: "result"
    },
    loadData(params) {
      return this.$store
        .dispatch("vcodeSmsLogModule/getPageList", {
          pageNo: params.pageNo,
          pageSize: params.pageSize
        })
        .then(res => {
          return res;
        });
    },
    columns: [
      { title: "短信验证码记录ID", field: "smsVcodelogId" },
      { title: "手机号码", field: "mobile" },
      { title: "显示文本", field: "displayContent" },
      { title: "发送时间", field: "createTime" },
      { title: "失效时间", field: "timeout" },
      { title: "验证码", field: "vcode" },
      { title: "发送状态", field: "vstatus" },
      {
        title: "操作",
        field: "operation",
        width: "120px",
        className: "text-center"
      }
    ]
  }),
  methods: {
    changeStart(time) {
      console.log("change:", time);
      this.queryForm.startCreateTime = time;
    },

    changeEnd(time) {
      console.log("change:", time);
      this.queryForm.endCreateTime = time;
    },
    search() {
      this.$refs.smsLogTable.reload();
    },
    handleCancel() {
      this.visible = false;
    },
    smsLogDetails(event) {
      this.visible = true;
      return this.$store
        .dispatch("vcodeSmsLogModule/getDetails", event)
        .then(res => {
          //   return res;
        });
    }
  }
};
</script>
<style scoped lang='less'>
</style>