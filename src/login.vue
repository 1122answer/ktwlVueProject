<template>
    <div class="login-back">
        <div class="logo">
        </div>
        <div class="login">
            <h1 class="text-dark margin-top-25 text-center padding-top-10 padding-bottom-20">用户登陆</h1>
            <v-form direction="horizontal" :model="loginForm" :rules="loginRules" ref="loginForm">
                <v-form-item prop="userName" label="用户名" :label-col="labelCol" :wrapper-col="wrapperCol" >
                    <v-input size="large" v-model="loginForm.username" placeholder="请输入用户名" tabindex="1"></v-input>
                </v-form-item>
                <v-form-item prop="password" label="密码" :label-col="labelCol" :wrapper-col="wrapperCol">
                    <v-input type="password" size="large" placeholder="请输入密码" v-model="loginForm.password" tabindex="2" ></v-input>
                </v-form-item>
                <v-form-item>
                    <v-row>
                        <v-col span="12" push='6'>
                            <v-checkbox>记住用户名</v-checkbox>
                        </v-col>
                    </v-row>
                </v-form-item>
                <v-form-item :wrapper-col="{offset:6, span:15}">
                    <v-button type="primary" size="large" style="margin-right:10px;width:100%; " @click.prevent="submitForm" @keyup.enter="submitForm" tabindex="3">登录</v-button>
                </v-form-item>
                <v-form-item class="text-center text-lg">
                    <a href="#">其他登录方式</a>
                </v-form-item>
            </v-form>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex"; //数据流

export default {
    name: "login",
    components: {
        //addPane
    },
    computed: {
         ...mapState({
            loginForm: state => state.loginModule.loginForm
         })
    },
    mounted() {
        this.$store.commit('loginModule/INIT_DATA_STATUS');
    },
    data: function() {
        return {
            loginRules: {
                password: [{
                    required: true,
                    message: '请输入密码'
                }],
                username: [{
                    required: true,
                    message: '请输入用户名'
                }],
            },
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 15
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.$store.dispatch('loginModule/fetchLoginData').then(res => {
                    	if(res){
                    		this.$router.push({ path: '/view/index' }); // -> 编程式跳转
                            this.$store.commit('CHANGE_LOGIN_NAME','admin');
                    	}
                    });
                } else {
                    return false;
                }
            });
        },
    }
};
</script>
<style scoped lang='less'>
.logo {
    height: 70px;
    width: 300px;
    position: absolute;
    top: 10%;
    left: 25%;
    background-image: url(imges/login-logo.png);
    background-repeat: no-repeat;
    background-size: 100%;
}

.login {
    height: 400px;
    width: 350px;
    background: #f1f1f1;
    margin: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: 200px;
}

.login-back {
    height: 100%;
    width: 100%;
    background-image: url(imges/login-bg.png);
    background-repeat: no-repeat;
    background-size: cover;
}
</style>