<template>
    <div id="batchAddHouse">
        <v-modal title="批量创建房屋" :visible="visible" @ok="handleAsyncOk" @cancel="handleAsyncCancel" :confirm-loading="asyncConfirmLoading" :width="mdlwidth" wrapClassName="wrapOuter" ref="mdl" :tog-full="togFlag">
            <span class="zoomFull" @click="zoomFullClick"><v-icon type="scan" v-show="fullIcon" title="全屏"></v-icon><v-icon type="switcher" v-show="exitIcon" title="退出全屏"></v-icon></span>
            <div :style="entHeight">
                <v-form direction="horizontal" :model="batchAddForm" :rules="rules" ref="batchAddForm">
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="单元数" :label-col="labelCol" :wrapper-col="wrapperCol" prop="unitCount">
                                <v-input-number size="large" :min="1" :max="300" maxlength="5" v-model="batchAddForm.unitCount"></v-input-number>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="单元起始号" :label-col="labelCol" :wrapper-col="wrapperCol" prop="unitInit">
                                <v-input-number size="large" :min="1" :max="300" maxlength="5" v-model="batchAddForm.unitInit"></v-input-number>
                            </v-form-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="楼层数" :label-col="labelCol" :wrapper-col="wrapperCol" prop="floorCount">
                                <v-input-number size="large" :min="1" :max="300" maxlength="5" v-model="batchAddForm.floorCount"></v-input-number>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="楼层起始号" :label-col="labelCol" :wrapper-col="wrapperCol" prop="floorInit">
                                <v-input-number size="large" :min="1" :max="300" maxlength="5" v-model="batchAddForm.floorInit"></v-input-number>
                            </v-form-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="房间数" :label-col="labelCol" :wrapper-col="wrapperCol" prop="houseCount">
                                <v-input-number size="large" :min="1" :max="300" maxlength="5" v-model="batchAddForm.houseCount"></v-input-number>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="房间起始号" :label-col="labelCol" :wrapper-col="wrapperCol" prop="houseInit">
                                <v-input-number size="large" :min="1" :max="300" maxlength="5" v-model="batchAddForm.houseInit"></v-input-number>
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
    props: ["visible"],
    components: {
        //addPane
    },
    computed: {
        ...mapState({
            batchAddForm: state => state.batchAddHouseModule.batchAddForm
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
            name: 'template',
            asyncConfirmLoading: false,
            mdlwidth: 500,
            togFlag: false,
            defaultval: '',
            entHeight: '',
            fullIcon: true,
            exitIcon: false,
            clientHeight: '',
            labelCol: { span: 10 },
            wrapperCol: { span: 14 },
            rules: {
                unitCount: [{
                    required: true,
                    message: '请输入单元数'
                }],
                unitInit: [{
                    required: true,
                    message: '请输入单元起始号'
                }],
                floorCount: [{
                    required: true,
                    message: '请输入楼层数'
                }],
                floorInit: [{
                    required: true,
                    message: '请输入楼层起始号'
                }],
                houseCount: [{
                    required: true,
                    message: '请输入房间数'
                }],
                houseInit: [{
                    required: true,
                    message: '请输入房间起始号'
                }],
            }
        };
    },
    methods: {
        handleAsyncOk() {
            /*this.asyncConfirmLoading = false;*/
            this.$refs['batchAddForm'].validate((valid) => {
                if (valid) {
                    this.asyncConfirmLoading = true;
                    this.$store.dispatch('batchAddHouseModule/fetchSaveData').then(res=>{
                        this.asyncConfirmLoading = false;
                        if(res){
                            this.$message.success("房间批量新增成功！",1);
                            this.$refs['batchAddForm'].resetFields();
                            this.$emit('hide'); 
                        }
                    });
                } else {
                    return false;
                }
            });
            //this.$emit('hide')
        },
        handleAsyncCancel() {
            this.asyncConfirmLoading = false;
            this.$emit('hide');
            this.mdlwidth = this.defaultval;
            this.entHeight = ''
            document.getElementById('batchAddHouse').getElementsByClassName('ant-modal')[0].style.top = '100px';
            document.getElementById('batchAddHouse').getElementsByClassName('ant-modal')[0].style.paddingBottom = '24px';
            this.fullIcon = true;
            this.exitIcon = false;
            this.$refs['batchAddForm'].resetFields();
        },
        zoomFullClick() {
            var bhgt = window.innerHeight - 136;
            var bwdh = window.innerWidth - 1; //高度值
            if (!this.togFlag) {
                this.mdlwidth = bwdh;
                this.entHeight = { height: bhgt + 'px' };
                document.getElementById('batchAddHouse').getElementsByClassName('ant-modal')[0].style.top = 0;
                document.getElementById('batchAddHouse').getElementsByClassName('ant-modal')[0].style.paddingBottom = 0;
                this.fullIcon = false;
                this.exitIcon = true;
            } else {
                this.mdlwidth = this.defaultval;
                this.entHeight = ''
                document.getElementById('batchAddHouse').getElementsByClassName('ant-modal')[0].style.top = '100px';
                document.getElementById('batchAddHouse').getElementsByClassName('ant-modal')[0].style.paddingBottom = '24px';
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