<template>
    <div id="addEditProject">
        <v-modal title="添加项目信息" :visible="isProject" @ok="handleAsyncOk" @cancel="handleAsyncCancel" :confirm-loading="asyncConfirmLoading" :width="mdlwidth" wrapClassName="wrapOuter" ref="mdl" :tog-full="togFlag">
            <span class="zoomFull" @click="zoomFullClick"><v-icon type="scan" v-show="fullIcon" title="全屏"></v-icon><v-icon type="switcher" v-show="exitIcon" title="退出全屏"></v-icon></span>
            <div :style="entHeight">
                <p>对话框的内容</p>
                <p>对话框的内容</p>
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
        // ...mapState({

        // })
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
            mdlwidth: 500,
            togFlag:false,
            defaultval:'',
            entHeight:'',
            fullIcon:true,
            exitIcon: false,
            clientHeight: '',
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
            document.getElementById('addEditProject').getElementsByClassName('ant-modal')[0].style.top='100px';
            document.getElementById('addEditProject').getElementsByClassName('ant-modal')[0].style.paddingBottom='24px';
            this.fullIcon = true;
            this.exitIcon = false;
        },
        zoomFullClick(){
            var bhgt = window.innerHeight-136;
            var bwdh = window.innerWidth-1;   //高度值
            if(!this.togFlag){
                this.mdlwidth = bwdh;
                this.entHeight = { height: bhgt+'px'};
                document.getElementById('addEditProject').getElementsByClassName('ant-modal')[0].style.top=0;
                document.getElementById('addEditProject').getElementsByClassName('ant-modal')[0].style.paddingBottom=0;
                this.fullIcon = false;
                this.exitIcon = true;
            }else{
                this.mdlwidth =this.defaultval;
                this.entHeight =''
                document.getElementById('addEditProject').getElementsByClassName('ant-modal')[0].style.top='100px';
                document.getElementById('addEditProject').getElementsByClassName('ant-modal')[0].style.paddingBottom='24px';
                this.fullIcon = true;
                this.exitIcon = false;
            }
            this.togFlag = !this.togFlag;
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