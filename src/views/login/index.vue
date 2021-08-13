<template>
  <div class="login-contaier">
    <el-form
      ref="login-form"
      :model="user"
      class="login-div"
      :rules="formRules"
    >
      <el-form-item prop="mobile">
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>

      <el-form-item prop="agree">
        <el-checkbox v-model="user.agree"
          >我已阅读并同意用户协议和隐私条款</el-checkbox
        >
      </el-form-item>

      <el-form-item>
        <el-button
          type="primary"
          @click="onLogin"
          class="login-btn"
          :loading="loginLoading"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "@/api/user";

export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "13911111111", //手机号
        code: "246810", //验证码
        agree: false, //是否同意协议
      },

      loginLoading: false, //按钮状态
      formRules: {
        // 表单验证规则配置
        //需要验证的名称
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          {
            pattern: /^1[1|3|5|7|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          {
            pattern: /^\d{6}$/,
            message: "请输入正确的验证码格式",
            trigger: "blur",
          },
        ],
        agree: [
          //自定义验证规则
          //通过执行 callback()
          // 失败执行 callback(new Error())
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback();
              } else {
                callback(new Error("请勾选"));
              }
            },
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onLogin() {
      // 表单验证
      this.$refs["login-form"].validate((valid) => {
        if (!valid) {
          return;
        }
        //验证通过,请求登录
        this.login();
      });
    },
    login() {
      let user = this.user;
      // 开启登录中
      this.loginLoading = true;
      login(this.user)
        .then((res) => {
          this.$message({
            message: "登录成功",
            type: "success",
          });
          //关闭 loading
          this.loginLoading = false;
          // 接口返回的用户相关数据放到本地存储
          //本地存储只能存储字符串,要转换成JSON格式
          window.localStorage.setItem('user',JSON.stringify(res.data.data))
          //跳转到首页
          this.$router.push('/')
          // this.$router.push({
          //     name:'layout',
          // })
        })
        .catch((err) => {
          this.$message.error("手机号或者验证码错误");
          this.loginLoading = false;
        });
    },
  },
};
</script>

<style lang="less" scoped>
.login-contaier {
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
  .login-div {
    min-width: 300px;
    padding: 40px;
    background-color: #fff;
    .login-btn {
      width: 100%;
    }
  }
}
</style>

