<template>
    <div id="groupManage" class="moduleWrap">
        <div class="clearfix">
            <h1 class="pull-left margin-bottom-15">业务管理 <span class="user">User Managment</span></h1>
            <v-breadcrumb class="pull-right">
                <v-breadcrumb-item><i class="anticon anticon-home"></i>首页</v-breadcrumb-item>
                <v-breadcrumb-item>系统业务</v-breadcrumb-item>
                <v-breadcrumb-item>业务管理</v-breadcrumb-item>
            </v-breadcrumb>
        </div>
        <div class="box-border" ref="boxBorder">
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'xxx',
    components: {
        //addPane
    },
    computed: {
        // ...mapState({

        // })
    },
    mounted() {

    },
    data: function() {
        return {
            name: 'template',
            responseParamsName: {
                total: 'totalCount',
                results: 'result'
            },
            loadData(params) {
                return this.$store.dispatch('userListModule/fetchUserTable', {
                    pageNo: params.pageNo,
                    pageSize: params.pageSize,
                }).then(res => {
                    return res;
                })
            },
            columns: [
                { title: "昵称", field: 'nickName' },
                { title: "行政区域", field: 'regionCode' },
                { title: "所属机构", field: 'orgName' },
                { title: "所属部门", field: 'deptName' },
                { title: "真实姓名", field: 'realName' },
                { title: "手机号码", field: 'mobile' },
                { title: "操作", field: 'operation', width: '180px', className: 'text-center' },
            ],
        };
    },
    methods: {

    }
}
</script>
<style scoped lang='less'>
</style>