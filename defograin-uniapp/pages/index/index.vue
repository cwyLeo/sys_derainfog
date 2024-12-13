<template>
	<view class="sidebar-container">
	  <view class="sidebar">
	    <view class="sidebar-header">
	      Logo
	    </view>
	    <view class="sidebar-menu">
	      <view class="sidebar-item" v-for="(item, index) in sidebarItems" :key="index" @click="handleSidebarItemClick(item)">
	        {{ item.title }}
	      </view>
	    </view>
	  </view>
	  <view class="main-content">
	    <button @click="chooseAndUpload">选择并上传图片</button>
		<image v-if="imageUrl" :src="imageUrl" mode="aspectFit"></image>
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
	      { title: '菜单项1',url:'../news/news' },
	      { title: '菜单项2',url:'../about/about' },
	      { title: '菜单项3',url:'../index/index' },
	      { title: '菜单项4' }
	    ],
		imageUrl:''
	  };
	},
  methods: {
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