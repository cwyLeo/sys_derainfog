"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://localhost:5000/";
function request(options) {
  return new Promise((res, rej) => {
    console.log(BASE_URL + options.url);
    console.log("request data", options.data);
    common_vendor.index.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data,
      header: {
        "content-type": "application/x-www-form-urlencoded",
        ...options.header
      },
      timeout: options.timeout || 3e4,
      dataType: options.dataType || "json",
      responseType: options.responseType || "text",
      sslVerify: options.sslVerify || true,
      withCredentials: options.withCredentials || false,
      success(data) {
        res(data);
      },
      fail(errMsg) {
        console.log("uni.request failed: ", errMsg);
        common_vendor.index.showToast({
          icon: "none",
          title: "网络请求失败"
        });
        rej();
      }
    });
  });
}
exports.request = request;
