<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="article" label-width="40px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              v-for="(item, index) in channels"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getArticleChannels,
  addArticle,
  getArticle,
  updateArticle,
} from "@/api/article";
export default {
  name: "PublishIndex",
  data() {
    return {
      article: {
        title: "", //文字标题
        content: "", //文字内容
        cover: {
          //文章封面
          type: 0, //封面类型
          //自动 -1 ,无图 0 ,一张 1 ,三张 3
          images: [], //封面图片的地址
        },
        channel_id: null,
      },
      channels: [], //文字频道
    };
  },
  methods: {
    loadChannels() {
      getArticleChannels().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    onPublish(draft) {
      const aid = this.$route.query.id;
      //如果是修改文章,则执行修改操作,否则执行添加操作
      if (aid) {
        updateArticle(aid, this.article, draft).then((res) => {
          this.$message({
            message: "修改成功",
            type: "success",
          });
          this.$router.push('/article')
        });
      } else {
        addArticle(this.article, draft).then((res) => {
          this.$message({
            message: "发布成功",
            type: "success",
          });
          this.$router.push('/article')
        });
        
      }
      
    },
    loadArticle() {
      getArticle(this.$route.query.id).then((res) => {
        this.article = res.data.data;
      });
    },
  },
  created() {
    this.loadChannels();
    // 由于让发布和修改使用的是同一个组件,所以要判断
    // 如果路由路径参数有id,则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle();
    }
  },
};
</script>

<style>
</style>