<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			result_url:''
		}
	}
</script>

<style>
	@import 'static/common.css';
	/*每个页面公共css */
	uni-page-head{display: none;}
</style>
