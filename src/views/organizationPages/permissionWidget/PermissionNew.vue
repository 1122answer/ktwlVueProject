<template>
    <v-modal title="权限管理" :visible="visible" @ok="addOk" @cancel="addCancel" :maskClosable="false">
        <v-form direction="horizontal" :model="newForm" :rules="rules" ref="newForm">
            <v-form-item label="操作按钮名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="actionName">
                <v-input placeholder="请输入操作按钮名称" v-model="newForm.actionName" size="large"></v-input>
            </v-form-item>
            <v-form-item label="按钮权限编码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="actionId">
                <v-input placeholder="请输入按钮权限编码" v-model="newForm.actionId" size="large"></v-input>
            </v-form-item>
            <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-switch v-model="newForm.enabled">
                    <span slot="checkedChildren">开</span>
                    <span slot="unCheckedChildren">关</span>
                </v-switch>
            </v-form-item>
            <v-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-input type="textarea" placeholder="" v-model="newForm.remark" style="resize:none;"></v-input>
            </v-form-item>
        </v-form>
    </v-modal>
</template>
<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState({
            newForm: state => state.permissionAddModule.newForm
        })
    },
    props: ["visible"],
    data() {
        return {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 15
            },
            rules: {
                actionName: [{
                    required: true,
                    message: '请填写名称'
                }],
                actionId: [{
                    required: true,
                    message: '请填写权限编码'
                }]
            },
        }
    },
    methods: {
        addOk() {
            this.$refs.newForm.validate((valid) => {
                if (valid) {
                    this.$store.dispatch('permissionAddModule/Addpermission', this.newForm).then(data => {})
                    this.$emit("ok")
                } else {
                    return
                }
            });
        },
        addCancel() {
            this.$emit("cancel")
        }
    }
}
</script>