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
      activeOperation: "derain",
      imageUrl: "",
      pb_imgs: [],
      tr_imgs: [],
      result: "",
      alglist: [
        { value: "algorithm1", text: "算法1" },
        { value: "algorithm2", text: "算法2" }
        // 更多算法选项...
      ],
      selectedAlgorithms: [],
      multi: []
    };
  },
  onLoad() {
    util_api.getAlg().then((res) => {
      console.log(res);
      this.alglist = res.data.algs;
      for (var i = 0; i < this.alglist.length; i++) {
        this.alglist[i].checked = false;
      }
      console.log(this.alglist);
    });
  },
  computed: {
    // 计算属性，根据alglist的状态返回相应的按钮文字
    selectAllText() {
      const allChecked = this.alglist.filter((algorithm) => algorithm.operation === this.activeOperation).every((algorithm) => algorithm.checked);
      return allChecked ? "取消全选" : "全选";
    },
    filteredAlgList() {
      return this.alglist.filter((algorithm) => algorithm.operation === this.activeOperation);
    }
  },
  methods: {
    setOperation(operation) {
      this.activeOperation = operation;
      this.selectedAlgorithms = [];
      this.alglist.forEach((algorithm) => algorithm.checked = false);
    },
    selectalg(e) {
      const selectedTitles = e.detail.value;
      this.alglist.forEach((algorithm) => {
        algorithm.checked = selectedTitles.includes(algorithm.title);
      });
      this.selectedAlgorithms = [];
      for (let i = 0; i < this.alglist.length; i++) {
        if (this.alglist[i].checked) {
          this.selectedAlgorithms.push(this.alglist[i].title);
        }
      }
      console.log(this.selectedAlgorithms, this.alglist);
    },
    toggleSelectAll() {
      var tmpalglist = this.alglist.filter((algorithm) => algorithm.operation === this.activeOperation);
      const allChecked = tmpalglist.every((algorithm) => algorithm.checked);
      tmpalglist.forEach((algorithm) => {
        algorithm.checked = !allChecked;
      });
      if (this.selectedAlgorithms.length === tmpalglist.length) {
        this.selectedAlgorithms = [];
      } else {
        this.selectedAlgorithms = tmpalglist.map((algorithm) => algorithm.title);
      }
      console.log(this.selectedAlgorithms);
    },
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
      return util_api.uploadImage(imagePath, this.selectedAlgorithms, this.activeOperation).then((res1) => {
        console.log("上传操作", res1);
        if (res1.code != 200) {
          console.log("图片", imagePath, "上传失败");
          return false;
        }
        this.result = res1.file_url;
        getApp().globalData.result_url = encodeURIComponent(JSON.stringify(res1.folder_name));
        common_vendor.index.switchTab({
          url: "../result/result"
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
  return {
    a: $data.activeOperation === "derain" ? 1 : "",
    b: common_vendor.o(($event) => $options.setOperation("derain")),
    c: $data.activeOperation === "defog" ? 1 : "",
    d: common_vendor.o(($event) => $options.setOperation("defog")),
    e: common_vendor.t($options.selectAllText),
    f: common_vendor.o((...args) => $options.toggleSelectAll && $options.toggleSelectAll(...args)),
    g: common_vendor.f($options.filteredAlgList, (algorithm, k0, i0) => {
      return {
        a: algorithm.title,
        b: algorithm.checked,
        c: algorithm.checked ? 1 : "",
        d: common_vendor.t(algorithm.title),
        e: algorithm.title
      };
    }),
    h: common_vendor.o((...args) => $options.selectalg && $options.selectalg(...args)),
    i: common_vendor.o($options.chooseSuccess),
    j: common_vendor.o($options.imgDelete),
    k: common_vendor.o(($event) => $data.pb_imgs = $event),
    l: common_vendor.p({
      max: 9,
      chooseNum: 9,
      value: $data.pb_imgs,
      modelValue: $data.pb_imgs
    }),
    m: common_vendor.o($options.chooseSuccessTr),
    n: common_vendor.o($options.imgDeleteTr),
    o: common_vendor.o(($event) => $data.tr_imgs = $event),
    p: common_vendor.p({
      max: 9,
      chooseNum: 9,
      value: $data.tr_imgs,
      modelValue: $data.tr_imgs
    }),
    q: common_vendor.o((...args) => $options.uploadImgs && $options.uploadImgs(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cwy/college/study/shuoshi/lab/system/sys_derainfog/defograin-uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
