<template>
  <el-menu
    :default-active="$route.path"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse='isCollapse'
  >
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title" class="itemspan">首页</span>
    </el-menu-item>

    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="el-icon-picture"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="el-icon-reading"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="el-icon-chat-dot-square"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="el-icon-cold-drink"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-user"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "Layout-Components-aside",
  props:['isCollapse'],
  data() {
    return {
     
    }
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.itemspan{
  display: inline-block;
  width: 120px;
}
</style>