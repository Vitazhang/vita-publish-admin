<template>
  <el-container class="layout-container">
    <el-aside class="layout-aside" width="auto">
      <LayoutAside class="layout-aside" :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <div>
          <i
            :class="{ 'el-icon-back': !isCollapse, 'el-icon-right': isCollapse }"
            @click="isCollapse = !isCollapse"
          ></i>
          <span>咸宁园林绿化有限公司</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
            <img :src="user.photo" alt="" class="avatar-img" />
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">个人设置</el-dropdown-item>
            <el-dropdown-item 
            icon="el-icon-circle-plus"
            @click.native="onLogout()"
              >用户退出</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="layout-main"><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutAside from "@/views/layout/components/aside";
import { getUserProfile } from "@/api/user";
export default {
  name: "LayoutIndex",
  data() {
    return {
      isCollapse: false,
      user: {},
    };
  },
  components: {
    LayoutAside,
  },
  created() {
    this.loadUserProfile();
  },
  methods: {
    loadUserProfile() {
      getUserProfile().then((res) => {
        this.user = res.data.data;
      });
    },
    onLogout(){
      this.$confirm('是否退出登录', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
          //清除用户状态
          window.localStorage.removeItem('user')
          // 跳转到登录页面
          this.$router.push('/login')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消退出'
          });          
        });
    }
  },
};
</script>

<style lang="less" scoped>
.layout-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}
.layout-aside {
  height: 100%;
}
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-block: 1px solid #ccc;
}
.avatar-wrap {
  display: flex;
  align-items: center;
  .avatar-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 5px;
  }
}
</style>