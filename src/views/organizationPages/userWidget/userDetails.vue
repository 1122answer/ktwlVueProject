<template>
    <div id="detail"> 
        <v-modal title="用户详情" :visible="visible" @ok="handleOk" @cancel="handleCancel">
           <v-form direction="horizontal" :model="userForm" ref="userForm">

                <v-row>
                    <v-col span="24">
                        <v-form-item label="昵称" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span style="border: none;width:100%" >{{userForm.nickName}}</span>
                        </v-form-item>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col span="24">
                        <v-form-item label="行政区域" :label-col="labelCol" :wrapper-col="wrapperCol">
                           <span style="border: none;width:100%" >{{userForm.regionCode}}</span>
                        </v-form-item>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col span="24">
                        <v-form-item label="所属机构" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span style="border: none;width:100%" >{{userForm.orgName}}</span>
                        </v-form-item>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col span="24">
                        <v-form-item label="所属部门" :label-col="labelCol" :wrapper-col="wrapperCol">
                           <span style="border: none;width:100%" >{{userForm.deptName}}</span>
                        </v-form-item>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col span="24">
                        <v-form-item label="真实姓名" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span style="border: none;width:100%" >{{userForm.realName}}</span>
                        </v-form-item>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col span="24">
                        <v-form-item label="手机号码" :label-col="labelCol" :wrapper-col="wrapperCol">
                           <span style="border: none;width:100%" >{{userForm.mobile}}</span>
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
                userForm: state => state.userAddEditModule.userForm,
            })
        },
        props: ["visible"],
        data () {
            return {
                labelCol:{
                    span:3
                },
                wrapperCol:{
                    span:21
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