<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div>
        <el-radio-group v-model="collect" size="mini" @change="onsb">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="mini"
          type="success"
          @click="dialogUploadVisible = true"
          >添加素材</el-button
        >
      </div>
      <!-- 素材列表 -->
      <el-row :gutter="10">
        <el-col
          :span="4"
          :lg="4"
          :md="6"
          v-for="(img, index) in images"
          :key="index"
        >
          <el-image :src="img.url" :fit="fits[2]"></el-image>
        </el-col>
      </el-row>
    </el-card>

    <!-- 弹出层 -->
    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        multiple
        :headers="uploadHeader"
        name="image"
        :on-success="onUploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages } from "@/api/image";

export default {
  name: "ImageIndex",
  data() {
    const user = JSON.parse(window.localStorage.getItem("user"));

    return {
      collect: false,
      images: [], //图片素材列表
      dialogUploadVisible: false,
      uploadHeader: {
        Authorization: `Bearer ${user.token}`,
      },
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    };
  },
  created() {
    this.loadImages(false);
  },
  methods: {
    loadImages(collect = false) {
      getImages({
        collect,
      }).then((res) => {
        this.images = res.data.data.results;
      });
    },
    onsb(value) {
      this.loadImages(value);
    },
    onUploadSuccess(){
        // 关闭对话框
    this.dialogUploadVisible = false
        //更新素材列表
        this.loadImages(false)
    }
  },
};
</script>

<style>
</style>