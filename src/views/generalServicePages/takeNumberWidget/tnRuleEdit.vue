<template>
    <v-modal :title="pagetitle" :visible="visible" @ok="addOk" @cancel="addCancel" :width="900" :maskClosable="false">
        <ruletable :visible="newrule" @ok="rulelistOk" @cancel="rulelistCancel" :width="900"></ruletable>
        <div class="numadd">
            <v-form direction="horizontal" :model="addruleForm" :rules="rules" ref="addruleForm">
                <v-row>
                    <v-col span="8">
                        <v-form-item label="规则编号" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback prop="ruleCode">
                            <span v-if="disablenum">{{addruleForm.ruleCode}}</span>
                            <v-input size="large" v-model="addruleForm.ruleCode" v-else></v-input>
                        </v-form-item>
                    </v-col>
                    <v-col span="8">
                        <v-form-item label="规则名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="ruleName">
                            <span v-if="listetail">{{addruleForm.ruleName}}</span>
                            <v-input size="large" v-model="addruleForm.ruleName" v-else></v-input>
                        </v-form-item>
                    </v-col>
                    <v-col span="8">
                        <v-form-item label="所属系统" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback>
                            <span v-if="listetail">{{addruleForm.systemName}}</span>
                            <v-select placeholder="请选择系统" :optionOnChange="true" v-model="addruleForm.systemId" :data="getsystemSelect" size="lg" style="width:100%" @change="choicesys" :disabled="listetail" v-else></v-select>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span="8">
                        <v-form-item label="行政区域" :label-col="labelCol" :wrapper-col="wrapperCol">
                            <span v-if="listetail">
                                <span v-if="addruleForm.regionName==''">通用区域</span>
                                <span v-else>{{addruleForm.regionName}}</span>
                            </span>
                            <v-tree-select :data="getRegionSelect" :optionOnChange="true" size="lg" @select="selectRegionCode" style="width:100%" :disabled="listetail" :allowClear="true" :popupContainer="commandRegion" @clear="clearregion" v-else></v-tree-select>
                            <div id='getRegion'></div>
                        </v-form-item>
                    </v-col>
                    <v-col span="8">
                        <v-form-item label="是否开启" :label-col="labelCol" :wrapper-col="wrapperCol" has-feedback>
                            <span v-if="listetail">
                                <span v-if="addruleForm.isEnabled">是</span>
                                <span v-else>否</span>
                            </span>
                            <v-switch v-model="addruleForm.isEnabled" v-else>
                                <span slot="checkedChildren">开</span>
                                <span slot="unCheckedChildren">关</span>
                            </v-switch>
                        </v-form-item>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col span="24">
                        <v-form-item label="备注" :label-col="{span:2}" :wrapper-col="{span:18}" has-feedback>
                            <span v-if="listetail">{{addruleForm.remark}}</span>
                            <v-input size="large" v-model="addruleForm.remark" v-else></v-input>
                        </v-form-item>
                    </v-col>
                </v-row>
            </v-form>
            <v-row class="text-right" v-if="listetail==false">
                <v-button type="primary" title="新增" class="margin-right-20" @click="rulelistadd">
                    <v-icon type="file-add"></v-icon>新增
                </v-button>
                <v-button type="primary" title="上移" class="margin-right-20" @click="listup">
                    <v-icon type="arrow-up"></v-icon>上移
                </v-button>
                <v-button type="primary" title="下移" class="margin-right-20" @click="listdown">
                    <v-icon type="arrow-down"></v-icon>下移
                </v-button>
                <v-button type="error" title="删除" class="margin-right-20" @click="ruledel">
                    <v-icon type="delete"></v-icon>删除
                </v-button>
            </v-row>
            <v-data-table ref="ruleTable" :data='loadData' :responseParamsName="responseParamsName" :columns='columns' size="small" class="margin-top-15" :rowClickChecked='true' :checkType='checkType' :currentData.sync='currentData' bordered sort="true" emptyText="暂时找不到你要的信息......">
                <template slot="td" slot-scope="props">
                    <div v-if="props.column.field=='previousClean'">
                        <span v-if="props.content=='false'">否</span>
                        <span v-else-if="props.content=='true'">是</span>
                    </div>
                    <div v-else-if="props.column.field=='quedeId'">
                        <span v-if="props.content=='0'"></span>
                        <span v-else v-html="props.content"></span>
                    </div>
                    <span v-else v-html="props.content"></span>
                </template>
            </v-data-table>
        </div>
        <div slot="footer" v-if="listetail==true">
            <v-button key="cancel" type="ghost" size="large" @click="customFooterCancel">
                返 回
            </v-button>
        </div>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'
import ruletable from './takenumrule.vue'
import api from "@/api/index.js";
export default {
    props: ["visible"],
    components: {
        ruletable,
    },
    computed: {
        ...mapState({
            getsystemSelect: state => state.commonSelect.systemSelect, //获取系统下拉
            getRegionSelect: state => state.commonSelect.regionSelect, //获取行政区域下拉
            addruleForm: state => state.takeNumberAddModule.addruleForm,
            pagetitle: state => state.takeNumberAddModule.pagetitle,
            disablenum: state => state.takeNumberAddModule.disablenum,
            listetail: state => state.takeNumberAddModule.listdetail,
        })
    },
    mounted() {
        this.$store.dispatch("commonSelect/getsystemSelect");
        this.$store.dispatch("commonSelect/getRegionSelectTree",true);
    },
    data() {
        return {
            newrule: false,
            currentData: [],
            responseParamsName: {
                total: 'totalCount',
                results: 'result'
            },
            checkType: "checkbox",
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 15
            },
            loadData(){
                 return this.$store.dispatch('takeNumberAddModule/takeruleTable').then(res => {
                       api.request("get", api.getURL("takeNumber/getruleSelect"),{
                          code:4,
                      }).then(data=>{
                         let index = data.data.data;
                         for (var i = 0; i < res.result.length; i++) {
                            for(var j = 0; j < index.length; j++){
                                if (res.result[i].type==index[j].value) {
                                   res.result[i].type=index[j].text
                                }
                            }
                        }
                    })
                    return res;
                })

            },
            columns: [
                { title: "类型", field: "type"},
                { title: "长度", field: "length"},
                { title: "流水号当前序号",field: "quedeId"},
                { title: "固定符", field: "fixed"},
                { title: "变更清零", field: "previousClean"},
            ],
            rules: {
                ruleCode: [{
                    required: true,
                    message: '请填写规则编号'
                }],
                ruleName: [{
                    required: true,
                    message: '请填写规则名称'
                }],
            }
        }
    },
    methods: {
        commandRegion() {
            var selector = document.getElementById('getRegion');
            return selector;
        },
        addOk() {
            this.$refs.addruleForm.validate((valid) => {
                if (valid) {
                  if (this.addruleForm.tnRuleId==null||this.addruleForm.tnRuleId=="") {
                       return this.$store.dispatch('takeNumberAddModule/addList').then(res => {
                        if (res.data.success) {
                               this.$emit("ok")
                               this.$message.success("添加成功");
                        }
                        return res;
                     })
                  }else{
                       return this.$store.dispatch('takeNumberAddModule/editList').then(res => {
                        if (res.data.success) {
                               this.$emit("ok")
                               this.$message.success("修改成功");
                        }
                        return res;
                     })
                  }
                }else{
                  return
                }
            });
        },
        addCancel() {
            this.$emit('addCancel');
        },
        customFooterCancel(){
            this.$emit('addCancel');
        },
        // 添加规则
        rulelistadd() {
            this.$store.commit("takeNumberAddModule/NEWRULEFORM_CLEAR");
            this.newrule=true;
        },
        rulelistOk() {
            this.$refs.ruleTable.refresh();
            this.newrule = false
        },
        rulelistCancel() {
            this.newrule = false
        },
        // 删除规则
        ruledel() {
            let newData = [];
            this.currentData.forEach(item => {
                if (!item.vb_dt_checked) {
                    newData.push(item);
                }
            });
            this.currentData = newData;
            this.$message.success("删除成功");
            return this.$store.dispatch('takeNumberAddModule/newruleTable', newData);
        },
        // 上移
        listup() {
            var selected = this.$refs.ruleTable.getCheckedData();
            if (selected.length >= 2) {
                this.$message.error("只能最对一条数据进行操作");
                return
            } else if (selected.length == 0) {
                this.$message.error("请选择需要移动的数据");
            };
            let listData = this.currentData;
            for (var i = 0; i < listData.length; i++) {
                if (i == 0 && listData[i].vb_dt_checked) {
                    this.$message.error("第一位不能上移");
                } else if (listData[i].vb_dt_checked) {
                    let item = listData[i - 1];
                    listData[i - 1] = listData[i];
                    listData[i] = item;
                    break;
                }
            }
            this.currentData = [];
            this.currentData = listData;
            return this.$store.dispatch('takeNumberAddModule/newruleTable', listData);
        },
        // 下移
        listdown() {
            var selected = this.$refs.ruleTable.getCheckedData();
            if (selected.length >= 2) {
                this.$message.error("只能最对一条数据进行操作");
                return
            } else if (selected.length == 0) {
                this.$message.error("请选择需要移动的数据");
            };
            let listData = this.currentData;
            for (var i = 0; i < listData.length; i++) {
                if (i == listData.length - 1 && listData[i].vb_dt_checked) {
                    this.$message.error("最后一位不能下移");
                } else if (listData[i].vb_dt_checked) {
                    let item = listData[i + 1];
                    listData[i + 1] = listData[i];
                    listData[i] = item;
                    break;
                }
            }
            this.currentData = [];
            this.currentData = listData;
            return this.$store.dispatch('takeNumberAddModule/newruleTable', listData);
        },
        // 获取系统
        choicesys(data) {
            return this.$store.dispatch('takeNumberAddModule/getsysList', data);
        },
        // 获取行政区域
        selectRegionCode(data) {
            console.log(data)
            let opt = [];
            opt.value = data.regionCode;
            opt.label = data.title;
            opt.id = data.regionId;
            return this.$store.dispatch('takeNumberAddModule/getregionList', opt);
        },
        clearregion(){
             let opt = [];
            opt.value ="";
            opt.label ="";
            return this.$store.dispatch('takeNumberAddModule/getregionList', opt);
        }
    }
}
</script>
<style scoped lang='less'>
.numadd {
    min-height: 400px;
    max-height: 700px;
    overflow-y: auto;
}
#getRegion{
    position: relative;
}
</style>