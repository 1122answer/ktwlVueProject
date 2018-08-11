<template>
    <v-modal title="新增" :visible="visible" @ok="handleOk" @cancel="handleCancel">
        <v-row>
            <v-col span="11">
                <v-form-item label="上级分类" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback>
                    <v-select placeholder="请选择上级分类" style="width: 150px"></v-select>
                </v-form-item>
            </v-col>
            <v-col span="11">
                <v-form-item label="所属系统" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback>
                    <v-select placeholder="请选择所属系统" style="width: 150px"></v-select>
                </v-form-item>
            </v-col>
        </v-row>
         <v-row>
            <v-col span="11">
                <v-form-item label="分类名称" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback>
                    <v-input placeholder="请输入分类名称" style="width: 150px"></v-input>
                </v-form-item>
            </v-col>
            <v-col span="11">
                <v-form-item label="启用状态" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback>
                    <v-switch></v-switch>
                </v-form-item>
            </v-col>
        </v-row>

        <v-row>
            <v-col span="22">
                <v-form-item label="分类描述" :label-col="{span:4}" :wrapper-col="{span:20}" has-feedback>
                    <v-input type="textarea" style="resize:none"></v-input>
                </v-form-item>
            </v-col>
        </v-row>

        <v-row>
            <v-col span="22">
                <v-form-item label="备注" :label-col="{span:4}" :wrapper-col="{span:20}" has-feedback>
                    <v-input type="textarea" style="resize:none"></v-input>
                </v-form-item>
            </v-col>
        </v-row>

    </v-modal>
</template>

<script >
    export default {
        props: ["visible"],
        data () {
            return {
                labelCol: {
                span: 8
              },
              wrapperCol: {
                span: 14
              },
            }
        },

        methods: {
            
            handleOk () {
                this.$emit("ok");
            },

            handleCancel () {
                this.$emit("hide");
            }
        }
    }
</script>