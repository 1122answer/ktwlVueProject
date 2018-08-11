<template>
    <div id="addEditHouse">
        <v-modal title="添加房间号" :visible="visible" @ok="handleAsyncOk" @cancel="handleAsyncCancel" :confirm-loading="asyncConfirmLoading" :width="mdlwidth" wrapClassName="wrapOuter" ref="mdl" :tog-full="togFlag" :maskClosable="false">
            <span class="zoomFull" @click="zoomFullClick"><v-icon type="scan" v-show="fullIcon" title="全屏"></v-icon><v-icon type="switcher" v-show="exitIcon" title="退出全屏"></v-icon></span>
            <div :style="entHeight">
                <v-form direction="horizontal" :model="addSingHouseForm" :rules="rules" ref="addSingHouseForm">
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="所属单元" :label-col="{span:8}" :wrapper-col="{span:16}" prop="unitId">
                                <v-select size="lg" style="width: 100%;" :data="unitOpts" v-model="addSingHouseForm.unitId" clue="unitId" label="unitName" :optionOnChange="true" @change="unitChange"></v-select>
                            </v-form-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="所属层" :label-col="{span:8}" :wrapper-col="{span:16}" prop="floorId">
                                <v-select size="lg" style="width: 100%;" :data="floorOpts" v-model="addSingHouseForm.floorId" clue="floorId" label="floorName"></v-select>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="后缀" size="large" :label-col="{span:8}" :wrapper-col="{span:16}">
                                <v-input maxlength="20" size="large" v-model="addSingHouseForm.floorSuffix"></v-input> 
                            </v-form-item>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col span="12">
                            <v-form-item label="房号" :label-col="{span:8}" :wrapper-col="{span:16}" prop="houseNo">
                                <v-input maxlength="20" size="large" v-model="addSingHouseForm.houseNo"></v-input>
                            </v-form-item>
                        </v-col>
                        <v-col span="12">
                            <v-form-item label="前缀" size="large" :label-col="{span:8}" :wrapper-col="{span:16}" >
                                <v-input maxlength="20" size="large" v-model="addSingHouseForm.housePrefix"></v-input>
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
            addSingHouseForm: state => state.addHouseModule.addSingHouseForm,
            unitOpts: state => state.addHouseModule.unitOpts,
            floorOpts: state => state.addHouseModule.floorOpts
         })
    },
    watch:{
        visible(newVal){
            if(newVal){
                this.$store.dispatch('addHouseModule/fetchUnitData');
                this.$store.dispatch('addHouseModule/fetchFloorData');
            }
        }
    },
    mounted() {
        this.defaultval = this.mdlwidth;
        this.clientHeight = document.documentElement.clientHeight-136;
        // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
        const that = this;
        window.onresize = function temp() {
            that.clientHeight = `${document.documentElement.clientHeight-136}px`;
            if(that.togFlag){
                this.mdlwidth = document.documentElement.clientWidth;
                this.entHeight = { height: this.clientHeight};
            }
        };
    },
    data: function() {
        return {
            name: 'template',
            asyncConfirmLoading: false,
            mdlwidth: 550,
            togFlag:false,
            defaultval:'',
            entHeight:'',
            fullIcon:true,
            exitIcon: false,
            clientHeight: '',
            rules:{
                unitId:[{
                    required: true,
                    message: '请选择单元'
                }],
                floorId:[{
                    required: true,
                    message: '请选择楼栋'
                }],
                houseNo:[{
                    required: true,
                    message: '请输入房间号'
                }]
            },
        };
    },
    methods: {
        handleAsyncOk() {
            /*this.asyncConfirmLoading = false;*/
        },
        handleAsyncCancel() {
            this.asyncConfirmLoading = false;
            this.$emit('cancel');
            this.mdlwidth =this.defaultval;
            this.entHeight =''
            document.getElementById('addEditHouse').getElementsByClassName('ant-modal')[0].style.top='100px';
            document.getElementById('addEditHouse').getElementsByClassName('ant-modal')[0].style.paddingBottom='24px';
            this.fullIcon = true;
            this.exitIcon = false;
        },
        zoomFullClick(){
            var bhgt = window.innerHeight-136;
            var bwdh = window.innerWidth-1;   //高度值
            if(!this.togFlag){
                this.mdlwidth = bwdh;
                this.entHeight = { height: bhgt+'px'};
                document.getElementById('addEditHouse').getElementsByClassName('ant-modal')[0].style.top=0;
                document.getElementById('addEditHouse').getElementsByClassName('ant-modal')[0].style.paddingBottom=0;
                this.fullIcon = false;
                this.exitIcon = true;
            }else{
                this.mdlwidth =this.defaultval;
                this.entHeight =''
                document.getElementById('addEditHouse').getElementsByClassName('ant-modal')[0].style.top='100px';
                document.getElementById('addEditHouse').getElementsByClassName('ant-modal')[0].style.paddingBottom='24px';
                this.fullIcon = true;
                this.exitIcon = false;
            }
            this.togFlag = !this.togFlag;
        },
        unitChange(param){
            console.log('unitChange',param);
            var obj ={};
            obj.unitCode = param.unitCode;
            obj.unitId =param.unitId;
            obj.unitNo = param.unitNo;
            this.$store.dispatch('addHouseModule/CHANGE_UNIT_DATA',obj);
        }
    }
}
</script>
<style>
.wrapOuter{
    transform-origin:0 !important;
}
.wrapOuter .ant-modal-body {
    /* height: 856px; */
}
.wrapOuter .ant-modal {
    /* top: 0;
    padding-bottom: 0; */
}
.wrapOuter .zoomFull {
    position: absolute;right: 60px;
    top: 12px;
    font-size: 16px;
    cursor: pointer;
}
.wrapOuter .zoomFull:hover{
    color:#108ee9;
}
</style>
<style scoped lang='less'>
</style>