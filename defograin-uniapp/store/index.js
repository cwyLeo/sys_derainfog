import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {};

try{
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
}catch(e){
	
}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_token','vuex_role','vuex_liableProjects','vuex_projectList'];

// 保存变量到本地存储中
const saveLifeData = function(key, value){
	// 判断变量名是否在需要存储的数组中
	if(saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	state: {
		// 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
		// 加上vuex_前缀，是防止变量名冲突，也让人一目了然
		// {
		// 	time: '',
		// 	version: '',
		// 	description: []
		// },
		version_history: [
			{
				time:'2024-12-25',
				version:'v1.7.12',
				description:['答题界面提供及时反馈','排行榜比赛时间精确度提高']
			},
			{
				time:'2024-01-20',
				version:'v1.6.12',
				description:['开通新水坑村界面','开通查看全部历史台账功能','子公司界面与信投公司界面操作分离']
			},
			{
				time: '2023-09-04',
				version: 'v1.6.9',
				description: ['开通子公司界面','支持电脑端打开文件','信投人员可访问子公司界面','不同公司人员的操作界面需要在本公司界面进行操作']
			},
			{
				time: '2023-07-12',
				version: 'v1.6.7',
				description: ['宫格图添加应急报送，下级公司列表，其他模块','短信通知支持添加图片并在台账中显示','支持PC端小程序内复制报表链接在浏览器中打开']
			},
			{
				time: '2023-06-05',
				version: 'v1.6.6',
				description: ['解决文件资讯返回时出现空白页的问题','首页轮播图资讯提供文件类型支持']
			},
			{
				time: '2023-05-31',
				version: 'v1.6.4',
				description: ['解决首页每次加载时重新加载图片信息的问题','修改首页任务处理流程跳转图标，并修改跳转路径为需要处理的页面','完成突发情况一键报送功能开发','调整上报页面检察人员输入框','整理三维模型、视频功能模块台账并提供给后端','处理一键报送测试反馈20230518中提到的所有问题','简化上报模块问题类型描述的代码，压缩代码体积','一键上报参数新增：1、区分电联还是短信通知；2、上报时间','“我的”界面完善公司部门修改功能','资讯模块新增文件类型展示的支持'
				,'安全资料台账年份进行排序','子公司列表支持动态显示']
			},
			{
				time: '2022-12-16',
				version: 'v1.6.0',
				description: ['优化管理台账中详细台账的安全资料台账按钮加载','竞赛结束显示分数确认后跳转至当前做的题库回顾','设置新的竞赛']
			},
			{
				time: '2022-09-13',
				version: 'v1.5.2',
				description: ['上报按钮设置点击时间间隔']
			},
			{
				time: '2022-09-09',
				version: 'v1.5.1',
				description: ['解决上报建议自行填入的内容意外未生效的问题']
			},
			{
				time: '2022-08-08',
				version: 'v1.5.0',
				description: ['修改子公司上报相关的处理流程','修改登录模块项目列表构建逻辑','开放子公司历史台账功能','优化处理流程界面逻辑']
			},
			{
				time: '2022-07-12',
				version: 'v1.4.16',
				description: ['优化未登录时进入首页时的提醒信息','完善问题上报后的提醒信息并清空页面','完成并测试了安全办监督相关流程，并增加了处理记录表中安全办监督对应的处理记录']
			},
			{
				time: '2022-07-01',
				version: 'v1.4.15',
				description: ['修复轮播图bug','新增安全办监督及相关处理流程']
			},
			{
				time: '2022-06-28',
				version: 'v1.4.13',
				description: ['优化记录表链接','增加实名制上报逻辑']
			},
			{
				time: '2022-05-31',
				version: 'v1.4.12',
				description: ['优化管理台账报表','学习更名为“学习积分”'],
			},
			{	
				time: '2022-05-16',
				version: 'v1.4.11',
				description: ['修复上报时同时选择问题类型和建议会导致出错的问题']
			},
			{
				time: '2022-04-20',
				version: 'v1.4.10',
				description: ['修复手机快捷登录后上报无法选择项目的问题','动态修改首页标题','去除“线上知识竞赛”活动栏','修复上报时偶发图片上传失败的问题']
			},
			{
				time: '2022-03-29',
				version: 'v1.4.9',
				description: ['增加由“番禺信投”小程序跳转至本小程序仍保持登录状态的功能','轮播图和资讯模块细节修改','上报问题时显示已勾选的问题描述','优化上报时图片处理相关代码逻辑及增加图片压缩步骤','解决问题上报选错建议/问题类型时，原勾选的内容仍被上报的问题']
			},
			{
				time: '2022-03-27',
				version: 'v1.4.8',
				description: ['修正部分错误','代码优化']
			},
			{
				time: '2022-03-04',
				version: 'v1.4.6',
				description: ['修复部分监控功能','调整问题上报模块项目选择顺序','增添子公司系统，登录、问题上报、轮播图、热点资讯、风险预警、安全巡查和视频监控模块已适配子公司系统']
			},
			{
				time: '2021-12-06',
				version: 'v1.4.5',
				description: ['排行榜新增导出功能','简化“建议”处理闭环']
			},
			{
				time: '2021-11-22',
				version: 'v1.4.4',
				description: ['考试答题用时改为毫秒级']
			},
			{
				time: '2021-11-19',
				version: 'v1.4.3',
				description: ['新增题库、考试模块和排行榜']
			},
			{
				time: '2021-10-12',
				version: 'v1.4.1',
				description: ['新增部分监控位点']
			},
			{
				time: '2021-09-21',
				version: 'v1.4.0',
				description: ['上报模块新增“建议”类型']
			},
			{
				time: '2021-09-12',
				version: 'v1.3.2',
				description: ['小知识模块新增视频列表']
			},
			{
				time: '2021-09-05',
				version: 'v1.3.0',
				description: ['修改首页图标在显示首页时为logo图标','上报项目选择增加“其他项目”选项','上报时新增检查人员并支持手动输入多人名字']
			},
			{
				time: '2021-08-16',
				version: 'v1.2.12',
				description: ['修复管理台账图表显示异常问题']
			},
			{
				time: '2021-08-10',
				version: 'v1.2.11',
				description: ['修复热点资讯显示异常bug','最新资讯显示最新6条','修复图表坐标轴对应月份错误bug']
			},
			{
				time: '2021-07-19',
				version: 'v1.2.10',
				description: ['小知识模块增加富文本编辑功能']
			},
			{
				time: '2021-06-25',
				version: 'v1.2.9',
				description: ['修复申请延期后问题没有出现在问题处理页面的问题']
			},
			{
				time: '2021-06-23',
				version: 'v1.2.8',
				description: ['修复问题处理无法申请延期的问题']
			},
			{
				time: '2021-06-22',
				version: 'v1.2.7',
				description: ['新增两个小知识','修复上报时图片过大无法上传的问题']
			},
			{
				time: '2021-06-03',
				version: 'v1.1.1',
				description: ['问题指派、延期可自由设定整改期限','问题记录使用颜色标识区分不同程度的处理状态','管理台账新增多种表型','暂时屏蔽视频监控']
			},
			{
				time: '2021-05-22',
				version: 'v1.1.0',
				description: ['支持热点资讯和安全项目的全局搜索','热点资讯更新为富文本展示，使其展示效果更多样']
			},
			{
				time: '2021-05-16',
				version: 'v1.0.10',
				description: ['首页、资讯分类调整','监控新增无权限限制的路面监控']
			},{
				time: '2021-05-12',
				version: 'v1.0.9',
				description: ['修复上报的问题立刻超出整改期限的bug','修复退出答题界面后，仍然会触发测试时间结束的bug']
			},
			{
				time: '2021-05-11',
				version: 'v1.0.8',
				description: ['适配了Android和IOS平台的视频监控功能']
			},
			{
				time: '2021-05-09',
				version: 'v1.0.7',
				description: ['修复了申请整改延期失败的bug']
			},
			{
				time: '2021-05-08',
				version: 'v1.0.6',
				description: ['首页顶部新增天气情况','热点资讯新增最新资讯分类','调整项目历史记录查看权限','调整视频监控查看权限']
			},
			{
				time: '2021-05-02',
				version: 'v1.0.5',
				description: ['调整了未登录用户的提示','用户只能查看自己所负责项目的视频监控','新增资讯分类','新增学习台账','新增pdf导出功能']
			},
			{
				time: '2021-04-29',
				version: 'v1.0.4',
				description: ['现无需登录也可预览主要页面','项目详情中，点击地址可跳转至外部导航','手写签名调整为在整改环节添加','部分UI调整']
			},
			{
				time: '2021-04-26',
				version: 'v1.0.3',
				description: ['更新微信授权登录方式','修复连续上报出现上报失败的问题','历史台账可以查看单条处理记录详情']
			},
			{
				time: '2021-04-15',
				version: 'v1.0.2',
				description: ['修复了测试界面无法点击选项的bug，以及可能出现的无法翻页bug']
			},
			{
				time: '2021-04-15',
				version: 'v1.0.1',
				description: ['修正了已知bug','替换更为清晰的logo图标']
			},
			{
				time: '2021-04-14',
				version: 'v1.0.0',
				description: ['正式发布并试运行']
			},
		],
		vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {
			userId: 0,
			nickName: '点击登录',
			avatar: '/static/tabbar/wode.png',
			phonenumber: '',
			sex: '',
			mark: 0
			},
		vuex_role: lifeData.vuex_role ? lifeData.vuex_role : {
			roleKey: '100000000000000000000'
		},
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		vuex_liableProjects: lifeData.vuex_liableProjects ? lifeData.vuex_liableProjects : [],
		vuex_projectList: lifeData.vuex_projectList ? lifeData.vuex_projectList :  {
			value: 0,
			children: []
		},
		vuex_value: [],
		vuex_project: {},
		vuex_problem: {},
		vuex_repair: {},
		vuex_current: 0,//study页面的标签页
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.name.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if(len >= 2) {
				let obj = state[nameArr[0]];
				for(let i = 1; i < len - 1; i ++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.name] = payload.value;
				saveKey = payload.name;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store
