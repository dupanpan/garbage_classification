<template>
  <div class="register-container">
      <el-card header="注册" class="register-card">
          <el-form @submit.native.prevent="register">
              <el-form-item label="用户名">
                  <el-input v-model="model.username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                  <el-input v-model="model.password" type="password"></el-input>
              </el-form-item>
                <el-form-item label="确认密码">
                  <el-input v-model="confirmPwd" type="password"></el-input>
                  <span v-if="confirm">{{confirm}}</span>
              </el-form-item>
             
               <el-form-item>
                  <el-button type="primary" native-type="submit">注册</el-button>
              </el-form-item>
          </el-form>
         <button class="login"><router-link  :to="`/login/`" >已有账号，去登录</router-link></button>
      </el-card>
  </div>
</template>
<script>
import _ from '../../node_modules/lodash'
import { async } from 'q'


export default {
 data(){
     return {
        model:{},
        confirmPwd:"",
        confirm:""
     }
 },
 methods:{
   async register(){
         const res= await this.$http.post('register',this.model)
         this.$router.push('/login')
         this.$message({
             type:'success',
             message:'注册成功'
         })
     },
 },

  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    confirmPwd: function () {
         if(this.model.password != this.confirmPwd && this.confirmPwd != ""){
         this.confirm ="密码不一致"
        }else{
          this.confirm ="密码一致"
        }
    }
  },
}
</script>
<style scoped>

.register-container{

    width:25rem;
    margin:5rem auto;
}
</style>