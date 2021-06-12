<template>
  <div class="not-found">
      <img src="../assets/img/end.png" alt="">
      <div>“啊哈～～此页面已下架，下次请早哦～”</div>
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