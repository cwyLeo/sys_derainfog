<template>
	<view>
	<view class="header">
	  <img class="logo" src="../../static/newLogo.png" alt="" srcset="" />
	</view>
	<view class="sidebar-container">
	  <!-- <view class="sidebar"> -->
	    <!-- <view class="sidebar-header"> -->
	      <!-- <img class="sidebar-logo" src="../../static/newLogo.png" alt="" srcset="" /> -->
	    <!-- </view> -->
<!-- 	    <view class="sidebar-menu">
	      <view class="sidebar-item" v-for="(item, index) in sidebarItems" :key="index" @click="handleSidebarItemClick(item)" :class="{ active: item.active === true }">
	        {{ item.title }}
	      </view>
	    </view>
	  </view> -->
	  <view class="main-content">
		  <view class="operation-options">
		      <button class="operation-btn" :class="{ 'is-active': activeOperation === 'derain' }" @click="setOperation('derain')">去雨</button>
		      <button class="operation-btn" :class="{ 'is-active': activeOperation === 'defog' }" @click="setOperation('defog')">去雾</button>
		    </view>
	    <view class="image-upload-columns">
			<view class="dropdown-select">
				<button @click="toggleSelectAll" class="select-button">{{ selectAllText }}</button>
			    <checkbox-group @change="selectalg">
			      <label class="checkbox-label" v-for="algorithm in filteredAlgList" :key="algorithm.title">
			        <checkbox :value="algorithm.title" :checked="algorithm.checked"  :class="{ 'is-checked': algorithm.checked }" />
							  <div class="checkbox-custom"></div>
			        <text>{{ algorithm.title }}</text>
			      </label>
			    </checkbox-group>
			  </view>
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
	</view>
	</view>
</template>

<script>
	import JSZip from 'jszip'
	import {uploadImage,getAlg} from '../../util/api.js'
export default {
	data() {
	  return {
	    sidebarItems: [
	      { title: '单例运行',url:'../index/index',active:true },
	      { title: '文件库',url:'../files/files',active:false },
	      { title: '算法库',url:'../alglist/alglist',active:false },
	      { title: '运行结果',url:'../result/result',active:false }
	    ],
		activeOperation: 'derain',
		imageUrl:'',
		pb_imgs:[],
		tr_imgs:[],
		result:'',
		alglist: [
		      { value: 'algorithm1', text: '算法1' },
		      { value: 'algorithm2', text: '算法2' },
		      // 更多算法选项...
		    ],
		    selectedAlgorithms: [],
			multi: []
	  };
	},
	onLoad() {
		getAlg().then(res=>{
				  console.log(res)
				  this.alglist = res.data.algs
				  for(var i = 0; i < this.alglist.length; i++){
					  this.alglist[i].checked = false
				  }
				  console.log(this.alglist)
		})
		
	},
	computed: {
	    // 计算属性，根据alglist的状态返回相应的按钮文字
	    selectAllText() {
	      const allChecked = this.alglist.filter(algorithm => algorithm.operation === this.activeOperation).every(algorithm => algorithm.checked);
	      return allChecked ? '取消全选' : '全选';
	    },
		filteredAlgList() {
			return this.alglist.filter(algorithm => algorithm.operation === this.activeOperation);
		}
	  },
  methods: {
	  setOperation(operation) {
	        this.activeOperation = operation;
			this.selectedAlgorithms = [];
			this.alglist.forEach(algorithm => algorithm.checked = false);
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
			this.result = result2
			isSuccess = result2 && isSuccess
		}
		
		//console.log('所有图片上传结果',isSuccess)
		return isSuccess;
		
	},
	//上传图片
	upload(imagePath){
		var _this = this	
			
		return uploadImage(imagePath,this.selectedAlgorithms,this.activeOperation).then(res1=>{
			console.log('上传操作',res1)
			if(res1.code != 200){
				//_this.$u.toast('图片上次失败')
				console.log('图片',imagePath,'上传失败')
				return false;
			}
			this.result = res1.file_url
			getApp().globalData.result_url = encodeURIComponent(JSON.stringify(res1.folder_name))
			// uni.navigateTo({
			// 	url:'../result/result?files='+encodeURIComponent(JSON.stringify(res1.file_urls))
			// })
			uni.switchTab({
				url:'../result/result'
			})
			return res1.file_url;
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
  align-items: center;
}
.operation-options {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.operation-btn {
  padding: 10px 20px;
  margin: 0 10px;
  background-color: white; /* 主题色 */
  color: #005825;
  border: none;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.operation-btn.is-active {
  background-color: #005825; /* 选中时的颜色 */
  color: white; /* 文字颜色与主题色相反 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4); /* 更深的阴影效果 */
}

.operation-btn:hover:not(.is-active) {
  background-color: #00832a; /* 按钮悬停时的颜色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* 加强阴影效果 */
  color: white;
}
/* 基础样式 */
.dropdown-select {
  display: flex; /* 使用 Flexbox 布局 */
  flex-direction: row; /* 子元素按行排列 */
  align-items: center; /* 垂直居中对齐 */
}
.dropdown-select {
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 对齐到容器的起始位置 */
}

.select-button {
  padding: 2px 10px; /* 内边距 */
  margin-bottom: 10px;
  font-size: 16px; /* 字体大小 */
  color: #fff; /* 文字颜色 */
  text-align: center; /* 文字居中 */
  text-decoration: none; /* 去除下划线 */
  display: inline-block; /* 行内块元素 */
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
  border: none; /* 无边框 */
  border-radius: 25px; /* 圆角边框 */
  background-image: linear-gradient(to right, #003214, #005825); /* 渐变背景 */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); /* 阴影效果 */
  cursor: pointer; /* 鼠标样式 */
  transition: all 0.3s ease; /* 过渡效果 */
}

.select-button:hover {
  background-image: linear-gradient(to right, #003214, #005825); /* 鼠标悬停时的渐变背景 */
  transform: translateY(-3px); /* 鼠标悬停时的轻微上移效果 */
  box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.2), 0 8px 24px 0 rgba(0, 0, 0, 0.19); /* 鼠标悬停时的阴影效果 */
}

.select-button:active {
  transform: translateY(0); /* 点击时的效果，取消上移 */
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 4px 8px 0 rgba(0, 0, 0, 0.19); /* 点击时的阴影效果 */
}
.checkbox-label {
  display: flex;
  align-items: center; /* 垂直居中对齐复选框和文字 */
  margin-bottom: 5px; /* 在每个复选框之间添加一些间距 */
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 8px 0;
}

/* 隐藏原生的 checkbox */
.checkbox-label checkbox {
  display: none;
}

/* 创建自定义的 checkbox 样式 */
.checkbox-label .checkbox-custom {
  position: relative;
  width: 22px;
  height: 22px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

/* 选中状态下的 checkbox 样式 */
.checkbox-label checkbox.is-checked + .checkbox-custom {
  background-color: #005825;
}

/* 添加勾选图标 */
.checkbox-label checkbox.is-checked + .checkbox-custom::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 8px;
  height: 14px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

/* 文本样式 */
.checkbox-label text {
  margin-left: 8px;
  font-size: 16px;
  color: #4c4c4c;
}

/* 交互效果 */
.checkbox-label:hover .checkbox-custom {
  background-color: #999;
}
/* 图像上传列容器 */
.image-upload-columns {
  display: flex;
  justify-content: space-evenly; /* 使用 space-evenly 来平均分配间距 */
  width: 100%;
  max-width: 1200px; /* 根据需要调整最大宽度 */
  margin-bottom: 40px; /* 按钮与上传区域之间的间距 */
  background: linear-gradient(to right, #99ef99, #005825); /* 背景渐变 */
  padding: 3%;
  border-radius: 10px; /* 圆角边框 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* 更深的阴影效果 */
}

/* 单个图像上传列 */
.image-upload-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%; /* 减少宽度，为间距留出更多空间 */
  margin: 0 2%; /* 添加左右外边距 */
  border: 1px solid rgba(0, 130, 37, 0.2); /* 边框颜色调整 */
  padding: 1%;
  background: rgba(0, 130, 37, 0.1); /* 透明背景 */
  backdrop-filter: blur(10px); /* 背景模糊效果 */
  border-radius: 8px; /* 圆角边框 */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 添加动态效果 */
}

.image-upload-column:hover {
  transform: translateY(-5px); /* 鼠标悬停时轻微上移 */
  box-shadow: 0 10px 20px  rgba(0, 130, 37, 0.3); /* 鼠标悬停时加深阴影 */
}


/* 图像上传标题 */
.image-upload-header {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #ffffff; 
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

/* 上传按钮样式 */
.upload-btn {
  width: 90%; /* 按钮宽度 */
  padding: 15px; /* 增加内边距 */
  font-size: 16px;
  color: #fff;
  background-image: linear-gradient(to right, #003214, #005825); /* 渐变背景 */
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
  background-image: linear-gradient(to right, #005825, #003214); /* 鼠标悬停时渐变反向 */
}

.upload-btn:active {
  transform: translateY(0); /* 点击时无上移效果 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2); /* 点击时减少阴影效果 */
}
.result{
	width: 80vw;
}


</style>