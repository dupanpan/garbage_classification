<template>
 <div class="searchPage">
   <div class="topbar bg-primary py-2 px-4">
          <div class="search d-flex bg-white jc-center">
                <button type="button" class="btn sousuo ml-3" v-on:click=fetchGarbage()></button>
                <input type="search" class="flex-1 px-4  fs-lg" v-model="garbage" v-on:keyup.enter=fetchGarbage()>
          </div>
   </div>    
  
  <div class="bg-white">
    <div class="border-bottom pt-3 pb-2 px-4 fs-lg text-grey"><span>热门搜索</span></div>
    <div class="hotSearch bg-white  d-flex jc-start px-2 py-3 border-bottom" >
      <p v-for="item in hotKeys" :key="item"><span class="fs-lg mb-2" v-on:click="gethotkey(item)">{{item}}</span></p>
    </div>







<!-- 做这种内容不确定的标签一定不能指定宽度，可以设置padding值，然后盒子就能有宽度了，之后盒子大小就能更具内容自适应了 -->


  </div> 
  <div v-if="model">
    <div  class="bg-white px-4  py-5  d-flex  flex-column flex-start">
      <h1 class="px-3 mb-4 text-primary ">{{model.name}}属于{{model.category.name}}</h1>
      <div v-if="model.category.name=='湿垃圾'" class="px-3 mb-3" >

        <div class="mb-5">
          <img src="../assets/images/wet.png" >
        </div>
        
        <div class="">
          <h1 class=" text-primary mb-4">在投放时须注意：</h1>
          <p class=" text-primary mb-3 fs-lg">
            纯流质的食物垃圾，如牛奶等，应直接倒进下水口

            有包装物的湿垃圾应将包装物取出后分类投放，包装物请投放到对应的可回收物容器或干垃圾容器

            投放湿垃圾时，鼓励将包装物(如塑料袋)去除
          </p>
        </div>
      </div>
      <div>
        <div>
          <!-- <span class="text-light-1 px-3 fs-lg">相关文章</span> -->
        </div>
      </div>
    </div>

  </div> 




  
 </div>
 
</template>

<script>
export default {
    data(){
        return {
            garbage:'',
            model:null,
            hotKeys:
            ['橙子','口罩','酒精','奶茶','口红','泡面','外卖盒','饭菜','坚果壳','三只松鼠包装盒','AD钙瓶']

        }
    },
    methods: {
    async fetchGarbage(){
        const res = await this.$http.get(`items/${this.garbage}`)
        this.model = res.data
        },
    gethotkey(item){
      this.garbage=item
      this.fetchGarbage()
   }
    },
  
}
</script>
<style lang="scss" >
@import '../assets/scss/variables';


.searchPage{
  
  

  .hotSearch {
  flex-wrap: wrap;
  span{
    // border:0.0769rem solid map-get($map: $colors, $key:light-1 );
    background:rgba(150, 185, 192, 0.1);
    border-radius:20px;
    height:28px;
    // width:20%;
    padding:0 25px;
    margin-left:5px;
    display: inline-block;
    // align-self: center;
    text-align:center;
    line-height:28px;
    color:map-get($map: $colors, $key:dark-1 );
  }
}
}

  
</style>