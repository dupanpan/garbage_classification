<template>
    <div>
     <h1>报表列表</h1>
     <el-table :data="items">
        
            <el-table-column prop="_id" label="ID" width="250"></el-table-column>
            <el-table-column prop="city.city" label="城市"></el-table-column>
            <el-table-column prop="recyclable" label="可回收量(吨)"></el-table-column>
            <el-table-column prop="dry" label="干垃圾量(吨)"></el-table-column>
            <el-table-column prop="wet" label="湿垃圾量(吨)"></el-table-column>
            <el-table-column prop="hazardous" label="有害垃圾量(吨)"></el-table-column>
            <el-table-column prop="updatedAt" label="上报时间"></el-table-column>

            <!-- <el-table-column prop="" label="总计(吨)"></el-table-column> -->

           <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
      
      <!-- 这里的push（）是push到路由去的，不是http的请求路径 -->
        <el-button type="text" size="small" @click="$router.push(`/tables/edit/${scope.row._id}`)">编辑
        </el-button>
              <!-- scope.row 把整个一行数据传给他 -->
              <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
      </template>
    </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return {

            items:[]
        }
    },
    methods:{
      async fetch(){
          const res = await this.$http.get('rest/tables')
        //   console.log(res)
          this.items=res.data
          // console.log(this.items)
          
        },
        async remove(row){
          this.$confirm(`是否确定要删除分类${row._id}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`rest/tables/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch()
        });
        }
    },
    created(){
        // 创建之后，自动执行fetch()
        this.fetch()
    }
}
</script>

<style>

</style>