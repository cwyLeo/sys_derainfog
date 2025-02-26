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
    <view class="entries-container" @scroll="handleScroll()">
      <view v-for="(entry, index) in paginatedFilesAndFolders" :key="index" class="entry-item">

			<view v-if="entry.type === 'file'" class="entry-content">
				<image v-if="entry.type === 'file'" :src="entry.url" class="entry-image" mode="aspectFit" @click="downloadFile(entry.url,entry.name)"></image>
				<text @click="downloadFile(entry.url,entry.name)" class="entry-name">{{ entry.name }}</text>
			</view>
          
         <view v-else  @click="entry.type === 'directory' ? enterFolder(entry.name) : null" class="entry-content">
            <image :src="entry.url" class="entry-image" mode="aspectFit"></image>
			<text v-if="entry.type === 'directory'" class="entry-name">{{ entry.name }}</text>
          </view>
          

      </view>
	      <!-- 分页控制按钮 -->
	      
	  <!-- <div class="placeholder"></div> -->
    </view>
	<view class="pagination-controls">
	  <button @click="previousPage" :disabled="currentPage === 1">上一页</button>
	  <button @click="nextPage" :disabled="currentPage >= totalPages">下一页</button>
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
	  entries:[],
	  currentPage: 1,
	  pageSize: 8,
	  entryHeight: 200,
	  itemHeight:'100px'
    };
  },
  onMounted() {
      this.adjustEntryItemHeight();
      // 监听窗口尺寸变化
      uni.onWindowResize((res) => {
        this.adjustEntryItemHeight();
      });
    },
  onLoad() {
  	this.fetchFilesAndFolders('');
  },
  computed:{
	  totalPages() {
	        return Math.ceil(this.filesAndFolders.length / this.pageSize);
	      },
	      paginatedFilesAndFolders() {
	        const start = (this.currentPage - 1) * this.pageSize;
	        const end = start + this.pageSize;
	        return this.filesAndFolders.slice(start, end);
	      },
  },
  mounted() {
	  this.fetchFilesAndFolders(this.currentPath);
  },
  methods: {
	  adjustEntryItemHeight() {
	        // 获取窗口高度
	        const systemInfo = uni.getSystemInfoSync();
	        const windowHeight = systemInfo.windowHeight;
	        // 假设你想要分配给每个entry-item的高度是窗口高度的1/5
	        const itemHeight = `${windowHeight / 15}px`;
	        this.itemHeight = itemHeight;
	      },
	    onBeforeUnmount() {
	      // 移除窗口尺寸变化监听
	      uni.offWindowResize();
	    },
	  handleScroll(event) {
	        const { scrollTop, scrollHeight, clientHeight } = event.target;
	        if (scrollTop + clientHeight === scrollHeight) {
	          this.nextPage();
	        }
	      },
	       // 平滑滚动到页面顶部
	        scrollToTop() {
	          window.scrollTo({
	            top: 0,
	            behavior: 'smooth'
	          });
	        },
	      
	        // 修改nextPage和previousPage方法，添加滚动到顶部
	        nextPage() {
	          if (this.currentPage < this.totalPages) {
	            this.currentPage++;
	            this.scrollToTop();
	          }
	        },
	        previousPage() {
	          if (this.currentPage > 1) {
	            this.currentPage--;
	            this.scrollToTop();
	          }
	        },
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
	      getFolders(path,'').then(res=>{
			  this.filesAndFolders = res.data
			  this.entries = res.data
			  console.log(this.entries)
		  })
	    },
	    enterFolder(folderName) {
	          let newPath = this.currentPath ? `${this.currentPath}/${folderName}` : folderName;
	          this.fetchFilesAndFolders(newPath);
	          this.currentPath = newPath;
			  this.currentPage = 1;
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
  /* height: 500px; */
  justify-content: flex-start;
  overflow-y: hidden;
}


.pagination-controls {
  display: flex;
  justify-content: center;
  height: 7vh;
}

.pagination-controls button {
  background-color: #008225; /* 科技感的蓝色 */
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.2s ease, background-color 0.2s ease;
  position: relative;
  overflow: hidden;
}

.pagination-controls button:hover {
  background-color: #009000; /* 悬停时颜色加深 */
}

.pagination-controls button:active {
  transform: scale(0.9); /* 点击时缩小效果 */
}

.pagination-controls button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(120deg, transparent, transparent 50%, rgba(255, 255, 255, 0.1));
  background-size: 300% 300%;
  transition: background-position 0.2s ease;
  pointer-events: none;
}

.pagination-controls button:hover::before {
  background-position: 100% 100%;
}

/* 翻页按钮禁用时的样式 */
.pagination-controls button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}
.entry-item {
  height: var(--entry-item-height);
  margin-bottom: 1%;
  margin-right: 1%;
  height: 25vh;
  /* min-width: 10vw; */
  width: 24%;
  min-width: 150px;
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
  max-height: 40%;
  /* height: 100%; */
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