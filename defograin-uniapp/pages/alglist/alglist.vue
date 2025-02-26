<template>
  <view class="header">
    <img class="logo" src="../../static/newLogo.png" alt="" srcset="" />
  </view>
  <view class="sidebar-container">
    <!-- <view class="sidebar"> -->
<!--      <view class="sidebar-header">
        <img class="sidebar-logo" src="../../static/newLogo.png" alt="" srcset="" />
      </view> -->
<!--      <view class="sidebar-menu">
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
        <view class="image-gallery">
          <view class="image-item" v-for="(image, index) in filteredAlgList" :key="index">
            <image class="image" :src="image.url" mode="aspectFit"></image>
            <a :href="image.paper" class="title" target="_blank">{{ image.title }}</a>
          </view>
        </view>
    </view>
  </view>
</template>
 
<script>
	import {getAlg} from '../../util/api.js'
export default {
  data() {
    return {
	  activeOperation: 'derain',
      sidebarItems: [
        { title: '单例运行',url:'../index/index',active:false },
        { title: '文件库',url:'../files/files',active:false },
        { title: '算法库',url:'../alglist/alglist',active:true },
        { title: '运行结果',url:'../result/result',active:false }
      ],
	  images:[]
    };
  },
  onLoad() {
	  getAlg().then(res=>{
		  console.log(res)
		  this.images = res.data.algs
		  
	  })
  },
  computed:{
	  filteredAlgList() {
	  	return this.images.filter(algorithm => algorithm.operation === this.activeOperation);
	  }
  },
  methods: {
	  setOperation(operation) {
	        this.activeOperation = operation;
	      },
    handleSidebarItemClick(item) {
      // 处理侧边栏菜单项点击事件
      console.log('点击了菜单项:', item);
	  uni.navigateTo({
	  	url:item.url
	  })
    }
  }
};
</script>
 
<style>
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
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  height: 500px;
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