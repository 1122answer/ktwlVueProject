<template>
    <v-modal title="新增" :visible="visible" @ok="handleOk" @cancel="handleCancel" :width="800" :maskClosable="false">
      <!-- <addRelationDialog :visible="relation" @ok="okDialog" @hide="hideDialog"></addRelationDialog> -->
          <v-row>
                <v-col span="8">
                    <v-form-item label="所属分类" :label-col="{span:10}" :wrapper-col="{span:14}" prop="fieldName" has-feedback>
                       <v-select v-model="businessForm.scriptTypeId"  placeholder="请选择所属分类" style="width: 150px"></v-select>
                    </v-form-item>
                </v-col>
                <v-col span="8">
                    <v-form-item label="修改类型" :label-col="{span:10}" :wrapper-col="{span:14}" prop="fieldTitle" has-feedback>
                        <v-select v-model="businessForm.scriptTypeId"  placeholder="请选择所修改类型" style="width: 150px"></v-select>
                    </v-form-item>
                </v-col>
                <v-col span="8">
                  <v-form-item label="是否启用" :label-col="{span:10}" :wrapper-col="{span:14}" prop="enabled">
                      <v-switch></v-switch>
                  </v-form-item>
                </v-col>
          </v-row>

          <v-row>
                <v-col span="8">
                    <v-form-item label="业务名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="regionCode" has-feedback>
                        <v-input placeholder="请输入业务名称" v-model="businessForm.regionCode" ></v-input>
                    </v-form-item>
                </v-col>
                <v-col span="16">
                    <v-form-item label="业务描述" :label-col="{span:5}" :wrapper-col="{span:16}" prop="shortName" has-feedback>
                        <v-input placeholder="请输入业务描述" v-model="businessForm.shortName" ></v-input>
                    </v-form-item>
                </v-col>
          </v-row>

          <v-row>
                <v-col span="8">
                    <v-form-item label="业务代码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="regionCode" has-feedback>
                        <v-input placeholder="请输入业务代码" v-model="businessForm.regionCode" ></v-input>
                    </v-form-item>
                </v-col>
                <v-col span="16">
                    <v-form-item label="备注" :label-col="{span:5}" :wrapper-col="{span:16}" prop="shortName" has-feedback>
                        <v-input placeholder="请输入业务描述" v-model="businessForm.shortName" ></v-input>
                    </v-form-item>
                </v-col>
          </v-row>

              <v-row>
                  <v-col span="24" class="text-center">
                        <v-button type="primary" class="pull-right" size="large">解除</v-button>
                        <v-button type="primary" class="pull-right" size="large" style="margin-right:10px" @click="showRelation">关联</v-button>
                  </v-col>
              </v-row>

                <v-data-table ref="prelistTable" :data="loadData" :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" bordered emptyText="暂时找不到你要的信息......">
                   
                </v-data-table>

    </v-modal>
</template>

<script >
import { mapState } from "vuex";
// import addRelationDialog from './businessWidget/addRelationDialog'
export default {

  components: {
     // addRelationDialog,
  },

  computed: {
    ...mapState({
      businessForm: state => state.businessAddModule.businessForm,
    })
  },
  
  mounted() {},
  props: ["visible"],
  data() {
    return {
      relation: false,
      labelCol: {
        span: 10
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
      // scriptbutstate:false,
      responseParamsName: {
                total: 'totalCount',
                results: 'result'
            },
            loadData(params) {
                return this.$store.dispatch('businessAddModule/fetchTable', {
                    pageNo: params.pageNo,
                    pageSize: params.pageSize,
                }).then(res => {
                    return res;
                })
            },
            columns: [
                { title: "类型", field: 'nickName' },
                { title: "名称", field: 'regionCode' },
                { title: "值1", field: 'orgName' },
                { title: "值2", field: 'deptName' },
                { title: "值3", field: 'deptName' },
                { title: "值4", field: 'deptName' },
                { title: "值5", field: 'deptName' },
            ],
    };
  },

  methods: {
    handleOk() {
        // this.scriptbutstate = true;
        //     this.$refs['scriptTypeForm'].validate((valid) => {
        //         if (valid) {
        //                      //添加脚本类型
        //             if (this.scriptTypeForm.scriptTypeId == null || this.scriptTypeForm.scriptTypeId == "") {
        //                 this.$store.dispatch('scriptTypeAddModule/saveScriptType').then(res => {

        //                     this.scriptbutstate = false;
        //                     if (res.data.success) {
        //                         this.$message.success("添加成功")
        //                         this.$emit('ok');
        //                     } else {
        //                         this.$message.error(res.data.data)
        //                     }
        //                 })
        //             } else {
        //                 //编辑脚本类型
        //                 this.$store.dispatch('scriptTypeAddModule/update').then(res => {
        //                     this.scriptbutstate = false;
        //                     if (res.data.success) {
        //                         this.$message.success("修改成功")
        //                         this.$emit('ok');
        //                     } else {
        //                         this.$message.error(res.data.data)
        //                     }
        //                 })
        //             }
        //         }
        //     })
      this.$emit("ok");
    },

    handleCancel() {
      this.$emit("hide");
    },

    //显示关联对话框
    showRelation(){
      this.relation = true;
    },
    okDialog() {
      this.relation = false;
      this.$refs.businessTable.refresh(); //刷新表格数据
    },
    hideDialog() {
      this.relation = false;
    },


  }
};
</script>