<template>
	<v-modal title="绑定角色" :visible="visible" @cancel="handleCancel">
		<p class="text-md text-primary" v-text="textTip"></p>
		<div class="widgetWrap">
			<v-tree :data="treeData" checkable multiple @check="checkFn"></v-tree>
		</div>
		<div slot="footer">
			<v-button key="cancel" type="ghost" size="large" @click="handleCancel"> 取消 </v-button>
			<v-button key="confirm" type="primary" size="large" :loading="asyncConfirmLoading" @click="handleOk" :disabled="btnBeal"> 确定 </v-button>
		</div>
	</v-modal>
</template>
<script>
import { mapState } from 'vuex'
export default {
	props: ["visible"],
	computed: {
		...mapState({
			treeData: state => state.orgRoleModule.treeData,
			dataRow: state => state.orgRoleModule.rowVal
		})
	},
	data() {
		return {
			textTip: '',
			btnBeal: true,
			asyncConfirmLoading: false,
			checkRoleArr: null
		}
	},
	watch: {
		dataRow(newval) {
			if (newval && newval.name) {
				this.textTip = '请为 “' + newval.name + '” 勾选需要绑定的机构类型，然后点击“确定”。';
			}
		}
	},
	methods: {
		handleOk() {
			var saveArr = [];
			if (this.checkRoleArr.length > 0) {
				this.checkRoleArr.map(item => {
					var obj = {};
					obj.roleId = item.roleId;
					obj.name = item.name;
					obj.relationType = 2;
					obj.relationTypeId = this.dataRow.orgId;
					saveArr.push(obj);
				});
			} else {
				var obj = {};
				obj.roleId = '';
				obj.name = '';
				obj.relationType = 2;
				obj.relationTypeId = this.dataRow.orgId;
				saveArr.push(obj);
			}
			this.asyncConfirmLoading = true;
			this.$store.dispatch('orgRoleModule/saveOrgRole', saveArr).then(res => {
				this.$message.success(res.data.data, 1);
				this.$emit('ok');
				this.btnBeal = true;
				this.asyncConfirmLoading = false;
			});
		},
		handleCancel() {
			this.btnBeal = true;
			this.$emit("cancel");
			this.asyncConfirmLoading = false;
		},
		checkFn(data) {
			this.btnBeal = false;
			//console.log('checkFn', data);
			this.checkRoleArr = null;
			this.checkRoleArr = data;
		},
	}
}
</script>