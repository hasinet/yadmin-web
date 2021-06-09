import {request, METHOD} from '@/utils/request'

const apiPath = {
    page: 'http://127.0.0.1:9995/sys/log/page',
}


/**
 * 获得列表数据
 * @param data
 * @return {Promise<*>}
 */
export async function page(data) {
    return request(apiPath.page, METHOD.POST, data)
}
