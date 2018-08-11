<template>
    <div class="moduleWrap">
        <v-row class="nav-header">
            <v-col span="12">
                <h1>短信模板管理</h1>
            </v-col>
            <v-col span="12">
                <v-breadcrumb class="pull-right" :style="{ 'line-height': '30px'}">
                    <v-breadcrumb-item>首页</v-breadcrumb-item>
                    <v-breadcrumb-item>通用服务</v-breadcrumb-item>
                    <v-breadcrumb-item>短信模板管理</v-breadcrumb-item>
                </v-breadcrumb>
            </v-col>
        </v-row>
        <div class="box-border" ref="boxBorder">
            <div ref="morePanelWrap">
                <v-more-panel>
                    <v-form slot="form">
                        <v-form-item label="短信模板ID">
                            <v-input placeholder="请输入短信模板ID" size="large" v-model="templateCode"></v-input>
                        </v-form-item>
                        <v-form-item label="短信模板编码">
                            <v-input placeholder="请输入短信模板编码" size="large" v-model="encoded"></v-input>
                        </v-form-item>
                        <v-form-item label="所属系统">
                            <v-select search style="width:150px" :data="selectSystem" size="lg" placeholder="请选择系统" v-model="systemId" label="text"></v-select>
                        </v-form-item>
                        <v-form-item label="短信模板内容">
                            <v-input placeholder="请输入短信模板内容" size="large" v-model="templateText"></v-input>
                        </v-form-item>
                    </v-form>
                    <v-button type="primary" slot="control" size="large" @click="searchTable" html-type="button" icon="search">查询</v-button>
                    <v-button type="primary" size="large" class="pull-right" @click="addTnRule" icon="plus" style="margin-top: 2px;">新增</v-button>
                </v-more-panel>
            </div>
            <div class="container-fluid" ref="containerFluid">
                <v-data-table :data='loadData' size="small" :columns='columns' bordered :responseParamsName='responseParamsName' ref="smsTplTable" emptyText="暂时找不到你要的信息......" :height="tableBoxHeight">
                    <template slot="td" slot-scope="props">
                        <div v-if="props.column.field=='operation'" class="text-center">
                            <v-button-group>
                                <v-button type="success" title="测试发送" @click="sendSms(props.item)">
                                    <v-icon type="mail"></v-icon>
                                </v-button>
                                <v-button type="info" title="查看详细" @click="viewSmsFu(props.item)">
                                    <v-icon type="file-text"></v-icon>
                                </v-button>
                                <v-button type="primary" title="编辑" @click="editSms(props.item)">
                                    <v-icon type="edit"></v-icon>
                                </v-button>
                                <v-button type="error" title="删除" @click="delSms(props.item)">
                                    <v-icon type="delete"></v-icon>
                                </v-button>
                            </v-button-group>
                        </div>
                        <div v-else-if="props.column.field === 'enabled'" class="text-center">
                            <v-switch v-model="props.content" @change="changeisEnabled(props.item)">
                                <span slot="checkedChildren">开</span>
                                <span slot="unCheckedChildren">关</span>
                            </v-switch>
                        </div>
                        <span v-else v-html="props.content"></span>
                    </template>
                </v-data-table>
            </div>
        </div>
        <!-- 新增和编辑弹窗 -->
        <SmsAddEditTpl :visible="smsFlag" @ok="okDialog" @cancel="hideDialog"></SmsAddEditTpl>
        <!-- 查看弹窗 -->
        <SmsViewCopt :is-view="viewSms" @cancel="closeViewDialog"></SmsViewCopt>
        <!-- 测试发送 -->
        <SendSmsCopt :is-send="sendSmsFlag" @ok="sendOk" @cancel="cancelSend"></SendSmsCopt>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import SmsAddEditTpl from './smsTplmanageWidget/smsAddEditTpl.vue'
import SmsViewCopt from './smsTplmanageWidget/smsView.vue'
import SendSmsCopt from './smsTplmanageWidget/sendSms.vue'

export default {
    tableBoxHeight:300,
    components: {
        SmsAddEditTpl,
        SmsViewCopt,
        SendSmsCopt
    },
    computed: {
        ...mapState({
            selectSystem: state => state.smsTemplateEditModule.selectSystem
        })
    },
    mounted() {
        this.$store.dispatch('smsTemplateEditModule/getSystemData');
        //给table限制最大高度
        this.$nextTick(() => {
            let tableBoxHeight = this.$refs.boxBorder.scrollHeight - (this.$refs.morePanelWrap.scrollHeight + 18);
            this.tableBoxHeight = tableBoxHeight;
        });
    },
    data: function() {
        return {
            templateCode: '',
            encoded: '',
            templateText: '',
            systemId: '',
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
            smsFlag: false,
            viewSms: false,
            sendSmsFlag: false,
            responseParamsName: {
                total: 'totalCount',
                results: 'result'
            },
            loadData(params) {
                return this.$store.dispatch('smsTemplateStoreModule/fetchSMStable', {
                    pageNo: params.pageNo,
                    pageSize: params.pageSize,
                }).then(res => {
                    return res;
                })
            },
            columns: [
                { title: "短信模板ID", field: 'templateCode' },
                { title: "短信模板编码", field: 'encoded' },
                { title: "所属系统", field: 'systemName' },
                { title: "短信模板内容", field: 'templateText' },
                { title: "是否开启", field: 'enabled', width: '90px', className: 'text-center' },
                { title: "操作", field: 'operation', width: '180px', className: 'text-center' },
            ],
        };
    },
    methods: {
        searchTable() {
            this.$store.commit('smsTemplateStoreModule/CHANGE_SEARCH_PARAMS', {
                templateCode: this.templateCode,
                encoded: this.encoded,
                templateText: this.templateText,
                systemId: this.systemId
            });
            this.$refs.smsTplTable.reload();
        },
        changeisEnabled(param) {
            //console.log(param);
            this.$store.dispatch('smsTemplateStoreModule/changeisEnabled', {
                flag: !param.enabled,
                id: param.smsTemplateId,
            }).then(res => {
                if (res && res.data.success) {
                    this.$message['success'](res.data.data, 1);
                    this.$refs.smsTplTable.refresh();
                }
            });
        },
        delSms(param) {
            this.$modal.confirm({
                title: '删除信息',
                content: '确认删除该条信息吗？',
                onOk: () => {
                    this.$store.dispatch('smsTemplateStoreModule/fetchDelSmsTpl', param.smsTemplateId).then(res => {
                        if (res.data && res.data.success) {
                            this.$message['success'](res.data.data, 1);
                            this.$refs.smsTplTable.refresh();
                        }
                    });
                },
                onCancel: function() {}
            });
        },
        addTnRule() {
            //新增短信模板
            this.smsFlag = true;
            this.$store.commit('smsTemplateEditModule/ADD_EDIT_FLAG', true);
            this.$store.dispatch('smsTemplateEditModule/getSystemData');
        },
        okDialog() {
            this.smsFlag = false;
            this.$refs.smsTplTable.reload();
        },
        hideDialog() {
            this.smsFlag = false;
        },
        sendSms() {
            this.sendSmsFlag = true;
        },
        sendOk() {
            this.sendSmsFlag = false;
        },
        cancelSend() {
            this.sendSmsFlag = false;
        },
        editSms(param) {
            console.log(param);
            this.$store.commit('smsTemplateEditModule/ADD_EDIT_FLAG', false);
            this.smsFlag = true;
            this.$store.commit('smsTemplateEditModule/RECORD_DATA', param.smsTemplateId);
            this.$store.dispatch('smsTemplateEditModule/fetchgetData', param.smsTemplateId);
        },
        viewSmsFu(param) {
            this.viewSms = true;
            this.$store.dispatch('smsTemplateEditModule/fetchgetData', param.smsTemplateId);
        },
        closeViewDialog() {
            this.viewSms = false;
        }
    }
}
</script>
<style scoped lang='less'>
</style>