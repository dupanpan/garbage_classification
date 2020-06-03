<template>
  <div>
  <section id="policy_details">
      <h1 class="mb-5">{{model.title}}</h1>
      <!-- 这个v-html 我真是灵机一动啊 -->
      <div v-html="model.body">
         
    </div>
    
  </section>
  </div>
  <!-- /articles/:id 点击了文章的title后就进行文章详情查询 传过去id-->
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
            const res = await this.$http.get(`policy/${this.id}`)
            this.model = res.data
       }
    },
    created(){
        this.fetch()
    }
}
</script>

<style lang=scss>
  section#policy_details{
    width:60vw;
    /* border:1px solid red; */
    margin:0 auto;
    display:flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;;
    h1{
        width:60%;
        line-height:30px;
        text-align:center;
    }
  }
</style>