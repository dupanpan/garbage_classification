 <template>

  <div>

    <!-- 首页就是一个搜索 功能
    那我干脆就把search页面链接到首页

    那么新闻页面放在哪里  -->


     

    

       <!-- <m-list-card icon="xinwenzixun" title="新闻资讯" :categories="newsCats">
        <template #items="{category}">
          <router-link  tag="div" :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
                <span class="text-grey-1">[{{news.categoryName}}]</span>
                <span class="px-2">|</span>
                <span class="flex-1 text-dark text-ellipsis pr-2">{{news.title}}</span>
                <span class="text-grey">{{news.createdAt | date}}</span>
              </router-link>
        </template>
      </m-list-card> -->
     

      

   


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