<template>
    <v-modal title="复制区域" :visible="visible" @ok="copyeregionOk" @cancel="copyeregionokCancel">
 	      <v-form direction="horizontal" ref="newruleForm">
                <v-row>
                  <v-col span="12">
                      <v-form-item label="来源系统" :label-col="labelCol" :wrapper-col="wrapperCol">
                           <span>{{copyregionForm.comesys}}</span>
                      </v-form-item> 
                  </v-col> 
                  <v-col span="12">
                      <v-form-item label="来源区域" :label-col="labelCol" :wrapper-col="wrapperCol">
                          <span>{{copyregionForm.comerigion}}</span>
                      </v-form-item> 
                  </v-col> 
                  <v-col span="12">
                      <v-form-item label="目标系统" :label-col="labelCol" :wrapper-col="wrapperCol">
                           <v-select placeholder="目标系统" size="lg" :data="getsystemSelect" :optionOnChange="true" @change="changesystem"></v-select>
                      </v-form-item> 
                  </v-col> 
                  <v-col span="12">
                      <v-form-item label="目标区域" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <v-select placeholder="目标区域" size="lg" :data="getRegionSelect"  :optionOnChange="true" @change="changegetRegion" ></v-select>
                      </v-form-item> 
                  </v-col>  
                </v-row>
                <v-row>
                     <v-form-item label="分组列表" :label-col="{span:4}" :wrapper-col="{span:18}" prop="">
                          <div style="max-height:200px;overflow:auto;border:1px solid #f2f2f2;">
                            <v-checkbox-group v-model="copyregionForm.groupIds"  @change="setState">
                                    <p v-for="item in list">
                                       <v-checkbox  style="margin-left:10px;" :true-value="item.value" :key="item.value">{{item.label}}</v-checkbox>
                                    </p>
                            </v-checkbox-group>
                          </div>
                     </v-form-item>
                </v-row>
           </v-form> 
            <div slot="footer">
            <v-button  type="info" size="large" v-if="btntype" @click="allchecked">
                全选
            </v-button>
            <v-button type="info" size="large" v-if="!btntype" @click="notchecked">
                取消全选
            </v-button>
            <v-button key="cancel" type="ghost" size="large" @click="copyeregionokCancel">
                取消
            </v-button>
            <v-button key="ok" type="primary" size="large" @click="copyeregionOk">
                确定
            </v-button>
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
           copyregionForm: state => state.copyedRegionModule.copyregionForm,
           list: state => state.copyedRegionModule.list,
           btntype: state => state.copyedRegionModule.btntype,
           checkedall: state => state.copyedRegionModule.checkedall,
        })
    },
  mounted() {
    this.$store.dispatch("commonSelect/getsystemSelect");
    this.$store.dispatch("commonSelect/getRegionSelectTree");
    // this.$store.dispatch("copyedRegionModule/getlist");

  },
    data() {
        return {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 15
            },
      
        }
    },
    methods: {
		copyeregionOk(){
			 this.$store.dispatch("copyedRegionModule/copyok")
			 .then(res=>{
			 	if (res.data.success) {
			 		this.$emit("ok")
			 		this.$message.success("复制成功");
			 	}
			 })
			 
		},
		copyeregionokCancel(){
			 this.$emit("cancel")
		},
		setState(data){
			if (data.length==0) {
				this.$store.commit("copyedRegionModule/NOTCHECKED");
			}else if(data.length==this.checkedall.length){
				this.$store.commit("copyedRegionModule/BTNSTATE");
			}
		},
		// 全不选
		notchecked(){
			this.$store.commit("copyedRegionModule/NOTCHECKED");	
		},
		// 全选
		allchecked(){
			this.$store.commit("copyedRegionModule/ALLCHECKED");
		},
		// 获取目标系统
		changesystem(data){
			this.$store.commit("copyedRegionModule/GET_DESSYSTEM",data);
		},
		// 获取目标区域
		changegetRegion(data){
			this.$store.commit("copyedRegionModule/GET_DESREGION",data);
		},
    }
}
</script>