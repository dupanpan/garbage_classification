<template>
  <div>
  <section >
     <!-- <div class="illustration"></div> -->
    <div id="message_board">
      <p class="title py-3">留言板 </p>
      <!-- <el-form label-width="120px"  @submit.native.prevent=""> -->

       <vue-editor placeholder="对网站内容有什么建议吗，欢迎留言哦" v-model="model.body" useCustomImageHandler @image-added="handleImageAdded" class="mb-5"></vue-editor>
       <el-button  native-type="submit" class="sub_btn " @click="yesEdit ? updateMessage(model._id) : save()">{{yesEdit ? '编辑' : '创建'}}</el-button>
      <!-- </el-form> -->

      <el-collapse v-model="activeNames" @change="handleChange" class="justify">
          <el-collapse-item  name="1" width="50%">
          <div class="message">
            <div class="d-flex jc-start px-2  d-flex flex-column" v-for="message in messages" :key="message.id" >
            <p class="fs-lg d-flex" ><img class=" mr-3" src="https://secure.gravatar.com/avatar/ec858cf….png?r=pg&s=100&d=retro" width="30px" height="30px" alt=""><span>{{message.user.username}}</span></p>
            <p class="mt-3 "><span class="fs-md mb-2  " v-html="message.body"></span></p>
            <div class="mt-2 d-flex  ai-center ">
              <p class="mr-3"><span class="fs-sm  text-grey">{{message.updatedAt | date}}</span></p>
              <div v-if="message.user._id===user._id " class="user_opt">
                  <el-button @click="deleteMessage(message._id)" type="text" class="userbtn">删除</el-button>
                  <el-button @click="editMessage(message)" type="text" class="userbtn">编辑</el-button>
              </div>
            </div>
               
                
              

            <el-divider></el-divider>
            </div>
          </div> 
          </el-collapse-item>
      </el-collapse> 
      </div>
     
</section>
</div>
</template>

<script>
// 用解构的方式获取
import { VueEditor } from "vue2-editor";
import dayjs from 'dayjs'
export default {
data(){
    return{
        model:{},
        messages:{user:{}},
        activeNames: ['1'],
        user:{},
        yesEdit:false
    }
},
 components: {
    VueEditor
  },
   filters:{
    date(val){
      return dayjs(val).format('YYYY/MM/DD')
    }
  },

// 操作留言板的时候需要首先进行判断 是否有localStorage.token 如果有 就可以留言 没有提示登录
  methods: {
     handleChange(val) {
        console.log(val);
      },
      async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
          const formData = new FormData();
          formData.append("file", file);
          const res = await this.$http.post('upload',formData);
          Editor.insertEmbed(cursorLocation, "image", res.data.url);
          resetUploader();
        },
     async save(){
        if(localStorage.token){
          if(this.model.body){
            const res = await this.$http.post('messages',this.model)
            this.$message({
             type:'success',
             message:'发表成功'
             })
             //创建完成后 应该把model清空
             this.model={}
             this.fetchMessage()
          }else{
             this.$message({
             type:'info',
             message:'内容不能为空呢'
             })
          }
          
        }
        else{
           this.$message({
             type:'warning',
             message:'请先登录'
             })
        }
      },

// 需要把最新的留言显示在上面，那么根据 更新时间 或者使用pop，但是我们也不能够保证获取的数据顺序啊来排序 应该怎么做  
      async fetchMessage(){
        const res = await this.$http.get(`messages`)
        this.messages = res.data
        this.messages=this.messages
      
        },
        async fetchUser(){
        // 根据token获取用户
        if(localStorage.token){
            const res = await this.$http.get(`users`)
            this.user = res.data
            }
        },
        editMessage(message){
          //一定要深拷贝
          this.model= JSON.parse(JSON.stringify(message))
          this.yesEdit=true
        },

       async updateMessage(id){

          const res = await this.$http.put(`messages/${id}`,this.model)
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
           //更新完之后要复原
          this.yesEdit=false
          this.model={}
          this.fetchMessage()
         
       },

      async deleteMessage(id){
        this.$confirm(`是否确定要删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`messages/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetchMessage()
      });
    }
  },
  created() {
    this.fetchMessage()
    this.fetchUser()
  },
}
</script>

<style lang="scss" scoped>

section{
  padding:20px;
  width:80vw;
  margin:0 auto;
 .justify{

   width:73%;

 }
 #message_board{
  padding:20px;
  padding-top:40px;
  width:100%;
  min-height:50vh;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
  box-shadow: 0 0px 11px 0 rgba(52,60,61,0.08);
 }
.illustration{
  
  margin-left:20px;
   width:40%;
   min-height:50vh;
   background: url("../assets/images/undraw_ideas_flow_cy7b.svg")  no-repeat top right;
   background-size:100% 100%; 
   float:right;
}
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
  .user_opt{
    display: inline-block;
    
  }
  .userbtn{
    font-size:12px;
  }
  .title{
    color: #343c3d;
      letter-spacing: 1.25px;
      font-family:PublicoHeadline,serif;
      font-weight: bold;
      font-size:2.25rem;
  
}


.sub_btn{
      border:none;
      background-color:rgb( 0,191,166);
      color:#fff;
      width:194px;
      height:58px;
      font-size:18px;
      font-weight:bold;
      margin:10px auto;
      margin-bottom:30px;
      letter-spacing: 2px;
      align-self:center;

}

}


</style>