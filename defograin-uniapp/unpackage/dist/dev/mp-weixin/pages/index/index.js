"use strict";
const common_vendor = require("../../common/vendor.js");
const util_api = require("../../util/api.js");
require("../../util/request.js");
require("../../util/upload.js");
const _sfc_main = {
  data() {
    return {
      sidebarItems: [
        { title: "单例运行", url: "../index/index", active: true },
        { title: "文件库", url: "../files/files", active: false },
        { title: "算法库", url: "../alglist/alglist", active: false },
        { title: "运行结果", url: "../result/result", active: false }
      ],
      imageUrl: "",
      pb_imgs: [],
      tr_imgs: [],
      result: ""
    };
  },
  methods: {
    handleSidebarItemClick(item) {
      console.log("点击了菜单项:", item);
      common_vendor.index.navigateTo({
        url: item.url
      });
    },
    chooseAndUpload() {
      common_vendor.index.chooseImage({
        count: 1,
        // 默认选择1张图片
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths;
          util_api.uploadImage(tempFilePaths[0]).then((res) => {
            this.imageUrl = res.file_url;
          });
        }
      });
    },
    // 选择图片
    chooseSuccess(e) {
      console.log("选择图片", e);
      this.pb_imgs = this.pb_imgs.concat(e);
      console.log(this.pb_imgs.length);
    },
    // 删除图片
    imgDelete(e) {
      console.log("删除图片", e);
      this.pb_imgs = e;
    },
    // 选择图片
    chooseSuccessTr(e) {
      console.log("选择图片", e);
      this.tr_imgs = this.tr_imgs.concat(e);
      console.log(this.tr_imgs.length);
    },
    // 删除图片
    imgDeleteTr(e) {
      console.log("删除图片", e);
      this.tr_imgs = e;
    },
    async uploadImgs() {
      this.str0 = "";
      var isSuccess = true;
      for (let j = 0; j < this.pb_imgs.length; j++) {
        let result2 = await this.upload(this.pb_imgs[j]);
        this.result = result2;
        isSuccess = result2 && isSuccess;
      }
      return isSuccess;
    },
    //上传图片
    upload(imagePath) {
      return util_api.uploadImage(imagePath).then((res1) => {
        console.log("上传操作", res1);
        if (res1.code != 200) {
          console.log("图片", imagePath, "上传失败");
          return false;
        }
        this.result = res1.file_url;
        common_vendor.index.navigateTo({
          url: "../result/result?files=" + encodeURIComponent(JSON.stringify(res1.file_urls))
        });
        return res1.file_url;
      });
    }
  }
};
if (!Array) {
  const _easycom_htz_image_upload2 = common_vendor.resolveComponent("htz-image-upload");
  _easycom_htz_image_upload2();
}
const _easycom_htz_image_upload = () => "../../components/htz-image-upload/htz-image-upload.js";
if (!Math) {
  _easycom_htz_image_upload();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o($options.chooseSuccess),
    b: common_vendor.o($options.imgDelete),
    c: common_vendor.o(($event) => $data.pb_imgs = $event),
    d: common_vendor.p({
      max: 9,
      chooseNum: 9,
      value: $data.pb_imgs,
      modelValue: $data.pb_imgs
    }),
    e: common_vendor.o($options.chooseSuccessTr),
    f: common_vendor.o($options.imgDeleteTr),
    g: common_vendor.o(($event) => $data.tr_imgs = $event),
    h: common_vendor.p({
      max: 9,
      chooseNum: 9,
      value: $data.tr_imgs,
      modelValue: $data.tr_imgs
    }),
    i: common_vendor.o((...args) => $options.uploadImgs && $options.uploadImgs(...args)),
    j: $data.result != ""
  }, $data.result != "" ? {
    k: $data.result
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cwy/college/study/shuoshi/lab/system/sys_derainfog/defograin-uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
