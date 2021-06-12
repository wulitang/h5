import {zooTheme} from '@/API/admin'

const user = {
  state: {
    answerListRequests: [],
  },
  actions: {
    // 根据用户名登录
    zooTheme({commit},data) {
        return new Promise((resolve, reject) => {
            const parmas = {
                id:data.id,
            }
            zooTheme(parmas).then(response => {
            const data = response.data
            console.log(data)
            commit('SET_THEME', data.data.answerListRequests)
            resolve(data)
          }).catch(error => {
            reject(error)
          })
        })
      },
  },
  mutations: {
    SET_THEME: (state, answerListRequests) => {
      state.answerListRequests = answerListRequests
    },
  }

}
export default user
