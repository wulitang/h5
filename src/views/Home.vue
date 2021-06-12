<template>
  <div class="index">
      qqqqq
  </div>
</template>

<script>
import { icon, Toast, Col, Row, Popup, Field, Button, Overlay } from "vant";
import {
  zooUserEnjoy,
  zooThemeEnjoy,
  zooThemeMessage,
  zooAddMessage,
  zooMessageEnjoy,
  zooTheme,
  zooWeixinTicket,
} from "@/API/admin";
import shareLogo from "@/assets/img/sharelogo.png";
import html2canvas from "html2canvas";
export default {
  name: "Index",
  components: {
    [icon.name]: icon,
    [Col.name]: Col,
    [Row.name]: Row,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Button.name]: Button,
    [Overlay.name]: Overlay,
  },
  data() {
    return {
      shareLogo: shareLogo,
      isLike: false,
      isEnd: true,
      show: false,
      content: null,
      themeDetail: null,
      messagePhotoList: null,
      messageList: [],
      total: null,
      pageNo: 1,
      showShare: false,
      imgUrl: null,
    };
  },
  filters: {
    timestampToTime: function (timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      //   var h =
      //     (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      //   var m =
      //     (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      //     ":";
      //   var s =
      //     date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

      const strDate = Y + M + D;
      return strDate;
    },
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    closePopup() {
      this.show = false;
    },
    // 留言
    async zooLeaveMessage() {
      const parmes = {
        themeId: this.$route.query.id,
        content: this.content,
      };
      const { data } = await zooAddMessage(parmes);
      if (data.code == 200) {
        Toast("您的留言已提交，经审核后所有人可见");
        this.show = false;
        this.content = null;
      }
    },
    // 留言点赞
    async zooMessageEnjoy(item, enjoyType) {
      const parmes = {
        enjoy:
          enjoyType == "MESSAGE" ? !item.messageIsEnjoy : !item.replyIsEnjoy,
        enjoyType: enjoyType,
        messageId: item.id,
      };
      const { data } = await zooMessageEnjoy(parmes);
      if (data.code == 200) {
        if (parmes.enjoy) {
          this.messageList.map((items) => {
            if (item.id == items.id) {
              if (enjoyType == "MESSAGE") {
                item.messageIsEnjoy = parmes.enjoy;
                item.messageEnjoyAmount = Number(item.messageEnjoyAmount) + 1;
              }
              if (enjoyType == "REPLY") {
                item.replyIsEnjoy = parmes.enjoy;
                item.replyEnjoyAmount = Number(item.replyEnjoyAmount) + 1;
              }
            }
          });
          console.log("点赞成功");
        } else {
          this.messageList.map((items) => {
            if (item.id == items.id) {
              if (enjoyType == "MESSAGE") {
                item.messageIsEnjoy = parmes.enjoy;
                item.messageEnjoyAmount = Number(item.messageEnjoyAmount) - 1;
              }
              if (enjoyType == "REPLY") {
                item.replyIsEnjoy = parmes.enjoy;
                item.replyEnjoyAmount = Number(item.replyEnjoyAmount) - 1;
              }
            }
          });
          console.log("取消点赞");
          Toast("取消点赞");
        }
        console.log();
      }
    },
    showtoImage() {
      this.showShare = true;
    },
    toImage() {
      this.showShare = true;
      //   let that = this;
      if (this.imgUrl != null) {
        return;
      }
    //   document.documentElement.scrollTop = 0;
      this.$nextTick(() => {
        setTimeout(() => {
          console.log("开始生成图片");
          // 使用$nextTick，解决数据还没有渲染到html就先转为图片，此时的图片会是空内容的问题
          const canvas = document.createElement("canvas"); // 创建一个canvas节点
          const shareContent = document.getElementById("downloadCardDiv"); // 需要截图的包裹的（原生的）DOM 对象
          const width = shareContent.offsetWidth; // 获取dom 宽度
          const height = shareContent.offsetHeight; // 获取dom 高度
          const scale = 2; // 定义任意放大倍数 支持小数
          canvas.getContext("2d").scale(scale, scale); // 获取context,设置scale
          const rect = shareContent.getBoundingClientRect(); // 获取元素相对于视口的
          const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop; // 获取滚动轴滚动的长度
            console.log(scrollTop)
          html2canvas(document.getElementById("downloadCardDiv"), {
            // 转换为图片
            x: rect.left, // 绘制的dom元素相对于视口的位置
            y: rect.top,
            scrollX: 0,// 滚动的长度
            scrollY: 0,
            scale: scale, // 添加的scale 参数
            width: width, // dom 原始宽度
            height: height,
            useCORS: true, // 开启跨域
            dpi: window.devicePixelRatio * 2,
            backgroundColor: "transparent",
          }).then((canvas) => {
            const context = canvas.getContext("2d");
            // 关闭抗锯齿
            context.mozImageSmoothingEnabled = false;
            context.msImageSmoothingEnabled = false;
            context.imageSmoothingEnabled = false;
            const imgUrl = canvas.toDataURL("image/png");
            this.imgUrl = imgUrl;
            console.log("生成图片结束");
            // console.log('下载图片')
            //   var a = document.createElement('a')
            //   a.download = this.downloadCardObj.name
            //   // 设置图片地址
            //   a.href = this.dataURL;
            //   a.click();
          });
        }, 100);
      });
    },
    // 获取头像
    async getZooUserEnjoy() {
      const parmes = {
        id: this.$route.query.id,
        pageNo: 1,
        pageSize: 20,
      };
      const { data } = await zooUserEnjoy(parmes);
      if (data.code == 200) {
        this.messagePhotoList = data.data;
      }
    },
    // 获取主题留言列表
    async zooThemeMessage() {
      const parmes = {
        id: this.$route.query.id,
        pageNo: this.pageNo,
        pageSize: 5,
      };
      const { data } = await zooThemeMessage(parmes);
      if (data.code == 200) {
        this.messageList = this.messageList.concat(data.data);
        this.total = data.total;
      }
    },
    featchMore() {
      this.pageNo = this.pageNo + 1;
      this.zooThemeMessage();
    },
    // 登录
    async login() {
    //   if (this.$route.query.token) {
    //     // 注释触发强制推送
    //     const token = this.$route.query.token;
    //     this.$store.commit("SET_ACCESS_TOKEN", decodeURI(token));
    //     this.featchThemeDetail();
    //     this.getZooUserEnjoy();
    //     this.zooThemeMessage();
    //     this.$router.push({
    //       path: "/theme",
    //       query: { id: this.$route.query.id },
    //     });
    //   } else {
    //     location.href =
    //       location.origin +
    //       "/zctapi/zoo/theme/login?id=" +
    //       this.$route.query.id;
    //   }
    },
    // 获取主题信息
    async featchThemeDetail() {
      const { data } = await zooTheme({ id: this.$route.query.id });
      if (data.code == 200) {
        this.themeDetail = data.data;
        this.isLike = data.data.enjoy;
      }
    },
    async featchWeiConfig() {
      const parmes = {
        url: location.href.split("#")[0],
      };
      const { data } = await zooWeixinTicket(parmes);
      if (data.code == 200) {
        window.wx.config({
          debug: false,
          appId: data.data.appid, // 必填，公众号的唯一标识
          timestamp: data.data.timestamp, // 必填，生成签名的时间戳
          nonceStr: data.data.noncestr, // 必填，生成签名的随机串
          signature: data.data.signature, // 必填，签名，见附录1
          jsApiList: [
            "checkJsApi",
            "onMenuShareAppMessage",
            "onMenuShareTimeline",
            "updateAppMessageShareData",
            "updateTimelineShareData",
          ],
        });
        const that = this;
        window.wx.ready(function () {
          const info = {
            title: that.themeDetail.themeName, // 分享标题
            link: `${location.origin}/zct/#/theme?id=${that.$route.query.id}`, // 分享链接
            imgUrl: "https://cdn.zoolife.cn/zctapi/theme/1612279963428.png", // 分享图标
            desc: "人与自然，和谐共生", // 分享描述
          };
          window.wx.checkJsApi({
            jsApiList: [
              "checkJsApi",
              "onMenuShareTimeline",
              "onMenuShareAppMessage",
              "onMenuShareQQ",
              "onMenuShareWeibo",
              "onMenuShareQZone",
              "updateAppMessageShareData",
              "updateTimelineShareData",
            ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: () => {
              // 以键值对的形式返回，可用的api值true，不可用为false
              // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
              //   alert(JSON.stringify(res))
            },
          });
          window.wx.onMenuShareAppMessage({
            ...info,
            success() {
              console.log("shareToFriend success");
            },
          });
          //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
          window.wx.updateAppMessageShareData({
            ...info,
            success: () => {},
            cancel: () => {
              // 用户取消分享后执行的回调函数
            },
          });
          // 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
          window.wx.updateTimelineShareData({
            ...info,
            success: () => {
              // 用户确认分享后执行的回调函数
            },
            cancel: () => {
              // 用户取消分享后执行的回调函数
            },
          });
        });
      }
    },
    // 给主题点赞
    async zooThemeEnjoy() {
      const parmes = {
        id: this.$route.query.id,
        enjoy: !this.isLike,
      };
      const { data } = await zooThemeEnjoy(parmes);
      if (data.code == 200) {
        if (this.isLike == true) {
          this.themeDetail.themeEnjoy = this.themeDetail.themeEnjoy - 1;
          Toast("取消成功");
        } else {
          this.themeDetail.themeEnjoy = this.themeDetail.themeEnjoy + 1;
          Toast("点赞成功");
        }
        this.isLike = !this.isLike;
        this.getZooUserEnjoy();
      } else {
        Toast("提交失败");
      }
    },
  },
  created() {
    this.login();
    this.featchWeiConfig();
    // this.shareLogo = this.$$refs.share_logo
  },
  mounted() {
    
  },
};
</script>
<style lang="less" scoped>
.share-img-pop-fix {
  position: fixed;
  top: 0;
  left: 0;
  margin: 0 !important;
}
.share-popup {
  background-color: rgb(39 36 36 / 69%);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 222;
  .close-button {
    // position: absolute;
    // top: 0;
    // right: 0.4rem;
    // padding-top: 2.1rem;
    text-align: right;
    color: #fff;
    margin: 0 auto;
    z-index: 3333;
    font-size: 0.5rem;
    display: block;
    width: 9rem;
  }
  .share-min {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-direction: column;
    .share-button-pop {
      position: relative;
      padding-top: 0.53rem;
      width: 100%;
      height: 4rem;
      background-color: #fff;
      border-radius: 0.43rem 0.43rem 0rem 0rem;
      div {
        color: #666666;
        font-size: 0.37rem;
        text-align: center;
        position: relative;
        span {
          color: #666666;
        }
      }
      img {
        width: 1.39rem;
        display: block;
        margin: 0.53rem auto 0.16rem auto;
      }
      .chance-popup {
        position: absolute;
        bottom: 0;
        border-top: 1px solid #eeeeee;
        width: 100%;
        height: 1rem;
        line-height: 1rem;
      }
    }
  }
  .share-title {
    font-size: 0.37rem;
    color: #fff;
    text-align: center;
    font-weight: 400;
    // position: absolute;
    // bottom: 1.5rem;
    width: 100%;
    margin-top: 0.5rem;
  }
}
.share-img-pop {
  width: 8rem;
  //   margin: 0 auto 0.4rem auto;
  background-color: #fff;
  padding: 0.2rem;
  //   height: 10rem;
  .zoo-logo {
    background-image: url("../assets/img/play.jpg");
    background-repeat: no-repeat;
    background-position: center center;
    height: 3rem;
    background-size: 100% auto;
  }
  img {
    width: 100%;
    border-radius: 0.1rem;
    margin-bottom: 0.5rem;
  }
  .share-img-title {
    color: #333;
    font-size: 0.51rem;
    font-weight: 600px;
  }
  .share-img-desc {
    display: flex;
    align-items: center;
    justify-content: space-between;
    li {
      display: inline-block;
      .zoo-logo-share {
        width: 1.17rem;
        height: 1.17rem;
        border-radius: 50%;
        display: block;
        margin: 0;
      }
      .zoo-logo-title {
        font-size: 0.37rem;
        font-weight: 600;
        color: #333333;
      }
      .zoo-logo-desc {
        font-size: 0.32rem;
        font-weight: 400;
        color: #999999;
      }
    }
    .zoo-logo-qd {
      img {
        width: 2.08rem;
        // height: 2.08rem;
        margin: 0;
      }
    }
  }
}
.index {
  background-color: #ffffff;
  .index-article {
    margin-bottom: 0.32rem;
    img {
      width: 100%;
      display: block;
      border: 0;
      margin: 0;
      padding: 0;
    }
  }
  .index-share {
    padding: 0 0.43rem;
    .share-time,
    .share-num,
    .share-button {
      font-size: 0.32rem;
      font-weight: 400;
      //   color: #999999;
      //   height: 0.45rem;
    }
    .share-time {
      margin-bottom: 0.13rem;
    }
    .share-desc {
      height: 0.53rem;
    }
    .share-button {
      float: right;
      color: #333333;
      height: 0.65rem;
      line-height: 0.65rem;
      .button-share {
        margin-right: 0.5rem;
        i {
          display: block;
          width: 0.6rem;
          height: 0.6rem;
          background-image: url("../assets/img/share.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          float: left;
          margin-right: 0.13rem;
        }
      }
      span {
        float: left;
        // line-height: 0.54rem;
      }
      .van-icon {
        float: left;
        margin-right: 0.13rem;
      }
    }
    .share-num {
      float: left;
    }
  }
  .share-image {
    margin: 0.32rem 0.43rem;
    ul {
      width: 100%;
      //   height: 1rem;
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 0.4rem 0;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      li {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        overflow: hidden;
        display: inline-block;
        margin-right: 0.13rem;
        img {
          width: 100%;
          height: 100%;
          display: block;
        }
      }
    }
    .share-list-no {
      border-bottom: 0;
      padding: 0;
    }
  }
  .leave-message {
    margin: 0.32rem;
    .message-min {
      h1 {
        font-weight: 600;
        color: #333333;
        font-size: 0.4rem;
        span {
          float: right;
          font-size: 0.37rem;
          font-weight: 400;
        }
      }
    }
    .user-name {
      color: #000;
      font-size: 0.35rem;
      font-weight: 600;
      margin-bottom: 0.13rem;
    }
    .user-message {
      color: #333;
      font-size: 0.37rem;
      font-weight: 400;
      span {
        font-size: 0.31rem;
        font-weight: 400;
        color: #c4c5c8;
      }
    }
    .user-image {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      float: left;
    }
    .love-num {
      font-size: 0.31rem;
      font-weight: 400;
      color: #666;
      display: block;
      margin-top: -0.1rem;
    }
    .love-click {
      text-align: center;
    }
    .zoo-message {
      margin: 0.4rem 0;
      margin: 0.3rem 0;
      padding-bottom: 0.3rem;
      border-bottom: 1px solid #eee;
      .user-image {
        opacity: 0;
      }
      .zoo-image {
        width: 0.84rem;
        height: 0.84rem;
        border-radius: 50%;
        float: left;
      }
    }
    .zoo-message-no {
      padding-bottom: 0;
    }
    .message-line {
      height: 0.01rem;
      background-color: #f1f1f1;
      margin-top: 0.4rem;
    }
  }
  .no-message {
    margin: 1rem 0;
    img {
      display: block;
      width: 4rem;
      margin: auto;
    }
    div {
      text-align: center;
      font-size: 0.35rem;
      color: #999;
      font-weight: 400;
    }
  }
  .click-more {
    text-align: center;
    span {
      color: #999;
      font-size: 0.37rem;
      line-height: 0.43rem;
      padding: 0.2rem 0;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        display: inline-block;
        width: 0.43rem;
        height: 0.43rem;
        background-image: url("../assets/img/down.png");
        background-size: 100%;
        background-position: center center;
      }
    }
  }
  .zoo-survey {
    background-color: rgb(0 0 0 / 5%);
    a {
      padding: 0.43rem;
      display: block;
      img {
        width: 100%;
      }
    }
  }
  .message-popup {
    height: 1rem;
    line-height: 1rem;
    padding-top: 0.6rem;
    .sub-message {
      text-align: left;
      margin: 0 0.43rem;
    }
    i {
      float: left;
    }
    textarea,
    .van-field__word-limit {
      font-size: 0.4rem;
      color: #333;
    }
    .van-button--small {
      float: right;
    }
  }
}
</style>
