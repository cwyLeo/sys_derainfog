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

export const uploadImage = (filepath,alg_names,activeOperation) =>{
	return $upload({
		url:'uploadImage',
		name:'file',
		filePath:filepath,
		data:{
			name:alg_names,
			operation:activeOperation
		}
	})
}
export const uploadFolders = (folder, operation, alg_names) => {
	return $request({
		url:'uploadFolders',
		data:{
			folder:folder,
			operation:operation,
			name:alg_names
		},
		method:'POST'
	})
}

export const getFolders = (path,mode) =>{
	return $request({
		url:'folders',
		data:{
			path:path,
			mode:mode
		}
	})
}

export const getHistory = (path) =>{
	return $request({
		url:'history',
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

export const changeFolderName = (folder, newName) => {
	return $request({
		url:'rename',
		data:{
			folder:folder,
			newName:newName
		},
		method:'POST'
	})
}