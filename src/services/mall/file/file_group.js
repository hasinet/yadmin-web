import {request, METHOD} from '@/utils/request'


const apiPath = {
    page: 'http://127.0.0.1:9995/file.group/list',
    saveAndUpdate: 'http://127.0.0.1:9995/file.group',
}


/**
 * 获得列表数据
 * @returns {Promise<*>}
 */
export async function list() {
    return request(apiPath.page, METHOD.POST)
}
