<template>
  <div>
    <div>
      <el-radio-group v-model="collect" size="mini" @change="loadImages(1)">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button
        size="mini"
        type="success"
        v-if="isShowAdd"
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
        class="imgitem"
        @click.native="selected = index"
      >
        <el-image
          :src="img.url"
          :fit="fits[1]"
          style="height: 200px"
        ></el-image>
        <div 
        v-if="selected && isShowSelected=== index"
        class="selected"
        ></div>
        <div class="imgaction" v-if="isShowAction">
          <el-button
            type="warning"
            :icon="img.is_collected ? 'el-icon-star-on' : 'el-icon-star-off'"
            circle
            size="mini"
            @click="onCollect(img)"
            :loading="img.loading"
          ></el-button>

          <el-button
            type="danger"
            icon="el-icon-delete-solid"
            circle
            size="mini"
            @click="onDelete(img)"
          ></el-button>
        </div>
      </el-col>
    </el-row>

    <!-- 数据分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalCount"
      :on-success="onUploadSuccess"
      :page-size="pageSize"
      :current-page.sync="page"
    >
    </el-pagination>

    <el-dialog
      title="上传素材"
      :visible.sync="dialogUploadVisible"
      :append-to-body="true"
      @current-change="onPageChange"
    >
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        multiple
        :headers="uploadHeader"
        name="image"
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
import { getImages, collectImage, deleteImage } from "@/api/image";

export default {
  name: "ImageList",
  props: {
    isShowAdd: {
      type: Boolean,
      default: true,
    },
    isShowAction: {
      type: Boolean,
      default: true,
    },
    isShowSelected:{
      type:Boolean,
      default:false
    }
  },
  data() {
    const user = JSON.parse(window.localStorage.getItem("user"));

    return {
      collect: false,
      images: [], //图片素材列表
      dialogUploadVisible: false,
      uploadHeader: {
        Authorization: `Bearer ${user.token}`,
      },
      totalCount: 0, //总数据条数
      pageSize: 10, //每页大小
      page: 1,
      selected:null,
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
    };
  },
  created() {
    this.loadImages(1);
  },
  methods: {
    loadImages(page = 1) {
      //重置高亮页码,防止数据跟页码不对应
      this.page = page;
      getImages({
        collect: this.collect,
        page,
        per_page: this.pageSize,
      }).then((res) => {
        // 给图片添加属性,用来做判断
        const results = res.data.data.results;
        results.forEach((img) => {
          img.loading = false;
        });
        this.images = results;
        this.totalCount = res.data.data.total_count;
      });
    },

    onUploadSuccess() {
      // 关闭对话框
      this.dialogUploadVisible = false;
      //更新素材列表
      this.loadImages(this.page);
      this.$message({
        type: "success",
        message: "上传成功",
      });
    },
    onPageChange(page) {
      this.loadImages(page);
    },
    onCollect(img) {
      img.loading = true;
      // 决定是否收藏
      collectImage(img.id, !img.is_collected).then((res) => {
        img.is_collected = !img.is_collected;
        img.loading = false;
      });
    },
    onDelete(img) {
      deleteImage(img.id).then((res) => {
        this.loadImages(this.page);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.imgitem {
  position: relative;
}
.imgaction {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 25px;
  color: #fff;
  height: 40px;
  position: absolute;
  background-color: rgba(204, 204, 204, 0.4);
  bottom: 4px;
  left: 5px;
  right: 5px;
}
.selected{
  background: url(./1.jpg) no-repeat;
  background-size: cover;
  position:absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>