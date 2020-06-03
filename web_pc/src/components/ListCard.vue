<template>
    <m-card :icon="icon" :title="title">
        <div class="card-body pt-3">
          <div class="nav jc-between">
            <div class="nav-item " v-for="(category,i) in categories" :key=i :class="{active:active===i}" 
            @click="$refs.list.swiper.slideTo(i)"> 
            <!-- @click= 这里是为了让点击tab 比如点击赛事，就显示赛事的list  -->
              <div class="nav-link">{{category.name}}</div>
            </div>
          </div>

         <div class="pt-2">
           <!-- ref就相当于是Vue里面的id           这里的silde-change 就是滚动赛事的list 就要使赛事tab active-->  
           <!-- :options="{autoHeight:true}"  根据内容 设置高度 -->
            <swiper ref = "list" @slide-change="() => active = $refs.list.swiper.realIndex" :options="{autoHeight:true}">
              <!-- 五个导航菜单 对应五个silder -->
            <swiper-slide v-for="(category,i) in categories" :key="i">
              <slot name="items" :category="category"></slot>
            </swiper-slide>
          </swiper>
         </div>

        </div>
        
      </m-card>
</template>

<script>
export default {
    // 参数
    props:{
        title:{type:String,required:true},
        icon:{type:String,required:true},
        categories:{type:Array,required:true}
    },
    data(){
      return {
        active:0
      }
    }
}
</script>

<style>

</style>