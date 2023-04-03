<template>
	<view>
		<view class="list_repair">
			<image src="../../../static/img/yinzhang/daishenhe.png"></image>
			<view class="default mb">2小时56分钟前</view>
			<view class="flex mb">
				<view class="default">报修人员: </view> <view>院本部-刘婷</view>
			</view>
			<view class="flex mb">
				<view class="default">报修内容: </view>
				<view>楼道内灯泡坏了!</view>
			</view>
			<view class="btn_repair">
				<view @click="order()">审核</view>
			</view>
		</view>
		
		<view class="list_repair">
			<image src="../../../static/img/yinzhang/yishenhe.png"></image>
			<view class="default mb">2小时56分钟前</view>
			<view class="flex mb">
				<view class="default">报修人员: </view> <view>院本部-刘婷</view>
			</view>
			<view class="flex mb">
				<view class="default">报修内容: </view>
				<view>楼道内灯泡坏了!</view>
			</view>
		</view>
			<!-- 打补丁 -->
		<view class="buding"></view>
		<view class="xinzeng">
			<view class="repair_btn" @click="newadd()">新增采购</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			order(){
				uni.navigateTo({
					url:"./consumables-check"
				})
			},
			newadd(){
				uni.navigateTo({
					url:"./consumables-newadd"
				})
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #f2f2f2;
	padding-top: 30rpx;
}
.list_repair{
	border-radius: 10rpx;
	position: relative;
	margin: auto;
	margin-bottom: 30rpx;
	padding: 20rpx;
	width: 690rpx;
	background: #fff;
	// height: 364rpx;
	font-size: 28rpx;
	image{
		position: absolute;
		width: 120rpx;
		height: 120rpx;
		top: 20rpx;
		right: 20rpx;
		transform:rotate(30deg);
	}
	.default{
		color: #777777;
		margin-right: 15rpx;
	}
	.mb{
		margin-bottom: 50rpx;
	}
	.btn_repair{
		height: 60rpx;
		view{
			width: 160rpx;
			height: 60rpx;
			text-align: center;
			line-height: 60rpx;
			color: #0DD474;
			border: 1rpx solid #0DD474;
			border-radius: 200rpx;
			float: right;
			margin: 0 0 0 20rpx;
		}
	}
}
.buding{
	height: 140rpx;
}
.xinzeng{
	width: 100%;
	background: #fff;
	height: 120rpx;
	position: fixed;
	bottom: 0;
	box-shadow: 0px -1px 6px #dfdfdf;
	.repair_btn{
		background: #0DD474;
		color: #fff;
		width: 500rpx;
		height: 80rpx;
		margin: auto;
		margin-top: 20rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 80rpx;
		border-radius: 100rpx;
	}
}
</style>