<template>
	<view>
		<!-- 流程记录 -->
		<view v-if="history.length>0" class="info-box-ex">
			<!-- 安全办督办记录 -->
			<!-- <view v-if="history[0].reportLevel == 5">
				<view class="info-box-ex">
					<view class="info-unit">
						<view class="info">隐患评估</view>
						<view class="value">{{history[0].handlerName}}</view>
					</view>
					<view class="info-unit">
						<view class="info">评估时间</view>
						<view class="value">{{history[0].reportTime}}</view>
					</view>
				</view>
				<view class="info-box-ex" v-if="history[1] != undefined">
					<view v-if="problem.safety == 1" class="info-unit">
						<view v-if="history[1].status == 0" class="info">判定为问题误报</view>
						<view v-else class="info">风险等级评估</view>
						<view v-if="problem.riskLevel==2" class="value">低风险问题</view>
						<view v-if="problem.riskLevel==10" class="value">中风险问题</view>
						<view v-if="problem.riskLevel==20" class="value">高风险问题</view>
					</view>
					<view class="info-unit" v-if="history[1].status != 0">
						<view class="info">整改意见</view>
						<view class="value" v-for="(item,index) in history[1].repairDescription.split(';')" :key="index">{{item}}</view>
					</view>
					<view class="info-unit">
						<view class="info">隐患评估</view>
						<view class="value">{{history[1].handlerName}}</view>
					</view>
					<view class="info-unit">
						<view class="info">评估时间</view>
						<view class="value">{{history[1].reportTime}}</view>
					</view>
				</view>
			</view> -->
			
			<!-- 常规指派记录 -->
			<!-- <view v-else> -->
				<view v-if="problem.safety == 1" class="info-unit">
					<view v-if="history[0].status == 0" class="info">判定为问题误报</view>
					<view v-else class="info">风险等级评估</view>
					<view v-if="problem.riskLevel==2" class="value">低风险问题</view>
					<view v-if="problem.riskLevel==10" class="value">中风险问题</view>
					<view v-if="problem.riskLevel==20" class="value">高风险问题</view>
				</view>
				<view class="info-unit" v-if="history[0].status != 0">
					<view class="info">整改意见</view>
					<view class="value" v-for="(item,index) in history[0].repairDescription.split(';')" :key="index">{{item}}</view>
				</view>
				<view class="info-unit">
					<view class="info">隐患评估</view>
					<view class="value">{{history[0].handlerName}}</view>
				</view>
				<view class="info-unit">
					<view class="info">评估时间</view>
					<view class="value">{{history[0].reportTime}}</view>
				</view>
			<!-- </view> -->
		</view>
		
		<view v-if="problem.reportLevel==4&&!checktype" class="info-box-ex">
			<view class="info-unit">
				<view class="info">已第一时间通知相关人员处理</view>
			</view>
		</view>
		
		<view v-for="(item, index) in history" :key="index" :class="type[item.reportLevel]" v-if="item.reportLevel!=4&&item.reportLevel!=5">
			<view v-if="item.reportLevel==1 || item.reportLevel==2 || item.reportLevel==6" class="info-unit">
				<view class="info">
					{{item.reportLevel==1 ? '审批结果':'审核结果'}}
					{{item.status==1 ? '通过':'不通过'}}
				</view>
			</view>
			<view class="info-unit" v-if="problem.safety == 1 || item.reportLevel != 3">
				<view class="info">{{titles[item.reportLevel][0]}}</view>
				<view class="value">{{item.repairDescription}}</view>
			</view>
			<view v-if="item.reportLevel == 3 && item.repairImgs.length" class="info-unit">
				<view class="info">整改照片</view>
				<htz-image-upload :max="item.repairImgs.length" :remove="false" v-model="item.repairImgs" ></htz-image-upload>
			</view>
			<view class="info-unit">
				<view class="info">{{titles[item.reportLevel][1]}}</view>
				<view class="value">{{item.handlerName}}</view>
			</view>
			<view v-if="problem.safety== 0 " class="info-unit">
				<view class="info">隐患整改负责人签名</view>
				<!-- <htz-image-upload :remove="false" v-model="problem.signature" ></htz-image-upload> -->
				<img class="htz-image-upload-Item" :src="problem.signature" alt="" />
			</view>
			<view class="info-unit">
				<view class="info">{{titles[item.reportLevel][2]}}</view>
				<view class="value">{{item.reportTime}}</view>
			</view>
		</view>
	</view>
</template>

<script>
/**
 * problem-history 问题处理流程记录
 * @description 问题处理流程记录
 * @property Array 	history 							处理流程
 * @property Obejct 	problem 							问题详情
 */
export default {
	name: "problem-history",
	props: {
		history: {
			type: Array,
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
	data(){
		return{
			type: ['','info-box-fin','info-box-ex','info-box-rp','','','info-box-ex'],
			titles: [[], // 占位用，不可删
				['审批反馈','审批人员','审批时间'],
				['审核反馈','审核人员','审核时间'],
				['整改反馈','隐患整改负责人','整改时间'],
				[],['审批反馈','审批人员','审批时间'],['审核反馈','审核人员','审核时间']],
		}
	}
}
</script>

<style>
	.htz-image-upload-Item {
		width: 160rpx;
		height: 160rpx;
		margin: 13rpx;
		border-radius: 10rpx;
		position: relative;
	}
</style>
