import {request, METHOD} from '@/utils/request'


const apiPath = {
    page: 'http://127.0.0.1:9995/sys/user/page',
    saveAndUpdate: 'http://127.0.0.1:9995/sys/user',
    info: 'http://127.0.0.1:9995/sys/user/info/',
    remove: 'http://127.0.0.1:9995/sys/user'
}

/**
 * 获得列表数据
 * @returns {Promise<*>}
 */
export async function page(data) {
    return request(apiPath.page, METHOD.POST, data)
}


/**
 * 新增或者編輯
 * @param params
 * @returns {*}
 */
export function saveAndUpdate(params) {
    let method = params.userId ? 'put' : 'post'
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
