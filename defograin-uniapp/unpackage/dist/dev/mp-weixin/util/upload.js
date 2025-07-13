"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://127.0.0.1:5000/";
function upload(options) {
  return new Promise((res, rej) => {
    common_vendor.index.uploadFile({
      url: BASE_URL + options.url,
      filePath: options.filePath,
      name: options.name,
      formData: options.data,
      success(da) {
        console.log(da);
        res(JSON.parse(da.data));
      },
      fail(err) {
        console.log("err", err);
        common_vendor.index.showToast({
          icon: "none",
          title: "网络请求失败"
        });
        rej();
      }
    });
  });
}
exports.upload = upload;
