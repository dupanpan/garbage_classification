<template>
  <div class="about">
      <h1>{{id ? '编辑' : '新建'}}垃圾处置场所</h1>

      <el-form label-width="120px"  @submit.native.prevent="save">
        <el-form-item label="地区">
          <!-- 数据双向绑定  v-model-->
          <el-select v-model="model.city">
            <el-option v-for="item in cities" :key="item._id" :label="item.city" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
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
      model:{},
      cities:[]
    }
  },
  methods:{

    
    async save(){
      let res
      if(this.id){

        res = await this.$http.put(`rest/places/${this.id}`,this.model)

      }else{

        res = await this.$http.post('rest/places',this.model)

      }
     this.$router.push('/places/list')
     this.$message({
       type:'success',
       message:'保存成功'
     })
    },
    async fetch(){
    const res = await this.$http.get(`rest/places/${this.id}`)
    this.model = res.data
   },
   async fetchCities(){
    const res = await this.$http.get(`rest/cities`)
    this.cities = res.data
   },
  },

  created(){
    this.id && this.fetch()
    this.fetchCities()
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