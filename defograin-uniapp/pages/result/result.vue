<template>
	<view>
	<view class="header">
	  <img class="logo" src="../../static/newLogo.png" alt="" srcset="" />
	</view>
	<view class="sidebar-container">
<!-- 	  <view class="sidebar">
	    <view class="sidebar-header">
	      <img class="sidebar-logo" src="../../static/newLogo.png" alt="" srcset="" />
	    </view>
	    <view class="sidebar-menu">
	      <view class="sidebar-item" v-for="(item, index) in sidebarItems" :key="index" @click="handleSidebarItemClick(item)" :class="{ active: item.active === true }">
	        {{ item.title }}
	      </view>
	    </view>
	  </view> -->
	</view>
	<view class="main-content">
	    <view v-if="hasres" class="image-gallery">
	      <view class="image-item" v-for="(image, index) in results" :key="index">
	        <image class="image" :src="image.url" mode="aspectFit"></image>
	        <a :href="image.url" class="title" target="_blank">{{ image.title }}</a>
	      </view>
	    </view>
		<view class="" v-else>
			暂无上传图片
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
		  return {
		    sidebarItems: [
		      { title: '单例运行',url:'../index/index',active:false },
		      { title: '文件库',url:'../files/files',active:false },
		      { title: '算法库',url:'../alglist/alglist',active:false },
		      { title: '运行结果',url:'../result/result',active:true }
		    ],
			imageUrl:'',
			tr_imgs:[],
			results:[],
			hasres:false
		  };
		},
		onLoad(opt) {
			if(opt.files || getApp().globalData.result_url !=''){
				this.hasres = true
				// var tmp_urls = JSON.parse(decodeURIComponent(opt.files))
				var tmp_urls = JSON.parse(decodeURIComponent(getApp().globalData.result_url))
			for(var i = 0; i < tmp_urls.length; i++){
				var regex = /_([a-zA-Z]*?)(?=\.)/;
				console.log(tmp_urls[i])
				var match = tmp_urls[i].match(regex);
				
				this.results.push({'url':tmp_urls[i],'title':match[1]})
			}
			console.log(this.results)
			}
		},
		methods: {
			handleSidebarItemClick(item) {
			  // 处理侧边栏菜单项点击事件
			  console.log('点击了菜单项:', item);
			  uni.navigateTo({
			  	url:item.url
			  })
			},
		}
	}
</script>

<style>
	.image-gallery {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
	  height: 300px;
	}
	
	.image-item {
	  width: 18%; /* 设置每张图片的宽度，18% * 5 = 90%，留下10%的间隙 */
	  margin-bottom: 50px; /* 图片之间的垂直间距 */
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