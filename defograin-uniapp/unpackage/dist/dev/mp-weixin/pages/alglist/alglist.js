"use strict";
const common_vendor = require("../../common/vendor.js");
const util_api = require("../../util/api.js");
require("../../util/request.js");
require("../../util/upload.js");
const _sfc_main = {
  data() {
    return {
      activeOperation: "derain",
      sidebarItems: [
        { title: "单例运行", url: "../index/index", active: false },
        { title: "文件库", url: "../files/files", active: false },
        { title: "算法库", url: "../alglist/alglist", active: true },
        { title: "运行结果", url: "../result/result", active: false }
      ],
      images: []
    };
  },
  onLoad() {
    util_api.getAlg().then((res) => {
      console.log(res);
      this.images = res.data.algs;
    });
  },
  computed: {
    filteredAlgList() {
      return this.images.filter((algorithm) => algorithm.operation === this.activeOperation);
    }
  },
  methods: {
    setOperation(operation) {
      this.activeOperation = operation;
    },
    handleSidebarItemClick(item) {
      console.log("点击了菜单项:", item);
      common_vendor.index.navigateTo({
        url: item.url
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.activeOperation === "derain" ? 1 : "",
    b: common_vendor.o(($event) => $options.setOperation("derain")),
    c: $data.activeOperation === "defog" ? 1 : "",
    d: common_vendor.o(($event) => $options.setOperation("defog")),
    e: common_vendor.f($options.filteredAlgList, (image, index, i0) => {
      return {
        a: image.url,
        b: common_vendor.t(image.title),
        c: image.paper,
        d: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cwy/college/study/shuoshi/lab/system/sys_derainfog/defograin-uniapp/pages/alglist/alglist.vue"]]);
wx.createPage(MiniProgramPage);
