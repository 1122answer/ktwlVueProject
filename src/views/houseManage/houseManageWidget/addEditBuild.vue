<template>
    <div id="addEditBuild">
        <v-modal title="添加栋信息" :visible="isBuild" @ok="handleAsyncOk" @cancel="handleAsyncCancel" :confirm-loading="asyncConfirmLoading" :width="mdlwidth" wrapClassName="wrapOuter" ref="mdl" :tog-full="togFlag" :maskClosable="false">
            <span class="zoomFull" @click="zoomFullClick"><v-icon type="scan" v-show="fullIcon" title="全屏"></v-icon><v-icon type="switcher" v-show="exitIcon" title="退出全屏"></v-icon></span>
            <div :style="entHeight">
                <v-form direction="horizontal" :model="buildAddForm" :rules="rules" ref="buildAddForm">
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="栋名称" :label-col="{span:8}" :wrapper-col="{span:16}" prop="buildingTitle">
                                <v-input maxlength="20" size="large" v-model="buildAddForm.buildingTitle"></v-input>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="栋单位" size="large" :label-col="{span:8}" :wrapper-col="{span:10}" prop="buildingUnit">
                                <v-select size="lg" style="width: 100%;" :data="options" v-model="buildAddForm.buildingUnit"></v-select>
                            </v-form-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span="24">
                            <v-form-item label="所属区" :label-col="{span:4}" :wrapper-col="{span:20}">
                                <span class="ant-form-text" v-text="projectAddress"></span>
                            </v-form-item>
                        </v-col>
                    </v-row>
                </v-form>
            </div>
        </v-modal>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'xxx',
    props: ["isBuild"],
    components: {
        //addPane
    },
    watch: {
        buildAddForm: {
            handler:function(val,oldval){
                if(val){
                    this.projectAddress = val.address+val.buildingTitle+val.buildingUnit;
                    this.$store.commit('addBuildModule/CHANGE_ADDRESS',this.projectAddress);
                }
                
            },
            deep:true
        }
    },
    computed: {
        ...mapState({
            buildAddForm: state => state.addBuildModule.buildAddForm
        })
    },
    mounted() {
        this.defaultval = this.mdlwidth;
        this.clientHeight = document.documentElement.clientHeight - 136;
        // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
        const that = this;
        window.onresize = function temp() {
            that.clientHeight = `${document.documentElement.clientHeight-136}px`;
            if (that.togFlag) {
                this.mdlwidth = document.documentElement.clientWidth;
                this.entHeight = { height: this.clientHeight };
            }
        };
    },
    data: function() {
        return {
            asyncConfirmLoading: false,
            mdlwidth: 500,
            togFlag: false,
            defaultval: '',
            entHeight: '',
            fullIcon: true,
            exitIcon: false,
            clientHeight: '',
            rules: {
                buildingTitle: [{
                    required: true,
                    message: '请输入栋名称'
                }],
                buildingUnit: [{
                    required: true,
                    message: '请选择栋单位'
                }]
            },
            options: [{
                value: '单位',
                label: '单位'
            }, {
                value: '幢',
                label: '幢'
            }, {
                value: '栋',
                label: '栋'
            }, {
                value: '座',
                label: '座'
            }, {
                value: '楼',
                label: '楼'
            }, {
                value: '区',
                label: '区'
            }, ],
            projectAddress:'',
        };
    },
    methods: {
        handleAsyncOk() {
            this.$refs['buildAddForm'].validate((valid) => {
                if (valid) {
                    this.asyncConfirmLoading = true;
                    this.$store.dispatch('addBuildModule/buildSaveData').then(res=>{
                        this.asyncConfirmLoading = false;
                        if(res){
                            this.$emit('hide');
                            this.$message.success("楼栋添加成功！",1);
                            this.$refs['buildAddForm'].resetFields();
                            this.$store.dispatch('houseManageModule/fetchProjectData');
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        handleAsyncCancel() {
            this.asyncConfirmLoading = false;
            this.$emit('hide');
            this.mdlwidth = this.defaultval;
            this.entHeight = ''
            document.getElementById('addEditBuild').getElementsByClassName('ant-modal')[0].style.top = '100px';
            document.getElementById('addEditBuild').getElementsByClassName('ant-modal')[0].style.paddingBottom = '24px';
            this.fullIcon = true;
            this.exitIcon = false;
            this.$refs['buildAddForm'].resetFields();
        },
        zoomFullClick() {
            var bhgt = window.innerHeight - 136;
            var bwdh = window.innerWidth - 1; //高度值
            if (!this.togFlag) {
                this.mdlwidth = bwdh;
                this.entHeight = { height: bhgt + 'px' };
                document.getElementById('addEditBuild').getElementsByClassName('ant-modal')[0].style.top = 0;
                document.getElementById('addEditBuild').getElementsByClassName('ant-modal')[0].style.paddingBottom = 0;
                this.fullIcon = false;
                this.exitIcon = true;
            } else {
                this.mdlwidth = this.defaultval;
                this.entHeight = ''
                document.getElementById('addEditBuild').getElementsByClassName('ant-modal')[0].style.top = '100px';
                document.getElementById('addEditBuild').getElementsByClassName('ant-modal')[0].style.paddingBottom = '24px';
                this.fullIcon = true;
                this.exitIcon = false;
            }
            this.togFlag = !this.togFlag;
        }
    }
}
</script>
<style>
.wrapOuter {
    transform-origin: 0 !important;
}

.wrapOuter .ant-modal-body {
    /* height: 856px; */
}

.wrapOuter .ant-modal {
    /* top: 0;
    padding-bottom: 0; */
}

.wrapOuter .zoomFull {
    position: absolute;
    right: 60px;
    top: 12px;
    font-size: 16px;
    cursor: pointer;
}

.wrapOuter .zoomFull:hover {
    color: #108ee9;
}
</style>
<style scoped lang='less'>
</style>