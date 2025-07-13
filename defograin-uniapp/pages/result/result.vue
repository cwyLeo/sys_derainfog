<template>
	<view>
	<view class="header">
	  <img class="logo" src="../../static/newLogo.png" alt="" srcset="" />
	</view>
	<view class="sidebar-container">
	</view>
	<view class="main-content result">
		<scroll-view class="side-folder" scroll-y="true" show-scrollbar="false" :scroll-into-view="scrollIntoView">
			<view class="button-container">
				<button id="goRain" @click="selectMode('rain')">去雨</button>
				<button id="goFog" @click="selectMode('fog')">去雾</button>
			</view>
			<view v-for="(folder, index) in filteredFolders" :key="index" :id="'folder-' + index" :class="['folder-item', { 'selected': selectedFolderIndex === index }]" @click="selectFolder(folder,index)" @tap="handleTap(folder, index)" >
			      {{ folder.name }}
			    </view>
		</scroll-view>
		<view class="content">
	    <view v-if="hasResults" class="image-gallery">
	      <view class="image-item" v-for="(image, index) in results" :key="index">
	        <image class="image" :src="image.url" mode="aspectFit"></image>
	        <a :href="image.url" class="title" target="_blank">{{ image.name }}</a>
	      </view>
	    </view>
		<view class="" v-else>
			暂无上传图片
		</view>			
		</view>

	</view>
	</view>
</template>

<script>
	import {getHistory,getFolders,changeFolderName} from '../../util/api.js'
	export default {
		data() {
		  return {
			  lastTap: 0,
			  tapTimeout: null,
		    sidebarItems: [
		      { title: '单例运行',url:'../index/index',active:false },
		      { title: '文件库',url:'../files/files',active:false },
		      { title: '算法库',url:'../alglist/alglist',active:false },
		      { title: '运行结果',url:'../result/result',active:true }
		    ],
			currentMode:'fog',
			imageUrl:'',
			tr_imgs:[],
			results:[],
			hasres:false,
			folders:[],
			selectedFolderIndex: null,
			indexName: '',
			scrollIntoView:''
		  };
		},
		// onLoad(opt) {
		// 	if(opt.files || getApp().globalData.result_url !=''){
		// 		this.hasResults = true
		// 		// var tmp_urls = JSON.parse(decodeURIComponent(opt.files))
		// 		var tmp_urls = JSON.parse(decodeURIComponent(getApp().globalData.result_url))
		// 	for(var i = 0; i < tmp_urls.length; i++){
		// 		var regex = /_([a-zA-Z]*?)(?=\.)/;
		// 		console.log(tmp_urls[i])
		// 		var match = tmp_urls[i].match(regex);
				
		// 		this.results.push({'url':tmp_urls[i],'name':match[1]})
		// 	}
		// 	console.log(this.results)
		// 	}
		// },
		onShow() {
			this.timer = setInterval(() =>{
				getHistory('').then(res=>{
					this.folders = res.data
					if(getApp().globalData.result_url !=''){
						this.selectedFolderIndex = this.folders.length - 1;
						getFolders('upload_'+this.folders[this.selectedFolderIndex].name,this.currentMode).then(res=>{
											  this.results = res.data
											  console.log(this.hasResults)
						})
						getApp().globalData.result_url = ''
					}
				})
			},1000)
		},
		onHide() {
			clearInterval(this.timer)
		},
		mounted() {
			getHistory('').then(res=>{
				this.folders = res.data
				console.log(this.folders)
				console.log('indexName',this.indexName)
				if(this.indexName != ''){
					for(var i = 0; i < this.folders.length; i++){
						console.log(this.indexName,this.folders[i].name)
						if(this.indexName == this.folders[i].name){
							console.log(1234)
							this.selectedFolderIndex = i;
							getFolders('upload_' + folder.name,this.currentMode).then(res=>{
												  this.results = res.data
							})
						}
					}
				}
			})
		},
		computed: {
			filteredFolders(){
				return this.folders.filter(folder => folder.mode === this.currentMode);
			},
			hasResults() {
			    return this.results.length > 0;
			}
		},
		methods: {
			handleTap(folder, index) {
			      const now = Date.now();
			      const DOUBLE_PRESS_DELAY = 300; // 双击间隔时间，单位毫秒
			      if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY) {
			        // 如果两次点击间隔小于设定的时间，则认为是双击事件
			        clearTimeout(this.tapTimeout); // 清除单次点击的定时器
			        this.handleDoubleClick(folder, index); // 处理双击事件
			      } else {
			        // 如果不是双击，设置一个定时器，等待双击间隔时间后执行
			        this.tapTimeout = setTimeout(() => {
			          this.handleSingleClick(folder, index); // 处理单次点击事件
			        }, DOUBLE_PRESS_DELAY);
			      }
			      this.lastTap = now; // 更新上一次点击的时间
			    },
			    handleSingleClick(folder, index) {
			      // 单击事件的处理逻辑
			      console.log('Single tap');
				  this.selectFolder(folder, index);
			    },
			    handleDoubleClick(folder, index) {
			      // 双击事件的处理逻辑
			      console.log('Double tap');
			      // 这里可以添加你想要在双击时执行的代码，比如重命名文件夹
				  this.renameFolder(folder, index);
			    },
			handleSidebarItemClick(item) {
			  // 处理侧边栏菜单项点击事件
			  console.log('点击了菜单项:', item);
			  uni.navigateTo({
			  	url:item.url
			  })
			},
			selectMode(mode) {
			      this.currentMode = mode;
			      this.results = []; // 清空之前的图片结果
				  this.selectedFolderIndex = null;
				  this.scrollIntoView = ''
			},
			selectFolder(folder,index) {
				this.selectedFolderIndex = index;
				this.scrollIntoView = 'folder-' + index;
				console.log(folder.name)
			      getFolders('upload_' + folder.name,this.currentMode).then(res=>{
					  this.results = res.data
				  })
			},
			renameFolder(folder, index) {
				console.log(index)
				uni.showModal({
				        title: '重命名文件夹',
				        content: '请输入新的文件夹名',
				        editable: true,
				        success: (res) => {
				          if (res.confirm) {
				            const newName = res.content;
				            if (newName.trim() !== '') {
				              // 更新本地数据
							  var oldName = folder.name
				              folder.name = newName;
							  this.indexName = newName;
				              this.$set(this.folders, index, folder);
				              // 调用API更新服务器上的数据
				              changeFolderName(oldName, newName);
							  getHistory('').then(res=>{
								  this.folders = res.data
								  if(this.indexName != ''){
								  	for(var i = 0; i < this.folders.length; i++){
								  		console.log(this.indexName,this.folders[i].name)
								  		if(this.indexName == this.folders[i].name){
								  			console.log(1234)
								  			this.selectedFolderIndex = i;
											this.scrollIntoView = 'folder-' + i;
								  			getFolders('upload_' + folder.name,this.currentMode).then(res=>{
								  								  this.results = res.data
								  			})
								  		}
								  	}
								  }
							  })
				            }
				          }
				        }
				      });
			}
		}
	}
</script>

<style>
.result {
  display: flex;
  margin-left: min(300px,45%); /* 为固定侧边栏腾出空间 */
}
	.side-folder {
	  background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
	  padding: 20px;
	  border-radius: 10px;
	  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
	  color: #fff;
	  width: min(250px,40%); /* 根据需要调整宽度 */
	  height: 100%; /* 根据需要调整高度 */
	  max-height: 60vh;
	  overflow-y: auto; /* 如果内容过多，允许滚动 */
	  position: fixed; /* 使侧边栏固定 */
	  top: 150px; /* 顶部对齐 */
	  left: 0; /* 左侧对齐 */
	}
	.side-folder ::-webkit-scrollbar {
	  display: none; /* Chrome, Safari, Edge (基于Chromium的版本) */
	}
	/* 针对旧版Edge和IE */
	.side-folder {
	  -ms-overflow-style: none; /* IE 10+ 和旧版Edge */
	}
.side-folder button {
  background-color: #555;
  color: white;
  padding: 2% 16%;
  border: none;
  cursor: pointer;
  text-align: center;
}

/* 添加样式以使按钮左右贴合 */
.side-folder .button-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 5%; /* 在按钮和内容之间添加一些空间 */
}
button {
  padding: 10px 20px;
  border: none;
  background-image: linear-gradient(to right, #0f0f0f, #313131);
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  border-radius: 25px;
  cursor: pointer;
  outline: none;
  transition: background-image 0.3s, transform 0.1s;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

button:hover {
  background-image: linear-gradient(to right, #313131, #0f0f0f);
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
/* 特定于去雨和去雾按钮的样式 */
#goRain, #goFog {
  flex-grow: 1; /* 允许按钮扩展以填满可用空间 */
}
	

	.folder-item {
	  padding: 10px;
	  margin: 5px 0;
	  border-radius: 5px;
	  background-color: rgba(255, 255, 255, 0.1);
	  color: #e4e4e4;
	  text-align: center;
	  transition: background-color 0.3s ease;
	}
	.folder-item.selected {
	  /* 高亮显示的文件夹样式 */
	  background-color: #007bff; /* 高亮背景色 */
	  color: white; /* 高亮文字颜色 */
	  /* 其他高亮样式 */
	}
	.folder-item:hover {
	  background-color: rgba(255, 255, 255, 0.2);
	  cursor: pointer;
	}
	.content{
		flex-grow: 1;
		padding-left: 20px;
	}
	.image-gallery {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: flex-start;
	  height: 30vh;
	}
	
.image-item {
  width: 18%; /* 设置每张图片的宽度，18% * 5 = 90%，留下10%的间隙 */
  margin-bottom: 50px; /* 图片之间的垂直间距 */
  margin-right: 20px;
  text-align: center;
}
	
.image {
  width: 100%;
  height: 100%;
  display: block;
}

.title {
  display: block; /* 将标题设置为块级元素，以便可以设置宽度 */
  width: 100%; /* 标题宽度与图片相同 */
  margin-top: 8px; /* 标题与图片的间距 */
  text-align: center; /* 标题居中 */
  color: #333; /* 标题颜色 */
  text-decoration: none; /* 移除链接的下划线 */
  font-size: 16px; /* 设置标题字体大小 */
  transition: color 0.3s ease; /* 为标题添加颜色过渡效果 */
}

.title:hover {
  color: #007aff; /* 鼠标悬停时标题颜色变化 */
}
</style>