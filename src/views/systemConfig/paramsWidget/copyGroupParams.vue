<template>
    <v-modal :title="titleName" :visible="visible" @cancel="cancel" :width="600" :confirmLoading="rolebutstate">
        <v-form direction="horizontal" :model="paramConfigForm" :rules="rules" ref="paramConfigForm">
            <v-row>
                <v-col span='12'>
                    <v-form-item label="所属系统" :label-col="labelCol" :wrapper-col="wrapperCol" prop="systemName" required>
                        <span v-if="addFlag == 1">{{paramConfigForm.systemName}}</span>
                        <v-select v-else v-model="paramConfigForm.systemName" placeholder="请选择所属系统" notfound="无法找到" :data="systemData" size="lg" label="label" :optionOnChange="true" @change="systemChange" ref="selectSystem"></v-select>
                    </v-form-item>
                </v-col>
                <v-col span='12'>
                    <v-form-item label="行政区域名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="regionName" required>
                        <span v-if="addFlag == 1">{{paramConfigForm.regionName}}</span>
                        <v-select v-else v-model="paramConfigForm.regionName" placeholder="请选择区域" notfound="无法找到" :data="regionData" size="lg" label="label" :optionOnChange="true" @change="regionChange" ref="selectRegion"></v-select>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='12'>
                    <v-form-item label="分组名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="groupName" required>
                        <span v-if="addFlag == 1">{{paramConfigForm.groupName}}</span>
                        <v-select v-else v-model="paramConfigForm.groupName" placeholder="请选择分组" notfound="无法找到" :data="groupData" size="lg" label="label" :optionOnChange="true" @change="groupChange" ref="selectGroup"></v-select>
                    </v-form-item>
                </v-col>
                <v-col span='12'>
                    <v-form-item label="分组编号" :label-col="labelCol" :wrapper-col="wrapperCol" prop="groupId">
                        <span>{{paramConfigForm.groupId}}</span>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='12'>
                    <v-form-item label="参数名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="configName" required>
                        <span v-if="addFlag == 1">{{paramConfigForm.configName}}</span>
                        <v-input v-else placeholder="请输入参数名称" v-model="paramConfigForm.configName"></v-input>
                    </v-form-item>
                </v-col>
                <v-col span='12'>
                    <v-form-item label="参数编号" :label-col="labelCol" :wrapper-col="wrapperCol" prop="configKey" required>
                        <span v-if="addFlag == 1">{{paramConfigForm.configKey}}</span>
                        <v-input v-else placeholder="请输入参数编号" v-model="paramConfigForm.configKey"></v-input>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='12'>
                    <v-form-item label="值1" :label-col="labelCol" :wrapper-col="wrapperCol" prop="configValue" required>
                        <span v-if="addFlag == 1">{{paramConfigForm.configValue}}</span>
                        <v-input v-else placeholder="请输入参数值" v-model="paramConfigForm.configValue"></v-input>
                    </v-form-item>
                </v-col>
                <v-col span='12'>
                    <v-form-item label="值2" :label-col="labelCol" :wrapper-col="wrapperCol" prop="configValue2">
                        <span v-if="addFlag == 1">{{paramConfigForm.configValue2}}</span>
                        <v-input v-else placeholder="请输入参数值2" v-model="paramConfigForm.configValue2"></v-input>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='12'>
                    <v-form-item label="值3" :label-col="labelCol" :wrapper-col="wrapperCol" prop="configValue3">
                        <span v-if="addFlag == 1">{{paramConfigForm.configValue3}}</span>
                        <v-input v-else placeholder="请输入参数值3" v-model="paramConfigForm.configValue3"></v-input>
                    </v-form-item>
                </v-col>
                <v-col span='12'>
                    <v-form-item label="参数说明" :label-col="labelCol" :wrapper-col="wrapperCol" prop="configDesc" required>
                        <span v-if="addFlag == 1">{{paramConfigForm.configDesc}}</span>
                        <v-input v-else placeholder="请输入参数说明" v-model="paramConfigForm.configDesc"></v-input>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='12'>
                    <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <v-switch v-model="paramConfigForm.isEnabled">
                            <span slot="checkedChildren">开</span>
                            <span slot="unCheckedChildren">关</span>
                        </v-switch>
                    </v-form-item>
                </v-col>
                <v-col span='12'>
                    <v-form-item label="操作权限" :label-col="labelCol" :wrapper-col="wrapperCol" prop="modifyType" required>
                        <span v-if="addFlag == 1">{{modifyTypeText}}</span>
                        <v-select v-else v-model="paramConfigForm.modifyType" placeholder="请选择操作权限" notfound="无法找到" :data="modifyTypeData" size="lg" label="text" :optionOnChange="true" @change="modifyTypeChange" ref="selectModifyType"></v-select>
                    </v-form-item>
                </v-col>
            </v-row>
            <v-row>
                <v-col span='24'>
                    <v-form-item label="备注" :label-col="{span : 4}" :wrapper-col="{span : 19}" prop="remark">
                        <span v-if="addFlag == 1">{{paramConfigForm.remark}}</span>
                        <v-input v-else type="textarea" placeholder="请输入备注" v-model="paramConfigForm.remark"></v-input>
                    </v-form-item>
                </v-col>
            </v-row>
        </v-form>
        <div slot="footer">
            <v-button v-if="modifyTypeValue != 0" key="ok" type="primary" size="large" @click="ok">
                <span v-if="addFlag == 1">修改</span>
                <span v-else>保存</span>
            </v-button>
            <v-button key="cancel" type="ghost" size="large" @click="cancel">取消
            </v-button>
        </div>
    </v-modal>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["visible"],
  components: {
    //addPane
  },
  computed: {
    ...mapState({
      addFlag: state => state.prsAddEditModule.addFlag,
      paramConfigForm: state => state.prsAddEditModule.paramConfigForm,
      modifyTypeData: state => state.prsAddEditModule.selectModifyType,
      modifyTypeText: state => state.prsAddEditModule.modifyTypeText,
      modifyTypeValue: state => state.prsAddEditModule.modifyTypeValue,
      systemData: state => state.prsAddEditModule.selectSystem,
      regionData: state => state.prsAddEditModule.selectRegion,
      groupData: state => state.prsAddEditModule.selectGroup
    })
  },
  mounted() {},
  data: function() {
    return {
      titleName: "详情", //标题
      rolebutstate: false,
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      rules: {
        systemName: [
          {
            required: true,
            message: "请填写系统名称"
          }
        ],
        regionName: [
          {
            required: true,
            message: "请填写参数编号"
          }
        ],
        groupName: [
          {
            required: true,
            message: "请选择参数值"
          }
        ],

        configName: [
          {
            required: true,
            message: "请填写参数名称"
          }
        ],
        configKey: [
          {
            required: true,
            message: "请填写参数编号"
          }
        ],
        configValue: [
          {
            required: true,
            message: "请选择参数值"
          }
        ],
        configDesc: [
          {
            required: true,
            message: "请输入参数说明"
          }
        ],
        modifyType: [
          {
            required: true,
            message: "请输入参数说明"
          }
        ]
      }
    };
  },
  methods: {
    ok() {
      if (this.addFlag == 1) {
        this.$store.commit("prsAddEditModule/ADD_EDIT_FLAG", 3);
      } else {
        this.$emit("ok");
        this.$refs.paramConfigForm.validate(valid => {
          if (valid) {
            this.rolebutstate = true;
            // 添加模块
            if (this.addFlag == 2) {
              this.$store.dispatch("prsAddEditModule/addSaveData").then(res => {
                this.rolebutstate = false;
                if (res.data && res.data.success) {
                  this.$message.success("添加成功");
                  this.$emit("ok");
                  this.$store.commit("prsAddEditModule/INIT_FORM_DATA");
                }
              });
            } else if (this.addFlag == 3) {
              // 编辑模块
              this.$store
                .dispatch("prsAddEditModule/editSaveData")
                .then(res => {
                  this.rolebutstate = false;
                  /*console.log(res)*/
                  if (res.data && res.data.success) {
                    this.$message.success(res.data.data, 1);
                    this.$emit("ok");
                    this.$store.commit("prsAddEditModule/INIT_FORM_DATA");
                  }
                });
            }
          }
        });
      }
    },
    cancel() {
      this.rolebutstate = false;
      this.$emit("cancel");
      this.$refs["paramConfigForm"].resetFields();
      this.$store.commit("prsAddEditModule/INIT_FORM_DATA");
    },
    modifyTypeChange(optData) {
      if (optData) {
        this.$store.commit("prsAddEditModule/UPDATE_MODIFYTYPE_DATA", optData);
      }
    },
    systemChange(optData) {
      if (optData) {
        this.$store.commit("prsAddEditModule/UPDATE_SYSTEM_DATA", optData);
      }
    },
    regionChange(optData) {
      if (optData) {
        this.$store.commit("prsAddEditModule/UPDATE_REGION_DATA", optData);
      }
    },
    groupChange(optData) {
      if (optData) {
        this.$store.commit("prsAddEditModule/UPDATE_GROUP_DATA", optData);
      }
    }
  }
};
</script>
<style scoped lang='less'>
</style>