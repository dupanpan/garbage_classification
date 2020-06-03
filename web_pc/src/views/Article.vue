<template>
<div class="the_article">
    <section>
  <div class="page-article" v-if="model">
      <div class="d-flex py-3 px-2 border-bottom">
          <div class="iconfont icon-back pr-1 text-blue" ></div>
          <strong class="title flex-1 text-blue">{{model.title}}</strong>
          <div class="fs-xs text-gray">2020-1-14</div>
      </div>
      <div v-html="model.body" class="px-3 body pt-5 fs-lg" ></div>
      <div class="px-3 border-top py-3 " >
          <div class="d-flex ai-center  pb-3">
              <i class="iconfont icon-tuwen text-blue"></i>
              <strong class="text-blue fs-lg ml-2">相关资讯</strong>
          </div>
          <div>
              <!-- <el-button type="text" v-for="item in model.related" :key="item._id" @click="fetch(item._id)">{{item.title}}</el-button> -->
              <router-link class="py-2"  tag="div"  v-for="item in model.related" :key="item._id" :to="`/articles/${item._id}`" >{{item.title}}</router-link>
          </div>
      </div>
  </div>
  </section>
  </div>
</template>

<script>
export default {
    props:{
        id:String
    },
    data(){
        return {
            model:null,
            _id:""
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

<style lang="scss" scoped>

.the_article{
    padding:20px;
    width:70vw;
    min-height:80vh;
    margin:0 auto;
    // box-shadow: 0 0px 11px 0 rgba(52,60,61,0.08);
    background:#fff;
    z-index:6;
}
  .title{
        
        line-height:30px;
        // text-align:center;
        color: #343c3d;
        letter-spacing: 1.25px;
        font-family:PublicoHeadline,serif;
        font-weight: bold;
        font-size:1.75rem;
        margin-bottom:25px;
    }
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

