"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      finish: false,
      url: "",
      arrs: false,
      urls: [],
      curr: 0
    };
  },
  onLoad(e) {
    var that = this;
    if (e.url) {
      this.url = e.url;
      console.log(this.url);
      that.finish = false;
      common_vendor.index.downloadFile({
        url: e.url,
        success: (res) => {
          var temp = res.tempFilePath;
          setTimeout(() => {
            common_vendor.index.openDocument({
              filePath: temp,
              showMenu: true,
              success() {
                common_vendor.index.showToast({
                  title: that.finish.toString()
                });
                that.finish = true;
                console.log(that.finish);
              },
              fail() {
                common_vendor.index.showToast({
                  title: that.finish.toString()
                });
                that.finish = true;
              }
            });
          }, 0);
        },
        fail: (res) => {
          common_vendor.index.showToast({
            title: res.data
          });
          that.finish = true;
        }
      });
    }
  },
  onShow() {
    if (!this.arrs) {
      common_vendor.index.navigateBack({
        delta: 1
        //返回层数，2则上上页
      });
    }
  },
  methods: {
    handlemessage(event) {
      console.log(event.detail.data);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.url
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cwy/college/study/shuoshi/lab/system/sys_derainfog/defograin-uniapp/pages/files/webview.vue"]]);
wx.createPage(MiniProgramPage);
