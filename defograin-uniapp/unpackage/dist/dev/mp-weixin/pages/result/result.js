"use strict";
const common_vendor = require("../../common/vendor.js");
const util_api = require("../../util/api.js");
require("../../util/request.js");
require("../../util/upload.js");
const _sfc_main = {
  data() {
    return {
      lastTap: 0,
      tapTimeout: null,
      sidebarItems: [
        { title: "单例运行", url: "../index/index", active: false },
        { title: "文件库", url: "../files/files", active: false },
        { title: "算法库", url: "../alglist/alglist", active: false },
        { title: "运行结果", url: "../result/result", active: true }
      ],
      currentMode: "fog",
      imageUrl: "",
      tr_imgs: [],
      results: [],
      hasres: false,
      folders: [],
      selectedFolderIndex: null,
      indexName: "",
      scrollIntoView: ""
    };
  },
  // onLoad(opt) {
  // 	if(opt.files || getApp().globalData.result_url !=''){
  // 		this.hasResults = true
  // 		// var tmp_urls = JSON.parse(decodeURIComponent(opt.files))
  // 		var tmp_urls = JSON.parse(decodeURIComponent(getApp().globalData.result_url))
  // 	for(var i = 0; i < tmp_urls.length; i++){
  // 		var regex = /_([a-zA-Z]*?)(?=\.)/;
  // 		console.log(tmp_urls[i])
  // 		var match = tmp_urls[i].match(regex);
  // 		this.results.push({'url':tmp_urls[i],'name':match[1]})
  // 	}
  // 	console.log(this.results)
  // 	}
  // },
  onShow() {
    this.timer = setInterval(() => {
      util_api.getHistory("").then((res) => {
        this.folders = res.data;
        if (getApp().globalData.result_url != "") {
          this.selectedFolderIndex = this.folders.length - 1;
          util_api.getFolders("upload_" + this.folders[this.selectedFolderIndex].name, this.currentMode).then((res2) => {
            this.results = res2.data;
            console.log(this.hasResults);
          });
          getApp().globalData.result_url = "";
        }
      });
    }, 1e3);
  },
  onHide() {
    clearInterval(this.timer);
  },
  mounted() {
    util_api.getHistory("").then((res) => {
      this.folders = res.data;
      console.log(this.folders);
      console.log("indexName", this.indexName);
      if (this.indexName != "") {
        for (var i = 0; i < this.folders.length; i++) {
          console.log(this.indexName, this.folders[i].name);
          if (this.indexName == this.folders[i].name) {
            console.log(1234);
            this.selectedFolderIndex = i;
            util_api.getFolders("upload_" + folder.name, this.currentMode).then((res2) => {
              this.results = res2.data;
            });
          }
        }
      }
    });
  },
  computed: {
    filteredFolders() {
      return this.folders.filter((folder2) => folder2.mode === this.currentMode);
    },
    hasResults() {
      return this.results.length > 0;
    }
  },
  methods: {
    handleTap(folder2, index) {
      const now = Date.now();
      const DOUBLE_PRESS_DELAY = 300;
      if (this.lastTap && now - this.lastTap < DOUBLE_PRESS_DELAY) {
        clearTimeout(this.tapTimeout);
        this.handleDoubleClick(folder2, index);
      } else {
        this.tapTimeout = setTimeout(() => {
          this.handleSingleClick(folder2, index);
        }, DOUBLE_PRESS_DELAY);
      }
      this.lastTap = now;
    },
    handleSingleClick(folder2, index) {
      console.log("Single tap");
      this.selectFolder(folder2, index);
    },
    handleDoubleClick(folder2, index) {
      console.log("Double tap");
      this.renameFolder(folder2, index);
    },
    handleSidebarItemClick(item) {
      console.log("点击了菜单项:", item);
      common_vendor.index.navigateTo({
        url: item.url
      });
    },
    selectMode(mode) {
      this.currentMode = mode;
      this.results = [];
      this.selectedFolderIndex = null;
      this.scrollIntoView = "";
    },
    selectFolder(folder2, index) {
      this.selectedFolderIndex = index;
      this.scrollIntoView = "folder-" + index;
      console.log(folder2.name);
      util_api.getFolders("upload_" + folder2.name, this.currentMode).then((res) => {
        this.results = res.data;
      });
    },
    renameFolder(folder2, index) {
      console.log(index);
      common_vendor.index.showModal({
        title: "重命名文件夹",
        content: "请输入新的文件夹名",
        editable: true,
        success: (res) => {
          if (res.confirm) {
            const newName = res.content;
            if (newName.trim() !== "") {
              var oldName = folder2.name;
              folder2.name = newName;
              this.indexName = newName;
              this.$set(this.folders, index, folder2);
              util_api.changeFolderName(oldName, newName);
              util_api.getHistory("").then((res2) => {
                this.folders = res2.data;
                if (this.indexName != "") {
                  for (var i = 0; i < this.folders.length; i++) {
                    console.log(this.indexName, this.folders[i].name);
                    if (this.indexName == this.folders[i].name) {
                      console.log(1234);
                      this.selectedFolderIndex = i;
                      this.scrollIntoView = "folder-" + i;
                      util_api.getFolders("upload_" + folder2.name, this.currentMode).then((res3) => {
                        this.results = res3.data;
                      });
                    }
                  }
                }
              });
            }
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.selectMode("rain")),
    b: common_vendor.o(($event) => $options.selectMode("fog")),
    c: common_vendor.f($options.filteredFolders, (folder2, index, i0) => {
      return {
        a: common_vendor.t(folder2.name),
        b: index,
        c: "folder-" + index,
        d: common_vendor.n({
          "selected": $data.selectedFolderIndex === index
        }),
        e: common_vendor.o(($event) => $options.selectFolder(folder2, index), index),
        f: common_vendor.o(($event) => $options.handleTap(folder2, index), index)
      };
    }),
    d: $data.scrollIntoView,
    e: $options.hasResults
  }, $options.hasResults ? {
    f: common_vendor.f($data.results, (image, index, i0) => {
      return {
        a: image.url,
        b: common_vendor.t(image.name),
        c: image.url,
        d: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cwy/college/study/shuoshi/lab/system/sys_derainfog/defograin-uniapp/pages/result/result.vue"]]);
wx.createPage(MiniProgramPage);
