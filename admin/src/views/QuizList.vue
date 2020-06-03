<template>
    <div>
     <h1>题目列表</h1>
     <el-table :data="items">
        
            <el-table-column prop="_id" label="ID" width="250"></el-table-column>
            <el-table-column prop="subject" label="问题"></el-table-column>
          

           <el-table-column fixed="right" label="操作" width="180">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="$router.push(`/quizzes/edit/${scope.row._id}`)">编辑
        </el-button>
            
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
          const res = await this.$http.get('rest/quizzes')
        //   console.log(res)
          this.items=res.data
          // console.log(this.items)
          
        },
        async remove(row){
          this.$confirm(`是否确定要删除题目${row._id}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`rest/quizzes/${row._id}`)
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