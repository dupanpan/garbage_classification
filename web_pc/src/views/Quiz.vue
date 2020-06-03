<template>
<div>
      <section >
        <h1 class="self-center my-3 title">垃圾分类知识小测</h1>
        <div id="quiz">
         <div class="self-center my-3" v-if="result!=-1" style="color:#409EFF"><h2>得分：{{result}}&nbsp;(满分：{{quizzes.length*10}})</h2></div>

                <div v-for="(item,index) in quizzes" :key="index" class="d-flex flex-column " >
                      <!-- 成绩 -->
               
                    <!-- 单选题 -->
                    <p class="subject">{{index+1}}、{{item.subject}}{{item.type==='single'?'（单选题）':'（多选题）'}}</p>
                    <el-radio-group v-model="item.answer" v-if="item.type==='single'" class="d-flex ">
                    <el-radio class="py-3"   :value="option.text" :label="`${option.text}`" v-for="(option,index) in item.options" :key="index"></el-radio>
                    </el-radio-group>
                    <!-- 多选题 -->
                    <el-checkbox-group v-model="item.answer" v-else-if="item.type==='multiple'">
                        <div class="d-flex ">
                        <el-checkbox  class="py-3"  :value="option.text" :label="option.text" v-for="(option,index) in item.options" :key="index" ></el-checkbox>
                        </div>
                    </el-checkbox-group>
                    <div class="show_result my-3 wrong" v-if="item.score==0">回答错误，正确答案是：{{king_quizzes[index].answer.toString()}}</div>
                </div>
              </div>
               <!-- 提交 -->
                <button @click="submitQ" class="submit" v-if="result==-1">提交</button>

                <!-- <p>看看用户的试卷 {{quizzes}}</p> 
                <br>
                <p>看看正确答案 {{king_quizzes}}</p>  -->
               <!-- 只有一个答案？每个题的答案是一个变量？
                    因为每个radio 中的 v-model绑定的是同一个变量
                    item.answer = option.text 这样来实现值得绑定机制
                -->
    </section>
  </div>
</template>

<script> 
export default {
    data(){
        return{
            king_quizzes:[],
            quizzes:{},
            progress:0,
            choice:[],
            answer:'',
            answers:new Map(), //所有题目选择的答案
            submitted:false,
            result:-1,
            multiAnswer:[],
            size:5 //超过五道题后做单选题 
        }
    },
    methods: {

        async fetchQuiz(){
            const res = await this.$http.get(`quizzes/list`)
            //官方答案 
            //这就是学以致用啊   因为学过了深拷贝浅拷贝，所以当 this.quizzes发生改变的时候，king_quizzes也一起改变了
            // 这不是我们的本意 所以反应过来这是因为引用类型的值复制过去的只是一个地址，座椅他们俩公用一个地址，解决这个
            // 问题就是 进行深拷贝赋值
            //需要进行深拷贝
            this.king_quizzes=JSON.parse(JSON.stringify(res.data))
            // let otherObj = JSON.parse(JSON.stringify(deepObj))
            // 供用户保存他的试卷
            this.quizzes = JSON.parse(JSON.stringify(res.data))
            //因为是用户的试卷，答案应该清掉
            for(let item of this.quizzes){
                item.answer=[] 
                //v-model 会忽略所有表单元素的 value、checked、selected attribute 的初始值而总是将 Vue 实例的数据作为数据来源。
            }
         },
       format(percentage) {
        return percentage === 100 ? '满' : `${percentage}%`;
       },
      
        submitQ(){
            // 提交的时候要先把值置为0
            this.result=0
            for(let i in this.quizzes){
            //    console.log(this.quizzes[i]._id,this.king_quizzes[i]._id) 
                if(this.quizzes[i]._id==this.king_quizzes[i]._id){
                    // 单选题
                    if(this.quizzes[i].type=='single'){
                        if(this.quizzes[i].answer==this.king_quizzes[i].answer){
                            this.quizzes[i].score=10
                            this.result += this.quizzes[i].score
                        }
                        else{
                            this.quizzes[i].score=0
                        }
                    }
               
                //多选题
                 else if(this.quizzes[i].type=='multiple'){
                     console.log(this.quizzes[i].type,this.king_quizzes[i].answer.length,this.quizzes[i].answer.length)
                     if(this.king_quizzes[i].answer.length==this.quizzes[i].answer.length){
                        for(let answer of this.quizzes[i].answer){
                                if(this.king_quizzes[i].answer.indexOf(answer) > -1){
                                    this.quizzes[i].score=10
                                }
                                else{
                                    this.quizzes[i].score=0
                                }
                            }
                        if(this.quizzes[i].score==10){this.result += this.quizzes[i].score}
                    }
                     else {this.quizzes[i].score = 0 }
                }    
            } }
            console.log( this.result)
        },
       
    },
      created() {
      this.fetchQuiz()
    },
}
 </script> 

<style lang="scss" scoped>
@import '../assets/scss/variables';

    section{
    z-index:2;
    box-shadow: 0 0px 11px 0 rgba(52,60,61,0.08);
    font-family:PublicoHeadline,serif;    
    padding:10px;
    width:60vw;
    min-height:100vh;
    background:#fff;
    display:flex;
    flex-direction: column;
    margin:20px auto;
    .wrong{
    color:#F56C6C;
    }
    .title{
    margin:30px auto;
    font-family:PublicoHeadline,serif;
    font-weight: bold;
    font-size:2.25rem;
    letter-spacing: 1.25px;
    }
    button.submit{
    width:6.9rem;
    height:2.7rem;
    margin:0  auto;
    margin-top:2.5rem;
    border-radius:30px;
    background-color:map-get($map: $colors, $key:primary );
    border:none;
    font-size:1rem;
    font-weight:bold;
    color:white;
    border:none;
    background-color:rgb( 0,191,166);
    color:#fff;
    width:175px;
    height:50px;
    font-size:16px;
    font-weight:bold;
    margin-bottom:45px;
    }
    #quiz{
    display:flex;
    flex-direction: column;
    padding-left:45px;
    padding-right:45px;
    .subject{ margin:10px 0;  }
   
   }
   

    }
</style>