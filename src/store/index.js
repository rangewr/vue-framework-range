import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import app from './modules/app';
import permission from './modules/permission';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
     // 存储token
    //  Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
  mutations: {
        // 修改token，并将token存入localStorage
    //     changeLogin (state, user) {
    //       state.Authorization = user.Authorization;
    //       localStorage.setItem('Authorization', user.Authorization);
    //     },
    //     changeLogOut (state, user) {
    //         state.Authorization = '';
    //         localStorage.setItem('Authorization', '');
    //       }
      },
  modules: {
    app,
    user,
    permission
  },
  getters
});

export default store
