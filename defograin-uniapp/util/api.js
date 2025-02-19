import $request from './request.js'
import $upload from './upload.js'
import $download from './download.js'

// 下载文件
export const download2 = (url) =>{
	return $download({
		url: url
	})
}

// 下载文件
export const download = (url) =>{
	return $request({
		url: 'download',
		data:{
			path:url
		}
	})
}

export const uploadImage = (filepath,alg_name) =>{
	return $upload({
		url:'uploadImage',
		name:'file',
		filePath:filepath,
		data:{
			name:alg_name
		}
	})
}

export const getFolders = (path) =>{
	return $request({
		url:'folders',
		data:{
			path:path
		}
	})
}

export const getImage = (imagePath) =>{
	return $request({
		url:'get_image',
		data:{
			path:imagePath
		}
	})
}

export const getAlg = () => {
	return $request({
		url:'get_alg'
	})
}