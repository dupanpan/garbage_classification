<template>
 <div class="searchPage">
   
      <section id="search">
        <div class="container d-flex flex-column jc-center  ai-center"  >
         
                <!-- <div><h1 class="pb-5 slogan">垃圾分类，从我做起</h1></div> -->
                <div class="searchBox d-flex  bg-white ai-center">
                <input type="text" class="flex-1 pl-5" placeholder="请输入关键字" v-model="model.name"  v-on:keyup.enter=fetchGarbage() v-on:input="fetched=false">
                 <button type="button" class="btn searchBtn mx-2" v-on:click=fetchGarbage()>搜 索</button>
                </div>
            <div class="hotSearch d-flex jc-between px-2  ai-center "  >
              <span class="fs-sm mb-2">你可能想搜：</span>
              <p v-for="item in hotKeys" :key="item"><span class="fs-sm mb-2 " v-on:click="gethotkey(item)">{{item}}</span></p>
            </div>
       
          <div  class="search_answer   d-flex  flex-column jc-start" v-if="model.name==''" > </div>
          <div v-else>
          <div v-if="model.name && fetchModel && fetchModel.name == model.name">
           
              <p class="px-3 pt-6  title">{{fetchModel.name}}属于{{fetchModel.category.name}}</p>
           
          </div> 
          
         
          <div v-if="fetched && model.name != '' && fetchModel ==='' ">

             <div  class="no_answer"></div>

           <el-button   @click="dialog = true" class=" addbtn mb-3">补录分类</el-button>
            </div>
            </div>
           <el-drawer
              title="补录分类"
              :before-close="handleClose"
              :visible.sync="dialog"
              direction="rtl"
              custom-class="demo-drawer"
              ref="drawer"
              size="50%"
              >
              <div class="demo-drawer__content">
                <el-form :model="model">
                  <!-- 所属分类要用一个下拉菜单供用户选择，那么就要fetch后台的垃圾分类  -->
                  <el-form-item label="垃圾名称" :label-width="formLabelWidth">
                    <el-input v-model="model.name" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="所属分类" :label-width="formLabelWidth">
                    <el-select v-model="model.category" placeholder="请选择分类">
                      <el-option  v-for="item in categories" :key="item._id" :label="item.name" :value="item._id"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
                <div class="demo-drawer__footer">
                  <el-button @click="cancelForm">取 消</el-button>
                  <el-button type="primary" @click="$refs.drawer.closeDrawer()" :loading="loading">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
                </div>
              </div>
            </el-drawer>
          
        </div>
    </section>
 </div>
 
</template>

<script>
export default {
    data(){
        return {
          fetched:false,
          categories:[],
            garbage:'',
            model:{name:''},
            fetchModel:{},
            hotKeys:
            ['橙子','口罩','酒精','奶茶','口红','外卖盒','饭菜','坚果壳'],
            drawer: false,
            direction: 'rtl',
            dialog: false,
            loading: false,
            formLabelWidth: '80px',
           timer: null,
              form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
        }
    },
    methods: {
        async fetchCategories(){
          const res = await this.$http.get(`categories/garbage`)
          
          this.categories = JSON.parse(JSON.stringify(res.data))
          
          },
      async fetchGarbage(){
        if(this.model.name==""){
            this.$message({
          type:'info',
          message:'内容不能为空o~'
        })
        }
          const res = await this.$http.get(`items/${this.model.name}`)
          this.fetchModel = res.data
          this.fetched=true
          },
      gethotkey(item){
        this.model.name=item
        this.fetchGarbage()
      },
      async  add(){
          console.log(this.model)
        
          const res = await this.$http.post(`items/add`,this.model)
          // this.model={}
          this.$message({
          type:'success',
          message:'创建成功,谢谢您的补充~'
        })
        this.fetchGarbage()
      },
      handleClose(done) {
      if (this.loading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(_ => {
          this.loading = true;
          this.add()
          this.timer = setTimeout(() => {
            done();
            // 动画关闭需要一定的时间
            setTimeout(() => {
              this.loading = false;
            }, 400);
          }, 2000);
        })
        .catch(_ => {});
    },
    cancelForm() {
      this.loading = false;
      this.dialog = false;
      clearTimeout(this.timer);
    }
    },
    created() {
      // if(this.garbage ===''){
      //   this.model=null
      // }
        if(this.model.name ===''){
        this.fetchModel=null
        this.fetched=false
      }
      this.fetchCategories()
    },
  
}
</script>
<style lang="scss" scoped>
@import '../assets/scss/variables';


.searchPage{
  // margin-top:-250px;
  width:100%;
  color:#343c3d;
  min-height:60vh;
  background-size:50%;
  section{
    width:100%;
  }
  section .adorn{
    height:2vh;
  }

    .container{
    width:90%;
    text-align: center;
    color: #ffffff;
    padding-top:100px;
}
.hotSearch {
  margin-top:10px;
  flex-wrap: wrap;
  span{
    
    margin-left:5px;
    display: inline-block;
    text-align:center;
    color:#777;
  }
}
.title{
        
        line-height:30px;
        // text-align:center;
        color: #343c3d;
        letter-spacing: 1.25px;
        font-family:PublicoHeadline,serif;
        font-weight: bold;
        font-size:1.75rem;
        margin-bottom:25px;
    }
.search_answer{
  color:#343c3d;
  margin-top:20px;
  margin-left:20px;
  height:30vh;
  width:30vw;
  background:url('../assets/images/undraw_file_searching_duff.svg')  no-repeat ;
  background-size:100% 100%;
}
.no_answer{
  margin-top:25px;
  height:25vh;
  width:25vw;
  background:url('../assets/images/undraw_page_not_found_su7k.svg')  no-repeat ;
  background-size:100% 100%;
}
  .searchBtn{
        width:110px;
        height:50px;
        border-radius:25px;
        font-size:20px;
        background-color: rgb(0,178,137);
        color:white;

    }
    .searchBox{
        width:36vw;
        height:9vh;
        border-radius: 42px;;
        border:2px solid rgb(0,178,137);
        outline: none;
        input[type="text"]{
        height:7.6vh;
        margin-left:2px;
        border:1px solid white;
        border-radius: 42px;
        box-sizing: border-box;
        outline: none;
        font-size:20px;
        color:#343c3d;
      }
    }
    
    .slogan{
      font-size:28px;
      color:map-get($map: $colors, $key:"purple" );
      color:#343c3d;
      font-weight:normal;
    }
   
    .addbtn{
      margin-top:35px;
      background-color:rgb( 0,178,137);
      color:#fff;
      width:150px;
      height:58px;
      font-size:16px;
      font-weight:bold;
      
    }
}

  
</style>