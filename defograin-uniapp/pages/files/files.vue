<template>
  <view class="header">
    <img class="logo" src="../../static/newLogo.png" alt="" srcset="" />
  </view>
  <view class="sidebar-container">
<!--    <view class="sidebar">
     <view class="sidebar-header">
        <img class="sidebar-logo" src="../../static/newLogo.png" alt="" srcset="" />
      </view>
      <view class="sidebar-menu">
        <view class="sidebar-item" v-for="(item, index) in sidebarItems" :key="index" @click="handleSidebarItemClick(item)" :class="{ active: item.active === true }">
          {{ item.title }}
        </view>
      </view>
    </view> -->
  <view class="main-content">
    <view v-if="currentPath !== ''" class="back-button-container">
      <button @click="goBack">返回上一级</button>
    </view>
    <view class="entries-container">
      <view v-for="(entry, index) in filesAndFolders" :key="index" class="entry-item">

			<view v-if="entry.type === 'file'" class="entry-content">
				<image v-if="entry.type === 'file'" :src="entry.url" class="entry-image" mode="aspectFit" @click="downloadFile(entry.url,entry.name)"></image>
				<text @click="downloadFile(entry.url,entry.name)" class="entry-name">{{ entry.name }}</text>
			</view>
          
         <view v-else  @click="entry.type === 'directory' ? enterFolder(entry.name) : null" class="entry-content">
            <image :src="entry.url" class="entry-image" mode="aspectFit"></image>
			<text v-if="entry.type === 'directory'" class="entry-name">{{ entry.name }}</text>
          </view>
          

      </view>
	  <!-- <div class="placeholder"></div> -->
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
        { title: '单例运行',url:'../index/index',active:false },
        { title: '文件库',url:'../files/files',active:true },
        { title: '算法库',url:'../alglist/alglist',active:false },
        { title: '运行结果',url:'../result/result',active:false }
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
  /* align-items: center; */
  height: 500px;
  justify-content: flex-start;
}
.entry-item {
  margin-bottom: 50px;
  margin-right: 20px;
  /* height: 20vh; */
  /* min-width: 10vw; */
  width: 18%;
  min-width: 200px;
  /* min-height: 100px; */
  object-fit: contain;
  text-align: center;
}
.entry-content{
	height: 100%;
	width: 100%;
}
.entry-image {
  /* height: 50%; */
  /* max-width: 8vw; */
  /* min-width: 100px; */
  /* max-height: 100%; */
  height: 100%;
  width: 100%;
  display: block;
  /* object-fit: contain; */
  /* margin-bottom: 5px; */
}

.directory-icon {
  /* display: flex; */
  /* align-items: center; */
  /* justify-content: center; */
  cursor: pointer;
  /* max-height: 100%; */
  /* background-color: #f0f0f0; */
}

.entry-name {
  display: block; /* 将标题设置为块级元素，以便可以设置宽度 */
  width: 100%; /* 标题宽度与图片相同 */
  margin-top: 8px; /* 标题与图片的间距 */
  text-align: center; /* 标题居中 */
  color: #333; /* 标题颜色 */
  text-decoration: none; /* 移除链接的下划线 */
  font-size: 16px; /* 设置标题字体大小 */
  transition: color 0.3s ease; /* 为标题添加颜色过渡效果 */
  cursor: pointer;
}

</style>