<template>
  <div class="about">
      <h1>{{id ? '编辑' : '新增'}}管理员</h1>
      <!-- 如果希望横向布局:label-width="120px" -->
      <!-- 再点击保存的时候,执行submit事件,且阻止默认事件 prevent组织,给他一个save方法 -->
      <el-form label-width="120px"  @submit.native.prevent="save">
       
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
          <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
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
  },
  data(){
    return {
      model:{
        
      },
    }
  },
  methods:{
     // 请求方法:由于时提交数据,所以使用post
   async save(){
     let res 
    //  如果有id那就是编辑,要重新提交编辑后的内容到数据库
     if (this.id) {
      res = await this.$http.put(`rest/admin_users/${this.id}`,this.model)
     } 
     else {
    //没有id那就是创建分类
 //  发起请求,提交到admin_users接口,传递参数 this.model
     res = await this.$http.post('rest/admin_users',this.model)
     }
    //  push 是用来路由跳转的，不是请求api，前面不用加rest,而且前面要加/表示从根路径
     this.$router.push('/admin_users/list'),
     this.$message({
       type:'success',
       message:'保存成功'
     })
    },
    async fetch(){
      const res = await this.$http.get(`rest/admin_users/${this.id}`)
      this.model =  res.data
    },

    
  },
  created(){
    this.id && this.fetch()
  }
}
</script>

<style>

</style>