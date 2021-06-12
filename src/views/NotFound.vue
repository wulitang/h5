<template>
  <div class="not-found">
      <img src="../assets/img/not_found.png" alt="">
      <div>“糟糕，你的页面被妖怪抓走了，刷新试下吧”</div>
  </div>
</template>

<script>
export default {
    name:'Login', // 组件名称
    components:{
        
    },// 引入组件在此重定义
    data(){
        return{
           
        }
    },
    methods:{

    },
    created(){

    },
    mounted(){

    }
}
</script>

<style lang="less" scoped>
    .not-found{
        margin-top: 3.25rem;
        img{
            display: block;
            width: 4rem;
            margin: auto;
        }
        div{
            text-align: center;
            font-size: 0.35rem;
            color: #999;
            font-weight: 400;
        }
    }
</style>