"use strict";
const util_request = require("./request.js");
const util_upload = require("./upload.js");
require("../common/vendor.js");
const uploadImage = (filepath, alg_names, activeOperation) => {
  return util_upload.upload({
    url: "uploadImage",
    name: "file",
    filePath: filepath,
    data: {
      name: alg_names,
      operation: activeOperation
    }
  });
};
const uploadFolders = (folder, operation, alg_names) => {
  return util_request.request({
    url: "uploadFolders",
    data: {
      folder,
      operation,
      name: alg_names
    },
    method: "POST"
  });
};
const getFolders = (path, mode) => {
  return util_request.request({
    url: "folders",
    data: {
      path,
      mode
    }
  });
};
const getHistory = (path) => {
  return util_request.request({
    url: "history",
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
const changeFolderName = (folder, newName) => {
  return util_request.request({
    url: "rename",
    data: {
      folder,
      newName
    },
    method: "POST"
  });
};
exports.changeFolderName = changeFolderName;
exports.getAlg = getAlg;
exports.getFolders = getFolders;
exports.getHistory = getHistory;
exports.getImage = getImage;
exports.uploadFolders = uploadFolders;
exports.uploadImage = uploadImage;
