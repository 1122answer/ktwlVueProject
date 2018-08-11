/**
 * config  路由 url
 * @global variable
 */
import axios from 'axios';
import qs from 'qs';
import { router } from "./rloc.js";
const devMode = false; //一键切换开发环境
//在这里进行接口的统一配置，所有的url都走这里
let globalTime = new Date();

function interceptorsMethod(store, context) {
    //全局Ajax监控
    axios.interceptors.response.use((response) => {
        globalTime = new Date();
        if (!response.data.success) {
            context.$message.error(response.data.message);
            return 0;
        }
        return response;
    }, (error) => {
        console.log(error.response);
        Promise.resolve(error.response)
    })
    axios.interceptors.request.use((request) => {
        return request
    }, (error) => {
        console.log(error);
        Promise.reject(error);
    });
    setInterval(clock,600050);
    //不超时
    function clock(){
        var currentTime = new Date();
        var plusResult = (currentTime - globalTime)/1000/60;
        if(plusResult > 10){
            console.log('更新接口,永不超时');
            store.dispatch('globalPermissonModule/getCurrentUser');
        }   
    }
}

function requestMethod(method, url, data = null) {
    if (!method) {
        console.error('API function call requires method argument');
        return;
    }
    if (!url) {
        console.error('API function call requires url argument');
        return;
    }
    const [path, subPath] = url.match(/\w+/g);
    if (devMode) {
        method = 'get';
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios({
                    method,
                    url,
                    data,
                    timeout: 5000
                }).then((res) => {
                    resolve(res)
                })
            }, 1000);
        })
    }
    if (method === 'get' || method === 'delete') {
        return axios[method](url, {
            params: data,
            timeout: 300000
        })
    }
    return axios({ method, url, data, timeout: 3000 });
}

function formMethod(method, url, data = null) {
    if (!method) {
        console.error('API function call requires method argument');
        return;
    }
    if (!url) {
        console.error('API function call requires url argument');
        return;
    }
    const [path, subPath] = url.match(/\w+/g);
    if (devMode) {
        method = 'get';
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                axios({
                    method,
                    url,
                    data,
                    timeout: 5000
                }).then((res) => {
                    resolve(res)
                })
            }, 1000);
        })
    }
    if (method === 'get' || method === 'delete') {
        return axios[method](url, {
            params: data,
            timeout: 300000
        })
    }
    return axios({
        method,
        url,
        data,
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        timeout: 3000
    });
}
let serverHost = 'http://192.168.31.210:8080';
export default {
    serverHost: serverHost,
    serverURI: '',
    getURL: (url) => {
        url = url.replace(/^\//, "");
        /*const [path, subPath] = url.match(/\w+/g);*/
        const pathArr = url.match(/\w+/g) || [];
        if (pathArr && pathArr.length == 2) {
            const [path, subPath] = pathArr;
            return '/zs-web/' + router[path][subPath];
        } else if (pathArr && pathArr.length == 3) {
            const [path, subPath, childPath] = pathArr;
            return '/zs-web/' + router[path][subPath][childPath];
        } else {
            return;
        }
        if (devMode) {
            var webroot = "/test/";
            let devPath = url.replace(/\//g, "");
            return webroot + devPath + ".json";
        }

    },
    request: requestMethod,
    interceptors: interceptorsMethod,
    formMethod: formMethod
};