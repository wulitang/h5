import axios from 'axios'
import store from '@/store'
import router from '@/router/index'
// import { Toast } from 'vant';
import { serialize } from '@/utils/util'
axios.defaults.timeout = 30000
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true
let errRecord = {
    msg:'',// 错误消息
    time:0,// 错误消息提示时间
}
// HTTPrequest拦截
axios.interceptors.request.use(config => {
    const isToken = (config.headers || {}).isToken === false
    const token = store.getters.access_token
    if (token && !isToken) {
        config.headers['Authorization'] = token// token
    }
    // headers中配置serialize为true开启序列化
    if (config.method === 'post' && config.headers.serialize) {
        config.data = serialize(config.data)
        delete config.data.serialize
    }
    return config
}, error => {
    return Promise.reject(error)
})
// HTTPresponse拦截
axios.interceptors.response.use(res => {
    const status = Number(res.data.code) || 200
    const message = res.data.message
    const nowTime = new Date().getTime()
    // 处理2s内重复的消息提示
    if(errRecord.msg == message && (nowTime - errRecord.time)<2000){
        return res
    }

    if(status){
        errRecord = {msg:message,time:nowTime}
    }
    if(status == 400107){
        router.push({path: '/end'})
    }
    if(status == 400100){
        router.push({path: '/404'})
    }
    // if (status !== 200) {
    //     Toast({
    //         Toast: message,
    //         type: 'error'
    //     })
    //     return
    // }
    return res
}, error => {
    return Promise.reject(new Error(error))
})
export default axios