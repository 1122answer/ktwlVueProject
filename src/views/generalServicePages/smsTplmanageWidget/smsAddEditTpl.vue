<template>
    <v-modal title="短信模板" :visible="visible" @ok="handleOk" @cancel="handleCancel" :width="800" :confirmLoading="rolebutstate" :maskClosable="false">
        <v-form direction="horizontal" :model="smsTplForm" :rules="rules" ref="smsTplForm">
            <v-row>
                <v-col span='12'>
                    <v-form-item label="短信模板ID" :label-col="labelCol" :wrapper-col="wrapperCol" prop="templateCode">
                        <v-input size="large" v-model="smsTplForm.templateCode" maxlength="20" placeholder="短信模板ID"></v-input>
                    </v-form-item>
                </v-col>
                <v-col span='12'>
                    <v-form-item label="短信模板编码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="encoded">
                        <v-input size="large" v-model="smsTplForm.encoded" maxlength="20" placeholder="短信模板编码"></v-input>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='12'>
                    <v-form-item label="短信渠道" :label-col="labelCol" :wrapper-col="wrapperCol" prop="channelId">
                        <v-select v-model="smsTplForm.channelId" placeholder="请选择短信渠道" notfound="无法找到" :data="channelData" size="lg"></v-select>
                    </v-form-item>
                </v-col>
                <v-col span='12'>
                    <v-form-item label="所属系统" :label-col="labelCol" :wrapper-col="wrapperCol" required>
                        <v-select v-model="smsTplForm.systemId" placeholder="请选择所属系统" notfound="无法找到" :data="systemData" size="lg" label="text"              
                        :optionOnChange="true" @change="systemChange" ref="selectSystem"></v-select>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='24'>
                    <v-form-item label="短信模板内容" :label-col="{span:4}" :wrapper-col="{span:19}" prop="templateText">
                        <v-input type="textarea" placeholder="请输入短信模板内容" v-model="smsTplForm.templateText"></v-input>
                        <p>模板内容来自短信渠道，请与短信平台保持一致。</p>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='12'>
                    <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <v-switch v-model="smsTplForm.enabled">
                            <span slot="checkedChildren">开</span>
                            <span slot="unCheckedChildren">关</span>
                        </v-switch>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='24'>
                    <v-form-item label="备注" :label-col="{span:4}" :wrapper-col="{span:19}" prop="remark">
                        <v-input type="textarea" placeholder="请输入备注" v-model="smsTplForm.remark"></v-input>
                    </v-form-item>
                </v-col>
            </v-row>
        </v-form>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'

export default {
    props: ['visible'],
    components: {
        //addPane
    },
    computed: {
         ...mapState({
            addFlag: state => state.smsTemplateEditModule.addFlag,
            smsTplForm: state => state.smsTemplateEditModule.smsTplForm,
            systemData: state => state.smsTemplateEditModule.selectSystem
         })
    },
    /*watch:{
        visible(newVal,oldVal){
            if(newVal){
                this.$nextTick(() => {
                    this.$refs.selectSystem.value.push({
                        text : this.smsTplForm.systemName,
                    })
                });
            }
        }
    },*/
    mounted() {

    },
    data: function() {
        return {
            rolebutstate: false,
            labelCol: { span: 8 },
            wrapperCol: { span: 14 },
            channelData: [],
            rules: {
                templateCode: [{
                    required: true,
                    message: '请填写短信模板ID'
                }],
                encoded: [{
                    required: true,
                    message: '请填写短信模板编码'
                }],
                channelId: [{
                    required: true,
                    message: '请选择短信渠道'
                }],
                templateText: [{
                    required: true,
                    message: '请输入短信模板内容'
                }]
            },
        };
    },
    methods: {
        handleOk() {
            this.$refs.smsTplForm.validate((valid) => {
                if (valid) {
                    this.rolebutstate = true;
                    // 添加模块
                    if (this.addFlag) {
                        this.$store.dispatch('smsTemplateEditModule/addSaveData').then(res => {
                            this.rolebutstate = false;
                            if (res.data && res.data.success) {
                                this.$message.success("添加成功");
                                this.$emit("ok");
                                this.$store.commit('smsTemplateEditModule/INIT_FORM_DATA');
                            }
                        })
                    } else {
                        // 编辑模块
                        this.$store.dispatch('smsTemplateEditModule/editSaveData').then(res => {
                            this.rolebutstate = false;
                            /*console.log(res)*/
                            if (res.data && res.data.success) {
                                this.$message.success(res.data.data ,1);
                                this.$emit("ok");
                            }
                        })
                    }
                }
            });
        },
        handleCancel() {
            this.rolebutstate = false;
            this.$emit('cancel');
            this.$refs['smsTplForm'].resetFields();
            this.$store.commit('smsTemplateEditModule/INIT_FORM_DATA');
        },
        systemChange(optData){
            /*console.log(optData);*/
            if(optData){
                this.$store.commit('smsTemplateEditModule/UPDATE_SYSTEM_DATA',optData);
            }
        }
    }
}
</script>
<style scoped lang='less'>
</style>