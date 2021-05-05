//跨域代理前缀
// const API_PROXY_PREFIX='/api'
// const BASE_URL = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_API_BASE_URL : API_PROXY_PREFIX
const BASE_URL = process.env.VUE_APP_API_BASE_URL
module.exports = {
    LOGIN: `${BASE_URL}/login`,
    ROUTES: 'http://127.0.0.1:9995/sys/user/router', //这里获得那个router
    GOODS: `${BASE_URL}/goods`,
    GOODS_COLUMNS: `${BASE_URL}/columns`,
}
