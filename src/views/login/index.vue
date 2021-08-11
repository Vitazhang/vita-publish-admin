<template>
  <div class="login-contaier">
    <el-form 
    ref="form" 
    :model="user"
    class="login-div">
      
        <el-form-item>
            <el-input 
            v-model="user.mobile"
            class="login-mobile"
            placeholder='请输入手机号'></el-input>
        </el-form-item>
        
        <el-form-item>
            <el-input 
                v-model="user.code"
                class="login-code"
                placeholder='请输入验证码'></el-input>
        </el-form-item>
            
        <el-form-item>
            <el-checkbox v-model="user.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
            
        </el-form-item>

        <el-form-item >
            <el-button 
            type="primary" 
            @click="onLogin"
            class="login-btn"
            :loading="loginLoading"
            >登录</el-button>
        </el-form-item>
    </el-form>  
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
    name:'LoginIndex',
    data() {
        return {
        user: {
          mobile: '13911111111',  //手机号
          code:'246810', //验证码
        },
        checked: false, // 协议的状态
        loginLoading:false, //按钮状态
        }
    },
     methods: {
      onLogin() {
          let user = this.user
          this.loginLoading != this.loginLoading
        if(this.user.checked && this.user.mobile !== '' && this.user.code !== ''){
            request({
                method:'POST',
                url:'/mp/v1_0/authorizations',
                data:user
            }).then(res =>{
                this.$message({
                message: '登录成功',
                type: 'success'
                });
                this.loginLoading != this.loginLoading
            }).catch(err =>{
                this.$message.error('手机号或者验证码错误');
                this.loginLoading != this.loginLoading
            })
        }
      }
    }
}
</script>

<style lang="less" scoped>
.login-contaier{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url(./梦想.jpg) no-repeat;
    background-size: cover;
    .login-div{
        min-width: 300px;
        padding: 40px;
        background-color: #fff;
        .login-btn{
            width: 100%;
        }
    }
}
</style>

