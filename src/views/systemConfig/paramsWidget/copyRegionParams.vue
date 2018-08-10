<template>
  <v-modal :title="titleName" :visible="visible" @cancel="cancel" :width="600" :confirmLoading="rolebutstate" :maskClosable="false">
    <v-form direction="horizontal" :model="copyRegionForm" ref="copyRegionForm">
      <v-row>
        <v-col span='12'>
          <v-form-item label="来源系统" :label-col="labelCol" :wrapper-col="wrapperCol">
            <span>{{copyRegionForm.srcSystemName}}</span>
          </v-form-item>
        </v-col>
        <v-col span='12'>
          <v-form-item label="来源区域" :label-col="labelCol" :wrapper-col="wrapperCol">
            <span>{{copyRegionForm.srcRegionName}}</span>
          </v-form-item>
        </v-col>
      </v-row>
      <v-row>
        <v-col span='12'>
          <v-form-item label="目标系统" :label-col="labelCol" :wrapper-col="wrapperCol">
            <v-select placeholder="请选择系统" notfound="无法找到" :data="getsystemSelect" size="lg" label="label" :optionOnChange="true" @change="desSystemChange" ref="selectDesSystem"></v-select>

          </v-form-item>
        </v-col>
        <v-col span='12'>
          <v-form-item label="目标区域" :label-col="labelCol" :wrapper-col="wrapperCol">
            <v-tree-select placeholder="请选择区域" notfound="无法找到" :data="getRegionSelect" size="lg" label="label" :optionOnChange="true" @select="desRegionChange" style="width:100%;" ref="selectDesRegion" :allowClear="true" :popupContainer="commandRegion"></v-tree-select>
            <div id='desSystemRegion'></div>
          </v-form-item>
        </v-col>
      </v-row>
       <v-row>
            <v-form-item label="分组列表" :label-col="{span:4}" :wrapper-col="{span:18}" prop="">
                 <div style="max-height:200px;overflow:auto;border:1px solid #f2f2f2;">
                   <v-checkbox-group v-model="copyRegionForm.groupIds"  @change="setState">
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
           getsystemSelect: state => state.commonSelect.systemSelect,
           getRegionSelect: state => state.commonSelect.regionSelect,

           copyRegionForm: state => state.copyRegionParamsModule.copyRegionForm,
           groupList: state => state.copyRegionParamsModule.groupList,
           desSystemData: state => state.copyRegionParamsModule.desSystem,
           desRegionData: state => state.copyRegionParamsModule.desRegion,
           list:state => state.copyRegionParamsModule.list,
    })
  },
  mounted() {
    this.$store.dispatch("commonSelect/getsystemSelect");
    this.$store.dispatch("commonSelect/getRegionSelectTree",true);
  },
  data: function() {
    return {
      selectText: "取消全选",
      titleName: "复制区域", //标题
      rolebutstate: false,
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
  },
  methods: {
    commandRegion() {
            var selector = document.getElementById('desSystemRegion');
            return selector;
        },
    //全选按钮点击事件
    select(){
       this.selectText="全选"
       this.$store.dispatch("copyRegionParamsModule/checked_or_not")
    },
    //保存
    save() {
      this.$store.dispatch("copyRegionParamsModule/saveData").then(res=>{
         if (res==false) {
           this.$message.error("不能复制到该区域");
         }
      })
      // this.$emit("ok");
    },
    //取消
    cancel() {
      this.rolebutstate = false;
      this.$emit("cancel");
      // this.$refs["paramConfigForm"].resetFields();
      // this.$store.commit("prsAddEditModule/INIT_FORM_DATA");
    },
    systemChange(optData) {
      // if (optData) {
      //   this.$store.commit("prsAddEditModule/UPDATE_SYSTEM_DATA", optData);
      // }
    },
    regionChange(optData) {
      // if (optData) {
      //   this.$store.commit("prsAddEditModule/UPDATE_REGION_DATA", optData);
      // }
    },
    // 选择复制项
    setState(data){
      if (data.length==this.list.length) {
        this.selectText="取消全选"
      }else{
         this.selectText="全选"
      }
    },
    desSystemChange(optData){
       this.$store.commit("copyRegionParamsModule/DESSYSTEM_CHANGE",optData)
    },
    desRegionChange(optData){
      console.log(optData)
      let opt = {};
      opt.value = optData.regionCode;
      opt.label = optData.title;
      this.$store.commit("copyRegionParamsModule/DESREGION_CHANGE",opt)
      // }
    }
  }
};
</script>
<style scoped lang='less'>
#desSystemRegion {
    position: relative;
}
</style>