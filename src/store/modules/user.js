import {getStore, setStore} from '@/utils/store'
import {zooLogin} from '@/API/admin'

const user = {
  state: {
    userInfo: {},
    access_token: getStore({
      name: 'access_token'
    }) || '',
  },
  actions: {
    // 根据用户名登录
    zooLogin({commit},data) {
        return new Promise((resolve, reject) => {
            zooLogin(data).then(response => {
            const data = response.data
            commit('SET_ACCESS_TOKEN', data.data.token)
            commit('SET_USER_INFO', data.data)
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        })
      },
  },
  mutations: {
    SET_ACCESS_TOKEN: (state, access_token) => {
        state.access_token = access_token
        setStore({
            name: 'access_token',
            content: state.access_token,
            type: 'session'
        })
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
  }

}
export default user
