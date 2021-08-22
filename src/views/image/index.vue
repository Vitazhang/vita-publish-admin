<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <ImageList/>
    </el-card>
  </div>
</template>

<script>
import ImageList from './components/image-list.vue'
export default {
  name: "ImageIndex",
  components:{
    ImageList
  }
};
</script>
