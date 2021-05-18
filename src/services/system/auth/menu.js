import {request} from '@/utils/request'

const apiPath = {
    table: 'http://127.0.0.1:9995/sys/menu/table',
    list: 'http://127.0.0.1:9995/sys/menu/list',
}


/**
 * 菜单全部列表
 * @returns {*}
 */
export function table() {
    return request(apiPath.table, 'get')
}


export function list() {
    return request(apiPath.list, 'get')
}


