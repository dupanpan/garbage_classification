<template>
  <div class="about">
      <h1>{{id ? '编辑' : '新建'}}题目</h1>

 <el-form label-width="120px"  @submit.native.prevent="save">
        <el-form-item label="题目类型">
          
          <el-select v-model="model.type">
            <el-option v-for="item in types" :key="item.type" :label="item.label" :value="item.type"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="题目">
          <el-input v-model="model.subject"></el-input>
        </el-form-item>

       
        <!-- 单选多选题 -->
        <div >
        <el-form-item  label="选项" >
            <el-input v-model="model.options.opt_1.text" :value="model.options.opt_1.text"></el-input>
        </el-form-item>
         <el-form-item  label="选项">
            <el-input v-model="model.options.opt_2.text" :value="model.options.opt_2.text" ></el-input>
        </el-form-item>
         <el-form-item  label="选项" v-if="model.type=='multiple'||model.type=='single'" >
            <el-input v-model="model.options.opt_3.text"  :value="model.options.opt_3.text" ></el-input>
        </el-form-item>
         <el-form-item  label="选项" v-if="model.type=='multiple'||model.type=='single'" >
            <el-input v-model="model.options.opt_4.text"  :value="model.options.opt_4.text"></el-input>
        </el-form-item>
        </div>
        
  
        <el-form-item label="答案">
        <el-select v-model="model.answer"  v-if="model.type==='single'||model.type==='trueOrfalse'" >
        <el-option
          v-for="(item,index) in model.options"
          :key="index"
          :label="item.text"
          :value="item.text">
        </el-option>
        </el-select>


        
        <el-select v-model="model.answer" multiple  v-else>
        <el-option
          v-for="(item,index) in model.options"
          :key="index"
          :label="item.text"
          :value="item.text">
        </el-option>
        </el-select>

         </el-form-item>

        <el-form-item> 
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item> 
    </el-form> 

            

  </div>
</template>

<script>

export default {
  props:{
    id:{}
  }
  ,
  data(){
    return{
      model:{
        type:"",
        subject:"",
        options:{
        opt_1:{
          text:"",
          order:"A"
        },
        opt_2:{
          text:"",
          order:"B"
        },
        opt_3:{
          text:"",
          order:"C"
        },
        opt_4:{
          text:"",
          order:"D"
        }},
        answer:[]
        
      },
    
      types:[
        {
        type:"single",
        label:"单选题"
      },
      {
        type:"multiple",
        label:"多选题"
        },
        {
          type:"trueOrfalse",
          label:"判断题"
        }],
         optionsList:[]
    }
   
  },
  methods:{

    
    async save(){
      // this.model.options =this.opt_text;
      console.log(this.model)
      let res
      if(this.id){

        res = await this.$http.put(`rest/quizzes/${this.id}`,this.model)

      }else{
       
        res = await this.$http.post('rest/quizzes',this.model)

      }
     this.$router.push('/quizzes/list')
     this.$message({
       type:'success',
       message:'保存成功'
     })
    },
    async fetch(){
    const res = await this.$http.get(`rest/quizzes/${this.id}`)
    this.model = res.data
 



    }
   },

  created(){
    this.id && this.fetch()
  
  }
  
  
  }
</script>

<style lang='scss'>

</style>