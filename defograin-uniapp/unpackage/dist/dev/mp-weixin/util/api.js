"use strict";
const util_request = require("./request.js");
const util_upload = require("./upload.js");
require("../common/vendor.js");
const uploadImage = (filepath) => {
  return util_upload.upload({
    url: "uploadImage",
    name: "file",
    filePath: filepath,
    method: "POST"
  });
};
const getFolders = (path) => {
  return util_request.request({
    url: "folders",
    data: {
      path
    }
  });
};
const getImage = (imagePath) => {
  return util_request.request({
    url: "get_image",
    data: {
      path: imagePath
    }
  });
};
const getAlg = () => {
  return util_request.request({
    url: "get_alg"
  });
};
exports.getAlg = getAlg;
exports.getFolders = getFolders;
exports.getImage = getImage;
exports.uploadImage = uploadImage;
