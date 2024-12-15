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
      新闻
    </view>
  </view>
</template>
 
<script>
export default {
  data() {
    return {
      sidebarItems: [
        { title: '单例运行',url:'../index/index' },
        { title: '文件库',url:'../files/files' },
        { title: '算法库',url:'../alglist/alglist' },
        { title: '菜单项4' }
      ]
    };
  },
  methods: {
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