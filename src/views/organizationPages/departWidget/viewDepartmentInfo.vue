<template>
    <v-modal title="查看部门信息" :visible="visible" @cancel="handleCancel" >
        <v-form direction="horizontal" :model="DepartmentInfoForm" ref="DepartmentInfoForm" class="widgetWrap">
             <v-form-item label="所属机构名称" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <span class="ant-form-text" v-text="DepartmentInfoForm.orgName"></span>
                </v-form-item>
                <v-form-item label="上级部门" :label-col="labelCol" :wrapper-col="wrapperCol" v-show="isChild" >
                    <!-- <v-tree-select style="width:285px" :data="parentIdList" ref="selectc" size="lg" :popupContainer="locatin" @select="selectFn" allow-clear @clear="clearSelected" disabled></v-tree-select>
                   <div id="locatin"></div> -->
                   <span class="ant-form-text" v-text="DepartmentInfoForm.parentName"></span>
                </v-form-item>
                <v-form-item label="部门名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="name">                    
                        <span class="ant-form-text" v-text="DepartmentInfoForm.name"></span>
                </v-form-item>
                <v-form-item label="是否开启" :label-col="labelCol" :wrapper-col="wrapperCol" prop="enabled">              
                        <span class="ant-form-text" v-text="DepartmentInfoForm.enabled"></span>
                </v-form-item>
                <v-form-item label="备注信息" :label-col="labelCol" :wrapper-col="wrapperCol" prop="remark">
                    <v-input v-model="DepartmentInfoForm.remark" type="textarea" disabled placeholder=""></v-input>
                </v-form-item>
        </v-form>
        <div slot="footer">
            <v-button key="cancel" type="ghost" size="large" @click="handleCancel"> 关 闭 </v-button>
        </div>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'

export default {
    props: ['visible'],
    components: {
        //addPane
    },
    computed: {
        ...mapState({
            DepartmentInfoForm:state => state.viewDeptInfoModule.DepartmentInfoForm,
            parentIdList: state => state.departmentModule.parentIdList,
            isChild:state=>state.viewDeptInfoModule.isChild
        })
    },
    mounted() {

    },
    watch:{
        // visible(newVal,oldVal){
        //     if(newVal){
        //         this.$nextTick(()=>{
        //             this.$refs.selectc.value.push({
        //                 text:this.DepartmentInfoForm.parentName
        //             })
        //         })
        //     }
        // }
    },
    data: function() {
        return {
            labelCol: { span: 8 },
            wrapperCol: { span: 14 }
        };
    },
    methods: {
        handleCancel() {
            this.$emit('cancel');
        },
        clearSelected(){
            this.$store.commit('viewDeptInfoModule/CLEAR_PARENT_DEPT');
        },
        locatin() {
            return document.getElementById('locatin');
        },
        selectFn(paramObj){
            if(paramObj){
                var dept_data={
                    parentId:paramObj.deptId,
                    parentName:paramObj.name
                };
                this.$store.commit("viewDeptInfoModule/SET_PARENT_VALUE",dept_data);
            }
        }
    }
}
</script>
<style scoped lang='less'>
#locatin {
    position: relative;
}

</style>