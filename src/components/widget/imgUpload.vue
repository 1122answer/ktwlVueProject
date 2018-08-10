<template>
    <div>
        <div class="demo-upload-list" v-if='uploadList.length>0'  v-for="item in uploadList">
            <template v-if="item.status === 'done'">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                    <v-icon type="eye-o" @click.native="handleView(item)"></v-icon>
                    <v-icon v-if="isAdd" type="delete" @click.native="handleRemove(item)"></v-icon>
                </div>
            </template>
            <template v-else>
                <!-- <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress> -->
            </template>
        </div>

        <div v-if="isAdd">
            <v-upload :name="name" :action="ImgUrl.upload" :data="ImgUrl.Param" :file-list="uploadList" :multiple="true" @change="onChange" :beforeUpload="beforeUpload">
                <v-button v-if="uploadList.length < maxLength" :loading="updating" type="ghost">点击上传</v-button>
            </v-upload>
        </div>

        <v-modal title="浏览" :visible="visible" @cancel="closeModal">
            <img :src="shownImgUrl" v-if="visible" style="width: 100%">
            <template slot=footer>
              <v-button @click="closeModal">关闭</v-button>
            </template>
        </v-modal>
    </div>
</template>

<script>
import api from "~/App/api/index.js";
let HOST = api.serverHost;

export default {
  // props: ["preList", "maxLength", "isAdd"],
  props: {
    preList: Array,
    maxLength: Number,
    isAdd: Boolean,
    maxSize: {
      type: Number,
      default: 5
    }
  },
  mounted() {
    this.uploadList = this.preList
    //console.log('-------->', this.preList)
  },
  data: () => ({
    name: "file",
    uploadList: [],
    visible: false,
    imgName: "",
    shownImgUrl: "",
    ImgUrl: {
      host: HOST,
      // host: window.location.href,
      upload: api.getURL("uploader/upload"),
      download: api.getURL("uploader/download"),
      Param: {
        inputId: "file"
      }
    },
    updating: false
  }),
  methods: {
    beforeUpload(file, reqOptions) {
      this.updating = true;
      if (file.size) {
        if (file.size > this.maxSize * 1024 * 1024) {
          // this.$message.warning(
          //   "图片过大，请上传小于" + this.maxSize + "M的图片"
          // );
          return false;
        }
      }
      if (this.maxLength) {
        console.log('this.uploadList', this.uploadList)
        if (this.uploadList.length >= this.maxLength) {
          this.$message.warning("超过最大上传数量：" + this.maxLength);
          return false;
        }
      }
      //console.log("uploaded list length:", this.uploadList.length);
    },
    closeModal() {
      this.visible = false;
    },
    onChange(fileInfo) {
      if (fileInfo.file.status === "uploading") {
        this.updating = true;
      } else if (fileInfo.file.status === "done") {
        let file = fileInfo.file;
        file.url =
          this.ImgUrl.host +
          api.getURL("uploader/download") +
          fileInfo.file.response.data;
        this.uploadList.push(file);
        this.updating = false;
        this.$message.success(fileInfo.file.response.msg);
        this.emitFilse();
      } else if (fileInfo.file.status === "error") {
        this.updating = false;
        this.$message.error(fileInfo.file.response.msg);
        this.emitFilse();
      } else if (fileInfo.file.status === "removed") {
        this.updating = false;
        let index = this.uploadList.findIndex(item => {
          return item.uid === fileInfo.file.uid;
        });
        this.uploadList.splice(index, 1);
        this.emitFilse();
      }
    },
    handleRemove(img) {
      let index = this.uploadList.findIndex(item => {
        return item.uid === img.uid;
      });
      this.uploadList.splice(index, 1);
      this.emitFilse();
    },
    emitFilse() {
      this.$emit("onChanged", this.uploadList);
    },
    handleView(img) {
      this.imgName = img;
      this.visible = true;
      this.shownImgUrl = img.url;
    }
  },
  watch: {
    preList(newV, oldV) {
      this.uploadList = newV;
    }
  }
};
</script>

<style>
.ant-upload-list {
  display: none;
}
.demo-upload-list {
  display: inline-block;
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 60px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>
