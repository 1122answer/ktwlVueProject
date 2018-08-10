<template>
	<!-- 添加弹框 -->
	<v-modal title="新增角色" :visible="visible" :confirmLoading="rolebutstate" @ok="handleOk" @cancel="handleCancel">
		<v-form direction="horizontal" :model="roleForm" :rules="rules" ref="roleForm">
			<v-form-item label="角色名称" :label-col="labelCol" :wrapper-col="wrapperCol" prop="name" has-feedback>
				<v-input placeholder="请输入角色名称" size="large" v-model="roleForm.name"></v-input>
			</v-form-item>
			<v-form-item label="备注信息" :label-col="labelCol" :wrapper-col="wrapperCol" prop="remark">
				<v-input placeholder="备注信息最多50个字" v-model="roleForm.remark" type="textarea" style="resize:none"></v-input>
			</v-form-item>
			<v-form-item label="是否启用" :label-col="labelCol" :wrapper-col="wrapperCol" prop="enabled">
				<!-- <v-checkbox :v-model="roleForm.enabled">是否启用</v-checkbox>、 -->
				<v-switch v-model="roleForm.enabled"></v-switch>
			</v-form-item>
		</v-form>
	</v-modal>
</template>
<script>
import { mapState } from 'vuex'

export default {
	name: 'this',
	props: ["visible"],
	computed: {
		...mapState({
			roleForm: state => state.roleManageModule.roleForm,
		}),
	},
	data: function() {
		return {
			rules: {
				name: [{
					required: true,
					message: '请输入角色名称'
				}],
			},
			labelCol: {
				span: 6
			},
			wrapperCol: {
				span: 14
			},
			rolebutstate: false,
		};
	},

	methods: {
		handleOk() {
			this.rolebutstate = true;
			this.$refs['roleForm'].validate((valid) => {
				if (valid) {
					//          //添加角色
					if (this.roleForm.roleId == null || this.roleForm.roleId == "") {
						this.$store.dispatch('roleManageModule/saveAddRole').then(res => {
							this.rolebutstate = false;
							if (res.data.success) {
								this.$message.success("添加成功")
								this.$emit('ok');
							} else {
								this.$message.error(res.data.data)
							}
						})
					} else {
						//编辑角色
						this.$store.dispatch('roleManageModule/edtiRoleList').then(res => {
							this.rolebutstate = false;
							if (res.data.success) {
								this.$message.success("修改成功")
								this.$emit('ok');
							} else {
								this.$message.error(res.data.data)
							}
						})
					}
				}
			})
		},

		handleCancel() {
			this.$emit('hide');
		},
	}
}
</script>