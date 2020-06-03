<template>
    <div id="main" >
        <div >
           
        <div class="topbar bg-primary py-2 ">
            <div class=" topTitle text-white py-5 text-center">
          <div class="d-flex  jc-start">

              <el-button class="self-end" @click="drawer = true" type="primary" style="margin-left: 16px;" >
        {{city}}
            </el-button>
            <el-drawer
            title="我是标题"
            :visible.sync="drawer"
            :with-header="false">
           
           <Bmap @cityhandle = getCity></Bmap>
         
            </el-drawer>
              
              </div>
        </div>
             <router-link  tag="div" :to="`/search`" class="d-flex px-4">
                <div class="search d-flex bg-white jc-center">
                <button type="button" class="btn sousuo ml-3" v-on:click=fetchGarbage()></button>
                <input type="search" class="flex-1 px-4  fs-lg" v-model="garbage">
                </div>
              </router-link>
              <div ></div>
            
             <div  class=" bg-primary py-4 ">{{model}}</div>
            
           
            
        </div>
        <!-- <div class="bg-primary  pt-3 pb-2">
            <div class="nav nav-inverse  jc-around pb-1">
                <div class="nav-item active">
                    <router-link class="nav-link" tag="div" to="/">首页</router-link>
                </div>
                 <div class="nav-item ">
                    <router-link class="nav-link" tag="div" to="/">答题中心</router-link>
                </div>
                 <div class="nav-item ">
                    <router-link class="nav-link" tag="div" to="/">讨论社区</router-link>
                </div>
            </div>
        </div> -->


        <router-view></router-view>
    </div>
</div>
</template>

<script>

 import VDistpicker from 'v-distpicker'
import '../assets/scss/_variables.scss'
import '../assets/scss/style.scss'
 import Bmap from '../components/Bmap.vue'
export default {
    components: {
    Bmap
  },
    data(){
        return {
            garbage:'',
            model:null,
            drawer: false,
            city:"北京"
        }
        },
    methods: {
    async fetchGarbage(){
        const res = await this.$http.get(`items/${this.garbage}`)
        this.model = res.data
        }
    ,
    getCity(value){
        this.city = value
        // console.log(city)
    }
     
  
},
}
</script>

<style lang="scss">




@media only screen and (min-width: 1025px) {
    html {
        font-size:16px !important;
    }
    body{
        background-color: #10aeb5;
    }
    #main{
        width:48rem;
        margin:0 auto;
        background-color: #f1f1f1;
        
        
    }
 #container{height:100%}
    
.nav-icons{

  border-radius: 1.7rem 1.7rem 0 0;
  margin-top:-30px;

}}

    .topbar{
        // position:sticky;
        top:0;
        // 由于层级较低，划过swiper的时候会被挡住
        z-index: 999;
       
    }
    .sousuo{
        width:35px;
        height:35px;
        background:url("../assets/images/topbar.png");
        background-size:100% 100%;
    }
    .search{
        width:100%;
        height:40px;
        border-radius: 42px;;
        border:1px solid lightgray;
        outline: none;
    }
    input[type="search"]{
       
        height:37px;
        border:1px solid white;
        border-radius: 42px;
        box-sizing: border-box;
        outline: none;
    }
</style>