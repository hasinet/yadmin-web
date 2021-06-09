import {request} from '@/utils/request'

const apiPath = {
    roleList: 'http://127.0.0.1:9995/sys/role/list',
    page: 'http://127.0.0.1:9995/sys/role/page',
    saveAndUpdate: 'http://127.0.0.1:9995/sys/role',
    info: 'http://127.0.0.1:9995/sys/role/',
    remove: 'http://127.0.0.1:9995/sys/role'
}

/**
 * 角色全部列表
 * @returns {*}
 */
export function roleList() {
    return request(apiPath.roleList, 'get')
}


/**
 * 获得列表数据
 * @returns {Promise<*>}
 */
export async function page(data) {
    return request(apiPath.page, 'post', data)
}

/**
 * 新增或者編輯
 * @param params
 * @returns {*}
 */
export function saveAndUpdate(params) {
    let method = params.roleId ? 'put' : 'post'
    return request(apiPath.saveAndUpdate, method, params)
}

/**
 * 获得信息
 * @param id
 * @returns {*}
 */
export function getUserById(id) {
    return request(apiPath.info + id, 'get')
}


/**
 * 删除
 * @param data
 * @returns {*}
 */
export function remove(data) {
    return request(apiPath.remove, 'delete', data)
}
