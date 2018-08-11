<template>
    <div id="userAddEdit">
        <v-modal title="用户信息" :visible="visible" :width=800 @ok="handleOk" @cancel="handleCancel" :confirm-loading="asyncConfirmLoading" :maskClosable="false">
            <v-form direction="horizontal" class="alert-content" :model="userForm" :rules="rules" ref="userForm">
                <h4 class="padding-bottom-10"><i class="fa fa-leaf oxford"></i> 个人信息</h4>
                <v-row>
                    <v-col span="10">
                        <v-form-item label="输入昵称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="nickName">
                            <v-input placeholder="请输入昵称" size="large" v-model="userForm.nickName" maxlength="20"></v-input>
                        </v-form-item>
                    </v-col>
                    <v-col span="8">
                        <v-form-item label="手机号码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="mobile">
                            <v-input placeholder="请输入手机号码" size="large" v-model="userForm.mobile" maxlength="11"></v-input>
                        </v-form-item>
                    </v-col>
                    <v-col span="6">
                        <v-form-item label="性别" :label-col="labelCol" :wrapper-col="wrapperCol" prop="gender">
                            <v-radio-group v-model="userForm.gender" :data="[{value: '0', text: '男'},{value: '1', text: '女'}]"></v-radio-group>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span="10">
                        <v-form-item label="行政区域" :label-col="labelCol" :wrapper-col="wrapperCol" prop="regionCode">
                            <v-tree-select :data="treeRegion" allow-clear style="width:100%;" v-model="userForm.regionCode" :popupContainer="commandRegion" placeholder="请选择行政区域" @select="regionChange" ref="userRegion"></v-tree-select>
                            <div id="administrativeArea"></div>
                        </v-form-item>
                    </v-col>
                    <v-col span="8">
                        <label span="24">默认归属机构：{{userForm.orgName || '无'}}</label>
                    </v-col>
                    <v-col span="6">
                        <label  span="24">默认归属部门： {{userForm.deptName || '无'}}</label>
                    </v-col>
                </v-row>
                <v-row v-if="false">
                    <v-col span="14">
                        <v-form-item label="归属机构或部门" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <v-tree-select :data="orgDepartTree" allow-clear style="width:300px" placeholder="请选择用户归属" :popupContainer="ascript"></v-tree-select>
                            <div id="orgOrDepart"></div>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span="10">
                        <v-form-item label="真实姓名" :label-col="labelCol" :wrapper-col="wrapperCol" prop="realName">
                            <v-input placeholder="请输入真实姓名" size="large" v-model="userForm.realName" maxlength="20"></v-input>
                        </v-form-item>
                    </v-col>
                    <v-col span="5">
                        <v-form-item label="证件类型" :label-col="{span:10}" :wrapper-col="{span:12}" prop="certificateType">
                            <v-select size="large" placeholder="类型" :data="[{value: 0, label: '身份证'}, {value: 1, label: '护照'}]" v-model="userForm.certificateType"></v-select>
                        </v-form-item>
                    </v-col>
                    <v-col span="8">
                        <v-form-item label="证件号码" :label-col="{span:10}" :wrapper-col="{span:14}" prop="certificateId">
                            <v-input placeholder="请输入账号" size="large" v-model="userForm.certificateId" maxlength="32"></v-input>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span="10">
                        <div class="ant-col-6 ant-form-item-label">
                            <label class=""> &nbsp;&nbsp;&nbsp;上传头像</label>
                        </div>
                        <div style="width: 100px; height: 70px;margin-left:80px;border:1px solid #f2f2f2;">
                            <v-upload :name="name" :action="action" drag @change="onChange">
                                <v-icon type="plus"></v-icon>
                            </v-upload>
                        </div>
                    </v-col>
                    <v-col span="8">
                        <v-form-item label="电子邮箱" :label-col="labelCol" :wrapper-col="wrapperCol" prop="email">
                            <v-input placeholder="请输入邮箱地址" size="large" v-model="userForm.email" maxlength="30"></v-input>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row class='padding-top-25'>
                    <v-col span="23">
                        <v-form-item label="用户地址" :label-col="{span:3}" :wrapper-col="{span:21}" prop="address">
                            <v-input placeholder="请输入用户地址" size="large" v-model="userForm.address" maxlength="50"></v-input>
                        </v-form-item>
                    </v-col>
                </v-row>
                <h4 class="padding-bottom-10"><i class="fa fa-leaf oxford"></i> 账号信息</h4>
                <v-row>
                    <v-col span="14">
                        <v-form-item label="账号" :label-col="labelCol" :wrapper-col="wrapperCol" prop="accountUser">
                            <v-input placeholder="请输入账号名称" v-model="userForm.accountUser" size="large" :disabled="disableBeal" maxlength="30">
                                <span slot="after" class="generate" @click="generate"><v-icon type="rocket"></v-icon>系统生成</span>
                            </v-input>
                        </v-form-item>
                    </v-col>
                    <v-col span="8" v-show="!disableBeal">
                        <v-form-item label="密码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="password">
                            <v-input placeholder="请输入账号密码" type="password" v-model="userForm.password" size="large" maxlength="30">
                            </v-input>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span="14">
                        <v-form-item label="账号状态" :label-col="labelCol" :wrapper-col="wrapperCol" prop="state">
                            <v-radio-group v-model="userForm.state" :data="[{value: '0', text: '未激活'},{value: '1', text: '正常'},{value: '2', text: '冻结'},{value: '3', text: '封停'}]"></v-radio-group>
                        </v-form-item>
                    </v-col>
                </v-row>
            </v-form>
        </v-modal>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import axios from 'axios';
export default {
    props: ["visible"],
    computed: {
        ...mapState({
            userForm: state => state.userAddEditModule.userForm,
            orgDepartTree: state => state.userAddEditModule.orgDepartTree,
            addFlag: state => state.userAddEditModule.addFlag,
            disableBeal: state => state.userAddEditModule.disableBeal,
            currentDeptId: state => state.userListModule.currentDeptId,
            currentOrgId: state => state.userListModule.currentOrgId,
            currentOrgName: state => state.userListModule.currentOrgName,
            currentDeptName: state => state.userListModule.currentDeptName,
            treeRegion: state => state.commonSelect.regionSelect,   //得到行政区域的数据
            regionOriginal: state => state.commonSelect.regionOriginal
        }),
    },
    watch:{
        visible(nowVal){
            if(nowVal){
                this.$nextTick(() =>{
                    var regionText ='';
                    this.regionOriginal.map(item =>{
                        if(item.regionCode == this.userForm.regionCode){
                            regionText =item.name;
                        }
                    });
                    this.$refs.userRegion.value.push({
                        text: regionText
                    });
                });
            }
        }
    },
    data() {
        var validateEmail = (rule, value, callback) => {
            var reg = new RegExp(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/);
            setTimeout(() => {
                if (value && reg.test(value) == false) {
                    callback(new Error('格式为：名称@域名'));
                } else {
                    callback();
                }
            }, 200);
        };
        var validateMobile = (rule, value, callback) => {
            var reg = new RegExp(/^[1][0-9]{10}$/);
            if (value && reg.test(value) == false) {
                callback(new Error('请输入11位的手机号码'));
            } else {
                callback();
            }
        }
        var validateAccoutUser = (rule, value, callback) => {
            var reg = new RegExp(/[^\w\.\/]/ig);
            if (value && reg.test(value) == true) {
                callback(new Error('账号只允许是英文字母、数字或下划线_组成'));
            } else {
                callback();
            }
        }
        return {
            asyncConfirmLoading: false,
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 15
            },
            name: 'file',
            action: '/upload',
            rules: {
                nickName: [{
                    required: true,
                    message: '请输入昵称'
                }],
                regionCode: [{
                    required: true,
                    message: '请选择行政区域'
                }],
                mobile: [{
                    validator: validateMobile
                }],
                email: [{
                    validator: validateEmail
                }],
                accountUser: [{
                    validator: validateAccoutUser
                }]
            },
        }
    },
    methods: {
        commandRegion() {
            return document.getElementById('administrativeArea');
        },
        ascript() {
            return document.getElementById('orgOrDepart');
        },
        handleOk() {
            this.$refs.userForm.validate((valid) => {
                if (valid) {
                    this.asyncConfirmLoading = true;
                    var saveParamObj = {
                        currentDeptId: this.currentDeptId,
                        currentOrgId: this.currentOrgId,
                        currentOrgName: this.currentOrgName,
                        currentDeptName: this.currentDeptName
                    }
                    if (this.addFlag) {
                        this.$store.dispatch('userAddEditModule/fetchUserSave', saveParamObj).then(res => {
                            this.asyncConfirmLoading = false;
                            if (res) {
                                this.$message.success(res.data.data, 1);
                                this.$emit('ok');
                                this.$refs['userForm'].resetFields();
                            }
                        });
                    } else {
                        this.$store.dispatch('userAddEditModule/fetchEditUserSave').then(res => {
                            this.asyncConfirmLoading = false;
                            if (res) {
                                this.$message.success(res.data.data, 1);
                                this.$emit('ok');
                                this.$refs['userForm'].resetFields();
                            }
                        });
                    }
                } else {
                    this.asyncConfirmLoading = false;
                    return false;
                }
            });
        },
        handleCancel() {
            this.asyncConfirmLoading = false;
            this.$emit('cancel')
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList)
            }
            if (info.file.status === 'done') {
                console.log(info.file.name + ' 上传成功.')
            } else if (info.file.status === 'error') {
                console.log(info.file.name + ' 上传失败.')
            }
        },
        generate() {
            if (!this.disableBeal) {
                this.$store.dispatch('userAddEditModule/fetchGetAccount').then(res => {
                    if (res.data && res.data.success) {
                        this.$store.commit('userAddEditModule/DIST_ACOUNT_NAME', res.data.data)
                    }
                });
            }
        },
        regionChange(param){
            /*console.log('regionChange',param);*/
            this.$store.commit('userAddEditModule/CHANGE_REGION_DATA',param.regionCode);
        }
    }
}
</script>
<style>
    #userAddEdit #administrativeArea .ant-select-tree{
        min-width:200px;
    }
</style>
<style scoped lang='less'>
#orgOrDepart,
#administrativeArea {
    position: relative;
}
.generate {
    display: inline-block;
    line-height: 22px;
    cursor: pointer;
}
.oxford {
    color: rgba(115, 91, 91, 0.8509803921568627);
}
</style>