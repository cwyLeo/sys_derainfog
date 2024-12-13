// 下载文件
function download(options) {
    return new Promise((res,rej) =>{
		uni.showLoading({})
		console.log(options.url)
        uni.downloadFile({
            url: options.url,
            success(data) {
				console.log('data',data)
				var result = data.tempFilePath.split(/[\.]+/)[1]
                if (data.statusCode === 200) {
					//console.log('filepath',data.tempFilePath)
                	uni.saveFile({
                		tempFilePath: data.tempFilePath, //临时路径
                		success: function(res) {
                			//打开文档查看
                			uni.openDocument({
                				filePath: res.savedFilePath,
								fileType:result,
                				showMenu: true,
                				success: function(res) {
                				 //console.log('打开文档成功');
                				},
                				fail: (err) => {
									console.log('err',err)
									uni.showModal({
										title: '文件打开失败',
										showCancel: false
									});
                				},
								complete() {
									//console.log('打开文档完成');
									uni.hideLoading()
								}
                			});
                		},
                		fail: (err) => {
							uni.hideLoading()
							uni.showModal({
								title: '文件保存失败',
								showCancel: false
							});
                		}
                	});
                }
            },
            fail() {
				uni.hideLoading()
				uni.showModal({
					title: '失败请重新下载',
					showCancel: false
				});
            }
        })
    })
}

/**
 * ios下文件名中文处理
 * @param {String} filename
 */
function fileNameEscape(filename) {
	if (uni.getSystemInfoSync().platform == "ios") {
		filename = escape(filename);
	}
	return filename;
}

export default download;