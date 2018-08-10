<template>
    <v-modal title="详情" :visible="visible" @cancel="customFooterCancel" :width="700">
       <v-form direction="horizontal" :model="regionForm" ref="regionForm">
             <v-row>
                <v-col span="11">
                    <v-form-item label="行政区划代码" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <input v-model="regionForm.regionCode" style="border: none;" readonly>  
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="简称" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <input v-model="regionForm.shortName" style="border: none;" readonly>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="上级行政区划代码" :label-col="labelCol" :wrapper-col="wrapperCol" >
                        <input v-model="regionForm.regionPcode" style="border: none;" readonly>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="级别" :label-col="labelCol" :wrapper-col="wrapperCol" >
                        <v-select style="width: 100px;" :data="level" v-model="regionForm.flag" :disabled="true"></v-select>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="行政区域名称" :label-col="labelCol" :wrapper-col="wrapperCol" >
                        <input v-model="regionForm.name"" style="border: none;" readonly>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="外部编码1":label-col="labelCol" :wrapper-col="wrapperCol">
                        <input v-model="regionForm.externalCode1" style="border: none;" readonly>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="外部编码2" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <input v-model="regionForm.externalCode2" style="border: none;" readonly>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="外部编码3" :label-col="labelCol" :wrapper-col="wrapperCol">
                       <input v-model="regionForm.externalCode3" style="border: none;" readonly>
                    </v-form-item>
                </v-col>
                <v-col span="11">
                    <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
                        <span v-if="regionForm.isEnabled==true">
                            是
                        </span>
                        <span v-else>
                            否
                        </span>
                    </v-form-item>
                </v-col>
            </v-row>
        </v-form>
         <div slot="footer">
            <v-button key="cancel" type="ghost" size="large" @click="customFooterCancel">
                返 回
            </v-button>
        </div>
    </v-modal>
</template>

<script >
    import { mapState } from 'vuex'
    export default {
        computed: {
            ...mapState({
                regionForm: state => state.reginMenageListModule.regionForm,
            })
        },
        props: ["visible"],
        data () {
            return {
                labelCol:{
                    span:10
                },
                wrapperCol:{
                    span:14
                },
                 //级别
                level: [{
                    value: '0',
                    label: '省',
                    // disabled: true
                }, {
                    value: '1',
                    label: '市'
                },{
                    value: '2',
                    label: '区/县'
                },{
                    value: '3',
                    label: '乡/镇'
                }],
            }
        },

        methods: {
            customFooterCancel () {
                this.$emit('hide');
            }
        }
    }
</script>