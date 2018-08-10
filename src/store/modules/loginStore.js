import Vue from "vue";
import api from "@/api/index.js";
import qs from 'qs';

export default {
    namespaced: true,
    state: {
        loginForm: {
            password: '',
            username: ''
        },
    },
    actions: {
        fetchLoginData({ commit, state }, ids) {
            var data =  qs.stringify(state.loginForm);
            return api.formMethod("post", api.getURL("login/login"), data).then(res => {
                return res.data
            });
        },
    },
    mutations: {
        INIT_DATA_STATUS(state, data) {
            state.loginForm = {
                password: '',
                username: ''
            }
        },
    },
    getters: {}
};