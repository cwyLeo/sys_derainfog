<template>
  <view class="header">
    <img class="logo" src="../../static/newLogo.png" alt="" srcset="" />
  </view>
  <view class="sidebar-container">
    <view class="sidebar">
<!--      <view class="sidebar-header">
        <img class="sidebar-logo" src="../../static/newLogo.png" alt="" srcset="" />
      </view> -->
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
			<view v-if="entry.type === 'file'" class="entry-content">
				<image v-if="entry.type === 'file'" :src="entry.url" class="entry-image" mode="aspectFill" @click="downloadFile(entry.url,entry.name)"></image>
				<text @click="downloadFile(entry.url,entry.name)" class="entry-name">{{ entry.name }}</text>
			</view>
          
          <view v-else class="directory-icon" @click="entry.type === 'directory' ? enterFolder(entry.name) : null">
            <image :src="entry.url" class="entry-image" mode="aspectFill"></image>
          </view>
          <text v-if="entry.type === 'directory'" class="entry-name">{{ entry.name }}</text>
        </view>
      </view>
    </view>
  </view>
  </view>
</template>
 
<script>
	import {getFolders,getImage,download2} from '../../util/api.js'
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
		// downloadFile(url) {
		// 	console.log('url',url)
		// 	download2(url).then(res=>{
		// 		console.log(res)
		// 		return res.data
		// 	})
		// },
		downloadFile(url,name) {
		  fetch(url)
		    .then(response => {
		      if (response.ok) {
		        return response.blob(); // 获取Blob对象
		      } else {
		        throw new Error('Network response was not ok.');
		      }
		    })
		    .then(blob => {
		      // 创建一个链接元素用于下载
		      const downloadUrl = window.URL.createObjectURL(blob);
		      const a = document.createElement('a');
		      a.href = downloadUrl;
		      a.download = name; // 你可以自己设定文件名
		      document.body.appendChild(a);
		      a.click();
		      a.remove();
		      window.URL.revokeObjectURL(downloadUrl); // 清理blob URL
		    })
		    .catch(error => {
		      console.error('There was a problem with the fetch operation:', error);
		    });
		}
      }
};
</script>
 
<style>
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

</style>