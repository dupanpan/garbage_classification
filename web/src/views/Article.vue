<template>
  <div class="page-article" v-if="model">
      <div class="d-flex py-3 px-2 border-bottom">
          <div class="iconfont icon-back pr-1 text-blue" ></div>
          <strong class="flex-1 text-blue">{{model.title}}</strong>
          <div class="fs-xs text-gray">2020-1-14</div>
      </div>
      <div v-html="model.body" class="px-3 body fs-lg"></div>
      <div class="px-3 border-top py-3" >
          <div class="d-flex ai-center  pb-3">
              <i class="iconfont icon-tuwen text-blue"></i>
              <strong class="text-blue fs-lg ml-2">相关资讯</strong>
          </div>
          <div>
              <!-- 在html 的 attribute 里面不能使用{{ masthat}} 只能用 v-bind绑定 -->
              <router-link class="py-2"  tag="div"  v-for="item in model.related" :key="item._id" :to="`/articles/${item._id}`" >{{item.title}}</router-link>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        id:{required:true}
    },
    data(){
        return {
            model:null
        }
    },
    methods:{
       async fetch(){
            // ${} 表示具体的值  传参的时候要传具体的值，接收的时候 :id 就像形参实参一样的道理
            const res = await this.$http.get(`articles/${this.id}`)
            this.model = res.data
       }
    },
    created(){
        this.fetch()
    }
}
</script>

<style lang="scss">
.page-article{
.body{
    img{
       max-width:100%;
       height:auto;
    } 
    iframe{
        width:100%;
        height:auto;
    }

}
}

</style>

