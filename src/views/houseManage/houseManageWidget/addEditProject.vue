<template>
    <div id="addEditProject">
        <v-modal title="添加项目信息" :visible="isProject" @ok="handleAsyncOk" @cancel="handleAsyncCancel" :confirm-loading="asyncConfirmLoading" :width="mdlwidth" wrapClassName="wrapOuter" ref="mdl" :tog-full="togFlag">
            <span class="zoomFull" @click="zoomFullClick"><v-icon type="scan" v-show="fullIcon" title="全屏"></v-icon><v-icon type="switcher" v-show="exitIcon" title="退出全屏"></v-icon></span>
            <div :style="entHeight">
                <v-form direction="horizontal" :model="projectForm" :rules="rules" ref="projectForm">
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="项目名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="projectTitle">
                                <v-input size="large" v-model="projectForm.projectTitle"></v-input>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="开发商名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="developer">
                                <v-input size="large" v-model="projectForm.developer"></v-input>
                            </v-form-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="施工单位名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="constructorName">
                                <v-input size="large" v-model="projectForm.constructorName"></v-input>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="报告日期" :label-col="labelCol" :wrapper-col="wrapperCol" required>
                                <v-date-picker size="lg" style="width:100%" v-model="projectForm.recordDate" clearable></v-date-picker>
                            </v-form-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="所属区" :label-col="{span:8}" :wrapper-col="{span:16}" prop="regionCode">
                                <v-select size="lg" placeholder="请选择所属区" :data="[{label:'行政区',value:'0'}]" v-model="projectForm.regionCode"></v-select>
                            </v-form-item>
                        </v-col>
                        <v-col span="6">
                            <v-form-item label="道路" :label-col="{span:11}" :wrapper-col="{span:13}" prop="road">
                                <v-input size="large" v-model="projectForm.road"></v-input>
                            </v-form-item>
                        </v-col>
                        <v-col span="3">
                            <v-input size="large" v-model="projectForm.roadno" placeholder="">
                                <span slot="after">号</span>
                            </v-input>
                        </v-col>
                        <v-col span="3">
                            <v-input size="large" v-model="projectForm.roadnoExt" placeholder="">
                                <span slot="before">附</span>
                                <span slot="after">号</span>
                            </v-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="项目坐落" :label-col="labelCol" :wrapper-col="wrapperCol">
                                <span class="ant-form-text" v-text="projectForm.location"></span>
                            </v-form-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="项目坐落来源" :label-col="labelCol" :wrapper-col="wrapperCol">
                                <v-select size="lg" placeholder="请选择" style="width: 120px;" :data="[{label:'项目',value:1},{label:'栋',value:2}]" v-model="projectForm.locationSource"></v-select>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="套数" :label-col="labelCol" :wrapper-col="wrapperCol">
                                <v-input-number style="width:120px;" size="large" :min="1" :max="300" maxlength="5" v-model="projectForm.houseCount"></v-input-number>
                            </v-form-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="占地面积" :label-col="labelCol" :wrapper-col="wrapperCol">
                                <v-input-number style="width:120px;" size="large" :min="1" :max="300" maxlength="5" v-model="projectForm.areaCovered"></v-input-number>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="套内面积" :label-col="labelCol" :wrapper-col="wrapperCol">
                                <v-input-number style="width:120px;" size="large" :min="1" :max="300" maxlength="5" v-model="projectForm.comprisingArea"></v-input-number>
                            </v-form-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="建筑面积" :label-col="labelCol" :wrapper-col="wrapperCol">
                                <v-input-number style="width:120px;" size="large" :min="1" :max="300" maxlength="5" v-model="projectForm.constructionArea"></v-input-number>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="绿化率" :label-col="labelCol" :wrapper-col="wrapperCol">
                                <v-input-number style="width:120px;" size="large" :min="1" :max="300" maxlength="5" v-model="projectForm.greeningRate"></v-input-number>
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
    props: ["isProject"],
    components: {
        //addPane
    },
    computed: {
        ...mapState({
            projectForm: state => state.addEditProjectModule.projectForm
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
            mdlwidth: 800,
            togFlag: false,
            defaultval: '',
            entHeight: '',
            fullIcon: true,
            exitIcon: false,
            clientHeight: '',
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
            rules: {
                projectTitle: [{
                    required: true,
                    message: '请输入项目名称'
                }],
                developer: [{
                    required: true,
                    message: '请输入开发商名称'
                }],
                constructorName: [{
                    required: true,
                    message: '请输入施工单位名称'
                }],
                regionCode: [{
                    required: true,
                    message: '请选择所属行政区'
                }],
                road: [{
                    required: true,
                    message: '请输入道路信息'
                }],
            }
        };
    },
    methods: {
        handleAsyncOk() {
            this.$refs['projectForm'].validate((valid) => {
                if (valid) {
                    this.asyncConfirmLoading = true;
                    this.$store.dispatch('addBuildModule/buildSaveData').then(res=>{
                        this.asyncConfirmLoading = false;
                        if(res){
                            this.$message.success("楼栋添加成功！",1);
                            this.$refs['projectForm'].resetFields();
                            this.$emit('hide');
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
            document.getElementById('addEditProject').getElementsByClassName('ant-modal')[0].style.top = '100px';
            document.getElementById('addEditProject').getElementsByClassName('ant-modal')[0].style.paddingBottom = '24px';
            this.fullIcon = true;
            this.exitIcon = false;
        },
        zoomFullClick() {
            var bhgt = window.innerHeight - 136;
            var bwdh = window.innerWidth - 1; //高度值
            if (!this.togFlag) {
                this.mdlwidth = bwdh;
                this.entHeight = { height: bhgt + 'px' };
                document.getElementById('addEditProject').getElementsByClassName('ant-modal')[0].style.top = 0;
                document.getElementById('addEditProject').getElementsByClassName('ant-modal')[0].style.paddingBottom = 0;
                this.fullIcon = false;
                this.exitIcon = true;
            } else {
                this.mdlwidth = this.defaultval;
                this.entHeight = ''
                document.getElementById('addEditProject').getElementsByClassName('ant-modal')[0].style.top = '100px';
                document.getElementById('addEditProject').getElementsByClassName('ant-modal')[0].style.paddingBottom = '24px';
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