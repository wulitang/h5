import request from '@/utils/request'
// 获主题详情
export function zooTheme(query) {
    return request({
        url: '/zctapi/zoo/theme',
        method: 'get',
        params: query
    })
}

// 登录
export function zooLogin(query) {
    return request({
        url: '/zctapi/zoo/theme/login',
        method: 'get',
        params: query
    })
}

// 获主题留言头像
export function zooUserEnjoy(query) {
    return request({
        url: '/zctapi/zoo/theme/user/enjoy',
        method: 'get',
        params: query
    })
}

// 获主题留言点赞
export function zooThemeEnjoy(query) {
    return request({
        url: '/zctapi/zoo/theme/enjoy',
        method: 'get',
        params: query
    })
}

// 获主题留言点赞
export function zooThemeMessage(query) {
    return request({
        url: '/zctapi/zoo/theme/message',
        method: 'get',
        params: query
    })
}


// 主题留言
export function zooAddMessage(query) {
    return request({
        url: '/zctapi/zoo/theme/message',
        method: 'post',
        data: query
    })
}

// 获主题留言点赞
export function zooMessageEnjoy(query) {
    return request({
        url: '/zctapi/zoo/theme/message/enjoy',
        method: 'get',
        params: query
    })
}


// 获主题留言点赞
export function zooAnswered(query) {
    return request({
        url: '/zctapi/zoo/theme/answered',
        method: 'get',
        params: query
    })
}


export function zooWeixinTicket(query) {
    return request({
        url: '/v1/sys/weixin/jsapiticket',
        method: 'post',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        data: query
    })
}