<!-- 横向滑动的tab 列表 -->
<template>
	<view>
		<scroll-view class="scroll-h" :scroll-x="true" :show-scrollbar="false" :style="{ borderColor: tabViewBorderColor }">
			<view v-for="(tab, index) in tabBars" :key="index" class="uni-tab-item" :data-current="index" @click="onTabTap">
				<text
					class="uni-tab-item-title"
					:class="tabIndex == index ? 'uni-tab-item-title-active' : ''"
					:style="[tabIndex == index ? { color: tabItemTitleActiveColor, borderColor: tabItemTitleActiveBorderColor } : { color: tabItemTitleColor }]"
				>
					{{ tab }}
				</text>
			</view>
		</scroll-view>
	</view>
</template>
<script>
export default {
	name: 'scrollHorizontalTab',
	props: {
		// tab列表
		tabBars: {
			type: Array,
			require: true
		},

		// 默认选中的tab 下标
		tabIndexInit: {
			type: Number,
			default: 0
		},

		// tabItem标题文字默认颜色
		tabItemTitleColor: {
			type: String,
			default: '#555'
		},
		// tabItem标题文字默认底边颜色
		tabViewBorderColor: {
			type: String,
			default: '#dddddd'
		},

		// tabItem标题选中文字颜色
		tabItemTitleActiveColor: {
			type: String,
			default: '#007aff'
		},

		// tabItem标题选中文字底边颜色
		tabItemTitleActiveBorderColor: {
			type: String,
			default: '#007aff'
		}
	},
	data() {
		return {
			tabIndex: this.tabIndexInit
		};
	},
	methods: {
		onTabTap(e) {
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			if (this.tabIndex != index) {
				this.tabIndex = index;
				this.$emit('onTabTap', index);
			}
		}
	}
};
</script>

<style>
/* 隐藏滚动条，但依旧具备可以滚动的功能 */
scroll-view ::-webkit-scrollbar {
	width: 0;
	height: 0;
	background-color: transparent;
}

.scroll-h {
	height: 67rpx;
	display: flex;
	flex-direction: row;
	white-space: nowrap;
	border-color: #dddddd;
	border-bottom-style: solid;
	border-bottom-width: 1rpx;
}

.uni-tab-item {
	width: 200upx;
	display: inline-block;
	flex-wrap: nowrap;
}

.uni-tab-item-title {
	color: #555;
	font-size: 35upx;
	width: 200upx;
	padding-left: 30upx;
	padding-right: 30upx;
	padding-bottom: 15upx;
}

.uni-tab-item-title-active {
	color: #007aff;
	font-size: 38upx;
	border-color: #007aff;
	border-bottom-style: solid;
	/* font-weight: bold; */
	border-bottom-width: 2rpx;
}
</style>
