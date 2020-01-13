import axios from 'axios';
import Cookies from 'js-cookie';

const user = {
    state: {
        user: '',
        status: '',
        email: '',
        code: '',
        uid: undefined,
        auth_type: '',
        token: Cookies.get('Admin-Token'),
        name: '',
        avatar: '',
        introduction: '',
        roles: Cookies.get('Admin-Token'),
        setting: {
            articlePlatform: []
        },
        // 存储token
        Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
    },

    mutations: {
        SET_AUTH_TYPE: (state, type) => {
            state.auth_type = type;
        },
        SET_CODE: (state, code) => {
            state.code = code;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_UID: (state, uid) => {
            state.uid = uid;
        },
        SET_EMAIL: (state, email) => {
            state.email = email;
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction;
        },
        SET_SETTING: (state, setting) => {
            state.setting = setting;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        LOGIN_SUCCESS: () => {
            console.log('login success')
        },
        LOGOUT_USER: state => {
            state.user = '';
        },
        // 修改token，并将token存入localStorage
        changeLogin(state, user) {
            state.Authorization = user.Authorization;
        },
        changeLogOut(state, user) {
            state.Authorization = user.Authorization;
        }
    },

    actions: {
        // 登录
        Login({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                axios.post('user/login', userInfo).then((response) => {
                    const userinfo = response.data.responseData;
                    Cookies.set('Admin-Token', userinfo.roles.roleName);
                    Cookies.set('User-Name', userinfo.username);
                    commit('changeLogin', { "Authorization": userinfo.token });
                    resolve();
                }).catch(err => {
                    console.log("登录异常");
                    console.log(err);
                    reject(err);
                });
            });
        },

        // 获取用户信息
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                commit('SET_ROLES', state.token);
                resolve();
            });
        },

        // 第三方验证登录
        LoginByThirdparty({ commit, state }, code) {
            return new Promise((resolve, reject) => {
                commit('SET_CODE', code);
                loginByThirdparty(state.status, state.email, state.code, state.auth_type).then(response => {
                    commit('SET_TOKEN', response.data.token);
                    // Cookies.set('Admin-Token', response.data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                });
            });
        },


        // 登出
        LogOut({ commit  }) {
            return new Promise((resolve) => {
                commit('changeLogOut', { "Authorization": '' });
                Cookies.remove('Admin-Token');
                Cookies.remove('User-Name');
                resolve();
            });
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                resolve();
            });
        },

        // 动态修改权限
        ChangeRole({ commit }, role) {
            return new Promise(resolve => {
                commit('SET_ROLES', [role]);
                commit('SET_TOKEN', role);
                Cookies.set('Admin-Token', role);
                resolve();
            })
        }
    }
};

export default user;
