<template>
    <v-modal title="复制分组" :visible="visible" @cancel="cancel" :width="600" :confirmLoading="false">
          <v-form direction="horizontal" v-model="copyGroupForm" ref="copyGroupForm">
               <v-row>
                     <v-col span='12'>
                           <v-form-item label="来源系统" :label-col="labelCol" :wrapper-col="wrapperCol">
                            {{copyGroupForm.srcSystemName}}<v-icon class="padding-left-5" type="question-circle-o" v-tooltip.right='msg'></v-icon>
                           </v-form-item>
                      </v-col>
                      <v-col span='12'>
                          <v-form-item label="来源区域" :label-col="labelCol" :wrapper-col="wrapperCol">
                              {{copyGroupForm.srcRegionName}}
                          </v-form-item>
                       </v-col>
              </v-row>
              <v-row>
                     <v-col span='12'>
                        <v-form-item label="目标区域" :label-col="labelCol" :wrapper-col="wrapperCol">
                               <v-tree-select placeholder="请选择区域" notfound="无法找到" :data="getRegionSelect" size="lg" label="label" :optionOnChange="true" @select="desRegionChange" style="width:100%;" ref="selectDesRegion" :allowClear="true" :popupContainer="commandRegion">
                               </v-tree-select>
                               <div id='desSystemRegion'></div>
                       </v-form-item>
                      </v-col>
              </v-row>
              <v-row>
                     <v-form-item label="参数列表" :label-col="{span:4}" :wrapper-col="{span:18}" prop="">
                     <div style="max-height:200px;overflow:auto;border:1px solid #f2f2f2;">
                         <v-checkbox-group v-model="copyGroupForm.configKeys" @change="setState">
                               <p v-for="item in list">
                                  <v-checkbox  style="margin-left:10px;" :true-value="item.value" :key="item.value">{{item.label}}</v-checkbox>
                               </p>
                         </v-checkbox-group>
                     </div>
                    </v-form-item>
             </v-row>
         </v-form>
        <div slot="footer">
          <v-button type="primary" size="large" @click="select">{{selectText}}</v-button>
          <v-button type="primary" size="large" @click="save">保存</v-button>
          <v-button key="cancel" type="ghost" size="large" @click="cancel">取消</v-button>
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
        getRegionSelect: state => state.commonSelect.regionSelect,
        copyGroupForm: state => state.copyGroupParamsModule.copyGroupForm,
        list: state => state.copyGroupParamsModule.list,

    })
  },
  mounted() {
    this.$store.dispatch("commonSelect/getRegionSelectTree",true);
  },
  data: function() {
    return {
      msg:"级别说明：通用系统-通用区域:称1级,通用系统-某某区域:称2级,某某系统-通用区域:称3级,某某系统-某某区域:称4级,复制分组，不能跨系统复制，顾只能1级复制到2级，2级复制到2级，3级复制到3、4级，4级复制到4级。",
      selectText:"取消全选",
      labelCol: { span: 8 },
      wrapperCol: { span:14},
    };
  },
  methods: {
    commandRegion() {
            var selector = document.getElementById('desSystemRegion');
            return selector;
        },
    cancel() {
      this.$emit("cancel");
    },
    select(){
        this.selectText="全选";
        this.$store.dispatch("copyGroupParamsModule/checked_or_not")
    },
    save(){
      this.$store.dispatch("copyGroupParamsModule/saveData").then(res=>{
         if (res==false) {
           this.$message.error("复制失败,请检查目标区域是否正确");
         }else{
          this.$message.success("复制成功");
          this.$emit("ok");
         }
      })
    },
    desRegionChange(data){
        this.$store.commit("copyGroupParamsModule/GET_DES_REGION",data);
    },
    setState(data){
      if (data.length==this.list.length) {
        this.selectText="取消全选"
      }else{
         this.selectText="全选"
      }
    },
  }
};
</script>
<style scoped lang='less'>
#desSystemRegion {
    position: relative;
}
</style>