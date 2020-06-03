<template>
  <div class="info_content">
    <div class="left_side">
    <div class="desc">
      <p class="title">垃圾分类报表</p>
      <p class="desc_body">在这里你可以进行城市定位，获取你所在的城市的最新垃圾分类报表信息，了解城市垃圾运作状态，身体力行的为城市的绿色发展贡献力量。</p>
    </div>
    <div class="illustration"></div>
    </div> 
      <section id="table">
     <div class="d-flex jc-center ai-center mt-4">
     <p class="title">垃圾分类报表</p>
     <div class="user_opt">
        <el-button class=" locale " @click="drawer = true" type="text" style="margin-left: 16px;" v-if="city" >({{city}})</el-button>
        <el-button class="self-end py-5 login" @click="drawer = true" type="text" style="margin-left: 16px;" v-else><i class="iconfont icon-location1 "></i></el-button>
      </div>
      </div>
              <div class="show_table d-flex jc-center">
             <el-table 
            
            class="el_table my-5"
            :data="tableList"
            stripe
            style="width: 100%">
            <!-- <el-table-column
            prop="_id"
            label="编号"
            >
            </el-table-column> -->
            <el-table-column
            prop="city"
            label="城市"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="recyclable"
            label="可回收量（吨）"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="wet"
            label="湿垃圾量（吨）"
            align="center"
            >
            </el-table-column>
             <el-table-column
             align="center"
            prop="dry"
            label="干垃圾量（吨）"
            >
            </el-table-column>
             <el-table-column
             align="center"
            prop="hazardous"
            label="有害垃圾量（吨）"
            >
            </el-table-column>
            <el-table-column
            align="center"
            prop="updatedAt"
            label="日期"
            >
            </el-table-column>
        </el-table>
        </div>
        <el-button  type="primary" icon="document" @click="handleDownload" class="elbtn mt-5">导出excel</el-button>
        </section>
         <el-drawer title="我是标题" :visible.sync="drawer"  :with-header="false" size="100%" direction="rtl">
           <Bmap @cityhandle = getCity></Bmap>
            </el-drawer>
  </div>
</template>

<script>

import '../assets/scss/_variables.scss'
import '../assets/scss/style.scss'
import Bmap from '../components/Bmap.vue'
import { parseTime } from "@/utils/setMethods"
import { json2excel } from "@/utils/setMethods.js"
import dayjs from 'dayjs'
export default {
    components: {
    Bmap
  },
    data(){
        return {
            garbage:'',
            model:null,
            drawer: false,
            // city:"北京市",
            city:""

        }
        },
    methods: {
    async fetchHandlePlace(){
        const res = await this.$http.get(`tables/${this.city}`)
        this.model = res.data
         //深拷贝
        this.tableList = JSON.parse(JSON.stringify(this.model[0].tableList))
        //为了获得一个扁平化数据的数组
        for(let table of this.model ){
            for(let item of this.tableList){
                item.city=table.city
                item.updatedAt=this.dateFormat(item.updatedAt)
            }
        }
        console.log(this.tableList)
        }
    ,
    getCity(){
        this.city = arguments[0]
        this.fetchHandlePlace()
        this.drawer=false
    },
     
    //点击下载事件
    handleDownload () {
        //注意：组装的导出excel所需要的数据结构
      var excelDatas = [
        {
          tHeader: [ "城市","可回收量（吨）","湿垃圾量（吨）","干垃圾量（吨）","有害垃圾量", "更新时间"], // sheet表一头部
          filterVal: [ "city",'recyclable','wet','dry','hazardous',"updatedAt"], // 表一的数据字段
          tableDatas: this.tableList, // 表一的整体json数据
          sheetName: "sheet1"// 表一的sheet名字
        }
      ]
        //   引入的函数
      json2excel(excelDatas, "垃圾分类报表", true, "xlsx")
    },
    dateFormat(val) {
       return dayjs(val).format('YYYY/MM/DD')
    }
 
  },
 
  filters: {
    timestampToTime (val, timestamp) {
      return parseTime(val, timestamp)
    }
  },
mounted () {
    this.listLoading = false
  },
     
// },
created() {
   this.fetchHandlePlace()
},
}

</script>

<style lang=scss scoped>

.info_content{
    max-width:90vw;
    min-height:80vh;
    margin:0px auto;
    display:flex;
    padding-left:20px;
    .left_side{
      margin-top:45px;
      width:40vw;
      height:80vh;;
      .desc{
        color: #343c3d;
        padding-left:50px;
        display:flex;
        flex-direction: column;
        margin-bottom:80px;
        .title{
          font-family:PublicoHeadline,serif;
          font-weight: bold;
          font-size:2.25rem;
        }
        .desc_body{
          font-weight:bold;
          width:80%;
          margin-top:30px;
          font-size:1.0769rem;
          font-family: Source Sans Pro,sans-serif;
          font-size: 17px;
          font-weight: bold;
          color: #343c3d;
          line-height: 2rem;
        }
       }
      .illustration{
        z-index:5;
        margin-top:-30px;
        width:500px;
        height:350px;;
        background: url("../assets/images/undraw_download_files.svg")  no-repeat top left;
        background-size:100% 100%;
        
      }
    }
     .title{
        
        line-height:30px;
        text-align:center;
        color: #343c3d;
        letter-spacing: 1.25px;
        font-family:PublicoHeadline,serif;
        font-weight: bold;
        font-size:1.75rem;
    }
   section#table{
    box-sizing: border-box;
    border-top:45px solid rgb( 0,191,166);
    color: #343c3d;
    background:#fff;
    box-shadow: 0 0px 11px 0 rgba(52,60,61,0.08);
    width:55vw;

    margin:0 auto;
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top:0px;
    margin-left:-79px;
    z-index:1;
   .show_table{

    width:98%;
    
    }
   
    .elbtn{
      border:none;
      background-color:rgb( 0,191,166);
      color:#fff;
      
      width:150px;
      height:46px;
      margin:30px auto;
      font-size:18px;
      font-weight:bold;
      letter-spacing: 2px;
      
    }
     .icon-location1{
      font-size:28px;
      color:rgb( 0,191,166);
    }
    .locale{
      width:100px;
      height:45px;
      font-size:18px;
       color:rgb( 0,191,166);
    }
    }
    }
</style>