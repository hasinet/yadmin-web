import {request, METHOD} from '@/utils/request'


const apiPath = {
    list: 'http://127.0.0.1:9995/file.group/list',
    saveAndUpdate: 'http://127.0.0.1:9995/file.group',
    info: 'http://127.0.0.1:9995/file.group/',
    remove: 'http://127.0.0.1:9995/file.group/',
}


/**
 * 获得列表数据
 * @returns {Promise<*>}
 */
export async function list() {
    return request(apiPath.list, METHOD.POST)
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
    let method = params.groupId ? 'put' : 'post'
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

