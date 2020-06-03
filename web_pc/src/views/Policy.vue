<template>
  <div>
  <section>
    <div id="policy_list">
      <div class="title"></div>
      <div class="policy_list">
      <div v-for="policy in newsList" :key="policy._id" class="py-2" >
      <router-link  tag="p" :to="`/policy_details/${policy._id}`"><span class="" >{{policy.title}}</span></router-link>
      </div>
          <div class="d-flex jc-center ai-center pb-5 pr-6" ><el-button class="addbtn" @click=more()>更多</el-button></div>
      </div>
    </div>
    <div class="illustration"></div>
  </section>
  </div>
  <!-- /articles/:id 点击了文章的title后就进行文章详情查询 传过去id-->
</template>

<script>
export default {
   data(){
        return {
            policies:null,
            newsList:null
        }
    },
    methods: {
    async fetchPolicy(){
        const res = await this.$http.get(`policy/list`)
        this.policies = res.data
        this.newsList = this.policies[0].newsList
        },
      more(){
      this.count += 5;
      if(this.count<=this.slogan_len){ this.fetchSlogan() }
      else{
        this.message="已经没有了哦"
        }
      }
    },
    created() {
      this.fetchPolicy()
    },
}
</script>

<style lang="scss" scoped>
  section{
    box-sizing:border-box;
    padding-left:20px;
    width:90vw;
    margin:0 auto;
    display:flex;
    justify-content: space-around;
    #policy_list{
      box-shadow: 0 0px 11px 0 rgba(52,60,61,0.08);
      z-index:2;
      background-color: #fff;
      margin-top:50px;
      
      box-sizing:border-box; 
      width:48%;
      display:flex;
      flex-direction: column;
      margin-left:40px;
      color:#027180;
      .policy_list{
        padding:20px;
      padding-top:30px;
      }
      .title{
        background-color:#00BFA6;
        width:100%;
        height:40px;
      }
      span:hover{
        /* color:#FCEFD6; */
        font-size:17px;
        color:#343c3d;
        color:#10aeb5;
      }
    }
   
     .addbtn{
      margin-top:20px;
      border:none;
      background-color:rgb( 0,191,166);
      color:white;
      font-weight:bold;
      width:150px;
      height:42px;
      font-size:14px;}
    .illustration{
      background-color:#fff;
      box-sizing:border-box;
      background:url("../assets/images/undraw_product_tour_foyt.svg");
      width:40%;
      height:50vh;
      background-size:100% 100%;
    }
  }
</style>