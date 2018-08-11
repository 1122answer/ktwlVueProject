<template>
    <v-modal title="测试发送" :visible="isSend" @cancel="handleCancel" :width="400" @ok="handleOk" :maskClosable="false">
        <v-form direction="horizontal" :model="sendSmForm" ref="sendSmForm" class="widgetWrap">
            <v-form-item label="手机号码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="tel">
                <v-input type="text" size="large" v-model="sendSmForm.tel" placeholder="请输入手机号码"></v-input>
            </v-form-item>
            <v-form-item label="code" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-input type="textarea" v-model="sendSmForm.code"></v-input>
            </v-form-item>
            <v-form-item label="msg" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-input type="textarea" v-model="sendSmForm.msg"></v-input>
            </v-form-item>
        </v-form>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'

export default {
    props: ['isSend'],
    components: {
        //addPane
    },
    computed: {
        // ...mapState({

        // })
    },
    mounted() {

    },
    data: function() {
        return {
            sendSmForm:{
                tel: '',
                code: '',
                msg: ''
            },
            labelCol: {
                span:7
            },
            wrapperCol: {
                span: 14
            }
        };
    },
    methods: {
        handleCancel(){
            this.$emit('cancel');
            this.$refs['sendSmForm'].resetFields();
        },
        handleOk(){
            this.$emit('ok');
        }
    }
}
</script>
<style scoped lang='less'>
</style>