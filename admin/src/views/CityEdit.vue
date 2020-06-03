<template>
  <div class="about">
      <h1>{{id ? '编辑' : '新增'}}城市</h1>
      <!-- 如果希望横向布局:label-width="120px" -->
      <!-- 再点击保存的时候,执行submit事件,且阻止默认事件 prevent不要跳转页面,给他一个save方法 -->
      <el-form label-width="120px"  @submit.native.prevent="save">
        <!-- <el-form-item label="省份">
          <el-input v-model="model.province"></el-input>
        </el-form-item> -->
          <el-form-item label="城市">
          <!-- 数据双向绑定  v-model-->
          <el-input v-model="model.city"></el-input>
        </el-form-item>
          <!-- <el-form-item label="县/区">
          <el-input v-model="model.district"></el-input>
        </el-form-item> -->
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
      model:{province:'',city:'',district:''},
     

    }
  },
  methods:{

    
    async save(){
      let res
      if(this.id){

        res = await this.$http.put(`rest/cities/${this.id}`,this.model)

      }else{

        res = await this.$http.post('rest/cities',this.model)

      }
     this.$router.push('/cities/list')
     this.$message({
       type:'success',
       message:'保存成功'
     })
    },
    async fetch(){
    const res = await this.$http.get(`rest/cities/${this.id}`)
    this.model = res.data
   },
  },

  created(){
    this.id && this.fetch()
    this.fetchParents()
  }
  
  
  }
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>