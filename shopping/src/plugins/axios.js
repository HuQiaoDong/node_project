"use strict";

import Vue from "vue";
import axios from "axios";

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

//设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    // 基础请求
    baseURL: 'http://127.0.0.1:9000',
    // timeout: 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    // params => {
    //     console.log('params ==> ', params);

    // },
    function(config) {
        // Do something before request is sent
        console.log(config);
        if (config.method == 'post') {
            console.log('post请求');
            // let str = JSON.stringify(config.data);
            // console.log(str);
            // config.data = str;
            // console.log("config.data ==> ", config.data);
            let str = '';
            for (let key in config.data) {
                str += key + '=' + config.data[key] + '&'
            }

            str = str.slice(0, -1);
            console.log('str ==> ', str);

            config.data = str;
        }
        return config;
    },
    function(error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function(response) {
        // Do something with response data
        return response;
    },
    function(error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

Plugin.install = function(Vue) {
    Vue.axios = _axios;
    window.axios = _axios;
    Object.defineProperties(Vue.prototype, {
        axios: {
            get() {
                return _axios;
            }
        },
        $axios: {
            get() {
                return _axios;
            }
        }
    });
};

Vue.use(Plugin);

export default Plugin;