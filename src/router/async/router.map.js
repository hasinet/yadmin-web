// 视图组件
const view = {
    tabs: () => import('@/layouts/tabs'),
    blank: () => import('@/layouts/BlankView')
}

// 路由组件注册
const routerMap = {
    login: {
        authority: '*',
        path: '/login',
        component: () => import('@/pages/login')
    },
    root: {
        path: '/',
        name: '首页',
        redirect: '/login',
        component: view.tabs
    },

    //系统--------------------------------------------------start
    system: {
        path: 'system',
        icon: 'setting',
        name: '系统',
        component: view.blank
    },
        system_auth: {
            path: 'auth',
            icon: 'lock',
            name: '权限',
            component: view.blank
        },
            system_auth_admin: {
                path: 'admin',
                icon: 'user',
                name: '管理员',
                component: () => import('@/pages/system/auth/admin')
            },
            system_auth_role: {
                path: 'role',
                icon: 'team',
                name: '角色',
                component: () => import('@/pages/form/basic')
            },
            system_auth_menu: {
                path: 'menu',
                icon: 'menu',
                name: '菜单',
                component: () => import('@/pages/form/basic')
            },

        system_monitor: {
            path: 'monitor',
            icon: 'eye',
            name: '监控',
            component: () => import('@/pages/form/basic')
        },
            system_monitor_quartz: {
                path: 'quartz',
                icon: 'history',
                name: '定时任务',
                component: () => import('@/pages/form/basic')
            },
            system_monitor_application: {
                path: 'application',
                icon: 'appstore',
                name: '应用监控',
                component: () => import('@/pages/form/basic')
            },
    //系统--------------------------------------------------end


    form: {
        name: '表单页',
        icon: 'form',
        component: view.blank
    },
    basicForm: {
        path: 'basic',
        name: '基础表单',
        component: () => import('@/pages/form/basic')
    },
    //结束

    //异常页面，这个要保留
    exp403: {
        authority: '*',
        name: 'exp403',
        path: '403',
        component: () => import('@/pages/exception/403')
    },
    exp404: {
        name: 'exp404',
        path: '404',
        component: () => import('@/pages/exception/404')
    }
}
export default routerMap

