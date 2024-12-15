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
  <view class="main-content container">
    <view v-if="currentPath !== ''" class="back-button-container">
      <button @click="goBack">返回上一级</button>
    </view>
    <view class="entries-container">
      <view v-for="(entry, index) in filesAndFolders" :key="index" class="entry-item">
        <view class="entry-content">
          <image v-if="entry.type === 'file' && isImage(entry.name)" :src="entry.url" class="entry-image" mode="aspectFill"></image>
          <view v-else class="directory-icon" @click="entry.type === 'directory' ? enterFolder(entry.name) : null">
            <image :src="entry.url" class="entry-image" mode="aspectFill"></image>
          </view>
          <text class="entry-name">{{ entry.name }}</text>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>
 
<script>
	import {getFolders,getImage} from '../../util/api.js'
export default {
  data() {
    return {
      sidebarItems: [
        { title: '单例运行',url:'../index/index' },
        { title: '文件库',url:'../files/files' },
        { title: '算法库',url:'../alglist/alglist' },
        { title: '菜单项4' }
      ],
	  filesAndFolders:[],
	  currentPath:'',
	  entries:[]
    };
  },
  mounted() {
	  this.fetchFilesAndFolders('');
  },
  methods: {
    handleSidebarItemClick(item) {
      // 处理侧边栏菜单项点击事件
      console.log('点击了菜单项:', item);
	  uni.navigateTo({
	  	url:item.url
	  })
    },
	getEntryUrl(entry) {
		getImage(entry.name).then(res=>{
			console.log(res)
			return res.data
		})
	    },
	fetchFilesAndFolders(path) {
		console.log(process.env.VUE_APP_SERVER_URL)
	      getFolders(path).then(res=>{
			  this.filesAndFolders = res.data
			  this.entries = res.data
			  console.log(this.entries)
		  })
	    },
	    enterFolder(folderName) {
	          let newPath = this.currentPath ? `${this.currentPath}/${folderName}` : folderName;
	          this.fetchFilesAndFolders(newPath);
	          this.currentPath = newPath;
	        },
	    goBack() {
	      let pathParts = this.currentPath.split('/');
	      pathParts.pop();
	      let newPath = pathParts.join('/');
	      this.fetchFilesAndFolders(newPath);
	      this.currentPath = newPath || '';
	    },
	  isImage(filename) {
	        // 简单的图片文件名后缀检查
	        return filename.toLowerCase().match(/\.(jpg|jpeg|png|gif|bmp)$/)
  },
      }
};
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

.container {
  padding: 20px;
}
.entry-item {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #f8f8f8;
  border-radius: 5px;
}
.main-content.container {
  display: flex;
  flex-direction: column;
}

.back-button-container {
  margin-bottom: 10px; /* 添加一些间距 */
}

.entries-container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start; /* 调整对齐方式 */
}

.entry-item {
  margin: 10px;
}

.entry-content {
  display: flex;
  flex-direction: column; /* 使图片和文本垂直排列 */
  align-items: center; /* 居中对齐 */
}

.entry-image, .directory-icon {
  width: 100px; /* 设置图片和图标的宽度 */
  height: 100px; /* 设置图片和图标的高度 */
  margin-bottom: 5px; /* 在图片和文本之间添加间距 */
}

.directory-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #f0f0f0; /* 添加背景色以便区分 */
}

.entry-name {
  text-align: center; /* 文件名居中对齐 */
}
.sidebar {
  display: flex;
  flex-direction: column;
  background-color: #ffffff; /* 背景颜色 */
  width: 250px; /* 侧边栏宽度 */
  height: 100vh; /* 侧边栏高度 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.sidebar-header {
  padding: 20px;
  text-align: center;
}

.sidebar-logo {
  width: 100%; /* 根据需要调整大小 */
  max-width: 150px; /* 最大宽度 */
  height: auto;
}

.sidebar-menu {
  flex: 1;
  padding: 0 20px;
}

.sidebar-item {
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  color: #333; /* 文字颜色 */
  font-family: 'Roboto', sans-serif; /* 使用Roboto字体 */
  font-size: 16px; /* 字体大小 */
  font-weight: 500; /* 字体粗细 */
  padding: 15px 10px; /* 内边距 */
  border-bottom: 1px solid #eaeaea; /* 分隔线 */
  cursor: pointer; /* 鼠标样式 */
  transition: background-color 0.3s ease; /* 过渡效果 */
}

.sidebar-item:last-child {
  border-bottom: none; /* 去掉最后一个元素的边框 */
}

.sidebar-item:hover {
  background-color: #f5f5f5; /* 鼠标悬停背景颜色 */
}
</style>