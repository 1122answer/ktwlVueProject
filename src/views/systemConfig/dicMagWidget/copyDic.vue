<template>
    <v-modal title="复制分组" :visible="visible" @ok="saveOk" @cancel="addCancel" :width="600">
        <div class="dicedit">
            <v-form direction="horizontal" :model="newdicForm"  ref="newdicForm">
                <v-row>
                     <v-form-item label="来源区域" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback prop="regionCode">
                        <v-select :data="getRegionSelect" :optionOnChange="true" v-model="newdicForm.regionCode" size="lg" @change="selectRegionCode" style="width:100%" :disabled="true" ></v-select>
                      </v-form-item>
                </v-row>

               <v-row>
                     <v-form-item label="字典名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="dictionaryName">
                          <span class="ant-form-text" v-text="newdicForm.dictionaryName"></span>
                     </v-form-item>
                </v-row>
                <v-row>
                     <v-form-item label="分组列表" :label-col="labelCol" :wrapper-col="wrapperCol" prop="">
                          <div style="max-height:200px;overflow:auto;border:1px solid #f2f2f2;">
                            <v-checkbox-group v-model="newdicForm.treeDicDatas" @change="setState">
                                    <p v-for="item in treeDicKeys">
                                       <v-checkbox  style="margin-left:10px;" :true-value="item.value" :key="item.value">{{item.value}}</v-checkbox>
                                    </p>
                            </v-checkbox-group>
                          </div>
                     </v-form-item>
                </v-row>
                <v-row>
                     <v-form-item label="目标区域" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback prop="regionCode">
                        <v-select :data="getRegionSelect" :optionOnChange="true" size="lg" v-model="desRegion.regionCode"  @change="selectDesRegionCode" style="width:100%" ></v-select>
                      </v-form-item>
                </v-row>
            
        </v-form>
        </div>
        <div slot="footer">
            <v-button  key="selectall" type="ghost" size="large" @click="selectAll"  v-model="allChecked" v-text="selectBtnTitle"></v-button>
            <v-button  key="confirm" type="ghost" size="large" @click="saveOk">保存 </v-button>
            <v-button  key="cancel" type="ghost" size="large" @click="customFooterCancel"> 取消 </v-button>
        </div>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: ["visible"],
    computed: {
      ...mapState({
          getsystemSelect: state => state.commonSelect.systemSelect,
          getRegionSelect: state => state.commonSelect.regionSelect,
          newdicForm: state => state.dicAddModule.newdicForm,
          adddicForm: state => state.dicAddModule.adddicForm,
          treeDicKeys: state => state.dicAddModule.treeDicKeys,
          desRegion: state => state.dicAddModule.desRegion,
          treeDicAllDatas: state => state.dicAddModule.treeDicAllDatas,
        })
    },
  mounted() {
    
  },
    data() {
        return {
            allChecked:true,
            selectBtnTitle:"取消全选",
            dicKeyChecked:true,
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 16
            },
        }
    },
    methods: {
        customFooterCancel() {
          this.$emit('cancel');
          this.$store.commit("dicAddModule/CLEAR_COPY_REGION"); 
        },
        saveOk() {
          if (this.desRegion.regionCode == this.newdicForm.regionCode) {
             this.$message.error("目标区域与来源区域不能相同");
             return;
          }
          if (this.desRegion.regionCode == "" && this.newdicForm.regionCode != "") {
             this.$message.error("下级区域不能复制到上级区域");
             return;
          }
          this.$refs.newdicForm.validate((valid) => {
            if (valid) {
                return this.$store.dispatch('dicAddModule/copyGroup').then(res => {
                   if (res.data.success) {
                      this.$emit('ok');
                      this.$message.success("复制分组成功");
                      this.$store.commit("dicAddModule/CLEAR_COPY_GROUP");   
                      this.$store.commit("dicAddModule/CLEAR_TREE_DICKEY");
                      this.$store.commit("dicAddModule/CLEAR_DICTIONARY_ID");
                   }
                });
            } 
          })
        },
        setState(params) {
          this.allChecked = this.newdicForm.treeDicDatas.length == this.treeDicAllDatas.length;
          if (this.allChecked == false) {
            this.selectBtnTitle = "全选";
          }else {
            this.selectBtnTitle = "取消全选";
          }
        },
        selectAll() {
            if (this.newdicForm.treeDicDatas.length == this.treeDicKeys.length) {
                    this.$store.commit("dicAddModule/UPDATE_TREEDIC_DATA",[]);
                    this.allChecked = false;
                    this.selectBtnTitle = "全选";
                } else {
                    this.$store.commit("dicAddModule/UPDATE_TREEDIC_DATA",this.treeDicAllDatas);
                    this.allChecked = true;
                    this.selectBtnTitle = "取消全选";
            }
        },
        addCancel() {
            this.$emit('cancel');
            this.$store.commit("dicAddModule/CLEAR_COPY_GROUP");
            this.$store.commit("dicAddModule/CLEAR_TREE_DICKEY");
            this.$store.commit("dicAddModule/CLEAR_DICTIONARY_ID");
        },
                // 获取系统
        choicesys(data) {
            return this.$store.dispatch('dicAddModule/getsysList', data);
        },
        // 获取行政区域
        selectRegionCode(data) {
            return this.$store.dispatch('dicAddModule/getregionList', data);
        },
        selectDesRegionCode(data) {
            return this.$store.dispatch('dicAddModule/getDesRegionList', data);
        },
    }
}
</script>