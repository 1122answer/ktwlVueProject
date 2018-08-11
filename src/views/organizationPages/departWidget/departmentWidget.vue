<template>
    <div id="departmentWidget">
        <v-modal title="部门信息" :confirm-loading="asyncConfirmLoading" :visible="isDepart" @ok="depaprtmentOk" @cancel="depaprtmentCancel" :maskClosable="false">
            <v-form direction="horizontal" :model="departmentForm" :rules="departmentRules" ref="departmentForm">
                <v-form-item label="所属机构名称" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <v-input size="large" v-model="departmentForm.orgName" disabled></v-input>
                </v-form-item>
                <v-form-item label="上级部门" :label-col="labelCol" :wrapper-col="wrapperCol" v-show="isChild" >
                    <v-tree-select style="width:285px" :data="parentIdList" ref="selectc" size="lg" :popupContainer="locatin" @select="selectFn" allow-clear placeholder="请选择上级部门，若空则为一级部门" @clear="clearDept"></v-tree-select>
                    <div id="locatin"></div>
                    <p class="text-success">上级部门可为空，若需要请点击选择</p>
                </v-form-item>
                <v-form-item label="部门名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="name">
                    <v-input size="large" v-model="departmentForm.name" maxlength="20"></v-input>
                </v-form-item>
                <v-form-item label="是否开启" :label-col="labelCol" :wrapper-col="wrapperCol" prop="enabled">
                    <v-switch v-model="departmentForm.enabled">
                        <span slot="checkedChildren">开</span>
                        <span slot="unCheckedChildren">关</span>
                    </v-switch>
                </v-form-item>
                <v-form-item label="备注信息" :label-col="labelCol" :wrapper-col="wrapperCol" prop="remark">
                    <v-input v-model="departmentForm.remark" type="textarea" placeholder="请输入备注信息" maxlength="128"></v-input>
                </v-form-item>
            </v-form>
        </v-modal>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    components: {
        //addPane
    },
    computed: {
        ...mapState({
            departmentForm: state => state.departmentModule.departmentForm,
            isChild: state => state.departmentModule.isChild,
            addFlag: state => state.departmentModule.addFlag,
            parentIdList: state => state.departmentModule.parentIdList,
        })
    },
    mounted() {

    },
    watch:{
        isDepart(newVal,oldVal){
            if(newVal){
                this.$nextTick(() => {
                    this.$refs.selectc.value.push({
                        text : this.departmentForm.parentName,
                    })
                });
            }
        }
    },
    props: ['isDepart'],
    data: function() {
        return {
            parantDeparment: [],
            departmentRules: {
                name: [{
                    required: true,
                    message: '请输入部门名称'
                }],
                parentId: [{
                    required: true,
                    message: '请选择上级部门'
                }],
                orgId: [{
                    required: true,
                    message: '请选择所属机构'
                }]
            },
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            },
            asyncConfirmLoading: false
        };
    },

    methods: {
        depaprtmentOk() {
            this.$refs['departmentForm'].validate((valid) => {
                if (valid) {
                    this.asyncConfirmLoading = true;
                    if (this.addFlag) {
                        this.$store.dispatch('departmentModule/fetchDepartmentSave').then(res => {
                            this.asyncConfirmLoading = false;
                            if (res) {
                                this.$message.success(res.data.data, 1);
                                this.$emit('ok');
                                this.$store.commit('departmentModule/CLEAR_FORM');
                                this.$refs['departmentForm'].resetFields();
                            }
                        });
                    } else {
                        this.$store.dispatch('departmentModule/fetchDepartEdit').then(res => {
                            this.asyncConfirmLoading = false;
                            if (res) {
                                this.$message.success(res.data.data, 1);
                                this.$emit('ok');
                                this.$store.commit('departmentModule/CLEAR_FORM');
                                this.$refs['departmentForm'].resetFields();
                            }
                        });
                    }
                } else {
                    this.asyncConfirmLoading = false;
                    return false;
                }
            });
        },
        depaprtmentCancel() {
            this.asyncConfirmLoading = false;
            this.$store.commit('departmentModule/CLEAR_FORM');
            this.$refs['departmentForm'].resetFields();
            this.$emit('cancel');
        },
        locatin() {
            return document.getElementById('locatin');
        },
        selectFn(paramObj) {
            //console.log('paramObj',paramObj)
            if (paramObj) {
                var dept_data = {};
                dept_data.parentId = paramObj.deptId;
                dept_data.parentName = paramObj.name;
                this.$store.commit('departmentModule/ADD_STATE_DEPT_ID',dept_data);
            }
        },
        clearDept(paramObj){
            // console.log('paramObj', paramObj);
            this.$store.commit('departmentModule/ADD_STATE_DEPT_ID');
        }
    }
}
</script>
<style>
#departmentWidget .ant-select-tree {
    width: 270px;
}
</style>
<style scoped lang='less'>
#locatin {
    position: relative;
}

#departmentWidget .ant-select-tree {
    width: 280px;
}
</style>