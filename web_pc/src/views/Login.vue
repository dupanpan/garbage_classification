<template>
  <div class="login-container">
      <el-card header="请先登录" class="login-card">
          <el-form @submit.native.prevent="login">
              <el-form-item label="用户名">
                  <el-input v-model="model.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                  <el-input v-model="model.password" type="password"></el-input>
              </el-form-item>
                <div class="d-flex jc-around">
               <el-form-item>
                  <el-button type="primary" native-type="submit">登录</el-button>
              </el-form-item>
              <router-link  :to="`/register/`" ><el-button type="primary" class="register">注册</el-button></router-link>
              </div>
             </el-form>
            
            
      </el-card>
  </div>
</template>

<script>
import { async } from 'q'


export default {
 data(){
     return {
         model:{}
     }
 },
 methods:{
   async login(){
       if(!this.model.username ||  !this.model.username){
            this.$message({
             type:'info',
             message:'信息不能为空'
         })
         return ;
       }
         const res= await this.$http.post('login',this.model)
         //浏览器关闭后下次打开也会有,sessionStorage 就没有
         localStorage.token = res.data.token 
         this.$router.push('/')
         this.$message({
             type:'success',
             message:'登录成功'
         })
     }
 }
}
</script>
<style scoped>

.login-container{

    width:25rem;
    margin:5rem auto;
}
</style>