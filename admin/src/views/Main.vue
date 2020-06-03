<template>
    <el-container style="height: 100vh; border: 1px solid #eee">
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <!-- 设置默认展开菜单1,一次只展开一个,设置当前页面的菜单项高亮 -->
    <el-menu router :default-openeds="['1','2','3']" unique-opened default-active="$route.path"> 
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>内容管理</template>
        <el-menu-item-group>
          <template slot="title">分类</template>
          <el-menu-item index="/categories/create">新建分类</el-menu-item>
          <el-menu-item index="/categories/list">分类列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">物品</template>
          <el-menu-item index="/items/create">新建物品</el-menu-item>
          <el-menu-item index="/items/list">物品列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">宣传语</template>
          <el-menu-item index="/slogans/create">新增宣传语</el-menu-item>
          <el-menu-item index="/slogans/list">宣传语列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">城市</template>
          <el-menu-item index="/cities/create">新增城市</el-menu-item>
          <el-menu-item index="/cities/list">城市列表</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group>
          <template slot="title">源头</template>
          <el-menu-item index="/origins/create">新增源头</el-menu-item>
          <el-menu-item index="/origins/list">源头列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">垃圾处置场</template>
          <el-menu-item index="/places/create">新增场所</el-menu-item>
          <el-menu-item index="/places/list">场所列表</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">垃圾清运报表</template>
          <el-menu-item index="/tables/create">新增报表</el-menu-item>
          <el-menu-item index="/tables/list">报表列表</el-menu-item>
        </el-menu-item-group>

        
        <el-menu-item-group>
          <template slot="title">测验题</template>
          <el-menu-item index="/quizzes/create">新增题目</el-menu-item>
          <el-menu-item index="/quizzes/list">题目列表</el-menu-item>
        </el-menu-item-group>

      </el-submenu>

<!-- index =3 就默认是展开的菜单 -->
       <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>运营管理</template>
     
        <el-menu-item-group>
          <template slot="title">文章</template>
          <el-menu-item index="/articles/create">新建文章</el-menu-item>
          <el-menu-item index="/articles/list">文章列表</el-menu-item>
        </el-menu-item-group>
        <!-- <el-menu-item-group>
          <template slot="title">广告位</template>
          <el-menu-item index="/ads/create">新建广告位</el-menu-item>
          <el-menu-item index="/ads/list">广告位列表</el-menu-item>
        </el-menu-item-group> -->
        <el-menu-item-group>
          <template slot="title">留言</template>
          <el-menu-item index="/messages/list">留言列表</el-menu-item>
        </el-menu-item-group>
     
      </el-submenu>
         <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>系统设置</template>
     
        <el-menu-item-group>
          <template slot="title">管理员</template>
          <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
          <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
        </el-menu-item-group>
       
       <el-menu-item-group>
          <template slot="title">用户</template>
          <el-menu-item index="/users/list">用户列表</el-menu-item>
        </el-menu-item-group>
     
      </el-submenu>
     
    </el-menu>
  </el-aside>
  
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item></el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>Admin</span>
    </el-header>
    
    <el-main>
    <!-- 这里作为路由容器,装子路由 CategoryEdit 等，因为主页面，左边的菜单不会变化，只是中间展示的内容变了 -->
    <router-view :key="$route.path"></router-view>
    </el-main>
  </el-container>
</el-container>
</template>



<style>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .el-aside {
    color: #333;
  }
</style>

<script>
  export default {
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  };
</script>