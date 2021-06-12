// import * as CryptoJS from 'crypto-js'

// 表单序列化
export const serialize = data => {
    const list = []
    Object.keys(data).forEach(ele => {
      list.push(`${ele}=${data[ele]}`)
    })
    return list.join('&')
  }
  export const getObjType = obj => {
    var toString = Object.prototype.toString
    var map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    }
    if (obj instanceof Element) {
      return 'element'
    }
    return map[toString.call(obj)]
  }
  /**
 * 对象深拷贝
 */
export const deepClone = data => {
    var type = getObjType(data)
    var obj
    if (type === 'array') {
      obj = []
    } else if (type === 'object') {
      obj = {}
    } else {
      // 不再具有下一层次
      return data
    }
    if (type === 'array') {
      for (var i = 0, len = data.length; i < len; i++) {
        obj.push(deepClone(data[i]))
      }
    } else if (type === 'object') {
      for (var key in data) {
        obj[key] = deepClone(data[key])
      }
    }
    return obj
  }
  /**
 *加密处理
 */
// export const encryption = (params) => {
//     let {
//       data,
//       type,
//       param,
//       key
//     } = params
//     const result = JSON.parse(JSON.stringify(data))
//     if (type === 'Base64') {
//       param.forEach(ele => {
//         result[ele] = btoa(result[ele])
//       })
//     } else {
//       param.forEach(ele => {
//         var data = result[ele]
//         key = CryptoJS.enc.Latin1.parse(key)
//         var iv = key
//         // 加密
//         var encrypted = CryptoJS.AES.encrypt(
//           data,
//           key, {
//             iv: iv,
//             mode: CryptoJS.mode.CBC,
//             padding: CryptoJS.pad.ZeroPadding
//           })
//         result[ele] = encrypted.toString()
//       })
//     }
//     return result
//   }
  /**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
    let random = ''
    random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len || 4)
    if (date) random = random + Date.now()
    return random
  }
  // num为传入的值，n为保留的小数位
export const fomatFloat = (num,n) =>{   
    var f = parseFloat(num);
    if(isNaN(f)){
        return false;
    }   
    f = Math.round(num*Math.pow(10, n))/Math.pow(10, n); // n 幂   
    var s = f.toString();
    var rs = s.indexOf('.');
    //判定如果是整数，增加小数点再补0
    if(rs < 0){
        rs = s.length;
        s += '.'; 
    }
    while(s.length <= rs + n){
        s += '0';
    }
    return s;
} 

export function getQueryString(url, paraName) {
    const arrObj = url.split('?')
    if (arrObj.length > 1) {
      const arrPara = arrObj[1].split('&')
      let arr
      for (let i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split('=')
        // eslint-disable-next-line eqeqeq
        if (arr != null && arr[0] == paraName) {
          return arr[1]
        }
      }
      return ''
    } else {
      return ''
    }
  }