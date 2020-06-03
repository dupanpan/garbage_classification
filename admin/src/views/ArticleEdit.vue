<template>
  <div class="about">
      <h1>{{id ? '编辑' : '新建'}}文章</h1>
      <!-- 如果希望横向布局:label-width="120px" -->
      <!-- 再点击保存的时候,执行submit事件,且阻止默认事件 prevent组织,给他一个save方法 -->
      <el-form label-width="120px"  @submit.native.prevent="save">
        <el-form-item label="所属分类">
          <!-- model.categories用来实现数据绑定，随后可以保存model的时候保存到数据库 -->
          <!-- categories 只是获取到的所有分类，这里用来显示 -->
          <el-select v-model="model.categories" multiple> 
            <el-option v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
          <!-- 数据双向绑定  v-model-->
          <el-input v-model="model.title"></el-input>
        </el-form-item>
        <el-form-item label="详情">
          <!-- 数据双向绑定  v-model-->
           <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
         
        </el-form-item>
        <el-form-item>
          <!-- native-type 即原生类型 html里面的类型时提交按钮 -->
          <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props:{
    id:{}
  },
   components: {
    VueEditor
  },
  data(){
    return {
      categories:[],
      model:{
        title:"",
      },
    }
  },
  methods:{
     // 请求方法:由于时提交数据,所以使用post
   async save(){
     let res 
    //  如果有id那就是编辑,要重新提交编辑后的内容到数据库
     if (this.id) {
      res = await this.$http.put(`rest/articles/${this.id}`,this.model)
     } 
     else {
    //没有id那就是创建分类
 //  发起请求,提交到articles接口,传递参数 this.model
     res = await this.$http.post('rest/articles',this.model)
     }
    //  push 是用来路由跳转的，不是请求api，前面不用加rest,而且前面要加/表示从根路径
     this.$router.push('/articles/list'),
     this.$message({
       type:'success',
       message:'保存成功'
     })
    },
    async fetch(){
      const res = await this.$http.get(`rest/articles/${this.id}`)
      this.model =  res.data
    },
    async fetchCategories(){
      const res = await this.$http.get(`rest/categories`)
      this.categories =  res.data
    },

 async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post('upload',formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  },
  created(){
    this.fetchCategories()
    this.id && this.fetch()
  }
}
</script>

<style>

</style>