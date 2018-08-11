<template>
    <div id="addMsgDiag">
        <v-modal title="发送消息" :visible="true" v-show="isMsg" @ok="handleOk" @cancel="handleCancel" :width="1050" :confirm-loading="asyncConfirmLoading" :maskClosable="false">
            <v-form direction="horizontal" :model="msgForm" ref="msgForm" :rules="rules">
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="消息类型" :label-col="labelCol" :wrapper-col="wrapperCol" prop="messageType">
                            <v-select placeholder="请选择消息类型" notfound="无法找到" :data="[{value: '0', label: '系统消息'}, {value: '1', label: '业务消息'}, {value: '2', label: '通知公告'}]" size="lg" v-model="msgForm.messageType"></v-select>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="消息发送者" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span class="ant-form-text" v-text="currentUser"></span>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <!-- <v-col span='8'>
                        <v-form-item label="消息的业务类型" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <v-select placeholder="请选择业务类型" style="width: 100%;" :data="options" v-model="msgForm.busiType" value=" " size="lg"></v-select>
                        </v-form-item>
                    </v-col> -->
                    <v-col span='8'>
                        <v-form-item label="所属业务" :label-col="labelCol" :wrapper-col="wrapperCol" prop="busiId">
                             <v-select size="lg" style="width: 100%;" :data="busiIdOpts" v-model="msgForm.busiId" :optionOnChange="true" @change="busiChange"></v-select>
                        </v-form-item>
                    </v-col>
                    <v-col span='8' style="position: relative;">
                        <v-form-item label="收件人" :label-col="labelCol" :wrapper-col="wrapperCol" required>
                            <v-collapse :bordered="true" class="foldPanel" style="width:100%" ref="reciptFold" v-model="activeIndex" @change="foldChange">
                                <v-panel index="1" :style="customPanelStyle">
                                    <p slot="header" class="text-primary"><v-icon type="search"></v-icon> 选择收件人</p>
                                    <v-tree :data="treeData" checkable multiple @check="checkFn"></v-tree>
                                </v-panel>
                            </v-collapse>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="跳转链接" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <v-input size="large" maxlength="20" v-model="msgForm.link"></v-input>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="消息标题" :label-col="labelCol" :wrapper-col="wrapperCol" prop="title">
                            <v-input size="large" maxlength="20" v-model="msgForm.title"></v-input>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>

                        <v-form-item label="缩略图" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <div style="width: 100px; height: 70px">
                                <v-upload drag accept="image/*">
                                    <v-icon type="plus"></v-icon>
                                </v-upload>
                            </div>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="备注" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <v-input type="textarea" maxlength="128" v-model="msgForm.remark" placeholder="请输入备注信息"></v-input>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='24'>
                        <v-form-item label="消息内容" :label-col="{span:3}" :wrapper-col="{span:21}" required>
                            <!-- <quill-editor ref="myTextEditor" v-model="msgForm.content" :options="editorOption" style="width: 100%;"></quill-editor> -->
                            <div id="ueditor" type="text/plain"></div>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="是否置顶" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <v-switch v-model="msgForm.isTop" on-value=1 off-value=0>
                                <span slot="checkedChildren">开</span>
                                <span slot="unCheckedChildren">关</span>
                            </v-switch>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="置顶截止日期" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <v-date-picker v-model="msgForm.topDealine" clearable size="lg" :style="{width:'100%'}" :disabled-date="disabledDate" ></v-date-picker>
                        </v-form-item>
                    </v-col>
                </v-row>
            </v-form>
        </v-modal>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: 'UE',
    components: {},
    computed: {
        ...mapState({
            msgForm: state => state.msgAddEditModule.msgForm,
            treeData: state => state.msgAddEditModule.treeData,
            currentUser: state =>state.currentUserName,
        })
    },
    created() {
        // this.$store.dispatch('orgAddEditModule/fetchOrgType').then(res => {});
    },
    mounted() {
        // 实例化editor编辑器
        this.editor = UE.getEditor('ueditor', {
            BaseUrl: '',
            toolbars: [
                ['fullscreen', 'source', 'undo', 'redo'],
                ['bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc']
            ],
            autoHeightEnabled: false,
            autoFloatEnabled: true,　　//是否工具栏可浮动
            //initialContent:'请输入消息内容',   //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
            autoClearinitialContent:true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
            initialFrameWidth: '100%',
            initialFrameHeight: 150,
        });
    },
    props: ['isMsg'],
    data() {
        return {
            editor: null,
            rules: {
                messageType: [{
                    required: true,
                    message: '请选择消息类型'
                }],
                busiId: [{
                    required: true,
                    message: '请选择所属业务'
                }],
                title: [{
                    required: true,
                    message: '请输入消息标题'
                }],
                userName: [{
                    required: true,
                    message: '请选择收件人'
                }],
            },
            labelCol: {
                span: 9
            },
            wrapperCol: {
                span: 15
            },
            asyncConfirmLoading: false,
            /*editorOption: {
                placeholder: "请输入消息内容",
            }*/
            customPanelStyle: {
                background: '#F8F8F8',
                borderRadius: '4px',
            },
           /* options: [{
                value: '1',
                label: '类型A'
            }, {
                value: '2',
                label: '类型B',
                disabled: true
            }, {
                value: '3',
                label: '类型C'
            },{
                value:'',
                label:'空'
            }],*/
            busiIdOpts:[{
                value:'aaaa',
                label:'业务A'
            },{
                value:'bbbb',
                label:'业务B'
            }],
            activeIndex:['0'],
            checkedUserId:[],
            disabledDate(current){
                return current && current.valueOf() < Date.now();
            },
        }
    },
    destroyed() {　　 // 将editor进行销毁
        this.editor.destroy();　　 
    },
    methods: {
        handleOk() {
            let self = this;
            self.$refs['msgForm'].validate((valid) => {
                if (valid) {
                    if (self.msgForm.isTop == true) {
                        if (self.msgForm.topDealine == null || self.msgForm.topDealine == '') {
                            self.$message['warning']("消息置顶后没有设置置顶时间");
                            return;
                        }
                    }
                    if(self.checkedUserId.length<1){
                        self.$message['error'](" 收件人不能为空！");
                        return;
                    }
                    if(UE.getEditor('ueditor').getContent().length>0){
                        let strContent = UE.getEditor('ueditor').getContent();
                        this.$store.commit('msgAddEditModule/CHANGE_MESSAGE_CONTENT',strContent);
                    }else{
                        self.$message['error']("消息内容不能为空！");
                        return;
                    }
                    self.asyncConfirmLoading = true;
                    if(self.currentUser){
                        this.$store.commit('msgAddEditModule/CHANGE_MESSAGE_FROM',self.currentUser);
                    }
                    self.$store.dispatch('msgAddEditModule/fetchAddSave').then(res => {
                        self.asyncConfirmLoading = false;
                        if (res && res.data) {
                            self.$message.success(res.data.data, 1);
                            self.$emit('ok');
                            self.$store.commit('msgAddEditModule/CLEAR_FORM');
                            self.$refs['msgForm'].resetFields();
                            self.$store.commit('msgAddEditModule/INIT_TREE_DATA');
                            self.activeIndex = ['0'];
                            UE.getEditor('ueditor').setContent('');
                        }
                    });
                } else {
                    this.asyncConfirmLoading = false;
                    return false;
                }
            });
        },
        handleCancel() {
            this.asyncConfirmLoading = false;
            this.$store.commit('msgAddEditModule/CLEAR_FORM');
            this.$refs['msgForm'].resetFields();
            this.$emit('cancel');
            this.$store.commit('msgAddEditModule/INIT_TREE_DATA');
            this.activeIndex = ['0'];
            UE.getEditor('ueditor').setContent('');
        },
        checkFn(param){
            //console.log(param);
            this.checkedUserId = [];
            if(param && param.length>0){
                param.forEach(currentValue =>{
                    if(currentValue.userId){
                        var obj ={};
                        obj.userId = currentValue.userId;
                        obj.userName = currentValue.name;
                        this.checkedUserId.push(obj);
                    }
                }); 
                if(this.checkedUserId.length>0){
                    this.$store.commit('msgAddEditModule/CHANGE_USER_LIST',this.checkedUserId);
                }else{
                    this.$message.warning('您当前勾选的对象下没有用户数据，请先创建用户！');
                }
            }
        },
        busiChange(param){
            //console.log(param);
            if(param){
                var obj={};
                obj.busiId = param.value;
                obj.busiName = param.label;
                this.$store.commit('msgAddEditModule/CHANGE_BUSINESS_DATA', obj);
            }
        },
        foldChange(param,status){
            /*console.log(param,status);*/
        }
    }
}
</script>
<style>
.foldPanel{position: absolute;left:0;top:0;z-index: 1000; }
.foldPanel.ant-collapse>.ant-collapse-item{ max-height: 450px; overflow-y:auto;}
.foldPanel .ant-collapse-content>.ant-collapse-content-box{padding-top: 0;}
.quill-editor:not(.bubble) .ql-container,
.quill-editor:not(.bubble) .ql-container .ql-editor {
    height: 200px;
    padding-bottom: 1rem;
}
</style>
<style scoped lang='less'>
.quill-editor,
.quill-code {
    width: 50%;
    float: left;
}

.quill-code {
    height: auto;
    border: none;
    >.title {
        border: 1px solid #ccc;
        border-left: none;
        height: 3em;
        line-height: 3em;
        text-indent: 1rem;
        font-weight: bold;
    }
    >code {
        width: 100%;
        margin: 0;
        padding: 1rem;
        border: 1px solid #ccc;
        border-top: none;
        border-left: none;
        border-radius: 0;
        height: 30rem;
        overflow-y: auto;
    }
}
</style>