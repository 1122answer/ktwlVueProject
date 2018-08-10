<template>
    <div id="addDicDiag">
        <v-modal title="字典信息" :visible="true"  v-show="isDic" :width="1050" @ok="addOk" @cancel="addCancel">
            <subDic :visible="newDic" :width="900" @ok="dicOk" @cancel="dicCancel"></subDic>
            <v-form direction="horizontal" :model="adddicForm" :rules="rules" ref="adddicForm">
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="所属系统" :label-col="labelCol" :wrapper-col="wrapperCol" prop="systemId">
                            <v-select placeholder="请选择系统" :optionOnChange="true" v-model="adddicForm.systemId" :data="getsystemSelect" size="lg" @change="choicesys"></v-select>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="行政区域" :label-col="labelCol" :wrapper-col="wrapperCol" prop="regionCode">
                            <v-select placeholder="不选择为通用区域" :data="getRegionSelect" :optionOnChange="true" v-model="adddicForm.regionCode" size="lg" @change="selectRegionCode"></v-select>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="调用方式" :label-col="labelCol" :wrapper-col="wrapperCol" prop="dictType">
                            <v-select placeholder="请选择调用方式" notfound="无法找到" :data="[{value:0,label:'正常'},{value:1,label:'接口'},{value:2,label:'数据库'}]" size="lg" v-model="adddicForm.dictType"></v-select>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span='8'>
                        <v-form-item label="字典名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="dictionaryName" has-feedback>
                            <v-input placeholder="请选择字典名称" size="large" maxlength="20" v-model="adddicForm.dictionaryName"></v-input>
                        </v-form-item>
                    </v-col>
                    <v-col span='8'>
                        <v-form-item label="字典编码" :label-col="labelCol" :wrapper-col="wrapperCol" prop="dictionaryCode" has-feedback>
                           <v-input placeholder="请选择字典编码" size="large" maxlength="20" v-model="adddicForm.dictionaryCode" ></v-input>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row class="text-right">
                <v-button type="primary" title="新增" class="margin-right-20" @click="addDic">
                    <v-icon type="file-add"></v-icon>新增
                </v-button>
                <v-button type="error" title="删除" class="margin-right-20" @click="dicdel">
                    <v-icon type="delete"></v-icon>删除
                </v-button>
                </v-row>
                <v-data-table ref="dicTable" :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" :rowClickChecked='true' :checkType='checkType' :currentData.sync='currentData' bordered sort="true" emptyText="暂时找不到你要的信息......">
                <template slot="td" slot-scope="props">
                    <div v-if="props.column.field=='isEnabled'">
                        <span v-if="props.content==0">否</span>
                        <span v-else-if="props.content==1">是</span>
                    </div>
                    <div v-else-if="props.column.field=='modifyType'">
                        <span v-if="props.content==0">只读</span>
                        <span v-else-if="props.content==1">修改</span>
                        <span v-else-if="props.content==2">修改/删除</span>
                    </div>
                    <span v-else v-html="props.content"></span>
                </template>
            </v-data-table>
            </v-form>
        </v-modal>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import subDic from './addSubDic.vue'
export default {
    name: 'this',
    components: {
        subDic,
    },
    computed: {
        ...mapState({
            getsystemSelect: state => state.commonSelect.systemSelect,
            getRegionSelect: state => state.commonSelect.regionSelect,
            adddicForm: state => state.dicAddModule.adddicForm,
            listetail: state => state.dicAddModule.listdetail,
        })
    },
    mounted() {
       this.$store.dispatch("commonSelect/getsystemSelect");
       this.$store.dispatch("commonSelect/getRegionSelectTree");
    },
    props: ['isDic'],
    data: function() {
        return {
            newDic: false,
            currentData: [],
            labelCol: {
                span: 9
            },
            wrapperCol: {
                span: 15
            },
            checkType: "checkbox",
            responseParamsName: {
                total: 'totalCount',
                results: 'result'
            },
            loadData(){
                 return this.$store.dispatch('dicAddModule/takedicTable').then(res => {
                       return res;
                      });
            },
            columns: [
                { title: "字典参数", field: "dictionaryKey"},
                { title: "值1", field: "value1"},
                { title: "值2", field: "value2"},
                { title: "值3", field: "value3"},
                { title: "是否开启", field: "isEnabled"},
                { title: "操作权限", field: "modifyType"},
                { title: "备注", field: "remark"},
            ],
            rules: {
               dictionaryName: [{
                    required: true,
                    message: '请输入字典名称'
                }],
                dictionaryCode: [{
                    required: true,
                    message: '请输入字典编码'
                }],
            },

        }
    },
    methods: {
        dicdel() {
            let newData = [];
            this.currentData.forEach(item => {
                if (!item.vb_dt_checked) {
                    newData.push(item);
                }
            });
            this.currentData = newData;
            this.$message.success("删除成功");
            return this.$store.dispatch('dicAddModule/newdicTable', newData);
        },
        dicOk() {
          this.$refs.dicTable.refresh();
          this.newDic = false;
        },
        dicCancel() {
          this.newDic = false;
        },
        addDic() {
          this.$store.commit("dicAddModule/NEWDICFORM_CLEAR");
          this.newDic = true;
        },
        addOk() {
            this.$refs.adddicForm.validate((valid) => {
                if (valid) {
                    return this.$store.dispatch('dicAddModule/addList').then(res => {
                        if (res.data.success) {
                               this.$emit("ok")
                               this.$message.success("添加成功");
                               this.$refs.adddicForm.resetFields();
                               this.$store.commit("dicAddModule/CLEAR_ADDFORM");
                               this.$refs.dicTable.reload();
                        }
                        return res;
                    })
                }
            });
        },
        addCancel() {
            this.$emit('cancel');
            this.$refs.adddicForm.resetFields();
            this.$store.commit("dicAddModule/CLEAR_ADDFORM");
            this.$refs.dicTable.reload();
        },
        // 获取系统
        choicesys(data) {
            return this.$store.dispatch('dicAddModule/getsysList', data);
        },
        // 获取行政区域
        selectRegionCode(data) {
            return this.$store.dispatch('dicAddModule/getregionList', data);
        },
    }
}
</script>
<style>
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