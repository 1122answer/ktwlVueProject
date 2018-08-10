<!-- 分配权限 -->
<template>
    <v-modal title="分配权限" :visible="visible" @cancel="permissionCancel">
        <div class="widgetWrap">
            <v-tree :data="treeData" checkable multiple @check="checkFn" ref="rolePesTree"></v-tree>
        </div>
        <div slot="footer">
            <v-button key="cancel" type="ghost" size="large" @click="permissionCancel"> 取消 </v-button>
            <v-button key="confirm" type="primary" size="large" :loading="asyncConfirmLoading" @click="permissionOk" :disabled="btnBeal"> 确定 </v-button>
        </div>
    </v-modal>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props: ["visible"],
    computed: {
        ...mapState({
            treeData: state => state.rolePermissionModule.treeData,
            roleId: state => state.rolePermissionModule.roleId,

        })
    },
    data() {
        return {
            asyncConfirmLoading: false,
            btnBeal: true,
            checkedArr: [],
        }
    },
    methods: {
        permissionOk() {
            var saveArr = [];
            var halfArr = this.$refs.rolePesTree.getHalfCheckedNodes();
            var pesArr = [];
            var actions = [];
            if (halfArr.length > 0) {
                pesArr = halfArr;
            }
            if (this.checkedArr.length > 0) {
                this.checkedArr.map(item => {
                    if (item.permissionId) {
                        pesArr.push(item);
                    }
                    if (item.actionId) {
                        actions.push(item)
                    }
                });
                actions.map(els => {
                    if (pesArr.length > 0) {
                        for (var i = 0; i < pesArr.length; i++) {
                            if (els.pid == pesArr[i].id) {
                                if (pesArr[i].allowAct) {
                                    pesArr[i].allowAct = pesArr[i].allowAct + ',' + els.id;
                                } else {
                                    pesArr[i].allowAct = els.id;
                                }
                            }
                        }
                    }
                });
            }
            pesArr.map(item => {
                var obj = {};
                obj.allowActions = item.allowAct || '';
                obj.permissionId = item.permissionId;
                obj.roleId = this.roleId;
                saveArr.push(obj);
            });
            //保存角色权限关系
            this.asyncConfirmLoading = true;
            this.$store.dispatch('rolePermissionModule/saveRolePermission',saveArr).then(res => {
                this.$message.success(res.data.data, 1);
                this.asyncConfirmLoading = false;
                this.$emit("ok");
                this.btnBeal = true;
            });
        },
        permissionCancel() {
            this.$emit("hide");
            this.btnBeal = true;
            this.asyncConfirmLoading = false;
        },
        //复选框选中
        checkFn(data) {
            console.log('选中', data);
            this.checkedArr = [];
            if (data) {
                this.checkedArr = data;
            }
            this.btnBeal = false;
        },
    }
}
</script>