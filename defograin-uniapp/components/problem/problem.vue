<template>
	<view>
		<view class="info-box-pb">
			<view class="info-unit">
				<view class="info">项目名称</view>
				<view class="value">{{project.projectName}}</view>
			</view>
			<view class="info-unit">
				<view class="info">项目地址</view>
				<view class="value">{{project.address}}</view>
			</view>
			<view class="info-unit">
				<view class="info">专项类型</view>
				<view class="value">{{problem.speType}}</view>
			</view>
			<view class="info-unit">
				<view class="info">表单类型</view>
				<view class="value">{{problem.formtype}}</view>
			</view>
			<view  class="info-unit">
				<view class="info">问题描述</view>
				<view class="value" v-for="(item,index) in desc" :key="index">{{item}}</view>
			</view>
			<view class="info-unit">
				<view class="info">隐患数量</view>
				<view class="value">{{problem.descNum}}</view>
			</view>
			<view class="info-unit">
				<view v-if="this.problem_safety == 1" class="info">问题照片</view>
				<view v-else class="info">相关照片</view>
				<htz-image-upload :max="pb_imgs.length" :remove="false" v-model="pb_imgs" ></htz-image-upload>
			</view>
			<view class="info-unit">
				<view class="info">上报人</view>
				<view class="value">{{problem.reporterName}}</view>
			</view>
			<view class="info-unit">
				<view class="info">检查人员</view>
				<view class="value">{{problem.inspector}}</view>
			</view>
			<view class="info-unit">
				<view class="info">检查人员人数</view>
				<view class="value">{{problem.inspectorNum}}</view>
			</view>
			<view class="info-unit">
				<view class="info">上报时间</view>
				<view class="value">{{problem.reportTime}}</view>
			</view>
			<view class="info-unit" v-if="problem.endTime != null">
				<view class="info">截止时间</view>
				<view class="value">{{problem.endTime}}</view>
			</view>
			<view class="info-unit" v-if="checktype&&signImg!=null">
				<view class="info">手写签名</view>
				<image :src="signImg"></image>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * problem 问题详情
 * @description 问题详情
 * @property Obejct 	project 							项目详情
 * @property Obejct 	problem 							问题详情
 */
export default {
	name: "problem",
	props: {
		project: {
			type: Object,
			value: null
		},
		problem: {
			type: Object,
			value: null
		},
		checktype: {
			type: Boolean,
			value: false
		}
	},
	created(){
		let reg = /(?<=.)(?=\d+[\.、])/g
		this.desc = this.problem.description.split(reg)
		// this.desc.pop()
		for (var i = 0; i < this.problem.problemImgs.length; i++) {
			this.pb_imgs.push(this.problem.problemImgs[i].url)
		}
		this.signImg = uni.getStorageSync('signImg')
		console.log('imgs',this.signImg,this.checktype)
	},
	data(){
		return{
			pb_imgs: [],
			desc: null,
			signImg:null
		}
	},
	onLoad() {
		this.signImg = uni.getStorageSync('signImg')
		console.log('imgs',this.signImg,this.checktype)
		
	}
}
</script>

<style>
</style>
