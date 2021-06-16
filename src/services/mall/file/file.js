import {request, METHOD} from '@/utils/request'


const apiPath = {
    page: 'http://127.0.0.1:9995/file/page',
    upload: 'http://127.0.0.1:9995/file/upload',
    saveAndUpdate: 'http://127.0.0.1:9995/file',
}


/**
 * 获得列表数据
 * @returns {Promise<*>}
 */
export async function page(data) {
    return request(apiPath.page, METHOD.POST, data)
}


export async function upload(file) {

    let config = {headers: {'Content-Type': 'multipart/form-data'}}
    return request(apiPath.upload, METHOD.POST, file, config)
}
