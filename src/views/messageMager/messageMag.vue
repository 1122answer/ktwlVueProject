<template>
    <div id="messageManage">
        <v-row class="padding-bottom-10">
            <v-col span="12">
                <h1>消息管理</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '38px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>消息管理</v-breadcrumb-item>
                    <v-breadcrumb-item>消息管理</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border padding-10">
            <div class="clearfix padding-bottom-5">
                <div class="list-org-box">
                    <v-more-panel v-show="searchMsgFlag">
                          <v-form slot="form">
                            <v-form-item label="消息标题">
                                <v-input placeholder="请输入消息标题" v-model="searchForm.title"></v-input>
                            </v-form-item>
                            <v-form-item label="所属业务">
                                <v-input type="text" placeholder="请输入所属业务名称" v-model="searchForm.busiId"></v-input>
                            </v-form-item>
                            <v-form-item label="消息类型">
                                <v-select style="width: 100px;" :data="messageType" v-model="searchForm.messageType" placeholder="请选择"></v-select>
                            </v-form-item>
                            <v-form-item label="撤销状态">
                                <v-select style="width: 100px;" :data="revokeStatus" v-model="searchForm.isRevoke" placeholder="请选择"></v-select>
                            </v-form-item>
                        </v-form>
                        <v-button slot="control" size="large" type="primary" html-type="button" icon="search" @click="searchlist">查询
                        </v-button>
                        <v-button  type="primary" size="large" class="pull-right" @click="addMsg" style="margin-top:2px;">
                            <v-icon type="plus"></v-icon> 新增</v-button>
                        </v-button> 
                    </v-more-panel>
                    <v-more-panel v-show="searchMsgPushFlag">
                       <h2 slot="form">发送对象共{{totalCount}}位，目前有{{viewCount}}位已查看</h2>
                       <v-button type="primary" size="large" class="pull-right" @click="closeMsgPush" style="margin-top:2px;">
                            返回
                        </v-button> 
                    </v-more-panel>
                    <v-data-table :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" bordered ref="msgTable" v-show="msgManageFlag" emptyText="暂时找不到你要的信息......">
                        <template slot="td" slot-scope="props">
                            <div v-if="props.column.field==='isRevoke'">
                                <span v-if="props.content==false">
                                      否
                                  </span>
                                <span v-else>
                                      是
                                  </span>
                            </div>
                            <div v-else-if="props.column.field=='messageType'">
                                <span v-if="props.content==0">系统消息</span>
                                <span v-else-if="props.content==1">业务消息</span>
                                <span v-else-if="props.content==2">通知公告</span>
                            </div>
                            <div v-else-if="props.column.field=='operation'" class="text-center">
                                <v-button-group>
                                    <v-button type="primary" title="查看消息详情" @click="showDetail(props.item)">
                                        <v-icon type="file-text"></v-icon>
                                    </v-button>
                                    <v-button type="primary" title="查看发送对象" @click="showPushMsgs(props.item)">
                                        <v-icon type="team"></v-icon>
                                    </v-button>
                                </v-button-group>
                            </div>
                            <span v-else v-html="props.content"></span>
                        </template>
                    </v-data-table>
                    <v-data-table :data='loadPushData' :responseParamsName="responseParamsName" :columns='pushcolumns' size="small" class="margin-top-15" bordered ref="msgpushTable" v-show="msgPushManageFlag">
                        <template slot="td" slot-scope="props">
                             <div v-if="props.column.field==='isView'">
                                  <span v-if="props.content==false">
                                      否
                                  </span>
                                  <span v-else>
                                      是
                                  </span>
                             </div>
                            <span v-else v-html="props.content"></span>
                        </template>
                    </v-data-table>
                </div>
            </div>
        </div>
        <MsgWidget :is-msg="msgShow" @ok="hideMsgOk" @cancel="hideMsgDialog"></MsgWidget>
        <DetailWidget :is-msg="detailShow" @ok="hideDetailOk" @cancel="hideDetailDialog"></DetailWidget>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios'
import api from "@/api/index.js";
import MsgWidget from './msgWidget/msgAddEditWidget.vue'
import DetailWidget from './msgWidget/msgDetailWidget.vue'
export default {
    name: 'this',
    components: {
        MsgWidget,
        DetailWidget
    },
    computed: {
        ...mapState({
            searchForm: state => state.msgMagModule.searchForm,
            msgForm: state => state.msgMagModule.msgForm,
            totalCount: state => state.msgMagModule.totalCount,
            viewCount: state => state.msgMagModule.viewCount,
        })
    },
    mounted() {},
    data: function() {
        return {
            searchName: '',
            msgShow: false,
            detailShow: false,
            data: [
                { content: '新增', divided: true, },
                { content: '修改', divided: true, },
                { content: '删除', divided: true, },
            ],
            MessageTypeName: {
                '0': '系统消息',
                '1': '业务消息',
                '2': '通知公告',
            },
            msgManageFlag: true,
            searchMsgPushFlag: false,
            searchMsgFlag:true,
            msgPushManageFlag:false,
            messageType: [{
                value: null,
                label: '全部'
            }, {
                value: 0,
                label: '系统消息',
            }, {
                value: 1,
                label: '业务消息'
            }, {
                value: 2,
                label: '通知公告'
            }],

            revokeStatus: [{
                value: null,
                label: '全部'
            }, {
                value: 0,
                label: '否',
            }, {
                value: 1,
                label: '是'
            }],
            loadPushData(params) {
                return this.$store.dispatch('msgMagModule/fetchMsgPushTable', {
                    pageNo: params.pageNo,
                    pageSize: params.pageSize
                }).then(res => {
                    this.$store.commit('msgMagModule/SAVE_VIEWCOUNT',res.viewCount);
                    this.$store.commit('msgMagModule/SAVE_TOTALCOUNT',res.totalCount);
                    return res;
                });
            },
            loadData(params) {
                return this.$store.dispatch('msgMagModule/fetchMsgTable', {
                    pageNo: params.pageNo,
                    pageSize: params.pageSize
                }).then(res => {
                    return res;
                });
            },
            responseParamsName: {
                total: 'totalCount',
                results: 'result'
            },
            pushcolumns:  [
                { title: "消息ID", field: 'messageId' },
                { title: "账号", field: 'userName', width: '220px' },
                { title: "消息接受ID", field: 'userId', width: '220px' },
                { title: "是否已查看", field: 'isView', width: '220px' },
                { title: "查看时间", field: 'viewTime', width: '220px' },
            ],
            columns: [
                { title: "消息ID", field: 'messageId' },
                { title: "消息标题", field: 'title', width: '220px' },
                { title: "所属业务", field: 'busiName', width: '220px' },
                { title: "消息类型", field: 'messageType', width: '220px' },
                { title: "发送时间", field: 'createTime', width: '220px' },
                { title: "撤销状态", field: 'isRevoke', width: '1px' },
                { title: "操作", field: 'operation', width: '180px', className: 'text-center' },
            ],
        }
    },
    methods: {
        hideMsgOk() { //消息ok
            this.msgShow = false;
            this.$refs.msgTable.reload();
        },
        hideDetailOk() {
            this.detailShow = false;
            this.$refs.msgTable.reload();
        },
        hideDetailDialog() { //消息取消
            this.detailShow = false;
        },
        hideMsgDialog() { //消息取消
            this.msgShow = false;
        },
        addMsg() {
            this.msgShow = true;
            this.$store.dispatch("msgAddEditModule/initTreeData");
        },
        searchlist() {
            this.$refs.msgTable.reload();
        },
        showDetail(params) {
            this.$store.dispatch("msgMagModule/fetchGetMsg", params.messageId).then(res => {
                this.detailShow = true;
            });
        },
        showPushMsgs(params) {
          this.$store.commit('msgMagModule/SAVE_MESSAGEID',params.messageId);
          this.$refs.msgpushTable.reload();
          this.msgManageFlag = false;
          this.searchMsgFlag = false;
          this.msgPushManageFlag = true;
          this.searchMsgPushFlag = true;
        },
        closeMsgPush(){
          this.msgManageFlag = true;
          this.searchMsgFlag = true;
          this.msgPushManageFlag = false;
          this.searchMsgPushFlag = false;
        }
    }
}
</script>
<style scoped lang='less'>
</style>