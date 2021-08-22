<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form
        ref="publish-form"
        :model="article"
        :rules="formRules"
        label-width="60px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>

        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            lang="zh"
            height="400px"
            placeholder="请输入文章内容"
          ></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <template v-if="article.cover.type > 0">
            <UploadCover
              v-for="(cover, index) in article.cover.type"
              :key="index"
              @update-cover='onUpdateCover(index,$event)'
              :cover-image="article.cover.images[index]"
            />
          </template>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
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
import UploadCover from "./components/upload-cover.vue";
import {
  getArticleChannels,
  addArticle,
  getArticle,
  updateArticle,
} from "@/api/article";
import "element-tiptap/lib/index.css";
import { uploadImage } from "@/api/image";
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Image,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
} from "element-tiptap";
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
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Image({
          //默认把图片生成 base64位字符串和内容存储在一起,这样搞的图片很大
          uploadRequest(file) {
            const fd = new FormData();
            fd.append("image", file);
            return uploadImage(fd).then((res) => {
              return res.data.data.url;
            });
          },
        }),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // render command-button in bubble menu.
        new Underline({ bubble: true, menubar: false }), // render command-button in bubble menu but not in menubar.
        new Italic(),
        new Strike(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
      ],
      formRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          { min: 5, max: 30, message: "长度在5到30个字符", trigger: "blur" },
        ],
        content: [
          {
            validator(rule, value, callback) {
              if (value === "<p></p>") {
                callback(new Error("请输入文章内容"));
              } else {
                callback();
              }
            },
          },
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
        channel_id: [{ required: true, message: "请选择文章频道" }],
      },
    };
  },
  methods: {
    loadChannels() {
      getArticleChannels().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    onPublish(draft) {
      this.$refs["publish-form"].validate((valid) => {
        // 验证失败
        if (!valid) {
          return;
        }
        //验证通过
        const aid = this.$route.query.id;
        //如果是修改文章,则执行修改操作,否则执行添加操作
        if (aid) {
          updateArticle(aid, this.article, draft).then((res) => {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            this.$router.push("/article");
          });
        } else {
          addArticle(this.article, draft).then((res) => {
            this.$message({
              message: "发布成功",
              type: "success",
            });
            this.$router.push("/article");
          });
        }
      });
    },
    loadArticle() {
      getArticle(this.$route.query.id).then((res) => {
        this.article = res.data.data;
      });
    },
    onUpdateCover(index,url){
      this.article.cover.images[index] = url
    }
  },
  created() {
    this.loadChannels();
    // 由于让发布和修改使用的是同一个组件,所以要判断
    // 如果路由路径参数有id,则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle();
    }
  },
  components: {
    "el-tiptap": ElementTiptap,
    UploadCover,
  },
};
</script>

<style>
</style>