<template>
  <div class="zoo-survey">
    <div v-if="isFirst === null || isFirst === 0">
      <div class="quession-name" v-if="question.length > 0">
          <div>
            <span class="span-bg" v-if="question[chooseQuestion].optionState == 1">单选题</span>
            <span class="span-bg" v-else>多选题</span>
            {{ question[chooseQuestion].answerTopic }}
          </div>
      </div>
      <ul class="question-list" v-if="question[chooseQuestion]">
        <li
          :class="{
            'question-item': true,
            right: item.choose,
            'is-choose': item.choose,
            'wrong-choose': isNext && item.choose && !item.isRight == 1,
            'true-choose': isNext && item.isRight == 1,
          }"
          v-for="(item, index) in question[chooseQuestion].options"
          @click="chooseAnswer(item, index)"
          :key="index"
        >
          <span>{{ String.fromCharCode(64 + parseInt(index + 1)) }}</span>
          {{ item.option }}
        </li>
      </ul>
      <div class="footer" v-if="question.length > 0">
        <div class="answer-state" :data-stage="answerState">
          <img v-if="answerState === true" src="../assets/img/right.png" />
          <i v-if="answerState === true">答对啦！</i>
          <img v-if="answerState === false" src="../assets/img/wrong.png" />
          <i v-if="answerState === false">很遗憾！</i>
        </div>
        <template v-if="!answerEnd">
          <span @click="YesOrNo" v-if="!isNext">提交</span>
          <span v-else @click="nextQuestion">下一题</span>
        </template>
        <template v-else>
          <div class="sueccess-jump">
            <transition name="van-slide-right">
              <img
                class="van-slide-right scale-up-center"
                src="../assets/img/success.png"
              />
            </transition>
            <span
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
              v-if="canSubmit"
              @click="submitAnswer"
              >去领券 <i></i>
            </span>
            <span
              style="
                display: flex;
                justify-content: center;
                align-items: center;
              "
              v-else
              >去领券 <i></i>
            </span>
          </div>
        </template>
      </div>
    </div>
    <div class="success" v-if="isFirst === 1">
      <img src="../assets/img/wechat.jpg" style="width: 100%" />
    </div>
  </div>
</template>

<script>
import { zooTheme, zooWeixinTicket,zooAnswered } from "@/API/admin";
// import { transition } from "vant";
import { Toast } from "vant";
export default {
  name: "Survey", // 组件名称
  components: {
    //   [transition.name]: transition,
  }, // 引入组件在此重定义
  data() {
    return {
      height: null,
      question: [],
      answeredQuestion: null,
      chooseQuestion: 0,
      answerListRequests: null,
      isNext: false,
      answerState: null,
      isFirst: null,
      answerEnd: false,
      canSubmit:true,
    };
  },
  methods: {
    initQuestion() {
      if (this.answerListRequests.length > 0) {
        this.question.push(this.answerListRequests[this.chooseQuestion]);
        this.question[this.chooseQuestion].options.map((item) => {
          item.choose = false;
        });
      }
    },
    // 选择答案
    chooseAnswer(items, indexs) {
      if (this.isNext) {
        return;
      }
      if (this.question[this.chooseQuestion].optionState == 1) {
        this.question[this.chooseQuestion].options.map((item, index) => {
          if (index == indexs) {
            item.choose = true;
          } else {
            item.choose = false;
          }
        });
      } else {
        this.question[this.chooseQuestion].options.map((item, index) => {
          if (index == indexs) {
            item.choose = !item.choose;
          }
        });
        // this.question[this.chooseQuestion].options[indexs].choose = true;
      }
      this.$forceUpdate();
    },
    // 提交
    YesOrNo() {
      this.question[this.chooseQuestion].options.map((item) => {
        if (item.choose == true) {
          this.canNext = true;
        }
      });
      if (!this.canNext) {
        Toast("请选择答案");
        return;
      }
      if (this.question[this.chooseQuestion].optionState == 1) {
        let answerState = false;
        this.question[this.chooseQuestion].options.map((item) => {
          if (item.choose == true && item.isRight == 1) {
            answerState = true;
          }
        });
        this.answerState = answerState;
        this.isNext = true;
      } else {
        let answerState = false;
        let rightArray = [];
        let trueArray = [];
        this.question[this.chooseQuestion].options.map((item) => {
          if (item.isRight == 1) {
            trueArray.push(item.no);
          }
          if (item.choose == true) {
            rightArray.push(item.no);
          }
        });
        if (trueArray.join("") == rightArray.join("")) {
          answerState = true;
        }
        console.log(trueArray.join(""), rightArray.join(""));
        this.answerState = answerState;
        this.isNext = true;
      }
      if (this.chooseQuestion == this.answerListRequests.length - 1) {
        this.answerEnd = true;
      }
      this.canNext = false;
    },
    nextQuestion() {
      this.isNext = false;
      this.answerState = null;
      console.log(this.chooseQuestion, this.answerListRequests.length);
      this.chooseQuestion = this.chooseQuestion + 1;
      this.initQuestion();
    },
    async submitAnswer() {
      this.canSubmit = false
      const { data } = await zooAnswered({ themeId: this.$route.query.id });
      this.canSubmit = true
      console.log(data)
      if (data.code == 200) {
        this.isFirst = data.data.isFirst;
        console.log(this.isFirst)
        if(this.isFirst == 0){
            Toast("您已领取过哦～");
        }
      }
    },
    // 登录
    async login() {
      if (this.$route.query.token) {
        const token = this.$route.query.token;
        this.$store.commit("SET_ACCESS_TOKEN", decodeURI(token));
        this.$router.push({path:'/survey',query:{id:this.$route.query.id}})
      } else {
        location.href =
          location.origin +
          "/zctapi/zoo/theme/login?id=" +
          this.$route.query.id;
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
            imgUrl: 'https://cdn.zoolife.cn/zctapi/theme/1612279963428.png', // 分享图标
            desc: '人与自然，和谐共生', // 分享描述
            // desc: that.themeDetail.themeName, // 分享描述
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
    // 获取主题信息
    async featchThemeDetail() {
      const { data } = await zooTheme({ id: this.$route.query.id });
      if (data.code == 200) {
        this.answerListRequests = data.data.answerListRequests;
        this.initQuestion();
      }
    },
  },
  computed: {},
  created() {},
  mounted() {
    this.featchThemeDetail()
    this.featchWeiConfig()
  },
};
</script>

<style lang="less" scoped>
.zoo-survey {
  .quession-name {
    height: 3.44rem;
    background-color: #0f206c;
    font-size: 0.43rem;
    color: #fff;
    padding: 0.4rem;
    // display: flex;
    // justify-content: left;
    // align-items: center;
    background-image: url("../assets/img/bg.png");
    background-position: right bottom;
    background-size: 4rem;
    background-repeat: no-repeat;
    .span-bg{
      background-color: #f6e948;
      color: #0f206c;
      font-size: 0.29rem;
      padding: 0.06rem 0.2rem;
      border-radius: 2px;
      margin-right: 0.04rem;
      min-width: 1rem;
      text-align: center;
    }
    div{
        margin-top: 1rem;
    }

  }
  .scale-up-center {
    -webkit-animation: heartbeat 1.5s ease-in-out infinite both;
    animation: heartbeat 1.5s ease-in-out infinite both;
  }
  @-webkit-keyframes heartbeat {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: center center;
      transform-origin: center center;
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    10% {
      -webkit-transform: scale(0.91);
      transform: scale(0.91);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    17% {
      -webkit-transform: scale(0.98);
      transform: scale(0.98);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    33% {
      -webkit-transform: scale(0.87);
      transform: scale(0.87);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    45% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }
  @keyframes heartbeat {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: center center;
      transform-origin: center center;
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    10% {
      -webkit-transform: scale(0.91);
      transform: scale(0.91);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    17% {
      -webkit-transform: scale(0.98);
      transform: scale(0.98);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    33% {
      -webkit-transform: scale(0.87);
      transform: scale(0.87);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    45% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }

  .footer {
    position: fixed;
    height: 1.87rem;
    background-color: #fff;
    bottom: 0;
    width: 100%;
    z-index: 2;
    span {
      background-color: #0f206c;
      height: 1.01rem;
      line-height: 1.01rem;
      text-align: center;
      width: 2.93rem;
      border-radius: 0.48rem;
      color: #fff;
      display: block;
      float: right;
      font-size: 0.4rem;
      margin-top: 0.43rem;
      margin-right: 0.51rem;
    }
    .answer-state {
      display: inline-block;
      margin-left: 0.4rem;
      position: relative;
      img {
        display: block;
        width: 1rem;
      }
      i {
        position: absolute;
        top: -0.4rem;
        width: 2.5rem;
        display: block;
        left: 1rem;
        font-size: 16px;
        font-style: normal;
        background-image: url("../assets/img/tips.png");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% auto;
        text-align: center;
        height: 0.8rem;
        line-height: 0.8rem;
      }
    }
  }
  .question-list {
    margin: 0.51rem;
    li {
      padding: 0.48rem 0.55rem 0.48rem 0.48rem;
      background-color: #fff;
      color: #54565a;
      font-size: 0.37rem;
      margin-bottom: 0.53rem;
      border-radius: 0.19rem;
      box-shadow: 0rem 0.05rem 0.21rem 0rem rgba(0, 0, 0, 0.05);
      display: flex;
      justify-content: left;
      align-items: center;
      span {
        margin-right: 0.4rem;
      }
    }
    .right {
      background-color: rgb(15 32 108 / 0.1);
      //   background-image: url("../assets/img/yes.png");
      //   background-repeat: no-repeat;
      //   background-position: 97% center;
      //   background-size: 0.48rem;
    }
    .is-choose {
      background-color: rgb(15 32 108 / 0.1);
    }
    .true-choose {
      background-image: url("../assets/img/yes.png");
      background-repeat: no-repeat;
      background-position: 97% center;
      background-size: 0.48rem;
    }
    .wrong-choose {
      //   background-color: rgb(15 32 108 / 0.1);
      background-image: url("../assets/img/no.png");
      background-repeat: no-repeat;
      background-position: 97% center;
      background-size: 0.48rem;
    }
  }
  .sueccess-jump {
    display: block;
    float: right;
    margin: 0;
    position: relative;
    img {
      width: 4.6rem;
      position: absolute;
      top: -2rem;
      right: 0.37rem;
    }
    i {
      display: inline-block;
      width: 0.2rem;
      height: 0.5rem;
      background-image: url("../assets/img/jump.png");
      background-repeat: no-repeat;
      background-size: 0.16rem auto;
      background-position: center center;
      margin-left: 0.08rem;
    }
  }
}
</style>