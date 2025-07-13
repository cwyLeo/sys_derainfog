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
				<image v-if="entry.type === 'file'" :src="entry.url" class="entry-image" mode="aspectFit"></image>
				<text @click="downloadFile(entry.url,entry.name)" class="entry-name">{{ entry.name }}</text>
			</view>
          
         <view v-else  @click="entry.type === 'directory' ? enterFolder(entry.name) : null" class="entry-content">
            <image :src="entry.url" class="entry-image" mode="aspectFit"></image>
			<text v-if="entry.type === 'directory'" class="entry-name">{{ entry.name }}</text>
			<button v-if="entry.input_type=='gh'" class="process-folder-btn" @click.stop="processFolderContent(entry.name,'derain')">去雨</button>
			<button v-if="entry.input_type=='gh'" class="process-folder-btn2" @click.stop="processFolderContent(entry.name,'defog')">去雾</button>
          </view>
          

      </view>
    </view>
	<view class="pagination-controls">
	  <button @click="previousPage" :disabled="currentPage === 1">上一页</button>
	  <button @click="nextPage" :disabled="currentPage >= totalPages">下一页</button>
	</view>
  </view>
      <view v-if="showDropdown" class="dropdown-popup">
        <view class="dropdown-content">
          <button @click="closeDropdown" class="cancel-button">取消</button>
      <checkbox-group @change="selectalg">
        <label class="checkbox-label" v-for="algorithm in filteredAlgList" :key="algorithm.title">
          <checkbox :value="algorithm.title" :checked="algorithm.checked"  :class="{ 'is-checked': algorithm.checked }" />
  				  <div class="checkbox-custom"></div>
          <text>{{ algorithm.title }}</text>
        </label>
		<label class=" upload-button-label">
		            <button @click="uploadFiles" class="upload-button">上传文件</button>
		          </label>
      </checkbox-group>
          <button @click="toggleSelectAll" class="select-all-button">{{ selectAllText }}</button>
        </view>
      </view>
  </view>
</template>
 
<script>
	import {getFolders,getImage,download2,getAlg,uploadFolders, download} from '../../util/api.js'
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
	  alglist:[],
	  currentPath:'',
	  showActionSheet:true,
	  entries:[],
	  currentPage: 1,
	  pageSize: 8,
	  entryHeight: 200,
	  itemHeight:'100px',
	  activeOperation: 'derain',
	  selectedAlgorithms: [],
	  showDropdown:false,
	  selectedFolderName:'',
	  finish:false
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
	getAlg().then(res=>{
			  console.log(res)
			  this.alglist = res.data.algs
			  for(var i = 0; i < this.alglist.length; i++){
				  this.alglist[i].checked = false
			  }
			  console.log(this.alglist)
	})
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
		  selectAllText() {
		    const allChecked = this.alglist.filter(algorithm => algorithm.operation === this.activeOperation).every(algorithm => algorithm.checked);
		    return allChecked ? '取消全选' : '全选';
		  },
		  filteredAlgList() {
		  	return this.alglist.filter(algorithm => algorithm.operation === this.activeOperation);
		  }
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
			selectalg(e){
					        const selectedTitles = e.detail.value;
					        this.alglist.forEach(algorithm => {
					          algorithm.checked = selectedTitles.includes(algorithm.title);
					        });
				this.selectedAlgorithms = []
				for(let i  = 0; i < this.alglist.length; i++){
					if(this.alglist[i].checked){
						this.selectedAlgorithms.push(this.alglist[i].title)
					}
				}
					console.log(this.selectedAlgorithms,this.alglist)
			},
			toggleSelectAll() {
					  var tmpalglist = this.alglist.filter(algorithm => algorithm.operation === this.activeOperation)
					  const allChecked = tmpalglist.every(algorithm => algorithm.checked);
					        tmpalglist.forEach(algorithm => {
					          algorithm.checked = !allChecked;
					        });
			      if (this.selectedAlgorithms.length === tmpalglist.length) {
			        // 如果所有项都被选中，则取消全选
			        this.selectedAlgorithms = [];
			      } else {
			        // 否则，全选所有项
			        this.selectedAlgorithms = tmpalglist.map(algorithm => algorithm.title);
			      }
						console.log(this.selectedAlgorithms)
			    },

    handleSidebarItemClick(item) {
      // 处理侧边栏菜单项点击事件
      console.log('点击了菜单项:', item);
	  uni.navigateTo({
	  	url:item.url
	  })
    },
	processFolderContent(folderName,operation) {
	      // 处理指定文件夹下的内容
	      // 这里可以调用后端API或者进行其他操作
		  this.showDropdown = true;
		  this.selectedFolderName = folderName;
	      console.log(`处理文件夹：${folderName}`);
	      // 例如，你可以在这里调用一个方法来获取文件夹内容并处理
		  this.activeOperation = operation;
	    },
		closeDropdown() {
		    this.showDropdown = false;
			this.selectedAlgorithms = [];
			var tmpalglist = this.alglist.filter(algorithm => algorithm.operation === this.activeOperation)
			const allChecked = tmpalglist.every(algorithm => algorithm.checked);
			      tmpalglist.forEach(algorithm => {
			        algorithm.checked = false;
			      });
		  },
	getEntryUrl(entry) {
		getImage(entry.name).then(res=>{
			console.log(res)
			return res.data
		})
	    },
	fetchFilesAndFolders(path) {
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
		},
		uploadFiles(){
			console.log(this.selectedAlgorithms,this.activeOperation);
			let newPath = this.currentPath ? `${this.currentPath}/${this.selectedFolderName}` : this.selectedFolderName;
			uploadFolders(newPath,this.activeOperation,this.selectedAlgorithms).then(res=>{
				console.log(res)
				if(res.data.code=='401'){
					uni.showToast({
						title:res.data.msg,
						icon:'none',
						duration:2000,
						mask:true
					})
				}else{
					this.downloadFile(res.data.url,res.data.name)
				}
			})
			
		},
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
  /* overflow-y: hidden; */
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
  overflow: visible;
}
.entry-content{
	height: 100%;
	width: 100%;
	position: relative;
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
.process-folder-btn {
  position: absolute; /* 绝对定位 */
  top: -8%; /* 右上角对齐 */
  right: 51%; /* 右上角对齐 */
  background-color: #008225; /* 科技感的蓝色背景 */
  color: #ffffff; /* 白色文字 */
  border: none; /* 无边框 */
  border-radius: 5px; /* 圆角 */
  font-size: 1.5vh; /* 文字大小 */
  cursor: pointer; /* 鼠标指针变为手形 */
  outline: none; /* 去除焦点时的轮廓线 */
  transition: background-color 0.3s; /* 背景颜色过渡效果 */
  font-weight: bolder;
}
.process-folder-btn2 {
  position: absolute; /* 绝对定位 */
  top: -8%; /* 右上角对齐 */
  right: 35%; /* 右上角对齐 */
  background-color: #008225; /* 科技感的蓝色背景 */
  color: #ffffff; /* 白色文字 */
  border: none; /* 无边框 */
  border-radius: 5px; /* 圆角 */
  font-size: 1.5vh; /* 文字大小 */
  cursor: pointer; /* 鼠标指针变为手形 */
  outline: none; /* 去除焦点时的轮廓线 */
  transition: background-color 0.3s; /* 背景颜色过渡效果 */
  font-weight: bolder;
}
.dropdown-popup {
  position: absolute;
  width: 100%;
  bottom: -6%;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  box-shadow: 0 -5px 15px rgba(0, 0, 0, 0.2);
  animation: slideUp 0.3s ease-out;
}

/* 下拉选择框内容样式 */
.dropdown-content {
  background-color: #fff;
  padding: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  max-height: 70vh;
  overflow-y: auto;
  -ms-overflow-style: none;
}
	.dropdown-content ::-webkit-scrollbar {
	  display: none; /* Chrome, Safari, Edge (基于Chromium的版本) */
	}
/* 取消按钮样式 */
.cancel-button {
  background-color: transparent;
  color: #008225;
  border: none;
  padding: 10px;
  text-align: left;
  width: 100%;
}
/* 复选框标签样式 */
.checkbox-label {
  display: flex;
  align-items: center;
  margin: 10px 0;
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* 上传按钮标签样式，确保与复选框标签对齐 */
.upload-button-label {
  display: block;
  margin: 10px 0;
}

/* 上传按钮样式 */
.upload-button {
  background-color: #008225;
  color: #fff;
  border: none;
  padding: 5px;
  border-radius: 10px;
  width: 100%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.upload-button:hover {
  background-color: #009000;
}

/* 全选按钮样式 */
.select-all-button {
  background-color: #008225;
  color: #fff;
  border: none;
  padding: 5px;
  border-radius: 10px;
  width: 100%;
  margin-top: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.select-all-button:hover {
  background-color: #009000;
}

/* 动画效果 */
@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0%);
  }
}
.process-folder-btn:hover {
  background-color: #009000; /* 鼠标悬停时背景颜色变深 */
}
</style>