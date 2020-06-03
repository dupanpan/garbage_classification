 <template>

  <div>

      <div>
      <!-- 最好不要同时写上下边距，如果重叠的话会导致意想不到的问题 -->
      <div class="nav-icons bg-white  text-center pt-3 text-dark bg-primary">
        <div class="d-flex flex-wrap ">
          
          <router-link :to="`/slogan/`" tag="div" class="nav-item mb-3" >
          
            <!-- <i class="sprite sprite-news"></i> -->
            <span class="iconfont icon-xuanchuanyupeizhi fs-lg"></span>
            <div class="py-2">宣传标语</div>
         
        </router-link>


          <div class="nav-item mb-3" >
            <i class="iconfont icon-zhengcefagui"></i>
            <div class="py-2">政策法规</div>
          </div>
          <div class="nav-item mb-3" >
            <i class="iconfont icon-shuju"></i>
            <div class="py-2">数据一览</div>
          </div>
          <div class="nav-item mb-3" >
            <i class="iconfont icon-liucheng"></i>
            <div class="py-2">处理流程</div>
          </div>
          <div class="nav-item mb-3" >
            <i class="iconfont icon-kaoshi"></i>
            <div class="py-2">答题中心</div>
          </div>
           <div class="nav-item mb-3" >
            <i class="iconfont icon-liuyanban1"></i>
            <div class="py-2">留言板</div>
          </div>

         
        </div>
        <div class="bg-light py-2 fs-sm">
          <i class="sprite sprite-arrow mr-1"></i>
          <span>收起</span>
        </div> 
      </div>
      </div>
      <!-- end of nav -->

    

       <m-list-card icon="xinwenzixun" title="新闻资讯" :categories="newsCats">
        <template #items="{category}">
          <!-- "`es6模板字符串拼接`" -->
          <router-link  tag="div" :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
                <span class="text-grey-1">[{{news.categoryName}}]</span>
                <span class="px-2">|</span>
                <span class="flex-1 text-dark text-ellipsis pr-2">{{news.title}}</span>
                <span class="text-grey">{{news.createdAt | date}}</span>
              </router-link>
        </template>
         
      </m-list-card>
     

      
      <m-card icon="video" title="精彩视频"></m-card>
      <m-card icon="tuwen" title="图文攻略"></m-card>
       <m-card icon="tuwen" title="图文攻略"></m-card>
        <m-card icon="tuwen" title="图文攻略"></m-card>


   


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
    return  {
        swiperOption: {
            pagination: {
              el: '.pagination-home'
            }
          },
          newsCats:[],
          heroCats:[]
        }
  },
  methods: {
    async fetchNewsCats(){
      const res = await this.$http.get('news/list')
      this.newsCats = res.data

    },
     async fetchItemCats(){
      const res = await this.$http.get('items/list')
      this.itemCats = res.data

    }
  },
  created() {
    this.fetchNewsCats()
    this.fetchItemCats()
  },

}
</script>

<style lang="scss">
@import '../assets/scss/variables';
.pagination-home{
  .swiper-pagination-bullet{
    opacity:1;
    border-radius: 0.1538rem;
    background:map-get($map: $colors, $key:'white' );
   &.swiper-pagination-bullet-active{
      background:map-get($map: $colors, $key:darkblue)
    } 
  }
}


.nav-icons{
  
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  // border-top-left-radius: 1rem;
  // border-top-right-radius: 1rem;
  .nav-item{
    width:25%;
    border-right: 1px solid $border-color;
    // n代表第n个 从1开始
    &:nth-child(4n){
      border-right:none;
    }
  }
}

    * {
    margin: 0;
    padding: 0;
}


.nav-icons{

 
  margin-top:-1.5rem;

.iconfont{
  font-size:24px !important;
}
}



</style>