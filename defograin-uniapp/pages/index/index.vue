<template>
	<view>
	<view class="header">
	  <img class="logo" src="../../static/newLogo.png" alt="" srcset="" />
	</view>
	<view class="sidebar-container">
	  <view class="sidebar">
	    <!-- <view class="sidebar-header"> -->
	      <!-- <img class="sidebar-logo" src="../../static/newLogo.png" alt="" srcset="" /> -->
	    <!-- </view> -->
	    <view class="sidebar-menu">
	      <view class="sidebar-item" v-for="(item, index) in sidebarItems" :key="index" @click="handleSidebarItemClick(item)">
	        {{ item.title }}
	      </view>
	    </view>
	  </view>
	  <view class="main-content">
	    <view class="image-upload-columns">
	      <!-- 源图像输入栏 -->
	      <view class="image-upload-column">
	        <view class="image-upload-header">源图像输入</view>
	        <htz-image-upload :max="9" :chooseNum="9" v-model="pb_imgs" :value="pb_imgs"
	                          @chooseSuccess="chooseSuccess" @imgDelete="imgDelete">
	        </htz-image-upload>
	      </view>
	      
	      <!-- 真值图像输入栏 -->
	      <view class="image-upload-column">
	        <view class="image-upload-header">真值图像输入</view>
	        <htz-image-upload :max="9" :chooseNum="9" v-model="tr_imgs" :value="tr_imgs"
	                          @chooseSuccess="chooseSuccessTr" @imgDelete="imgDeleteTr">
	        </htz-image-upload>
	      </view>
	    </view>
	    
	    <!-- 上传按钮 -->
	    <button class="upload-btn" @click="uploadImgs">上传图片并执行操作</button>
	  </view>
<!-- 
	  <view class="main-content">
		<htz-image-upload :max="9" :chooseNum="9" v-model="pb_imgs" :value="pb_imgs"
		@chooseSuccess="chooseSuccess" @imgDelete="imgDelete"></htz-image-upload>
		<htz-image-upload :max="9" :chooseNum="9" v-model="tr_imgs" :value="tr_imgs"
		@chooseSuccess="chooseSuccessTr" @imgDelete="imgDeleteTr"></htz-image-upload>
		<button class="delete-btn" @click="uploadImgs">上传图片并执行操作</button>
	  </view> -->
	</view>
	</view>
</template>

<script>
	import {uploadImage} from '../../util/api.js'
export default {
	data() {
	  return {
	    sidebarItems: [
	      { title: '单例运行',url:'../index/index' },
	      { title: '文件库',url:'../files/files' },
	      { title: '算法库',url:'../alglist/alglist' },
	      { title: '菜单项4' }
	    ],
		imageUrl:'',
		pb_imgs:[],
		tr_imgs:[]
	  };
	},
  methods: {
	  handleSidebarItemClick(item) {
	    // 处理侧边栏菜单项点击事件
	    console.log('点击了菜单项:', item);
	    uni.navigateTo({
	    	url:item.url
	    })
	  },
    chooseAndUpload() {
      uni.chooseImage({
        count: 1, // 默认选择1张图片
        success: (chooseImageRes) => {
          const tempFilePaths = chooseImageRes.tempFilePaths;
          uploadImage(tempFilePaths[0]).then(res=>{
			  this.imageUrl = res.file_url
		  })
        }
      });
    },
	// 选择图片
	chooseSuccess(e) {
		console.log('选择图片',e)
		// if(this.pb_imgs.length+e.length>3){
		// 	this.$u.toast('最多上传3张图片！');
		// 	return;
		// }
		this.pb_imgs = this.pb_imgs.concat(e)
		console.log(this.pb_imgs.length)
	},
	// 删除图片
	imgDelete(e){
		console.log('删除图片',e)
		this.pb_imgs = e
		//this.uploadImgs()
	},
	// 选择图片
	chooseSuccessTr(e) {
		console.log('选择图片',e)
		// if(this.pb_imgs.length+e.length>3){
		// 	this.$u.toast('最多上传3张图片！');
		// 	return;
		// }
		this.tr_imgs = this.tr_imgs.concat(e)
		console.log(this.tr_imgs.length)
	},
	// 删除图片
	imgDeleteTr(e){
		console.log('删除图片',e)
		this.tr_imgs = e
		//this.uploadImgs()
	},
	async uploadImgs() {
		this.str0 = ''
		var _this = this
		var isSuccess = true
		for(let j = 0; j < this.pb_imgs.length; j++){
			// let result = await this.compress(this.pb_imgs[j])
			//console.log('图', j+1 ,'压缩结果',result)
			
			let result2 = await this.upload(this.pb_imgs[j])
			//console.log('图', j+1 ,'上传结果',result2)
			isSuccess = result2 && isSuccess
		}
		//console.log('所有图片上传结果',isSuccess)
		return isSuccess;
		
	},
	//上传图片
	upload(imagePath){
		var _this = this	
			
		return uploadImage(imagePath).then(res1=>{
			console.log('上传操作',res1)
			if(res1.code != 200){
				//_this.$u.toast('图片上次失败')
				console.log('图片',imagePath,'上传失败')
				return false;
			}
			return true;
		})
	}
  }
}
</script>
<style>

/* 主内容区域样式 */
.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

/* 图像上传列容器 */
.image-upload-columns {
  display: flex;
  justify-content: space-evenly; /* 使用 space-evenly 来平均分配间距 */
  width: 100%;
  max-width: 1200px; /* 根据需要调整最大宽度 */
  margin-bottom: 40px; /* 按钮与上传区域之间的间距 */
  background: linear-gradient(to right, #4c4c4c, #333); /* 背景渐变 */
  padding: 20px;
  border-radius: 10px; /* 圆角边框 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 更深的阴影效果 */
}

/* 单个图像上传列 */
.image-upload-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%; /* 减少宽度，为间距留出更多空间 */
  margin: 0 20px; /* 添加左右外边距 */
  border: 1px solid rgba(255, 255, 255, 0.2); /* 边框颜色调整 */
  padding: 20px;
  background: rgba(255, 255, 255, 0.1); /* 透明背景 */
  backdrop-filter: blur(10px); /* 背景模糊效果 */
  border-radius: 8px; /* 圆角边框 */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 添加动态效果 */
}

.image-upload-column:hover {
  transform: translateY(-5px); /* 鼠标悬停时轻微上移 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); /* 鼠标悬停时加深阴影 */
}


/* 图像上传标题 */
.image-upload-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

/* 上传按钮样式 */
.upload-btn {
  width: 90%; /* 按钮宽度 */
  padding: 15px; /* 增加内边距 */
  font-size: 16px;
  color: #fff;
  background-image: linear-gradient(to right, #1e3c72, #2a5298); /* 渐变背景 */
  border: none;
  border-radius: 8px; /* 更大的圆角 */
  cursor: pointer;
  outline: none; /* 移除聚焦时的轮廓线 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease;
}

.upload-btn:hover {
  transform: translateY(-3px); /* 鼠标悬停时轻微上移 */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3); /* 鼠标悬停时加深阴影 */
  background-image: linear-gradient(to right, #2a5298, #1e3c72); /* 鼠标悬停时渐变反向 */
}

.upload-btn:active {
  transform: translateY(0); /* 点击时无上移效果 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 点击时减少阴影效果 */
}

</style>