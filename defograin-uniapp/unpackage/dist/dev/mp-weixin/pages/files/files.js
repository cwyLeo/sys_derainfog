"use strict";
const common_vendor = require("../../common/vendor.js");
const util_api = require("../../util/api.js");
require("../../util/request.js");
require("../../util/upload.js");
const _sfc_main = {
  data() {
    return {
      sidebarItems: [
        { title: "单例运行", url: "../index/index", active: false },
        { title: "文件库", url: "../files/files", active: true },
        { title: "算法库", url: "../alglist/alglist", active: false },
        { title: "运行结果", url: "../result/result", active: false }
      ],
      filesAndFolders: [],
      currentPath: "",
      entries: []
    };
  },
  mounted() {
    this.fetchFilesAndFolders("");
  },
  methods: {
    handleSidebarItemClick(item) {
      console.log("点击了菜单项:", item);
      common_vendor.index.navigateTo({
        url: item.url
      });
    },
    getEntryUrl(entry) {
      util_api.getImage(entry.name).then((res) => {
        console.log(res);
        return res.data;
      });
    },
    fetchFilesAndFolders(path) {
      console.log(process.env.VUE_APP_SERVER_URL);
      util_api.getFolders(path).then((res) => {
        this.filesAndFolders = res.data;
        this.entries = res.data;
        console.log(this.entries);
      });
    },
    enterFolder(folderName) {
      let newPath = this.currentPath ? `${this.currentPath}/${folderName}` : folderName;
      this.fetchFilesAndFolders(newPath);
      this.currentPath = newPath;
    },
    goBack() {
      let pathParts = this.currentPath.split("/");
      pathParts.pop();
      let newPath = pathParts.join("/");
      this.fetchFilesAndFolders(newPath);
      this.currentPath = newPath || "";
    },
    isImage(filename) {
      return filename.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp)$/);
    },
    // downloadFile(url) {
    // 	console.log('url',url)
    // 	download2(url).then(res=>{
    // 		console.log(res)
    // 		return res.data
    // 	})
    // },
    downloadFile(url, name) {
      fetch(url).then((response) => {
        if (response.ok) {
          return response.blob();
        } else {
          throw new Error("Network response was not ok.");
        }
      }).then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = name;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
      }).catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.currentPath !== ""
  }, $data.currentPath !== "" ? {
    b: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  } : {}, {
    c: common_vendor.f($data.filesAndFolders, (entry, index, i0) => {
      return common_vendor.e({
        a: entry.type === "file"
      }, entry.type === "file" ? common_vendor.e({
        b: entry.type === "file"
      }, entry.type === "file" ? {
        c: entry.url,
        d: common_vendor.o(($event) => $options.downloadFile(entry.url, entry.name), index)
      } : {}, {
        e: common_vendor.t(entry.name),
        f: common_vendor.o(($event) => $options.downloadFile(entry.url, entry.name), index)
      }) : {
        g: entry.url,
        h: common_vendor.o(($event) => entry.type === "directory" ? $options.enterFolder(entry.name) : null, index)
      }, {
        i: entry.type === "directory"
      }, entry.type === "directory" ? {
        j: common_vendor.t(entry.name)
      } : {}, {
        k: index
      });
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cwy/college/study/shuoshi/lab/system/sys_derainfog/defograin-uniapp/pages/files/files.vue"]]);
wx.createPage(MiniProgramPage);
