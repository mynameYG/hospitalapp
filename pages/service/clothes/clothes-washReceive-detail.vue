<template>
	<view class="container p15">
		<view class="field-box whiteBg radius4 p15">
			<view class="field-title fs16 flex1">2022-05-30</view>
			<view class="field-item flex mt10">
				<view class="field-label">被服类型：</view>
			</view>
			<view class="field-item flex">
				<view class="field-label mr10">工作服</view>
				<view class="field-con flex1">X20件</view>
			</view>
			<view class="field-item flex">
				<view class="field-label mr10">病人服</view>
				<view class="field-con flex1">X20件</view>
			</view>
			<view class="tc" v-if="show" @click="show = !show" >
				<text class="iconfont icon-xiala1" style="color:#0dd474"></text>
			</view>
			<template v-if="!show">
				<view class="field-item flex">
					<view class="field-label mr10">工作服</view>
					<view class="field-con flex1">X20件</view>
				</view>
				<view class="field-item flex">
					<view class="field-label mr10">工作服</view>
					<view class="field-con flex1">X20件</view>
				</view>
				<view class="field-item flex">
					<view class="field-label mr10">工作服</view>
					<view class="field-con flex1">X20件</view>
				</view>
				<view class="field-item flex">
					<view class="field-label mr10">工作服</view>
					<view class="field-con flex1">X20件</view>
				</view>
			</template>
			<view class="tc" v-if="!show" @click="show = !show" >
				<text class="iconfont icon-xiangshang"  style="color:#0dd474"></text>
			</view>
		</view>
		
		<view class="field-box whiteBg radius4 p15 mt15" v-if="status == 0">
			<view class="field-title fs14 flex1 no-bb">确认无误请签名</view>
			<view class="sign-box">
				<signView></signView>
			</view>
		
		
		</view>
		
	</view>
</template>

<script>
	import signView from './clothes-sign.vue';
	export default {
		components: {
			signView
		},
		data(){
			return{
				show:true,
				info:{},
				status:0
			}
		},
		onLoad(option){
			this.status = option.status;
			if(option.status == 1){
				this.show = false
			}
			if(option.pageName){
				uni.setNavigationBarTitle({
					title: option.pageName + '详情'
				})
			}
		},
		methods:{}
	}
</script>

<style lang="scss">
	.container{
		/* #ifdef H5 */
		height: calc(100vh - 88upx);
		/*  #endif */
	}
	.field-box {
		.field-title{
			padding-bottom:20rpx;
			color:#777;
			border-bottom: 2rpx solid #F2F2F2;
		}
	}
	.sign-box{
		height:294rpx;
		background-color:#F5F5F5;
		border-radius: 12rpx;
	}
</style>