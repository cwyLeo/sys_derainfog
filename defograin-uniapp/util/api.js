import $request from './request.js'
import $upload from './upload.js'
import $download from './download.js'

// 下载文件
export const download = (url) =>{
	return $download({
		url: url
	})
}

export const uploadImage = (filepath) =>{
	return $upload({
		url:'uploadImage',
		name:'file',
		filePath:filepath,
		method:'POST'
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