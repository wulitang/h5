/* eslint-disable no-cond-assign */
import { validatenull } from './validate'
// import website from '@/const/website'

// const keyName = 'dxl' + '-'
/**
 * 存储localStorage
 */
//写cookies
function setCookie(name, value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//读取cookies
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg))

        return unescape(arr[2]);
    else
        return null;
}

//删除cookies
function delCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}

export const setStore = (params = {}) => {
    let {
        name,
        content,
        type
    } = params
    //   name = keyName + name
    const obj = {
        dataType: typeof (content),
        content: content,
        type: type,
        datetime: new Date().getTime()
    }
    //   if (type) window.sessionStorage.setItem(name, JSON.stringify(obj))
    // else window.localStorage.setItem(name, JSON.stringify(obj))
    if (type) setCookie(name, JSON.stringify(obj))
    else setCookie(name, JSON.stringify(obj))
}
/**
 * 获取localStorage
 */

export const getStore = (params = {}) => {
    let {
        name,
        debug
    } = params
    //   name = keyName + name
    let obj = {}
    let content
    //   obj = window.sessionStorage.getItem(name)
    obj = getCookie(name)
    //   if (validatenull(obj)) obj = window.localStorage.getItem(name)
    if (validatenull(obj)) obj = getCookie(name)
    if (validatenull(obj)) return
    try {
        obj = JSON.parse(obj)
    } catch (e) {
        return obj
    }
    if (debug) {
        return obj
    }
    if (obj.dataType === 'string') {
        content = obj.content
    } else if (obj.dataType === 'number') {
        content = Number(obj.content)
    } else if (obj.dataType === 'boolean') {
        content = eval(obj.content)
    } else if (obj.dataType === 'object') {
        content = obj.content
    }
    return content
}
/**
 * 删除localStorage
 */
export const removeStore = (params = {}) => {
    let {
        name,
        type
    } = params
    //   name = keyName + name
    if (type) {
        delCookie(name)
        // window.sessionStorage.removeItem(name)
    } else {
        delCookie(name)
        // window.localStorage.removeItem(name)
    }
}

/**
 * 获取全部localStorage
 */
export const getAllStore = (params = {}) => {
    const list = []
    const {
        type
    } = params
    if (type) {
        for (let i = 0; i <= window.sessionStorage.length; i++) {
            list.push({
                name: window.sessionStorage.key(i),
                content: getStore({
                    name: window.sessionStorage.key(i),
                    type: 'session'
                })
            })
        }
    } else {
        for (let i = 0; i <= window.localStorage.length; i++) {
            list.push({
                name: window.localStorage.key(i),
                content: getStore({
                    name: window.localStorage.key(i)
                })
            })
        }
    }
    return list
}

/**
 * 清空全部localStorage
 */
export const clearStore = (params = {}) => {
    const { type } = params
    if (type) {
        window.sessionStorage.clear()
    } else {
        window.localStorage.clear()
    }
}
