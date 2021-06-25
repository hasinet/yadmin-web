import {request} from '@/utils/request'

const apiPath = {
    table: 'http://127.0.0.1:9995/sys/menu/table',
    list: 'http://127.0.0.1:9995/sys/menu/list',
    saveAndUpdate: 'http://127.0.0.1:9995/sys/menu',
    info: 'http://127.0.0.1:9995/sys/menu/',
    remove: 'http://127.0.0.1:9995/sys/menu',
}


/**
 * 菜单全部列表
 * @returns {*}
 */
export function table() {
    return request(apiPath.table, 'get')
}


/**
 * 不获得4级
 * @returns {*}
 */
export function list() {
    return request(apiPath.list, 'get')
}

/**
 * 获得信息
 * @param id
 * @returns {*}
 */
export function info(id) {
    return request(apiPath.info + id, 'get')
}


/**
 * 新增或者編輯
 * @param params
 * @returns {*}
 */
export function saveAndUpdate(params) {
    let method = params.menuId ? 'put' : 'post'
    return request(apiPath.saveAndUpdate, method, params)
}


/**
 * 删除
 * @param data
 * @returns {*}
 */
export function remove(data) {
    return request(apiPath.remove, 'delete', data)
}
