import Cookies from 'js-cookie';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { constantRouterMap } from 'src/router';
import VueRouter from 'vue-router';
import router from './router';
import store from './store';



// permissiom judge
function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) return true; // admin权限直接通过
    if (!permissionRoles) return true;//跳转的地址权限无限制
    return roles.some(role => permissionRoles.indexOf(role) >= 0);//设置允许权限中是否包含当前用户的角色权限
}

// register global progress.
const whiteList = ['/login', '/authredirect'];// 不重定向白名单
router.beforeEach((to, from, next) => {
    NProgress.start(); // 开启Progress
    if (Cookies.get("Admin-Token")) { // 判断是否有token
    // if (store.getters.token) {
        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            if (store.getters.addRouters.length === 0) { // 判断当前用户是否已拉取完user_info信息
                const roles = store.getters.roles;
                store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
                    router.matcher = new VueRouter({ routes: constantRouterMap }).matcher;
                    router.addRoutes(store.getters.addRouters);
                    next({ ...to, replace: true });
                })
            } else {
                store.dispatch('getNowRoutes', to);
                if (hasPermission(store.getters.roles, to.meta.role)) {
                    next();//
                } else {
                    next({ path: '/', query: { noGoBack: true } });
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next();
        } else {
            next('/login'); // 否则全部重定向到登录页
            NProgress.done(); // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
        }
    }
})

router.afterEach(() => {
    NProgress.done(); // 结束Progress
})
