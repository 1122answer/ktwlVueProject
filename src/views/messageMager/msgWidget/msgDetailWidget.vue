<template>
    <div id="detailMsgDiag">
        <v-modal title="查看消息信息" :visible="true" v-show="isMsg" :width="1050" :confirm-loading="asyncConfirmLoading" @cancel="closeDetail">
            <v-form direction="horizontal" :model="msgForm" ref="msgForm">
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="消息类型" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span v-if="msgForm.messageType==0">系统消息</span>
                            <span v-else-if="msgForm.messageType==1">业务消息</span>
                            <span v-else-if="msgForm.messageType==2">通知公告</span>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="消息发送者" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="msgForm.messageFrom"></span>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="所属业务" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="msgForm.busiName"></span>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="跳转链接" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="msgForm.link"></span>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="消息标题" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="msgForm.title"></span>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="缩略图" :label-col="labelCol" :wrapper-col="wrapperCol">
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="msgForm.remark"></span>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='24'>
                        <v-form-item label="消息内容" :label-col="{span:3}" :wrapper-col="{span:20}">
                            <!-- <input v-model="msgForm.content" style="border: none;" readonly> -->
                            <div id="viewEditor" type="text/plain"></div>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="是否置顶" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span v-if="msgForm.isTop==false"> 否 </span> <span v-else> 是 </span>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="置顶截止日期" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="msgForm.topDealine"></span>
                        </v-form-item>
                    </v-col>
                </v-row>
            </v-form>
            <div slot="footer">
                <v-button :model="msgForm" key="revoke" type="primary" size="large" @click="revokeMsg(msgForm)" :disabled="msgForm.isRevoke == 1">
                    撤销
                </v-button>
                <v-button key="cancel" type="ghost" size="large" @click="closeDetail()">
                    关闭
                </v-button>
            </div>
        </v-modal>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'this',
    components: {
        //addPane
    },
    computed: {
        ...mapState({
            msgForm: state => state.msgMagModule.msgForm,
        })
    },
    created() {
        // this.$store.dispatch('orgAddEditModule/fetchOrgType').then(res => {});
    },
    mounted() {
        this.editor = UE.getEditor('viewEditor', {
            BaseUrl: '',
            toolbars: [['fullscreen']
            ],
            autoHeightEnabled: false,
            autoFloatEnabled: true,　　
            autoClearinitialContent:true,
            initialFrameWidth: '100%',
            initialFrameHeight: 150,
        });
    },
    watch:{
        isMsg(newVal){
            if(newVal){
                UE.getEditor('viewEditor').setContent(this.msgForm.content);
                UE.getEditor('viewEditor').setDisabled('fullscreen');
            }else{
                UE.getEditor('viewEditor').setContent('');
            }
            /*alert(newVal);*/
        }
    },
    props: ['isMsg'],
    data: function() {
        return {
            labelCol: {
                span: 9
            },
            wrapperCol: {
                span: 15
            },
            asyncConfirmLoading: false,
        };
    },
    methods: {
        closeDetail() {
            this.asyncConfirmLoading = false;
            this.$emit('cancel');
        },
        revokeMsg(params) {
            this.$modal.confirm({
                title: "您是否要撤销此消息",
                content: "撤销之后用户看不到消息",
                onOk: () => {
                    this.asyncConfirmLoading = true;
                    this.$store
                        .dispatch("msgMagModule/modifyRevokeStatus", params.messageId)
                        .then(res => {
                            this.asyncConfirmLoading = false;
                            if (res.data.success) {
                                this.$message["success"]("成功撤销此消息");
                                this.$emit('ok');
                            }
                        });
                },
                onCancel: function() {

                }
            });
        }
    }
}
</script>
<style>
    #detailMsgDiag .ant-form-item{margin-bottom: 4px;}
</style>