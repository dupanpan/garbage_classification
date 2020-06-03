<template>
  <div class="about">
      <h1>{{id ? '编辑' : '新建'}}物品</h1>
      <el-form label-width="120px"  @submit.native.prevent="save">
        <el-form-item label="上级分类">
          <!-- 数据双向绑定  v-model-->
          <el-select v-model="model.category">
            <!-- :label显示的名称  :value是我们要真正存到数据库里的数据 是elementui 中要求的内容 -->
            <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <!-- 数据双向绑定  v-model-->
          <el-input v-model="model.name"></el-input>
        </el-form-item>
           <el-form-item label="图片">
          <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
          >
         
         <!--:action 这里应该是动态绑定，绑定的是变量，不是字符串 -->
         <!-- on-success 成功了做啥  afterUpload 成功之后，返回的值赋值给model.icon-->
         <!-- 如果用户有图像，就显示用户图像，没有就显示默认的上传提示图标 -->
        <img v-if="model.icon" :src="model.icon" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

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
      model:{icon:''},
      parents:[],
      msg:'garbage'
    }
  },
  methods:{

    
    async save(){
      let res
      if(this.id){

        res = await this.$http.put(`rest/items/${this.id}`,this.model)

      }else{

        res = await this.$http.post('rest/items',this.model)

      }
     this.$router.push('/items/list')
     this.$message({
       type:'success',
       message:'保存成功'
     })
    },
    async fetch(){
    const res = await this.$http.get(`rest/items/${this.id}`)
    this.model = res.data
   },
   async fetchParents(){
    const res = await this.$http.get(`rest/categories`)
    this.parents = res.data
    console.log(this.parents)
   },
   afterUpload(res){
     this.$set(this.model,'icon',res.url)
    //  this.model.icon = res.url
   }
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