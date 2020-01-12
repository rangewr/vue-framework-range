import { asyncRouterMap, constantRouterMap } from 'src/router';

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.role) {
        return roles.some(role => route.meta.role.indexOf(role) >= 0);//允许角色中包含当前用户的角色
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 */
function filterAsyncRouter(RouterMap, roles) {
    const accessedRouters = RouterMap.filter(route => {//遍历
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles);
            }
            return true
        }
        return false
    })
    return accessedRouters
}


function getNowRouter(RouterMap, to) {
    return RouterMap.some(route => {
        if (to.path.indexOf(route.path) !== -1) {
            return true;
        } else if (route.children && route.children.length) { //如果有孩子就遍历孩子
            return getNowRouter(route.children, to)
        }
    })

}


const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: [],
        siderbar_routers: [],
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);//组装两个路由数组
        },

        SET_NOW_ROUTERS: (state, to) => {
            // 递归访问 accessedRouters，找到包含to 的那个路由对象，设置给siderbar_routers
            state.addRouters.forEach(e => {
                if (e.children && e.children.length) {
                    if (getNowRouter(e.children, to) === true)
                        state.siderbar_routers = e;
                }

            })


        },
        CLEAR_ROUTER: (state) => {
            state.routers = constantRouterMap;
            state.addRouters = [];
            state.siderbar_routers = [];
        }

    },
    actions: {
        GenerateRoutes({ commit, state }, data) {
            return new Promise(resolve => {
                const { roles } = data;
                //一 存在vuex中
                // var strArray = JSON.stringify(asyncRouterMap);
                // var strObject = strArray.slice(1, strArray.length - 1);
                // var RouterMap = JSON.parse(strObject);
                //二 转为JSON字符串再转回到array(转回array时类型为Object)
                // var RouterMap = JSON.parse(JSON.stringify(asyncRouterMap));
                //三 使用concat连接一个空数据组进行复制
                // var RouterMap = [].concat(asyncRouterMap);
                //四 分割复制(slice有两个参数start和end, end可不传, 表示从start开始到末尾)
                // var RouterMap = asyncRouterMap.slice(0);
                //五 深度复制数组
                var RouterMap = _.cloneDeep(asyncRouterMap);
                var accessedRouters;
                if (roles.indexOf('admin') >= 0) {
                    accessedRouters = RouterMap
                } else {
                    accessedRouters = filterAsyncRouter(RouterMap, roles);
                }
                commit('SET_ROUTERS', accessedRouters);
                resolve();
            })
        },

        getNowRoutes({ commit }, data) {
            return new Promise(resolve => {
                //data => to
                commit('SET_NOW_ROUTERS', data);
                resolve();
            })
        },
        LogOutClearRouters({ commit, state }) {
            return new Promise(resolve => {
                commit('CLEAR_ROUTER');
                resolve();
            })
        },
    },
};

export default permission;
