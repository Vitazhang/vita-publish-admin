<template>
  <div class="upload-cover" @click="showCoverSelect">
    <div class="cover-wrap">
      <img
        ref="cover-image"
        width="100"
        :src="coverImage"
        class="cover-image"
      />
    </div>
    <el-dialog title="选择封面" :visible.sync="dialogVisible" append-to-body>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <ImageList 
          :is-show-add="false" 
          :is-show-action="false" 
          is-show-selected
          ref="image-list"
          />
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input type="file" ref="file" @change="onFileChange" />
          <img width="100" ref="preview-image" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from "@/api/image";
import ImageList from "@/views/image/components/image-list.vue";
export default {
  name: "UploadCover",
  props: ["cover-image"],
  data() {
    return {
      dialogVisible: false,
      activeName: "first", //默认被激活
    };
  },
  methods: {
    // 展示封面弹窗
    showCoverSelect() {
      this.dialogVisible = true;
    },
    onFileChange() {
      //获取文件对象
      const file = this.$refs.file.files[0];

      //图片预览
      const blob = window.URL.createObjectURL(file);
      this.$refs["preview-image"].src = blob;
    },
    onCoverConfirm() {
      if (this.activeName === "second") {
        const file = this.$refs.file.files[0];
        if (!file) {
          this.$message("请选择文件");
          return;
        }
        //上传文件
        const fd = new FormData();
        fd.append("image", file);
        uploadImage(fd).then((res) => {
          //关闭弹出层
          this.dialogVisible = false;
          //展示上传的图片
          this.$refs["cover-image"].src = res.data.data.url;

          //将图片地址发送给父组件
          this.$emit("update-cover", res.data.data.url);
        });
      } else if(this.activeName==='first'){
        const imageList = this.$refs['image-list']
        const selected = imageList.selected
        if (selected === null) {
          this.$message('请选择封面图片')
          return 
        }
        //关闭对话框
        this.dialogVisible = false
        //修改父组件绑定数据
        this.$emit('input',imageList.images[selected].url)
      }
    },
  },
  components: {
    ImageList,
  },
};
</script>

<style lang="less" scoped>
.cover-wrap {
  width: 150px;
  height: 120px;
  border: 1px solid #000;
  .cover-image {
    max-width: 100%;
    height: 120px;
  }
}
</style>