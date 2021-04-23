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
    dashboard: {
        name: 'Dashboard',
        component: view.blank
    },
    workplace: {
        name: '工作台',
        component: () => import('@/pages/dashboard/workplace')
    },
    analysis: {
        name: '分析页',
        component: () => import('@/pages/dashboard/analysis')
    },

    //开始
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

