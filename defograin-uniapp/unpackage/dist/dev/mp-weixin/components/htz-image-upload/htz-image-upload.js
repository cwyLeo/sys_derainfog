"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "htz-image-upload",
  props: {
    max: {
      //展示图片最大值
      type: Number,
      default: 1
    },
    chooseNum: {
      //选择图片数
      type: Number,
      default: 1
    },
    name: {
      //发到后台的文件参数名
      type: String,
      default: "file"
    },
    remove: {
      //是否展示删除按钮
      type: Boolean,
      default: true
    },
    sourceType: {
      //选择照片来源 【ps：H5就别费劲了，设置了也没用。不是我说的，官方文档就这样！！！】
      type: Array,
      default: () => ["album", "camera"]
    },
    action: {
      //上传地址
      type: String,
      default: ""
    },
    headers: {
      //上传的请求头部
      type: Object,
      default: () => {
      }
    },
    formData: {
      //HTTP 请求中其他额外的 form data
      type: Object,
      default: () => {
      }
    },
    compress: {
      //是否需要压缩
      type: Boolean,
      default: true
    },
    quality: {
      //压缩质量，范围0～100
      type: Number,
      default: 80
    },
    value: {
      //受控图片列表
      type: Array,
      default: () => []
    },
    uploadSuccess: {
      default: (res) => {
        return { success: false, url: "" };
      }
    }
  },
  data() {
    return {
      uploadLists: []
    };
  },
  mounted: function() {
    this.$nextTick(function() {
      this.uploadLists = this.value;
    });
  },
  watch: {
    value(val, oldVal) {
      console.log("value", val, oldVal);
      this.uploadLists = val;
    }
  },
  methods: {
    imgDel(index) {
      common_vendor.index.showModal({
        title: "提示",
        content: "您确定要删除么?",
        success: (res) => {
          if (res.confirm) {
            this.uploadLists.splice(index, 1);
            this.$emit("input", this.uploadLists);
            this.$emit("imgDelete", this.uploadLists);
          } else if (res.cancel)
            ;
        }
      });
    },
    imgPreview(index) {
      common_vendor.index.previewImage({
        urls: this.uploadLists,
        current: index,
        loop: true
      });
    },
    imgAdd() {
      common_vendor.index.chooseImage({
        count: this.chooseNum,
        sizeType: ["original", "compressed"],
        //可以指定是原图还是压缩图，默认二者都有
        sourceType: this.sourceType,
        success: (res) => {
          console.log("tempFiles", res);
          if (this.action == "") {
            this.$emit("chooseSuccess", res.tempFilePaths);
          } else {
            if (this.compress && res.tempFiles[0].size / 1024 > 1025) {
              this.imgCompress(res.tempFilePaths);
            } else {
              this.imgUpload(res.tempFilePaths);
            }
          }
        },
        fail: (res) => {
          common_vendor.index.showToast({
            title: res.data
          });
        }
      });
    },
    imgCompress(tempFilePaths) {
      common_vendor.index.showLoading({
        title: "压缩中..."
      });
      let compressImgs = [];
      let results = [];
      tempFilePaths.forEach((item, index) => {
        compressImgs.push(new Promise((resolve, reject) => {
          common_vendor.index.compressImage({
            src: item,
            quality: this.quality,
            success: (res) => {
              results.push(res.tempFilePath);
              resolve(res.tempFilePath);
            },
            fail: (err) => {
              reject(err);
            },
            complete: () => {
            }
          });
        }));
      });
      Promise.all(compressImgs).then((results2) => {
        common_vendor.index.hideLoading();
        this.imgUpload(results2);
      }).catch((res, object) => {
        common_vendor.index.hideLoading();
      });
    },
    imgUpload(tempFilePaths) {
      common_vendor.index.showLoading({
        title: "上传中"
      });
      let uploadImgs = [];
      tempFilePaths.forEach((item, index) => {
        uploadImgs.push(new Promise((resolve, reject) => {
          common_vendor.index.uploadFile({
            url: this.action,
            //仅为示例，非真实的接口地址
            filePath: item,
            name: this.name,
            fileType: "image",
            formData: this.formData,
            header: this.headers,
            success: (uploadFileRes) => {
              if (this.uploadSuccess(uploadFileRes).success) {
                this.value.push(this.uploadSuccess(uploadFileRes).url);
                this.$emit("input", this.uploadLists);
              }
              resolve(uploadFileRes);
              this.$emit("uploadSuccess", uploadFileRes);
            },
            fail: (err) => {
              console.log(err);
              reject(err);
              this.$emit("uploadFail", err);
            },
            complete: () => {
            }
          });
        }));
      });
      Promise.all(uploadImgs).then((results) => {
        common_vendor.index.hideLoading();
      }).catch((res, object) => {
        common_vendor.index.hideLoading();
        this.$emit("uploadFail", res);
      });
    },
    canvasDataURL(path, obj, callback) {
      var img = new Image();
      img.src = path;
      img.onload = function() {
        var that = this;
        var w = that.width, h = that.height, scale = w / h;
        w = obj.width || w;
        h = obj.height || w / scale;
        var quality = 0.8;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);
        if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
          quality = obj.quality;
        }
        var base64 = canvas.toDataURL("image/jpeg", quality);
        callback(base64);
      };
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.uploadLists, (item, index, i0) => {
      return common_vendor.e({
        a: item,
        b: common_vendor.o(($event) => $options.imgPreview(index), index)
      }, $props.remove ? {
        c: common_vendor.o(($event) => $options.imgDel(index), index)
      } : {}, {
        d: index
      });
    }),
    b: $props.remove,
    c: $data.uploadLists.length < $props.max
  }, $data.uploadLists.length < $props.max ? {
    d: common_vendor.o((...args) => $options.imgAdd && $options.imgAdd(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cwy/college/study/shuoshi/lab/system/sys_derainfog/defograin-uniapp/components/htz-image-upload/htz-image-upload.vue"]]);
wx.createComponent(Component);
