<template>
	<view class="sidebar-container">
	  <view class="sidebar">
	    <view class="sidebar-header">
	      <img class="sidebar-logo" src="../../static/newLogo.png" alt="" srcset="" />
	    </view>
	    <view class="sidebar-menu">
	      <view class="sidebar-item" v-for="(item, index) in sidebarItems" :key="index" @click="handleSidebarItemClick(item)">
	        {{ item.title }}
	      </view>
	    </view>
	  </view>
	  <view class="main-content">
	    <button @click="uploadImgs">上传图片</button>
		<!-- <image v-if="imageUrl" :src="imageUrl" mode="aspectFit"></image> -->
		<htz-image-upload :max="9" :chooseNum="9" v-model="pb_imgs" :value="pb_imgs"
		@chooseSuccess="chooseSuccess" @imgDelete="imgDelete"></htz-image-upload>
	  </view>
	</view>
  <view>
    
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
		pb_imgs:[]
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
	.sidebar-container {
	  display: flex;
	}
	 
	.sidebar {
	  background-color: #f0f0f0;
	  width: 200px;
	}
	 
	.sidebar-header {
	  padding: 20px;
	  font-weight: bold;
	  border-bottom: 1px solid #ccc;
	  background-color: #005825;
	}
	 .sidebar-logo {
	   width: 100%; /* 使图片宽度等于父容器的宽度 */
	   height: auto; /* 保持图片的宽高比 */
	 }
	.sidebar-menu {
	  margin-top: 20px;
	}
	 
	.sidebar-item {
	  padding: 10px;
	  cursor: pointer;
	  transition: background-color 0.3s;
	}
	 
	.sidebar-item:hover {
	  background-color: #e0e0e0;
	}
	 
	.main-content {
	  flex: 1;
	  padding: 20px;
	}
</style>