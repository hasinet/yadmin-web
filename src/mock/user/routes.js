import Mock from 'mockjs'

Mock.mock(`${process.env.VUE_APP_API_BASE_URL}/routes`, 'get', () => {
    let result = {}
    result.code = 0
    result.data = [{
        router: 'root',
        children: [
            //系统配置
            {
                router: 'system',
                children: [
                    {
                        router: 'system_auth',
                        children: ['system_auth_admin', 'system_auth_role', 'system_auth_menu']
                    },
                    {
                        router: 'system_monitor',
                        children: ['system_monitor_quartz', 'system_monitor_application']
                    }
                ]
            },

            //二级嵌套
            {
                router: 'form',
                children: ['basicForm']
            },
            //一级嵌套
            {
                router: 'basicForm',
                name: '验权表单',
                icon: 'file-excel',
                authority: 'queryForm'
            }
        ]
    }]
    return result
})
