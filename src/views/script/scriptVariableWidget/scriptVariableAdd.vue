<template>
    <v-modal title="添加" :visible="visible" :confirmLoading="variable" @ok="handleOk" @cancel="handleCancel" :width=800>
        <v-form direction="horizontal" :model="scriptVariableForm" :rules="rules" ref="scriptVariableForm">

            <v-row>
                <v-col span="12">
                    <v-form-item label="字段名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="fieldName" has-feedback>
                        <v-input placeholder="请输入字段名称" v-model="scriptVariableForm.fieldName" ></v-input>
                    </v-form-item>
                </v-col>
                <v-col span="12">
                    <v-form-item label="字段标题" :label-col="labelCol" :wrapper-col="wrapperCol" prop="fieldTitle" has-feedback>
                        <v-input placeholder="请输入字段标题" v-model="scriptVariableForm.fieldTitle" ></v-input>
                    </v-form-item>
                </v-col>
            </v-row>

            <v-row>
                <v-col span="12">
                    <v-form-item label="所属脚本分类" :label-col="labelCol" :wrapper-col="wrapperCol" prop="scriptTypeId" has-feedback>
                       <v-select :data="selectlist" v-model="scriptVariableForm.scriptTypeId"  placeholder="请选择所属脚本分类" ></v-select>
                    </v-form-item>
                </v-col>
                <v-col span="12">
                    <v-form-item label="值类型" :label-col="labelCol" :wrapper-col="wrapperCol" prop="valueType" has-feedback>
                       <v-select :data="valueTypeMap" v-model="scriptVariableForm.valueType"  placeholder="请选择值类型"></v-select>
                    </v-form-item>
                </v-col>
            </v-row>

            <v-row>
                 <v-col span="12">
                    <v-form-item label="变量类型" :label-col="labelCol" :wrapper-col="wrapperCol" prop="varriableType" has-feedback>
                       <v-select :data="varriableTypeMap" v-model="scriptVariableForm.varriableType"  placeholder="请选择变量类型"></v-select>
                    </v-form-item>
                </v-col>
                <v-col span="12">
                    <v-form-item label="变量值" :label-col="labelCol" :wrapper-col="wrapperCol" prop="varriableValue" has-feedback>
                        <v-input placeholder="请输入变量值" v-model="scriptVariableForm.varriableValue" ></v-input>
                    </v-form-item>
                </v-col>
            </v-row>

             <v-row>
                <v-col span="24">
                    <v-form-item label="备注" :label-col="{span:4}" :wrapper-col="{span:7}" prop="remark">
                        <v-input placeholder="备注信息最多50个字" v-model="scriptVariableForm.remark" type="textarea" style="resize:none"></v-input>
                    </v-form-item>
                </v-col>
            </v-row>

        </v-form>
    </v-modal>
</template>

<script >
import { mapState } from "vuex";
    export default {
    computed: {
        ...mapState({
          scriptVariableForm: state => state.scriptVariableAddModule.scriptVariableForm,
          valueTypeMap: state => state.scriptVariableModule.valueTypeMap,
          varriableTypeMap: state => state.scriptVariableModule.varriableTypeMap,
          selectlist: state => state.scriptVariableModule.selectlist,
        })
  },
  mounted() {
        this.$store.dispatch('scriptVariableModule/enumerate');
        this.$store.dispatch('scriptVariableModule/vartenumerate');
        this.$store.dispatch('scriptVariableModule/getselectlist');
  },
        props: ["visible"],
        data () {
            return {
                // visible: false,
                labelCol:{
                    span:8
                },
                wrapperCol:{
                    span:14
                },
                 rules: {
                    fieldName: [{
                        required: true,
                        message: '请输入字段名称'
                    }],
                    fieldTitle: [{
                        required: true,
                        message: '请输入字段标题'
                    }],
                    scriptTypeId: [{
                        required: true,
                        message: '请选择所属脚本分类标识'
                    }],
                    valueType: [{
                        required: true,
                        message: '请选择值类型'
                    }],
                    varriableType: [{
                        required: true,
                        message: '请选择变量类型'
                    }],
                    varriableValue: [{
                        required: true,
                        message: '请输入变量值'
                    }],
                },
                variable:false,
            }
        },

        methods: {
            handleOk() {
                this.variable = true;
                    this.$refs['scriptVariableForm'].validate((valid) => {
                        if (valid) {
                                     //添加脚本类型
                            if (this.scriptVariableForm.scriptVariableId == null || this.scriptVariableForm.scriptVariableId == "") {
                                this.$store.dispatch('scriptVariableAddModule/saveScriptVariable').then(res => {

                                    this.variable = false;
                                    if (res.data.success) {
                                        this.$message.success("添加成功")
                                        this.$emit('ok');
                                    } else {
                                        this.$message.error(res.data.data)
                                    }
                                })
                            } else {
                                //编辑脚本类型
                                this.$store.dispatch('scriptVariableAddModule/update').then(res => {
                                    this.variable = false;
                                    if (res.data.success) {
                                        this.$message.success("修改成功")
                                        this.$emit('ok');
                                    } else {
                                        this.$message.error(res.data.data)
                                    }
                                })
                            }
                        }
                    })
              // this.$emit("ok");
            },

    handleCancel() {
      this.$emit("hide");
    }
        }
    }
</script>