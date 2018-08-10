<template>
    <v-modal title="机构类型信息" :visible="visible" @ok="addOk" @cancel="addCancel" :confirmLoading="addokbtn">
        <v-form direction="horizontal" :model="orgtypeForm" :rules="rules" ref="orgtypeForm">
            <v-form-item label="机构类型名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="name" has-feedback>
                <v-input size="large" v-model="orgtypeForm.name"></v-input>
            </v-form-item>
            <v-form-item label="机构注册类型" :label-col="labelCol" :wrapper-col="wrapperCol" prop="registerType">
                <v-select v-model="orgtypeForm.registerType" :value="['orgtypeForm.registerType'] " placeholder="请选择机构注册类型" :data="selectOrgType" size="lg"></v-select>
            </v-form-item>
            <v-form-item label="排序码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="sortId">
                <v-input-number size="large" :min="1" :max="100000" placeholder="请输入排序码" v-model="orgtypeForm.sortId"></v-input-number>
            </v-form-item>
            <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
                <v-switch v-model="orgtypeForm.isEnabled">
                    <span slot="checkedChildren">开</span>
                    <span slot="unCheckedChildren">关</span>
                </v-switch>
            </v-form-item>
        </v-form>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: ["visible"],
    computed: {
        ...mapState({
            orgtypeForm: state => state.orgtypeAddEditStore.orgtypeForm,
            selectOrgType: state => state.orgtypeListStore.selectRegionList,
        })
    },
    created() {
        this.$store.dispatch('orgtypeListStore/GetOrgTypelist').then(res => {
            // console.log(res)
        });
    },
    data() {
        return {
            addokbtn: false,
            rules: {
                name: [{
                    required: true,
                    message: '请填写机构类型名称'
                }],
                registerType: [{
                    required: true,
                    message: '请选择机构注册类型'
                }],
                sortId: [{
                    required: true,
                    message: '请输入排序码'
                }]
            },
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 15
            },
        }
    },
    methods: {
        addOk() {
            this.addokbtn = true;
            this.$refs.orgtypeForm.validate((valid) => {
                if (valid) {
                    // 添加模块
                    if (this.orgtypeForm.orgTypeId == null || this.orgtypeForm.orgTypeId == "") {
                        this.$store.dispatch('orgtypeAddEditStore/AddOrgTypelist').then(res => {
                            this.addokbtn = false;
                            if (res.data.success) {
                                this.$message.success("添加成功");
                                this.$emit("ok");
                            } else {
                                this.$message.error(res.data.data);
                            }
                        })
                    } else {
                        // 编辑模块
                        this.$store.dispatch('orgtypeAddEditStore/EdtiOrgTypelist').then(res => {
                            this.addokbtn = false;
                            console.log(res)
                            if (res.success) {
                                this.$message.success("修改成功");
                                this.$emit("ok");
                            } else {
                                this.$message.error(res.data);
                            }
                        })
                    }
                }
            });
        },
        addCancel() {
            // this.$refs['ruleForm'].resetFields();
            this.$emit('hide');
        }
    }
}
</script>