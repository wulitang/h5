import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'amfe-flexible'
Vue.config.productionTip = false
// Vue.prototype.wx= wx
// Vue.prototype.$InitWxShare = async function(info) {
//     wx.ready(() => {
//       wx.checkJsApi({
//         jsApiList: [
//           'checkJsApi',
//           'onMenuShareTimeline',
//           'onMenuShareAppMessage',
//           'onMenuShareQQ',
//           'onMenuShareWeibo',
//           'onMenuShareQZone',
//           'updateAppMessageShareData',
//           'updateTimelineShareData'
//         ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
//         success: (res) => {
//           // 以键值对的形式返回，可用的api值true，不可用为false
//           // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
//           // alert(JSON.stringify(res))
//         }
//       })
  
//       // 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
//       wx.updateAppMessageShareData({
//         ...info,
//         success: () => {
//           // 用户确认分享后执行的回调函数
//           this.$tongji('shareActivity')
//         },
//         cancel: () => {
//           // 用户取消分享后执行的回调函数
//         }
//       })
//       // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
//       wx.updateTimelineShareData({
//         ...info,
//         success: () => {
//           // 用户确认分享后执行的回调函数
//           this.$tongji('shareActivity')
//         },
//         cancel: () => {
//           // 用户取消分享后执行的回调函数
//         }
//       })
//       // 获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
//       wx.onMenuShareWeibo({
//         ...info,
//         success: () => {
//           // 用户确认分享后执行的回调函数
//           this.$tongji('shareActivity')
//         },
//         cancel: () => {
//           // 用户取消分享后执行的回调函数
//         }
//       })
  
//       // 获取“分享到朋友圈”按钮点击状态及自定义分享内容接口（即将废弃）
//       wx.onMenuShareTimeline({
//         ...info,
//         success: () => {
//           // 用户点击了分享后执行的回调函数
//           this.$tongji('shareActivity')
//         }
//         // 在这里调用 API
//       })
  
//       // 获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
//       wx.onMenuShareAppMessage({
//         ...info,
//         success: () => {
//           // 用户确认分享后执行的回调函数
//           this.$tongji('shareActivity')
//         },
//         cancel: () => {
//           // 用户取消分享后执行的回调函数
//         }
//       })
//       // 获取“分享到QQ”按钮点击状态及自定义分享内容接口（即将废弃）
//       wx.onMenuShareQQ({
//         ...info,
//         success: () => {
//           // 用户确认分享后执行的回调函数
//           this.$tongji('shareActivity')
//         },
//         cancel: () => {
//           // 用户取消分享后执行的回调函数
//         }
//       })
//       // 获取“分享到QQ空间”按钮点击状态及自定义分享内容接口（即将废弃）
//       wx.onMenuShareQZone({
//         ...info,
//         success: () => {
//           // 用户确认分享后执行的回调函数
//           this.$tongji('shareActivity')
//         },
//         cancel: () => {
//           // 用户取消分享后执行的回调函数
//         }
//       })
//     })
// }
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
