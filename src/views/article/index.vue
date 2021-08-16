<template>
  <div>
    <el-card class="filte-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <!-- <el-radio :label="4">已删除</el-radio> -->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="rangeDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="loadArticles(1)"
            >筛选</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到{{ totalCount }}条结果:
      </div>
      <!-- 表格 -->
      <el-table
        :data="articles"
        border
        style="width: 100%"
        size="small"
        v-loading="loading"
      >
        <el-table-column label="封面">
          <template slot-scope="scope">
            <el-image
              style="width: 50px; height: 50px"
              :src="scope.row.cover.images[0]"
              fit="cover"
              lazy
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">
              {{ articleStatus[scope.row.status].text }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
              @click="$router.push('/publish?id=' + scope.row.id)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="onDeleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="onCurrentChange"
        :page-size="pageSize"
        :disabled="loading"
        :current-page.sync="page"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels, deletaAeticle } from "@/api/article";
export default {
  name: "ArticleIndex",
  data() {
    return {
      form: {
        name: "",
        delivery: false,
        type: [],
        desc: "",
      },
      articles: [],
      articleStatus: [
        { text: "草稿", type: "info" },
        { text: "待审核", type: "" },
        { text: "审核通过", type: "success" },
        { text: "审核失败", type: "warning" },
        { text: "已删除", type: "danger" },
      ],
      totalCount: 0, //总数据条数
      pageSize: 10, //每页展示多少条
      status: null, //查询文章状态
      channels: [], //文章频道列表
      channelId: null, //查询文章的频道
      rangeDate: null, //筛选日期
      loading: true, //加载动画
      page: 1, //当前页码
    };
  },
  methods: {
    loadArticles(page = 1) {
      // 展示加载
      this.loading = true;
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        // 非空效验
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null, //开始日期
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null, //结束如期
      }).then((res) => {
        const { results, total_count: totalCount } = res.data.data;
        this.articles = results;
        this.totalCount = totalCount;
        //关闭加载动画
        this.loading = false;
      });
    },
    onCurrentChange(page) {
      this.loadArticles(page);
    },
    loadChannels() {
      getArticleChannels().then((res) => {
        this.channels = res.data.data.channels;
      });
    },
    onDeleteArticle(aid) {
      this.$confirm("确定删除该文章?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          //确认执行下面
           deletaAeticle(aid.toString()).then(res => {
            //删除成功,更新当前页的文章数据列表
            this.loadArticles(this.page);
             this.$message({
            type: 'success',
            message: '删除成功!'
          });
          });
        }).catch(() => {
          this.$message({
            type: "info",
            message: "取消删除",
          });
        });
    },
  },
  created() {
    this.loadArticles();
    this.loadChannels();
  },
};
</script>

<style lang="less" scoped>
.filte-card {
  margin-bottom: 30px;
}
.item-table {
  margin-bottom: 30px;
}
</style>