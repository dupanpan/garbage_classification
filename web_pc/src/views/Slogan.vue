<template>
  <div>
   
  <section class="d-flex  jc-around align-center">
    
      <!-- 用户发表区域 -->
      <!-- 使用这样的功能呢 是为了让用户有参与感，有成就感，如果一开始就审核，用户对于自己的输出没有得到响应，而下次很可能就不会来看，从而就失去了用户，就像微博发帖一样，会存货一段时间后被和谐 -->
    <!-- 左边浏览 -->
    
    <div class="left_view d-flex flex-column  align-center">
    <div class="desc">
      <p class="subject">垃圾分类宣传标语</p>
      <p class="body">在这里，我们提供了大量的宣传标语供您参考，点击更多，即可查看全部，也允许您创建自己的标语，分享您的好主意。</p>
      </div>
    <div class="title"></div>
    <div class="slogan_content">
      <div class=" d-flex jc-start my-3 d-flex flex-row ai-center" v-for="slogan in slogans" :key="slogan.id" >
      <i class="before_title mr-3"></i>
      <p ><span class="fs-lg" >{{slogan.title}}</span></p>
      <div v-if="slogan.user">
        <div v-if=" slogan.user._id===user._id " class="user_option ml-5">
            <el-button class="userbtn" @click="deleteSlogan(slogan._id)">删除</el-button>
            <el-button  class="userbtn" @click="editSlogan(slogan)">编辑</el-button>
        </div>
      </div>
       <!-- <el-divider></el-divider> -->
    </div>
     <div class="d-flex jc-center ai-center pb-5 pr-6 mt-5" v-if="message==''"><el-button class="addbtn" @click=more()>更多</el-button></div>
    <div v-else class="d-flex jc-center ai-center pb-5">{{message}}......</div>
   </div>
   
    </div>
    <!-- 右边创建 -->
     <div class="right_create">

        <!-- <p class="fs-sm text-dark-1 pt-5">管理员开启了审核功能，请发表文明，创新的标语哦，否则您所发表的内容会突然消失呢</p> -->
        <!-- 为什么creative要加括号呢？ -->
        <div class="creative_form">
          <p class="fs-lg mb-3 text-black-text">{{yesEdit ? '编辑' : '创建'}}标语</p>
          <el-form  @submit.native.prevent="yesEdit ? updateSlogan(model._id) : creative()">
            <el-form-item  >
            <!-- <el-divider></el-divider> -->
            <el-input  type="text" v-model="model.title" style="width:100%"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button class="addbtn" native-type="submit">{{yesEdit ? '编辑' : '创建'}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="illustration"></div>
      </div>
  </section>
  </div>
</template>

<script>
export default {
  props:{id:String},
   data(){
        return {
            slogans:[],
            count:10,
            slogan_len:0,
            message:'',
            yesUser:false,
            model:{},
            user:{},
            yesEdit:false

        }
    },
    methods: {
    async fetchSlogan(){
      // 传参的时候不用: 直接/${varible} ,接收的时候要用 /:count
        const res = await this.$http.get(`slogans/list/${this.count}`)
        this.slogans=res.data
        },
        async fetchAllSlogan(){
      // 传参的时候不用: 直接/${varible} ,接收的时候要用 /:count
        const res = await this.$http.get(`slogans/all`)
        // this.slogans=res.data
        this.slogan_len =res.data.length
        console.log(this.slogan_len)
        },
       
    more(){
      this.count += 5;
      if(this.count<=this.slogan_len){ this.fetchSlogan() }
      else{
        this.message="已经没有了哦"
      }
      
    },
      creative(){
        console.log("creative")
        if(localStorage.token){
         this.save()
        }else{
          this.yesUser=false
           this.$message({
             type:'warning',
             message:'请先登录哦'
            })
        }
      },
      
       async fetchUser(){
        // 根据token获取用户
        if(localStorage.token){
            const res = await this.$http.get(`users`)
            this.user = res.data
            }
        },

      async save(){
        console.log("save")
      if(this.model.title){
        let res
        res = await this.$http.post('slogans/init',this.model)
        this.model={}
        this.$message({
          type:'success',
          message:'创建成功'
        })
     this.fetchSlogan()
    }else{
       this.$message({
       type:'info',
       message:'内容不能为空哦'
     })
    }
  },
  // 需要标语id 和 标语中保存得用户id  需要从数据库获取当前得用户id 如果当前用户id和标语中得id一致，那么就会在标语左边显示 编辑和删除得按钮，那么问题来了？
  // 不是所有的标语都有id 的 所以 要赋值处置 ‘’ 

   editSlogan(slogan){
          //一定要深拷贝
          this.model= JSON.parse(JSON.stringify(slogan))
          this.yesEdit=true
        },
       async updateSlogan(id){
          const res = await this.$http.put(`slogans/${id}`,this.model)
          this.$message({
            type: 'success',
            message: '修改成功!'
          });
           //更新完之后要复原
          this.yesEdit=false
          this.model={}
          this.fetchSlogan()
         
       },

      async deleteSlogan(id){
        this.$confirm(`是否确定要删除`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`slogans/${id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        this.fetchSlogan()
      });
    }

},
  
    created() {
      this.fetchSlogan()
      this.fetchAllSlogan()
      this.fetchUser()
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/variables';
  section{
    width:80vw;
    min-height:60vh;
    margin:0 auto;
    // margin-top:50px;
    background:white;
    
    .desc{
       
      margin-top:-100px;
      width:80%;
      height:200px;
      padding:20px;
      color: #343c3d;
      letter-spacing: 1.25px;
      p.subject{
      font-family:PublicoHeadline,serif;
      font-weight: bold;
      font-size:2.25rem;
      }
      p.body{
        margin-top:18px;
        font-size:1.0769rem;
        font-family: Source Sans Pro,sans-serif;
        font-size: 18px;
        font-weight: bold;
        color: #343c3d;
        line-height: 2rem;
      }
      
     }
    .left_view{
      margin-top:100px;
      .slogan_content{
      padding:20px;
      padding-left:45px;
      background:white;
      box-shadow: 0 0px 11px 0 rgba(52,60,61,0.08);
      }
      width:60%;
      min-height:50vh;
      z-index:1;
      .title{
      margin-top:10px;
      box-shadow: 0 0px 11px 0 rgba(52,60,61,0.08);
      background-color:rgb(0,191,166);
      height:60px;
      width:100%;
    }
      
      i.before_title{
        display:inline-block;
        background:url(../assets/images/plant.svg);
        background-size:100% 100%;
        width:50px;
        height:50px;
      }
      .addbtn{
      border:none;
      background-color:rgb( 0,191,166);
      color:#fff;
      width:194px;
      height:58px;
      font-size:16px;
      font-weight:bold;
      }
      .userbtn{
      width:70px;
      height:35px;
      font-size:14px;
      }
    }
    
    .right_create{
      width:40%;
     
      .illustration{
        width:80%;
        height:50vh;
        background:url(../assets/images/undraw_new_ideas.svg);
        background-size:100% 100%;
         margin-left:95px;
        // border:1px solid red;
      }
      .creative_form{
        background:#fff;
        box-sizing: border-box;
        padding:20px;
        width:80%;
        height:30vh;
        // border:1px solid red;
        margin-left:65px;
        margin-bottom:-20px;
         box-shadow: 0 0px 11px 0 rgba(52,60,61,0.08);
        z-index:1;
      }
      .addbtn{
      border:none;
      background-color:rgb( 0,191,166);
      color:#fff;
      width:91px;
      height:38px;
      font-size:14px;
      
      }
     
    }
    
  }

</style>