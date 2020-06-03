<template>
  <div class="d-flex  jc-center ai-center" id="news">
  <section id="news_list">
    <div class="newsList">
    <m-list-card icon="xinwenzixun" title="新闻资讯" :categories="newsCats">
        <template #items="{category}">
          <router-link  tag="div" :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
                <span class="text-grey-1">[{{news.categoryName}}]</span>
                <span class="px-2">|</span>
                <span class="flex-1 text-dark text-ellipsis pr-2">{{news.title}}</span>
                <span class="text-grey">{{news.createdAt | date}}</span>
              </router-link>
        </template>
      </m-list-card>
    </div>
  </section>
  <!-- 怎么自动刷新啊。 绑定key 为路径 这样每次就会刷新了。。。  -->
  <article class="details flex-1 mx-3 ">
     <div class="illustration"></div> 
      <!-- <router-view  :key="$route.path"></router-view> -->
  </article>

  </div>
 
</template>

<script>
import dayjs from 'dayjs'

export default {
   filters:{
    date(val){
      return dayjs(val).format('MM/DD')
    }
  },
   data(){
        return {
            model:{},
            newsCats:[],
           
        }
    },
    methods: {
    async fetchNews(){
        const res = await this.$http.get(`news/list`)
        this.newsCats = res.data}
    },
    created() {
      this.fetchNews()
    },
}
</script>

<style lang=scss scoped>
@import '../assets/scss/variables';
#news{
  box-sizing: border-box;
  width:78vw;
  margin:0 auto;
  height:70vh;
  background:cadetblue;
  padding-left:50px;
  margin-top:50px;
section#news_list{
  background:#fff;
  z-index:6;
  min-height:50vh;
  width:50%;
  margin:10px;
.newsList{
  padding:10px;
  /* border:1.5px solid map-get($map: $colors, $key:'white-2' );; */
  border-top:50px solid map-get($map: $colors, $key:'white-2' );;
}

}
article.details{
   .illustration{
     margin-top:10px;
        z-index:5;
        width:35.4615rem;
        height:25.9231rem;
        background: url("../assets/images/undraw_newspaper_k72w.svg")  no-repeat top left;
        background-size:100% 100%;
      }
  flex:1;
}
}

</style>