<template>
    <v-modal title="绑定用户" :visible="isUser" :width=800 @cancel="handleCancel" :maskClosable="false">
        <div style="max-height: 600px;overflow-y: auto;">
            <p class="text-md text-primary">请为 “{{deptName}}” 勾选用户，然后点击“确定”。</p>
            <div class="widgetWrap">
                <v-tree :data="treeUsers" checkable multiple @check="checkFn"></v-tree>
            </div>
        </div>
        <div slot="footer">
            <v-button key="cancel" type="ghost" size="large" @click="handleCancel">
                取消
            </v-button>
            <v-button key="confirm" type="primary" size="large" :loading="asyncConfirmLoading" @click="handleOk" :disabled="btnBeal">
                确定
            </v-button>
        </div>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios';
export default {
    props: ["isUser"],
    components: {
        //addPane
    },
    computed: {
        ...mapState({
            treeUsers: state => state.bindUserModule.treeUsers,
            deptName: state => state.bindUserModule.deptName,
            deptId: state => state.bindUserModule.deptId,
            orgId: state => state.bindUserModule.orgId,
            orgName: state => state.bindUserModule.orgName,
            deptName: state => state.bindUserModule.deptName,
        })
    },
    mounted() {

    },
    /*watch: {
        isUser(newVal) {
            if (newVal) {
                this.$store.dispatch('bindUserModule/fetchDeptUser').then(res => {});
            }
        }
    },*/
    data: function() {
        return {
            name: 'template',
            asyncConfirmLoading: false,
            newCheckedUserIdArr: [],
            btnBeal: true,
            /*orgName:'',
            deptName:''*/
        };
    },
    methods: {
        handleOk() {
            var saveArr = [];
            if (this.newCheckedUserIdArr.length > 0) {
                this.newCheckedUserIdArr.map(item => {
                    var paramObj = {};
                    paramObj.userId = item;
                    paramObj.deptId = this.deptId;
                    paramObj.orgId = this.orgId;
                    paramObj.orgName = this.orgName;
                    paramObj.deptName = this.deptName;
                    saveArr.push(paramObj);
                });
            }
            this.$store.dispatch('bindUserModule/fetchSaveData', saveArr).then(res => {
                this.$message.success(res.data.data, 1);
                this.$store.commit('bindUserModule/INIT_DATA');
                this.newCheckedUserIdArr = [];
                this.$emit('ok');
                this.btnBeal = true;
            });
        },
        handleCancel() {
            this.$emit('cancel');
            this.$store.commit('bindUserModule/INIT_DATA');
            this.newCheckedUserIdArr = [];
            this.btnBeal = true;
        },
        checkFn(data) {
            this.newCheckedUserIdArr = [];
            if (data && data.length > 0) {
                data.map(item => {
                    this.newCheckedUserIdArr.push(item.userId);
                });
            } else {
                this.newCheckedUserIdArr = [];
            }
            this.btnBeal = false;
        }
    }
}
</script>
<style scoped lang='less'>
</style>