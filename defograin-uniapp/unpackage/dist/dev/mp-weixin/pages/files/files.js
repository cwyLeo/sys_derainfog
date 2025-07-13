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
      alglist: [],
      currentPath: "",
      showActionSheet: true,
      entries: [],
      currentPage: 1,
      pageSize: 8,
      entryHeight: 200,
      itemHeight: "100px",
      activeOperation: "derain",
      selectedAlgorithms: [],
      showDropdown: false,
      selectedFolderName: "",
      finish: false
    };
  },
  onMounted() {
    this.adjustEntryItemHeight();
    common_vendor.index.onWindowResize((res) => {
      this.adjustEntryItemHeight();
    });
  },
  onLoad() {
    this.fetchFilesAndFolders("");
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
    totalPages() {
      return Math.ceil(this.filesAndFolders.length / this.pageSize);
    },
    paginatedFilesAndFolders() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filesAndFolders.slice(start, end);
    },
    selectAllText() {
      const allChecked = this.alglist.filter((algorithm) => algorithm.operation === this.activeOperation).every((algorithm) => algorithm.checked);
      return allChecked ? "取消全选" : "全选";
    },
    filteredAlgList() {
      return this.alglist.filter((algorithm) => algorithm.operation === this.activeOperation);
    }
  },
  mounted() {
    this.fetchFilesAndFolders(this.currentPath);
  },
  methods: {
    adjustEntryItemHeight() {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      const windowHeight = systemInfo.windowHeight;
      const itemHeight = `${windowHeight / 15}px`;
      this.itemHeight = itemHeight;
    },
    onBeforeUnmount() {
      common_vendor.index.offWindowResize();
    },
    handleScroll(event) {
      const { scrollTop, scrollHeight, clientHeight } = event.target;
      if (scrollTop + clientHeight === scrollHeight) {
        this.nextPage();
      }
    },
    // 平滑滚动到页面顶部
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    },
    // 修改nextPage和previousPage方法，添加滚动到顶部
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.scrollToTop();
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.scrollToTop();
      }
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
    processFolderContent(folderName, operation) {
      this.showDropdown = true;
      this.selectedFolderName = folderName;
      console.log(`处理文件夹：${folderName}`);
      this.activeOperation = operation;
    },
    closeDropdown() {
      this.showDropdown = false;
      this.selectedAlgorithms = [];
      var tmpalglist = this.alglist.filter((algorithm) => algorithm.operation === this.activeOperation);
      tmpalglist.every((algorithm) => algorithm.checked);
      tmpalglist.forEach((algorithm) => {
        algorithm.checked = false;
      });
    },
    getEntryUrl(entry) {
      util_api.getImage(entry.name).then((res) => {
        console.log(res);
        return res.data;
      });
    },
    fetchFilesAndFolders(path) {
      util_api.getFolders(path, "").then((res) => {
        this.filesAndFolders = res.data;
        this.entries = res.data;
        console.log(this.entries);
      });
    },
    enterFolder(folderName) {
      let newPath = this.currentPath ? `${this.currentPath}/${folderName}` : folderName;
      this.fetchFilesAndFolders(newPath);
      this.currentPath = newPath;
      this.currentPage = 1;
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
    },
    uploadFiles() {
      console.log(this.selectedAlgorithms, this.activeOperation);
      let newPath = this.currentPath ? `${this.currentPath}/${this.selectedFolderName}` : this.selectedFolderName;
      util_api.uploadFolders(newPath, this.activeOperation, this.selectedAlgorithms).then((res) => {
        console.log(res);
        if (res.data.code == "401") {
          common_vendor.index.showToast({
            title: res.data.msg,
            icon: "none",
            duration: 2e3,
            mask: true
          });
        } else {
          this.downloadFile(res.data.url, res.data.name);
        }
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
    c: common_vendor.f($options.paginatedFilesAndFolders, (entry, index, i0) => {
      return common_vendor.e({
        a: entry.type === "file"
      }, entry.type === "file" ? common_vendor.e({
        b: entry.type === "file"
      }, entry.type === "file" ? {
        c: entry.url
      } : {}, {
        d: common_vendor.t(entry.name),
        e: common_vendor.o(($event) => $options.downloadFile(entry.url, entry.name), index)
      }) : common_vendor.e({
        f: entry.url,
        g: entry.type === "directory"
      }, entry.type === "directory" ? {
        h: common_vendor.t(entry.name)
      } : {}, {
        i: entry.input_type == "gh"
      }, entry.input_type == "gh" ? {
        j: common_vendor.o(($event) => $options.processFolderContent(entry.name, "derain"), index)
      } : {}, {
        k: entry.input_type == "gh"
      }, entry.input_type == "gh" ? {
        l: common_vendor.o(($event) => $options.processFolderContent(entry.name, "defog"), index)
      } : {}, {
        m: common_vendor.o(($event) => entry.type === "directory" ? $options.enterFolder(entry.name) : null, index)
      }), {
        n: index
      });
    }),
    d: common_vendor.o(($event) => $options.handleScroll()),
    e: common_vendor.o((...args) => $options.previousPage && $options.previousPage(...args)),
    f: $data.currentPage === 1,
    g: common_vendor.o((...args) => $options.nextPage && $options.nextPage(...args)),
    h: $data.currentPage >= $options.totalPages,
    i: $data.showDropdown
  }, $data.showDropdown ? {
    j: common_vendor.o((...args) => $options.closeDropdown && $options.closeDropdown(...args)),
    k: common_vendor.f($options.filteredAlgList, (algorithm, k0, i0) => {
      return {
        a: algorithm.title,
        b: algorithm.checked,
        c: algorithm.checked ? 1 : "",
        d: common_vendor.t(algorithm.title),
        e: algorithm.title
      };
    }),
    l: common_vendor.o((...args) => $options.uploadFiles && $options.uploadFiles(...args)),
    m: common_vendor.o((...args) => $options.selectalg && $options.selectalg(...args)),
    n: common_vendor.t($options.selectAllText),
    o: common_vendor.o((...args) => $options.toggleSelectAll && $options.toggleSelectAll(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/cwy/college/study/shuoshi/lab/system/sys_derainfog/defograin-uniapp/pages/files/files.vue"]]);
wx.createPage(MiniProgramPage);
