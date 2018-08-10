<template>
    <div id="detail"> 
        <v-modal title="角色详情" :visible="visible" @ok="handleOk" @cancel="handleCancel">
           <v-form direction="horizontal" :model="roleForm" ref="roleForm">

                <v-row>
                    <v-col span="24">
                        <v-form-item label="角色名称" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span style="border: none;width:100%" >{{roleForm.name}}</span>
                        </v-form-item>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col span="24">
                        <v-form-item label="备注信息" :label-col="labelCol" :wrapper-col="wrapperCol">
                           <span style="border: none;width:100%" >{{roleForm.remark}}</span>
                        </v-form-item>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col span="24">
                        <v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span v-if="roleForm.enabled==true">
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
                roleForm: state => state.roleManageModule.roleForm,
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
    #detail .ant-form-item{margin-bottom: 2px;}
</style>