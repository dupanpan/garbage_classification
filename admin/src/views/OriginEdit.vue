<template>
  <div class="about">
      <h1>{{id ? '编辑' : '新增'}}源头</h1>
      <!-- 如果希望横向布局:label-width="120px" -->
      <!-- 再点击保存的时候,执行submit事件,且阻止默认事件 prevent不要跳转页面,给他一个save方法 -->
      <el-form label-width="120px"  @submit.native.prevent="save">

        <el-form-item label="选择地区">
         

          <el-select v-model="origin.city">
            <!-- :label显示的名称  :value是我们要真正存到数据库里的数据 是elementui 中要求的内容 -->
            <el-option v-for="item in cities" :key="item._id" :label="item.city" :value="item._id"></el-option>
          </el-select>

        </el-form-item>

        <el-form-item label="垃圾源头">
          <!-- 数据双向绑定  v-model-->
          <el-input v-model="origin.name"></el-input>
        </el-form-item>
        <el-form-item>
          <!-- native-type 即原生类型 html里面的类型时提交按钮 -->
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
      cities:[],
      origin:{
      
      }

    }
  },
  methods:{

    
    async save(){
      let res
      if(this.id){
        // console.log(this.origin)
        res = await this.$http.put(`rest/origins/${this.id}`,this.origin)

      }else{
        console.log(this.origin)
        res = await this.$http.post('rest/origins',this.origin)
      }
     this.$router.push('/origins/list')
     this.$message({
       type:'success',
       message:'保存成功'
     })
    },
    async fetch(){
    const res = await this.$http.get(`rest/origins/${this.id}`)
    this.origin = res.data
   },
    async fetchLocale(){
    const res = await this.$http.get(`rest/cities`)
    this.cities = res.data
   },
  },

  created(){
    this.id && this.fetch()
    this.fetchLocale()
  }

  }
</script>

<style>

</style>