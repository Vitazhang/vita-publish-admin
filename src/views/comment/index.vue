<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table :data="articles" style="width: 100%" stripe>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数">
        </el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数">
        </el-table-column>
        <el-table-column prop="address" label="状态">
          <template slot-scope="scope">
            {{ scope.row.comment_status ? "正常" : "关闭" }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="onStatusChange(scope.row)"
              :disabled="scope.row.statusDisabled"
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 30, 40]"  
        :page-size.sync="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, updateCommentStatus } from "@/api/article";
export default {
  name: "CommentIndex",
  data() {
    return {
      articles: [], //文字数据列表
      totalCount:0,  //总数据条数
      pageSize:10,
      page:1, //当前激活的页面
    };
  },
  methods: {
    handleSizeChange() {
      this.loadArticles(1)
    },
    handleCurrentChange(page) {
        //页面改变,加载指定页码数据
      this.loadArticles(page)
    },
    loadArticles(page = 1,) {
        this.page = page
      getArticles({
        response_type: "comment",
        page,
        pre_page:this.pageSize,
      }).then((res) => {
        const {results} = res.data.data;
        results.forEach((article) => {
          article.statusDisabled = false;
        });

        this.articles = results;
        this.totalCount = res.data.data.total_count
      });
    },
    onStatusChange(article) {
      //禁用开关
      article.statusDisabled = true;
      //请求提交修改
      updateCommentStatus(article.id.toString(), article.comment_status).then(
        (res) => {
          article.statusDisabled = false;
        }
      );
    },
  },
  created() {
    this.loadArticles();
  },
};
</script>

<style>
</style>