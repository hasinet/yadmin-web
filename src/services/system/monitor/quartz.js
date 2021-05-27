import {request} from '@/utils/request'

const apiPath = {
    page: 'http://127.0.0.1:9995/sys/schedule/page',
    saveAndUpdate: 'http://127.0.0.1:9995/sys/schedule',
    info: 'http://127.0.0.1:9995/sys/schedule/info/',
    remove: 'http://127.0.0.1:9995/sys/schedule'
}


/**
 * 获得列表数据
 * @returns {Promise<*>}
 */
export async function page(data) {
    return request(apiPath.page, 'post', data)
}
