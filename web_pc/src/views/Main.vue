<template>
    <div id="main" >
<!-- main里面的内容  要写大家公共有的  比如导航栏  home也是main的子路由  -->
<!-- 只有header 和 footer是大家共有的 -->
<header >
    <div class="shadow"></div>
        <div class="container d-flex jc-between" >
            
            <nav class="nav-main flex-1 d-flex jc-around">
                <!-- <div class="nav-content  d-flex jc-between"> -->
                <div id="branding" >
               
                </div>
                 <h1><span >垃圾分类</span></h1>
                <ul>
                    <router-link class="current" :to="`/search/`"  tag="li"><a>首页</a></router-link>
                     <router-link :to="`/news/`" tag="li"><a>新闻资讯</a></router-link>
                    <router-link :to="`/slogan/`" tag="li"  ><a>宣传标语</a></router-link>
                    <router-link :to="`/policy/`" tag="li" ><a>政策法规</a></router-link>
                    <router-link :to="`/quizzes/`" tag="li" ><a>知识小测</a></router-link>
                    <router-link :to="`/mboard/`" tag="li" ><a>留言板</a></router-link>
                    <el-dropdown class="px-2" >
                    <span class="el-dropdown-link  fs-md"><a>信息公开</a>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" placement="top" >
                        <el-dropdown-item ><router-link  tag="div" :to="`/origins/`" >垃圾源头</router-link></el-dropdown-item>
                        <el-dropdown-item><router-link  tag="div" :to="`/table/`" >分类报表</router-link></el-dropdown-item>
                        <el-dropdown-item><router-link  tag="div" :to="`/handle_place/`" >垃圾处置设施</router-link></el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                   
                </ul>
                <!-- <el-button class="self-end py-5 login" @click="drawer = true" type="primary" style="margin-left: 16px;" v-if="city">{{city}}</el-button>
                <el-button class="self-end py-5 login" @click="drawer = true" type="primary" style="margin-left: 16px;"><i class="iconfont icon-location1"></i></el-button> -->
                 <div v-if="model">
                <div class="user">
                     <el-dropdown class="px-2" >
                    <span class="el-dropdown-link text-purple fs-md">{{model.username}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" placement="top" >
                        <el-dropdown-item ><el-button @click="logout">注销</el-button></el-dropdown-item>
                    </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>
            <div v-else><button class="login"><router-link  :to="`/login/`" ><i class="iconfont icon-yonghu1"></i></router-link></button></div>
           <!-- </div> -->
            </nav>
           
            
        </div>
    </header>
    <!-- <div></div> -->

    
    <!-- <button class="locale"> {{city}}</button> --><!-- <Bmap @cityhandle = getCity></Bmap> -->
       
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

        <div class="main_container"><router-view></router-view></div>

        
        <footer> 
            <div class="top_frame"></div>
            
            <div class="foot_container">
                <div class="d-flex jc-around pt-5"> <p>Acme Web Design, copyright & copy, 2020</p></div>
               
                <div class="inner_container"></div>
            </div>
        </footer>
    </div>

</template>

<script>


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
            city:""
        }
        },
    methods: {
    async fetchUser(){
        // 根据token获取用户
        if(localStorage.token){
            const res = await this.$http.get(`users`)
            this.model = res.data
            console.log(this.model)
            }
        }
    ,
    logout(){

        localStorage.token=""
        this.$router.push('/login')
    },
    getCity(){
        this.city = arguments[0]
    },
},
created() {
   this.fetchUser() 
},
}
</script>

<style lang="scss">

@import '../assets/scss/variables';


@media only screen and (min-width: 1025px) {
    html {
        font-size:16px !important;
       
    }
    body{
        background: url("../assets/images/left-frontpage.svg")  no-repeat top left;
        background-size:100% 100%;
    }
    #main{
        width:100%;
        margin:0 auto;
        background-color: #ffffff;
    }
    #container{height:100%}
    
    .nav-icons{

    border-radius: 1.7rem 1.7rem 0 0;

    }}

  

header{
    color:#343c3d;
    height:50vh;

    .shadow{
        width:45vw;
        height:50vh;
        position:absolute;
        left:-50px;
        top:-5px;
        background: url("../assets/images/left-frontpage.svg")  no-repeat top left;
        background-size:100% 100%;
    }
   .nav-main{
   
    line-height:71px;
    height:71px;
    background-color:white;
    position:sticky;
    box-shadow: 0 0px 11px 0 rgba(52,60,61,0.08);
    z-index:1;
    margin-bottom:10px;
    margin:15px 8px;
    padding:0 65px;
   }
}
.container {
    width: 80%;
    margin: auto;
    overflow: hidden;
}

ul {
    padding: 0;
    margin: 0;
}

header li {
   
    display: inline;
    padding: 0 20px 0 20px;
}


 #branding  {
    width:100px;
    height:71px;
    background:url("../assets/images/country.svg")  no-repeat ;
    background-size:100% 100%;
}


header button.login{
     margin: 0;
    border:none;
    background:none;
     i{
    display:inline-block;
    border:none;
    font-size:30px;
    color:rgb(52,60,61)

}


}

a{
    text-decoration: none;
    color:#343c3d;
}
a:hover{
   color: #027180 !important;
}
.main_container{
    min-height:100vh;
    margin-top:-250px;
}

footer {
    width:100vw;
    // position:fixed;
    bottom:0;
    color: #ffffff;
    .top_frame{
    background: url("../assets/images/curved-green-top.svg")  no-repeat top right;
    text-align: center;
    height:10vh;
    margin-bottom:-15px;
    
    }
   .foot_container{
       background:map-get($map: $colors, $key:grey-green );
       background-size: 100% 100%;;
       height:60vh;
       
       .inner_container{
           background:map-get($map: $colors, $key:dark-green );
           height:40vh;
           width:80%;
           margin:50px auto;
           margin-bottom:10px;
       }
   }
   
}

</style>