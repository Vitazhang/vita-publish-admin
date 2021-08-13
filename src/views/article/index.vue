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
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-date-picker
            v-model="form.value1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">筛选</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">根据筛选条件共查询到10000条结果:</div>
      <!-- 表格 -->
      <el-table
        :data="articles"
        border
        style="width: 100%"
        size="small"
      >
        <el-table-column prop="date" label="封面"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column 
   
        label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1" type="warning">待审核</el-tag>
            <el-tag  v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>
            <el-tag  v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>
            <el-tag  v-else-if="scope.row.status === 4" type="info">已删除</el-tag>
          </template>
           </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column prop="name" label="操作">
          <template>
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              circle
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination layout="prev, pager, next" :total="1000"> </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles } from "@/api/article";
export default {
  name: "ArticleIndex",
  data() {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        value1: "",
        value2: "",
      },
      articles: [],
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    loadArticles() {
      getArticles().then((res) => {
        this.articles = res.data.data.results;
        console.log(res);
      });
    },
  },
  created() {
    this.loadArticles();
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