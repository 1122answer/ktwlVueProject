<template>
    <div id="addOrgDiag">
        <v-modal title="机构信息" :visible="isOrg" @ok="handleOk" @cancel="handleCancel" :width="1050" :confirmLoading="rolebutstate">
            <v-form direction="horizontal" :model="orgForm" :rules="rules" ref="orgForm">
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="机构名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="name">
                            <v-input size="large" v-model="orgForm.name" maxlength="20"></v-input>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="所属机构类型" :label-col="labelCol" :wrapper-col="wrapperCol" prop="orgTypeId">
                            <v-select v-model="orgForm.orgTypeId" placeholder="请选择机构类型" notfound="无法找到" :data="selectOrgType" size="lg" @change="changeOrgType" :optionOnChange="true">
                            </v-select>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="状态" :label-col="labelCol" :wrapper-col="wrapperCol" prop="state">
                            <v-select v-model="orgForm.state" placeholder="请选择状态" notfound="无法找到" :data="[{value: '0', label: '未激活'},{value: '1', label: '正常'},{value: '2', label: '冻结'},{value: '3', label: '禁用'}]" size="lg"></v-select>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="机构简称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="shortName">
                            <v-input placeholder="请输入机构简称" v-model="orgForm.shortName" maxlength="20"></v-input>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="统一社会信用代码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="socialCreditCode">
                            <v-input size="large" v-model="orgForm.socialCreditCode" maxlength="32"></v-input>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="所属行政区域" :label-col="labelCol" :wrapper-col="wrapperCol" prop="regionCode">
                            <v-tree-select :data="treeRegion" allow-clear style="width:100%;" :popupContainer="commandRegion" placeholder="请选择行政区域" @select="treeRegionSelect" ref="orgRegionSelect"></v-tree-select>
                            <div id='commandOrgRegion'></div>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="社会统一信用编码证" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <div style="width: 100px; height: 70px">
                                <v-upload drag accept="image/*" :file-list="defaultFileList">
                                    <v-icon type="plus"></v-icon>
                                </v-upload>
                            </div>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="机构图标" :label-col="labelCol" :wrapper-col="wrapperCol" style="height:80px;">
                            <div style="width: 100px; height: 70px">
                                <v-upload drag accept="image/*">
                                    <v-icon type="plus"></v-icon>
                                </v-upload>
                            </div>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="详细地址" :label-col="labelCol" :wrapper-col="wrapperCol" prop="address">
                            <v-input type="textarea" placeholder="请输入机构地址信息" v-model="orgForm.address" maxlength="50"></v-input>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="机构成立日期" :label-col="labelCol" :wrapper-col="wrapperCol" prop="establishDate">
                            <v-date-picker v-model="orgForm.establishDate" clearable size="lg" :style="{width:'100%'}"></v-date-picker>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="营业期限起始日期" :label-col="labelCol" :wrapper-col="wrapperCol" prop="businessTermStartDate">
                            <v-date-picker v-model="orgForm.businessTermStartDate" clearable size="lg" :style="{width:'100%'}"></v-date-picker>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="营业期限截止日期" :label-col="labelCol" :wrapper-col="wrapperCol" prop="businessTermEndDate">
                            <v-date-picker v-model="orgForm.businessTermEndDate" clearable size="lg" :style="{width:'100%'}"></v-date-picker>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="法人证件姓名" :label-col="labelCol" :wrapper-col="wrapperCol" prop="corporateCertificationName">
                            <v-input size="large" v-model="orgForm.corporateCertificationName" maxlength="20"></v-input>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="法人证件类型" :label-col="labelCol" :wrapper-col="wrapperCol" prop="corporateCertificationType">
                            <v-select v-model="orgForm.corporateCertificationType" placeholder="请选择法人证件类型" notfound="无法找到" :data="[{value: '0', label: '身份证'}, {value: '1', label: '护照'}]" size="lg"></v-select>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="法人证件号码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="corporateCertificationId">
                            <v-input size="large" v-model="orgForm.corporateCertificationId" placeholder="请输入证件号码" maxlength="30"></v-input>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="法人身份证正面照片" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <div style="width: 100px; height: 70px">
                                <v-upload drag accept="image/*">
                                    <v-icon type="plus"></v-icon>
                                </v-upload>
                            </div>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="法人身份证反面照片" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <div style="width: 100px; height: 70px">
                                <v-upload drag accept="image/*">
                                    <v-icon type="plus"></v-icon>
                                </v-upload>
                            </div>
                        </v-form-item>
                    </v-col>
                </v-row>
            </v-form>
        </v-modal>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'login',
    components: {
        //addPane
    },
    computed: {
        ...mapState({
            defaultFileList: state => state.orgAddEditModule.defaultFileList,
            orgForm: state => state.orgAddEditModule.orgForm,
            treeRegion: state => state.commonSelect.regionSelect,
            selectOrgType: state => state.orgAddEditModule.selectRegionList,
            addFlag: state => state.orgAddEditModule.addFlag
        })
    },
    watch: {
        isOrg(newVal) {
            if (newVal) {
                this.$store.dispatch('orgAddEditModule/getIDType');   //请求证件类型
                this.$store.dispatch('commonSelect/getRegionSelectTree');
                this.$nextTick(() => {
                    this.$refs.orgRegionSelect.value.push({
                        text: this.orgForm.regionName
                    });
                })
            }
        }
    },
    created() {
        this.$store.dispatch('orgAddEditModule/fetchOrgType').then(res => {});
    },
    props: ['isOrg'],
    data: function() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.orgForm.checkPass !== '') {
                    this.$refs.orgForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (this.orgForm.checkPass !== this.orgForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var validateCreditCode = (rule, value, callback) => {
            var reg = new RegExp(/^[0-9a-zA-Z]+$/);
            if (reg.test(value) == false) {
                callback(new Error('统一社会信用代码由数字或字母'));
            } else {
                callback();
            }
        };
        return {
            rules: {
                name: [{
                    required: true,
                    message: '请输入机构名称'
                }],
                orgTypeId: [{
                    required: true,
                    message: '请选择机构类型'
                }],
                state: [{
                    required: true,
                    message: '请选择状态'
                }],
                socialCreditCode: [{
                    required: true,
                    message: '统一社会信用代码必填，由数字或字母组成'
                }, {
                    validator: validateCreditCode
                }],
                corporateCertificationName: [{
                    required: true,
                    message: '请输入法人姓名'
                }],
                corporateCertificationType: [{
                    required: true,
                    message: '请选择法人证件类型'
                }],
                corporateCertificationId: [{
                    required: true,
                    message: '请输入法人证件号码'
                }],
                establishDate: [{
                    required: true,
                    message: '请选择机构成立日期'
                }],
                businessTermStartDate: [{
                    required: true,
                    message: '请选择营业期限起始日期'
                }],
                businessTermEndDate: [{
                    required: true,
                    message: '请选择营业期限截止日期'
                }],
                tetnwet: '',
            },
            labelCol: {
                span: 9
            },
            wrapperCol: {
                span: 15
            },
            rolebutstate: false,
        };
    },
    methods: {
        commandRegion() {
            var selector = document.getElementById('commandOrgRegion');
            return selector;
        },
        handleOk() {
            this.$refs['orgForm'].validate((valid) => {
                if (valid) {
                    var oDate1 = new Date(this.orgForm.businessTermStartDate);
                    var oDate2 = new Date(this.orgForm.businessTermEndDate);
                    if (oDate1.getTime() > oDate2.getTime()) {
                        this.$message['warning']("营业期限的开始时间不能大于结束时间");
                        return;
                    }
                    if (this.addFlag) {
                        this.rolebutstate = true;
                        this.$store.dispatch('orgAddEditModule/fetchAddSave').then(res => {
                            this.rolebutstate = false;
                            if (res) {
                                this.$message.success(res.data.data, 1);
                                this.$refs['orgForm'].resetFields();
                                this.$emit('ok');
                            }
                        });
                    } else {
                        this.rolebutstate = true;
                        this.$store.dispatch('orgAddEditModule/fetchUpdateSave').then(res => {
                            this.rolebutstate = false;
                            if (res) {
                                this.$message.success(res.data.data, 1);
                                this.$refs['orgForm'].resetFields();
                                this.$emit('ok');
                            }
                        });
                    }
                } else {
                    this.rolebutstate = false;
                    return false;
                }
            });
        },
        handleCancel() {
            this.rolebutstate = false;
            this.$emit('cancel');
            this.$refs['orgForm'].resetFields();
        },
        changeOrgType(typeObj) {
            if (typeObj && typeObj.selected) {
                this.$store.commit('orgAddEditModule/CHANGE_TYPE_NAME', typeObj.label);
            }
        },
        treeRegionSelect(param) {
            console.log('treeRegionSelect============', param);
            if (param) {
                var obj = {};
                obj.regionCode = param.regionCode;
                obj.regionName = param.name;
                this.$store.commit('orgAddEditModule/CHANGE_REGION_DATA', obj);
            }
        }
    }
}
</script>
<style>
#addOrgDiag .ant-select-tree {
    width: 200px;
}
</style>
<style scoped lang='less'>
#commandOrgRegion {
    position: relative;
}
</style>