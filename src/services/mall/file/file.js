import {request, METHOD} from '@/utils/request'


const apiPath = {
    page: 'http://127.0.0.1:9995/file/page',
    saveAndUpdate: 'http://127.0.0.1:9995/file',
}


/**
 * 获得列表数据
 * @returns {Promise<*>}
 */
export async function page(data) {
    return request(apiPath.page, METHOD.POST, data)
}
