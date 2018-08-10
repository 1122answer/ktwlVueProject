<template>
    <div id="permissionDetail"> 
        <v-modal title="权限详情" :visible="visible" @ok="handleOk" @cancel="handleCancel">
           <v-form direction="horizontal" :model="catalogForm" ref="catalogForm">

                <v-row>
                    <v-col span="24">
                        <v-form-item label="权限名称" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span style="border: none;width:100%" >{{catalogForm.name}}</span>
                        </v-form-item>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col span="24">
                        <v-form-item label="排序码" :label-col="labelCol" :wrapper-col="wrapperCol">
                           <span style="border: none;width:100%" >{{catalogForm.sortId}}</span>
                        </v-form-item>
                    </v-col>
                </v-row>

           <!--      <v-row>
                    <v-col span="24">
                        <v-form-item label="上级目录" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span style="border: none;width:100%" >{{catalogForm.parentId}}</span>
                        </v-form-item>
                    </v-col>
                </v-row> -->

                <v-row>
                    <v-col span="24">
                        <v-form-item label="所属系统" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span style="border: none;width:100%" >{{catalogForm.systemName}}</span>
                        </v-form-item>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col span="24">
                        <v-form-item label="图标" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span style="border: none;width:100%" >{{catalogForm.icon}}</span>
                        </v-form-item>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col span="24">
                        <v-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span style="border: none;width:100%" >{{catalogForm.remark}}</span>
                        </v-form-item>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col span="24">
                        <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span v-if="catalogForm.enabled==true">
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
    </div>
</template>

<script >
import { mapState } from 'vuex'
    export default {
        computed: {
            ...mapState({
                catalogForm: state => state.CatalogAddModule.catalogForm,
            })
        },
        props: ["visible"],
        data () {
            return {
                labelCol:{
                    span:4
                },
                wrapperCol:{
                    span:20
                },
            }
        },

        methods: {
            handleOk () {
                this.$emit("ok");
            },

            handleCancel () {
                this.$emit("hide");
            },

            customFooterCancel () {
                this.$emit('hide');
            }
        }
    }
</script>
<style>
    #permissionDetail .ant-form-item{margin-bottom: 2px;}
</style>