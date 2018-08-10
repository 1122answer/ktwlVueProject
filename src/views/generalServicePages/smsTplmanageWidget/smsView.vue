<template>
    <v-modal title="查看短信模板" :visible="isView" @cancel="handleCancel" :width="800">
        <v-form direction="horizontal" :model="smsTplForm" ref="smsTplForm" class="widgetWrap">
            <v-row>
                <v-col span='12'>
                    <v-form-item label="短信模板ID" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span class="ant-form-text" v-text="smsTplForm.templateCode"></span>
                    </v-form-item>
                </v-col>
                <v-col span='12'>
                    <v-form-item label="短信模板编码" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span class="ant-form-text" v-text="smsTplForm.encoded"></span>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='12'>
                    <v-form-item label="短信渠道" :label-col="labelCol" :wrapper-col="wrapperCol" disabled>
                        <v-select v-model="smsTplForm.channelId" placeholder="请选择短信渠道" notfound="无法找到" :data="channelData"></v-select>
                    </v-form-item>
                </v-col>
                <v-col span='12'>
                    <v-form-item label="所属系统" :label-col="labelCol" :wrapper-col="wrapperCol" required>
                        <span class="ant-form-text" v-text="smsTplForm.systemName"></span>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='24'>
                    <v-form-item label="短信模板内容" :label-col="{span:4}" :wrapper-col="{span:19}">
                        <p class="ant-form-text" v-text="smsTplForm.templateText"></p>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='12'>
                    <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <v-switch v-model="smsTplForm.enabled" disabled>
                            <span slot="checkedChildren">开</span>
                            <span slot="unCheckedChildren">关</span>
                        </v-switch>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='24'>
                    <v-form-item label="备注" :label-col="{span:4}" :wrapper-col="{span:19}">
                        <p class="ant-form-text" v-text="smsTplForm.remark"></p>
                    </v-form-item>
                </v-col>
            </v-row>
        </v-form>
        <div slot="footer">
            <v-button key="cancel" type="ghost" size="large" @click="handleCancel"> 关 闭 </v-button>
        </div>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'

export default {
    props: ['isView'],
    components: {
        //addPane
    },
    computed: {
        ...mapState({
            addFlag: state => state.smsTemplateEditModule.addFlag,
            smsTplForm: state => state.smsTemplateEditModule.smsTplForm
        })
    },
    mounted() {

    },
    data: function() {
        return {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
            channelData: [],
        };
    },
    methods: {
        handleCancel() {
            this.$emit('cancel');
            this.$refs['smsTplForm'].resetFields();
            this.$store.commit('smsTemplateEditModule/INIT_FORM_DATA');
        }
    }
}
</script>
<style scoped lang='less'>
.ant-row.ant-form-item {
    margin-bottom: 8px;
}
</style>