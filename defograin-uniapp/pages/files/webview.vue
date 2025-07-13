//在小程序的preview路由中
<template>
    <view class="container">
			<iframe :src="url"></iframe>
    </view>
</template>
 
<script>
    export default {
        data() {
            return {
                finish:false,
				url:'',
				arrs:false,
				urls:[],
				curr:0
            }
        },
        onLoad(e) {
            var that=this
            if(e.url){
				this.url = e.url
				console.log(this.url)
                // 先重置
                that.finish=false
                uni.downloadFile({
                    url:e.url,
                    success: (res) => {
                        var temp=res.tempFilePath
                        setTimeout(()=>{
                            uni.openDocument({
                                filePath:temp,
                                showMenu:true,
                                success() {
									uni.showToast({
										title:that.finish.toString()
									})
                                    that.finish=true
                                    console.log(that.finish);
                                },
								fail() {
									uni.showToast({
										title:that.finish.toString()
									})
									that.finish=true
								}
                            })
                        },0)
                    },
					fail:(res)=>{
						uni.showToast({
							title:res.data
						})
						that.finish = true
					}
                })
            }
        },
        
        onShow() {
            if(!this.arrs){
                uni.navigateBack({
                    delta:1,//返回层数，2则上上页
                })
            }
        },
        methods: {
			handlemessage(event){
				console.log(event.detail.data)
			},
        }
    }
</script>
 
<style>
.container {
        width: 100%;
        height: 80vh;
}
</style>