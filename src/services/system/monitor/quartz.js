import {request} from '@/utils/request'

const apiPath = {
    page: 'http://127.0.0.1:9995/sys/schedule/page',
    saveAndUpdate: 'http://127.0.0.1:9995/sys/schedule',
    info: 'http://127.0.0.1:9995/sys/schedule/info/',
    remove: 'http://127.0.0.1:9995/sys/schedule',

    run: 'http://127.0.0.1:9995/sys/schedule/run',
    pause: 'http://127.0.0.1:9995/sys/schedule/pause',
    resume: 'http://127.0.0.1:9995/sys/schedule/resume',
    logPage: 'http://127.0.0.1:9995/sys/scheduleLog/page',
}


/**
 * 获得列表数据
 * @returns {Promise<*>}
 */
export async function page(data) {
    return request(apiPath.page, 'post', data)
}

/**
 * 新增或者編輯
 * @param params
 * @returns {*}
 */
export function saveAndUpdate(params) {
    let method = params.jobId ? 'put' : 'post'
    return request(apiPath.saveAndUpdate, method, params)
}


/**
 * 立即执行任务
 * @param data
 * @returns {Promise<*>}
 */
export async function runTask(data) {
    return request(apiPath.run, 'post', data)
}

/**
 * 暂停定时任务
 * @param data
 * @returns {Promise<*>}
 */
export async function pause(data) {
    return request(apiPath.pause, 'post', data)
}

/**
 * 恢复定时任务
 * @param data
 * @returns {Promise<*>}
 */
export async function resume(data) {
    return request(apiPath.resume, 'post', data)
}


/**
 * 日志分页
 * @param data
 * @returns {Promise<*>}
 */
export async function logPage(data) {
    return request(apiPath.logPage, 'post', data)
}


/**
 * 删除
 * @param data
 * @returns {*}
 */
export function remove(data) {
    return request(apiPath.remove, 'delete', data)
}


/**
 * 获得信息
 * @param id
 * @returns {*}
 */
export function info(id) {
    return request(apiPath.info + id, 'get')
}

