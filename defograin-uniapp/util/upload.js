const BASE_URL = "http://127.0.0.1:5000/"
// 上传文件
function upload(options) {
	return new Promise((res,rej) =>{
        uni.uploadFile({
            url: BASE_URL + options.url,
			filePath: options.filePath,
			name: options.name,
            success(da) {
				console.log(da)
				res(JSON.parse(da.data))
            },
            fail(err) {
				console.log('err',err)
				uni.showToast({
					icon: 'none',
					title:'网络请求失败'
				})
                rej()
            }
        })
		})
}
export default upload;