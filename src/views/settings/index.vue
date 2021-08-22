<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="15">
          <el-form 
          ref="form" 
          :model="user" 
          label-width="80px"
          :rules="formRules"
          >
            <el-form-item label="编号"> {{ user.id }} </el-form-item>
            <el-form-item label="手机"> {{ user.mobile }}</el-form-item>
            <el-form-item label="媒体名称" prop="name">
              <el-input type="text" v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button 
              type="primary" 
              @click="onUpdateUser"
              :loading='updateProfileLoading'
              >保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" :offset="2">
          <label for="file">
            <el-avatar shape="square" :size="150" :src="user.photo"></el-avatar>
            <p>点击修改图像</p>
          </label>
          <input
            type="file"
            hidden
            id="file"
            ref="file"
            @change="onFileChange"
          />
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      append-to-body
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div>
        <img
          :src="previewImage"
          height="200"
          style="display: block; maxwidth: 100%"
          ref="preview-image"
        />
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="updatePhotoLoading"
          @click="onUpdatePhoto"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { 
    getUserProfile, 
    updateUserPhoto,
    updateUserProfile,
     } from "@/api/user";
import "cropperjs/dist/cropper.css";
import Cropper from "cropperjs";
import globalBus from '@/utils/global-bus'
export default {
  name: "SettingsIndex",
  data() {
    return {

      user: {
        email: "",
        id: null,
        intro: "",
        mobile: "",
        name: "",
        photo: "",
      },
      formRules:{
          name:[
              {required:true,message:'请输入名称',trigger: "blur"},
              {min:1,max:7,message:'长度在1到7个字之间',trigger: "blur"}]
      },
      dialogVisible: false, //控制上传图片裁切预览的显示
      previewImage: "",
      cropper: null, // 裁切器实例
      updatePhotoLoading: false, //更新用户头像的状态
      updateProfileLoading:false, //更新基本信息的状态
    };
  },
  created() {
    this.loadUser();
  },
  methods: {
    onUpdateUser() {
      // 表单验证

      // 验证通过,提交表单
      this.updateProfileLoading = true
      updateUserProfile(this.user).then(res =>{
          this.$message({
              type:'success',
              message:'保存成功'
          })
          this.updateProfileLoading = false

          //发布通知,用户信息以修改
          globalBus.$emit('update-user',this.user)
      })
    },
    loadUser() {
      getUserProfile().then((res) => {
        this.user = res.data.data;
      });
    },
    onFileChange() {
      // 处理图片预览
      const file = this.$refs.file;
      const blobData = window.URL.createObjectURL(file.files[0]);
      this.previewImage = blobData;
      // 解决选择相同文件不触发 change 事件问题
      this.$refs.file.value = "";
      //展示弹出层,预览用户选择的图片
      this.dialogVisible = true;
    },
    onDialogOpened() {
      //获取图片节点
      const image = this.$refs["preview-image"];

      //初始化裁切器
      this.cropper = new Cropper(image, {
        aspectRatio: 1 / 1, //裁切的比例
        viewMode: 1, //裁切框不能移出图片
        dragMode: "none",
        background: false,
        cropBoxResizable: false,

        //移动裁切器就触发这个函数,里面有各种点位的信息
        crop(event) {
          console.log(event);
        },
      });
    },
    onDialogClosed() {
      //对话框关闭,销毁裁切器
      this.cropper.destroy();
    },
    onUpdatePhoto() {
      this.updatePhotoLoading = true;
      //获取裁切的图片对象
      this.cropper.getCroppedCanvas().toBlob((file) => {
        const fd = new FormData();
        fd.append("photo", file);
        //请求更新用户头像
        updateUserPhoto(fd).then((res) => {
          //关闭对话框
          this.dialogVisible = false;
          //更新视图展示

          //把服务端返回的图片进行展示有点慢
          this.user.photo = res.data.data.photo;
          //用这一种,直接把裁切结果的文件对象转为blob预览
          this.user.photo = window.URL.createObjectURL(file);

          this.updatePhotoLoading = false

          this.$message({
            type:'success',
            message:'更新头像成功'
          })

          globalBus.$emit('update-user',this.user)
        });
      });
    },
  },
};
</script>

<style>
</style>