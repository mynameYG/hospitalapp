<template>
	<view class="status-btn">
		<image v-if="status" :src="getStatusImg(status)" mode=""></image>
	</view>
</template>

<script>
	export default{
		props:{
			status: {
				type: String,
				default: "",
			},
		},
		methods:{
			//获取图片地址
			getStatusImg(status){
				// if(status == 'processing'){
				// 	status = "daishenpi"
				// }else if(status == 'true'){
				// 	status = 'yitongguo'
				// }
				console.log('status',typeof status)
				switch(status){
					case 'processing': 
						status = "daishenpi";
						break;
					case 'agreed': 
						status = 'yitongguo';
						break;
					case 'over':
						status = 'yiwancheng';
						break;
					case "process":
						status = 'chulizhong';
						break;
					case "rejected":
						status = 'weitongguo';
						break;
				}
				return require("@/static/img/yinzhang/" + status +".png");
			},
		}
	}
</script>

<style lang="scss">
	.status-btn{
		position: absolute;
		top:30rpx;
		right:30rpx;
		width: 120rpx;
		height: 120rpx;
		overflow: hidden;
		transform: rotate(30deg);
		image{
			width: 100%;
			height: 100%;
		}
	}
</style>