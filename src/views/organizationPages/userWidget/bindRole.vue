<template>
    <v-modal title="绑定角色" :visible="isRole" :width=800 @ok="handleOk" @cancel="handleCancel" :confirm-loading="asyncConfirmLoading">
        <div style="max-height: 600px;overflow-y: auto;">
            <p class="text-md text-primary">请为用户 “{{userName}}” 勾选角色，然后点击“确定”。</p>
            <div class="widgetWrap">
                <v-tree :data="treeRoles" checkable multiple @check="checkFn"></v-tree>
            </div>
        </div>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'
import axios from 'axios';
export default {
    props: ["isRole"],
    components: {
        //addPane
    },
    computed: {
        ...mapState({
            treeRoles: state => state.roleModule.treeRoles,
            userName: state => state.roleModule.userName,
            userId: state => state.roleModule.userId,
            currentDeptId: state => state.roleModule.deptId,
            currentOrgId: state => state.roleModule.orgId,
        })
    },
    mounted() {
    },
    data: function() {
        return {
            name: 'template',
            asyncConfirmLoading: false,
            roleIds: [],
        };
    },
    methods: {
        handleOk() {
            var saveArr = [];
            if (this.roleIds.length > 0) {
                this.roleIds.map(item => {
                    var paramObj = {};
                    if (item.roleId) {
                        paramObj.roleId = item.roleId;
                        paramObj.deptId = this.currentDeptId;
                        paramObj.name = item.name;
                        paramObj.orgId = this.currentOrgId;
                        paramObj.relationType = 0;
                        paramObj.relationTypeId = this.userId;
                        paramObj.remark = null;
                        saveArr.push(paramObj);
                    }
                });
            } else {
                var paramObj = {};
                paramObj.roleId = '';
                paramObj.deptId = this.currentDeptId;
                paramObj.name = '';
                paramObj.orgId = this.currentOrgId;
                paramObj.relationType = 0;
                paramObj.relationTypeId = this.userId;
                paramObj.remark = null;
                saveArr.push(paramObj);
            }
            console.log('saveArr保存',saveArr);
            this.$store.dispatch('roleModule/fetchRoleSave', saveArr).then(res => {
                this.$message.success(res.data.data, 1);
                this.$emit('ok');
            });
        },
        handleCancel() {
            this.$emit('cancel');
        },
        checkFn(data) {
            this.roleIds = data;
        },
    }
}
</script>
<style scoped lang='less'>
</style>