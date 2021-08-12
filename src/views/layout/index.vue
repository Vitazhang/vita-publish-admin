<template>
  <el-container class="layout-container">
    <el-aside class="layout-aside" width="200px">
      <LayoutAside class="layout-aside" />
    </el-aside>
    <el-container>
      <el-header class="layout-header">
        <div>
          <i class="el-icon-s-fold"></i>
          <span>咸宁园林绿化有限公司</span>
        </div>
        <el-dropdown>
          <div class="avatar-wrap">
              <img :src="user.photo" alt="" class="avatar-img">
              <span>{{user.name}}</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">个人设置</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus"
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
import { getUserProfile} from '@/api/user'
export default {
  name: "LayoutIndex",
  data() {
      return {
          user: {}
      }
  },
  components: {
    LayoutAside,
  },
  created(){
      this.loadUserProfile()
  },
  methods: {
      loadUserProfile() {
          getUserProfile().then((res)=>{
              this.user = res.data.data
          })
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
.avatar-wrap{
    display: flex;
    align-items: center;
    .avatar-img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 5px;
    }
}
</style>