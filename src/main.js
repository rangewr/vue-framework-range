import Axios from "axios";
import { Button, Option, Select } from 'element-ui'; //引入element插件
import 'element-ui/lib/theme-chalk/index.css'; //引入element样式
import qs from "qs";
import Vue from 'vue';
import App from './App';
import './assets/iconfont/iconfont.css';
import './login.js';
import './mock/index.js'; // 该项目所有请求使用mockjs模拟
import router from './router';
import store from './store';
import './ui.js';

Vue.use(Button)
Vue.use(Select)
Vue.use(Option)
Vue.config.productionTip = false;

//设置全局请求baseURL
Axios.defaults.baseURL = 'http://localhost:8080/jeenotes-ssm';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//全局拦截器********************************************************************************
//请求拦截器
Axios.interceptors.request.use(function (config) {
    //在发送请求之前的处理
    if (config.method == "post") {//处理post请求data格式
        config.data = qs.stringify(config.data);
    }
    return config;
}, function (error) {
    //对请求错误处理
    return Promise.reject(error);
});

//响应拦截器
Axios.interceptors.response.use(function (response) {
    //对响应数据处理
    return response;
}, function (error) {
    //对响应错误处理
    return Promise.reject(error);
});

//***********************************************************************************************


var vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App}
})


