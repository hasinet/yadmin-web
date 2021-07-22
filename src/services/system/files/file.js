import {request, METHOD} from '@/utils/request'


const apiPath = {
    info: 'http://127.0.0.1:9995/file/',
    page: 'http://127.0.0.1:9995/file/page',
    upload: 'http://127.0.0.1:9995/file/upload',
    moveGroup: 'http://127.0.0.1:9995/file/move',
    remove: 'http://127.0.0.1:9995/file',
    update: 'http://127.0.0.1:9995/file'
}


/**
 * 获得列表数据
 * @returns {Promise<*>}
 */
export async function page(data) {
    return request(apiPath.page, METHOD.POST, data)
}


/**
 * 文件上传
 * @param file
 * @return {Promise<*>}
 */
export async function upload(file) {

    let config = {headers: {'Content-Type': 'multipart/form-data'}}
    return request(apiPath.upload, METHOD.POST, file, config)
}

/**
 * 移动图片分组
 * @param params
 */
export function moveGroup(params) {
    return request(apiPath.moveGroup, METHOD.POST, params)
}

/**
 * 删除图片
 * @param data
 * @returns {*}
 */
export function remove(data) {
    return request(apiPath.remove, 'delete', data)
}


/**
 * 編輯
 * @param params
 * @returns {*}
 */
export function update(params) {
    return request(apiPath.update, 'put', params)
}


/**
 * 获得信息
 * @param id
 * @returns {*}
 */
export function info(id) {
    return request(apiPath.info + id, 'get')
}

