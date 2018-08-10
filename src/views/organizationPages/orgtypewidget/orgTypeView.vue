<template>
    <v-modal title="查看短信模板" :visible="visible" @cancel="handleCancel" >
        <v-form direction="horizontal" :model="orgTypeViewForm" ref="orgTypeViewForm" class="widgetWrap">
            
                    <v-form-item label="机构类型名称" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span class="ant-form-text" v-text="orgTypeViewForm.name"></span>
                    </v-form-item>
                
                    <v-form-item label="机构注册类型" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <v-select v-model="orgTypeViewForm.registerType" :data="selectRegionList" disabled></v-select>
                    </v-form-item>
            
                    <v-form-item label="排序码" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span class="ant-form-text" v-text="orgTypeViewForm.sortId"></span>
                    </v-form-item>
                
                    <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span class="ant-form-text" v-text="orgTypeViewForm.isEnabled"></span>
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
            orgTypeViewForm:state => state.orgTypeViewModule.orgTypeViewForm,
            selectRegionList:state => state.orgtypeListStore.selectRegionList
        })
    },
    mounted() {

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
        }
    }
}
</script>
<style scoped lang='less'>
.ant-row.ant-form-item {
    margin-bottom: 8px;
}
</style>