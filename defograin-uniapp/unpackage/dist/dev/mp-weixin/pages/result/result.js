"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      sidebarItems: [
        { title: "单例运行", url: "../index/index", active: false },
        { title: "文件库", url: "../files/files", active: false },
        { title: "算法库", url: "../alglist/alglist", active: false },
        { title: "运行结果", url: "../result/result", active: true }
      ],
      imageUrl: "",
      tr_imgs: [],
      results: [],
      hasres: false
    };
  },
  onLoad(opt) {
    if (opt.files) {
      this.hasres = true;
      var tmp_urls = JSON.parse(decodeURIComponent(opt.files));
      for (var i = 0; i < tmp_urls.length; i++) {
        var regex = /_([a-zA-Z]*?)(?=\.)/;
        console.log(tmp_urls[i]);
        var match = tmp_urls[i].match(regex);
        this.results.push({ "url": tmp_urls[i], "title": match[1] });
      }
      console.log(this.results);
    }
  },
  methods: {
    handleSidebarItemClick(item) {
      console.log("点击了菜单项:", item);
      common_vendor.index.navigateTo({
        url: item.url
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.hasres
  }, $data.hasres ? {
    b: common_vendor.f($data.results, (image, index, i0) => {
      return {
        a: image.url,
        b: common_vendor.t(image.title),
        c: image.url,
        d: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cwy/college/study/shuoshi/lab/system/sys_derainfog/defograin-uniapp/pages/result/result.vue"]]);
wx.createPage(MiniProgramPage);
