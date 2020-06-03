<template>
  <div class="about">
      <h1>{{id ? '编辑' : '新建'}}垃圾清运报表</h1>

      <el-form label-width="120px"  @submit.native.prevent="save">
        <el-form-item label="地区">
          <!-- 数据双向绑定  v-model-->
          <el-select v-model="model.city">
            <el-option v-for="item in cities" :key="item._id" :label="item.city" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可回收垃圾量(吨)">
          <el-input v-model="model.recyclable"></el-input>
        </el-form-item>
         <el-form-item label="湿垃圾量(吨)">
          <el-input v-model="model.wet"></el-input>
        </el-form-item>
         <el-form-item label="干垃圾量(吨)">
          <el-input v-model="model.dry"></el-input>
        </el-form-item>
         <el-form-item label="有害垃圾量(吨)">
          <el-input v-model="model.hazardous"></el-input>
        </el-form-item>
            <!-- <el-form-item label="总计(吨)">
          <el-input v-model="model.hazardous"></el-input>
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
      model:{},
      cities:[]
    }
  },
  methods:{

    
    async save(){
      let res
      if(this.id){

        res = await this.$http.put(`rest/tables/${this.id}`,this.model)

      }else{

        res = await this.$http.post('rest/tables',this.model)

      }
     this.$router.push('/tables/list')
     this.$message({
       type:'success',
       message:'保存成功'
     })
    },
    async fetch(){
    const res = await this.$http.get(`rest/tables/${this.id}`)
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

</style>