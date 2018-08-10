<template>
    <div id="orgInfoShow">
        <v-modal title="机构信息" :visible="visible" @cancel="handleCancel" :width="1050">
            <v-form direction="horizontal" :model="orgViewForm" ref="orgViewForm">
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="机构名称" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="orgViewForm.name"></span>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="所属机构类型" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <v-select v-model="orgViewForm.orgTypeId" :data="selectOrgType" size="lg" disabled>
                            </v-select>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="状态" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <v-select v-model="orgViewForm.state" placeholder="请选择状态" :data="[{value: '0', label: '未激活'},{value: '1', label: '正常'},{value: '2', label: '冻结'},{value: '3', label: '禁用'}]" size="lg" disabled></v-select>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="机构简称" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="orgViewForm.shortName"></span>                           
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="统一社会信用代码" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="orgViewForm.socialCreditCode"></span>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="所属行政区域" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="orgViewForm.regionName"></span>
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
                        <v-form-item label="详细地址" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="orgViewForm.address"></span>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="机构成立日期" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="orgViewForm.establishDate"></span>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="营业期限起始日期" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="orgViewForm.businessTermStartDate"></span>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="营业期限截止日期" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="orgViewForm.businessTermEndDate"></span>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="法人证件姓名" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="orgViewForm.corporateCertificationName"></span>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="法人证件类型" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <v-select v-model="orgViewForm.corporateCertificationType" placeholder="请选择法人证件类型" :data="[{value: '0', label: '身份证'}, {value: '1', label: '护照'}]" size="lg" disabled></v-select>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="法人证件号码" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="orgViewForm.corporateCertificationId"></span>
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
            <div slot="footer">
            <v-button key="cancel" type="ghost" size="large" @click="handleCancel"> 关 闭 </v-button>
        </div>
        </v-modal>
    </div>
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
            defaultFileList: state => state.orgInfoViewModule.defaultFileList,
            orgViewForm: state => state.orgInfoViewModule.orgViewForm,
            treeRegion: state => state.orgInfoViewModule.treeRegion,
            selectOrgType: state => state.orgInfoViewModule.selectOrgTypeList,
            addFlag: state => state.orgInfoViewModule.addFlag
        })
    },
    created() {
       //this.$store.dispatch('orgInfoViewModule/fetchOrgType').then(res=>{})
    },
    data: function() {
        return {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 }
        };
    },
    methods: {
        commandRegion() {
            var selector = document.getElementById('commandOrgRegion');
            return selector;
        },
        handleCancel(){
            this.$emit('cancel');
        }
    }
}
</script>
<style scoped lang='less'>
#commandOrgRegion {
    position: relative;
}
</style>