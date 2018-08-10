<template>
    <v-modal title="复制分组" :visible="visible" @ok="copygroupok" @cancel="copygroupCancel">
 	      <v-form direction="horizontal" ref="groupForm" v-model="groupForm" :rules="rules">
                <v-row>
                  <v-col span="12">
                      <v-form-item label="来源区域" :label-col="labelCol" :wrapper-col="wrapperCol">
                          <span>{{groupForm.srcRegionname}}</span>
                      </v-form-item> 
                  </v-col> 
                  <v-col span="12">
                      <v-form-item label="分组名称" :label-col="labelCol" :wrapper-col="wrapperCol">
                           <span>{{groupForm.groupIdname}}</span>
                      </v-form-item> 
                  </v-col> 
                  <v-col span="12">
                      <v-form-item label="目标区域" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <v-select placeholder="不选则为通用区域" size="lg" :data="getRegionSelect" :optionOnChange="true" @change="changegetRegion"></v-select>
                      </v-form-item> 
                  </v-col>  
                </v-row>
                <v-row>
                     <v-form-item label="要件列表" :label-col="{span:4}" :wrapper-col="{span:18}">
                          <div style="max-height:200px;overflow:auto;border:1px solid #f2f2f2;">
                            <v-checkbox-group v-model="groupForm.cconfigIds"  @change="setState">
                                    <p v-for="item in list">
                                       <v-checkbox  style="margin-left:10px;" :true-value="item.value" :key="item.value">{{item.label}}</v-checkbox>
                                    </p>
                            </v-checkbox-group>
                          </div>
                     </v-form-item>
                </v-row>
           </v-form> 
            <div slot="footer">
            <v-button  type="info" size="large" v-if="btnstate" @click="allchecked">
                全选
            </v-button>
            <v-button type="info" size="large" v-if="!btnstate" @click="notchecked">
                取消全选
            </v-button>
            <v-button key="cancel" type="ghost" size="large" @click="copygroupCancel">
                取消
            </v-button>
            <v-button key="ok" type="primary" size="large" @click="copygroupok">
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
           getRegionSelect: state => state.commonSelect.regionSelect,
           list: state => state.copyedGroupModule.list,
           groupForm: state => state.copyedGroupModule.groupForm,
           btnstate:state => state.copyedGroupModule.btnstate,
           checkedall:state => state.copyedGroupModule.list,
        })
    },
  mounted() {
    this.$store.dispatch("commonSelect/getRegionSelectTree");

  },
    data() {
        return {
            labelCol: {
                span: 8
            },
            wrapperCol: {
                span: 15
            },
            rules:{
                // getRegionSelect: [{
                //     required: true,
                //     message: '请选择目标区域'
                // }],
            }
      
        }
    },
    methods: {
		copygroupok(){
      this.$store.dispatch("copyedGroupModule/copyok").then(res=>{
         if (res.data.success) {
            this.$emit("ok")
            this.$message.success("复制成功")
         }
      })
			 
		},
		copygroupCancel(){
       this.$emit("cancel")
		},

		setState(data){
        if (data.length==0) {
            this.$store.commit("copyedGroupModule/NOT_CHECKED");
        }else if (data.length==this.checkedall.length) {
           this.$store.commit("copyedGroupModule/CHECKEDALL_STATE");
        }

		},
		// 全不选
		notchecked(){
			this.$store.commit("copyedGroupModule/NOT_CHECKED");
		},
		// 全选
		allchecked(){
			this.$store.commit("copyedGroupModule/ALL_CHECKED");
		},
		// 获取目标区域
		changegetRegion(data){
			this.$store.commit("copyedGroupModule/DES_REGION",data);
		},
    }
}
</script>