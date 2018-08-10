<template>
    <v-modal title="添加脚本分类" :visible="visible" :confirmLoading="scriptbutstate" @ok="handleOk" @cancel="handleCancel">
        <v-form direction="horizontal" :model="scriptTypeForm" :rules="rules" ref="scriptTypeForm">
            <v-form-item label="脚本分类名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="name" has-feedback>
                <v-input placeholder="请输入脚本分类名称" size="large" v-model="scriptTypeForm.name"></v-input>
            </v-form-item>
            <v-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol" prop="remark">
                <v-input placeholder="备注信息最多50个字" v-model="scriptTypeForm.remark" type="textarea" style="resize:none"></v-input>
            </v-form-item>
            <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol" prop="enabled">
                <v-switch v-model="scriptTypeForm.enabled"></v-switch>
            </v-form-item>
        </v-form>
    </v-modal>
</template>

<script >
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      scriptTypeForm: state => state.scriptTypeAddModule.scriptTypeForm,
    })
  },
  mounted() {},
  props: ["visible"],
  data() {
    return {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 14
      },
      rules: {
         name: [{
            required: true,
            message: '请输入脚本分类名称'
          }],
                   
         },
      scriptbutstate:false,
    };
  },

  methods: {
    handleOk() {
        this.scriptbutstate = true;
            this.$refs['scriptTypeForm'].validate((valid) => {
                if (valid) {
                             //添加脚本类型
                    if (this.scriptTypeForm.scriptTypeId == null || this.scriptTypeForm.scriptTypeId == "") {
                        this.$store.dispatch('scriptTypeAddModule/saveScriptType').then(res => {

                            this.scriptbutstate = false;
                            if (res.data.success) {
                                this.$message.success("添加成功")
                                this.$emit('ok');
                            } else {
                                this.$message.error(res.data.data)
                            }
                        })
                    } else {
                        //编辑脚本类型
                        this.$store.dispatch('scriptTypeAddModule/update').then(res => {
                            this.scriptbutstate = false;
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
};
</script>
<style>
</style>