import {request, METHOD,setAuthorization} from '@/utils/request'
import qs from 'qs'
import Cookie from 'js-cookie'

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
    //清除一下cookie，不然会把Authorization带过去，导致接口返回错误
    Cookie.remove("Authorization")
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
