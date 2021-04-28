import {request, METHOD} from '@/utils/request'
import qs from 'qs'

const apiPath = {
    login: 'http://127.0.0.1:9995/oauth/token',
    logout: ''
}

/**
 * 登录服务
 * @param username
 * @param password
 * @returns {Promise<*>}
 */
export async function login1(username, password) {
    const base = makeBaseAuth('admin', '112233')
    let loginForm = {
        username: 'admin',
        password: '111111',
        grant_type: 'password',
        scope: 'all',
    }
    return request(apiPath.login, METHOD.POST, qs.stringify(loginForm), {'Authorization': base})
}


function makeBaseAuth(username, password) {
    let token = username + ':' + password
    let Base64 = require('js-base64').Base64
    const result = Base64.encode(token)
    return 'Basic ' + result
}
