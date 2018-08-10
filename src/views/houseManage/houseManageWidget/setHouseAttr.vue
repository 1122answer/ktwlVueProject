<template>
    <div id="setHouseAttr">
        <v-modal title="指定房屋属性" :visible="isSethouse" @ok="handleAsyncOk" @cancel="handleAsyncCancel" :confirm-loading="asyncConfirmLoading" :width="mdlwidth" wrapClassName="wrapOuter" ref="mdl" :tog-full="togFlag">
            <span class="zoomFull" @click="zoomFullClick"><v-icon type="scan" v-show="fullIcon" title="全屏"></v-icon><v-icon type="switcher" v-show="exitIcon" title="退出全屏"></v-icon></span>
            <div :style="entHeight">
                <v-form direction="horizontal" :model="setHouseForm" :rules="rules" ref="setHouseForm">
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="户型" :label-col="labelCol" :wrapper-col="wrapperCol" prop="roomType">
                                <v-select size="lg" v-model="setHouseForm.roomType" placeholder="请选择户型" notfound="无法找到" :data="roomTypeData" label="dictionaryKey" clue="value1"></v-select>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="户型结构" :label-col="labelCol" :wrapper-col="wrapperCol" prop="roomModeValue">
                                <v-select size="lg" v-model="setHouseForm.roomModeValue" placeholder="请选择户型结构" notfound="无法找到" :data="roomModeData" @change="roomModeChange" :optionOnChange="true" label="dictionaryKey" clue="value1"></v-select>
                            </v-form-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="用途" :label-col="labelCol" :wrapper-col="wrapperCol" prop="useRange">
                                <v-select size="lg" v-model="setHouseForm.useRange" placeholder="请选择用途" notfound="无法找到" :data="useRangeData" label="dictionaryKey" clue="value1"></v-select>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="房屋结构" :label-col="labelCol" :wrapper-col="wrapperCol" prop="structure">
                                <v-select size="lg" v-model="setHouseForm.structure" placeholder="请选择房屋结构" notfound="无法找到" :data="structureData" label="dictionaryKey" clue="value1"></v-select>
                            </v-form-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="建筑面积" :label-col="labelCol" :wrapper-col="wrapperCol" prop="constructionArea">
                                <v-input-number size="large" v-model="setHouseForm.constructionArea" :min="1" :max="10000"></v-input-number>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="套内面积" :label-col="labelCol" :wrapper-col="wrapperCol" prop="comprisingArea">
                                <v-input-number size="large" v-model="setHouseForm.comprisingArea" :min="1" :max="10000"></v-input-number>
                            </v-form-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span='24'>
                            <v-form-item label="备注" :label-col="{span:'4'}" :wrapper-col="{span:'19'}">
                                <v-input v-model="setHouseForm.remark" type="textarea" maxlength="128"></v-input>
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
    props: ["isSethouse"],
    components: {
        //addPane
    },
    computed: {
        ...mapState({
            setHouseForm: state => state.setHouseModule.setHouseForm,
            chooseHouse: state => state.houseManageModule.chooseHouse,
            roomTypeData: state => state.setHouseModule.roomTypeData,
            roomModeData: state => state.setHouseModule.roomModeData,
            useRangeData: state => state.setHouseModule.useRangeData,
            structureData: state => state.setHouseModule.structureData,
        })
    },
    watch:{
        isSethouse(newVal){
            if(newVal){
                this.$store.dispatch('setHouseModule/getUseRangeData');
                this.$store.dispatch('setHouseModule/getRoomTypeData');
                this.$store.dispatch('setHouseModule/getRoomModeData');
                this.$store.dispatch('setHouseModule/getStructureData');
            }
        }
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
        this.$store.commit('setHouseModule/INIT_FORM_DATA');
    },
    data: function() {
        return {
            name: 'template',
            asyncConfirmLoading: false,
            mdlwidth: 600,
            togFlag: false,
            defaultval: '',
            entHeight: '',
            fullIcon: true,
            exitIcon: false,
            clientHeight: '',
            labelCol: { span: 8 },
            wrapperCol: { span: 15 },
            rules: {
                roomType: [{
                    required: true,
                    message: '请选择户型'
                }],
                roomModeValue: [{
                    required: true,
                    message: '请选择户型结构'
                }],
                useRange: [{
                    required: true,
                    message: '请选择房屋用途'
                }],
                structure: [{
                    required: true,
                    message: '请选择房屋结构'
                }],
                constructionArea: [{
                    required: true,
                    message: '请输入建筑面积'
                }],
                comprisingArea: [{
                    required: true,
                    message: '请输入套内面积'
                }],
            },
        };
    },
    methods: {
        handleAsyncOk() {
            this.$refs['setHouseForm'].validate((valid) => {
                if (valid) {
                    this.asyncConfirmLoading = true;
                    this.$store.commit('setHouseModule/CREATE_HOUSEFLOOR',this.chooseHouse);
                    this.$store.dispatch('setHouseModule/setHouseSave').then(res => {
                        this.asyncConfirmLoading = false;
                        if (res) {
                            this.$message.success("房屋属性设置成功！", 1);
                            this.$store.commit('setHouseModule/INIT_FORM_DATA');
                            this.$refs['setHouseForm'].resetFields();
                            this.$emit('hide');
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        handleAsyncCancel() {
            this.asyncConfirmLoading = false;
            this.$store.commit('setHouseModule/INIT_FORM_DATA');
            this.$refs['setHouseForm'].resetFields();
            this.$emit('hide');
            this.mdlwidth = this.defaultval;
            this.entHeight = ''
            document.getElementById('setHouseAttr').getElementsByClassName('ant-modal')[0].style.top = '100px';
            document.getElementById('setHouseAttr').getElementsByClassName('ant-modal')[0].style.paddingBottom = '24px';
            this.fullIcon = true;
            this.exitIcon = false;
        },
        zoomFullClick() {
            var bhgt = window.innerHeight - 136;
            var bwdh = window.innerWidth - 1; //高度值
            if (!this.togFlag) {
                this.mdlwidth = bwdh;
                this.entHeight = { height: bhgt + 'px' };
                document.getElementById('setHouseAttr').getElementsByClassName('ant-modal')[0].style.top = 0;
                document.getElementById('setHouseAttr').getElementsByClassName('ant-modal')[0].style.paddingBottom = 0;
                this.fullIcon = false;
                this.exitIcon = true;
            } else {
                this.mdlwidth = this.defaultval;
                this.entHeight = ''
                document.getElementById('setHouseAttr').getElementsByClassName('ant-modal')[0].style.top = '100px';
                document.getElementById('setHouseAttr').getElementsByClassName('ant-modal')[0].style.paddingBottom = '24px';
                this.fullIcon = true;
                this.exitIcon = false;
            }
            this.togFlag = !this.togFlag;
        },
        roomModeChange(param) {
            if(param && param.selected){
                this.$store.commit('setHouseModule/CHANGE_MODE_TYPE', { 'roomMode': param.dictionaryKey, 'roomModeValue': param.value1 });
            }
            
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