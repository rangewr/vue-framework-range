import Axios from "axios";
import { Button, Option, Select } from 'element-ui'; //引入element插件
import 'element-ui/lib/theme-chalk/index.css'; //引入element样式
import { Notice } from 'iview';
import qs from "qs";
import Vue from 'vue';
// import router from 'vue-router';
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
Vue.use(Notice)
Vue.use(router);
Vue.config.productionTip = false;
// Vue.prototype.HOST='/api'
// Vue.prototype.$asios = Axios

//设置全局请求baseURL, 打包部署之前, 务必注释掉此代码
Axios.defaults.baseURL = 'http://localhost:8082/';
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//*************************************全局拦截器*******************************************
//请求拦截器
Axios.interceptors.request.use(function (config) {
    //在发送请求之前的处理
    if (config.method == "post") {//处理post请求data格式
        config.data = qs.stringify(config.data);
    }
    //设置请求token
    if (store.getters.Authorization) {
        config.headers.AUTH_TOKEN = store.getters.Authorization;
    }
    return config;
}, function (error) {
    //对请求错误处理
    return Promise.reject(error);
});

//响应拦截器
Axios.interceptors.response.use(function (response) {
    //对响应数据处理
    if (response.data.code == "202") {//与后台约定, 状态码为202时代表登录超时
        let _this = new Vue();
        _this.$Message.error('登录超时');
        // Notice.info({
        //     title: '请重新登录',
        //     desc: `
        //         <Form ref="formInline" :model="formInline" :rules="ruleInline" inline>
        //         <Form-item prop="user">
        //             <Input type="text" v-model="formInline.user" placeholder="Username">
        //                 <Icon type="ios-person-outline" slot="prepend"></Icon>
        //             </Input>
        //             <Input type="password" v-model="formInline.user" placeholder="Password">
        //                 <Icon type="ios-person-outline" slot="prepend"></Icon>
        //             </Input>
        //         </Form-item>
        //         </Form>
        //     `,
        //     duration: 0
        // });
        store.dispatch('LogOut').then(() => {
            router.push({ path: '/login' });
          }).catch(err => {
            _this.$Message.error(err);
          });
    }
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
    components: { App }
})


