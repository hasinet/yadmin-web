import {request} from '@/utils/request'

const apiPath = {
    roleList: 'http://127.0.0.1:9995/sys/role/list',
}

/**
 * 角色全部列表
 * @returns {*}
 */
export function roleList() {
    return request(apiPath.roleList, 'get')
}
