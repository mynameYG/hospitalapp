
<template>
	<view>
		<view class="steps">
			<view class="steps_list" v-for="(item,index) of step" :key="index">
				<text class="steps_title">{{item.name}}</text> <text class="steps_time">{{item.time}}</text>
				<view class="steps_msg">{{item.msg}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["step"],
		data() {
			return {
			
			};
		},
		onLoad() {
			
		},
	};
</script>

<style lang="scss">
.gdlc{
	margin: auto;
	padding: 20rpx;
	width: 690rpx;
	.steps_list {
		position: relative;
		padding: 0 30rpx;
		list-style: none;
		border-left: 2rpx solid #ccc;
		min-height: 85rpx;
		margin-left: 60rpx;
		display:flex;
		justify-content: space-between;
		.steps_title{
			font-size: 30rpx;
			position: absolute;
			top: -10rpx;
		}
		.steps_time{
			position: absolute;
			right: 0;
			top: -10rpx;
			color: #999999;
			font-size: 24rpx;
		}
		.steps_msg{
			margin: 40rpx 0;
			color: #999999;
			font-size: 24rpx;
		}
	}

	.steps_list:before {
		content: "";
		display: block;
		position: absolute;
		margin-left: -5rpx;
		top: 0;
		left: -7rpx;
		width: 20rpx;
		height: 20rpx;
		line-height: 22rpx;
		text-align: center;
		background: #0DD474;
		color: #fff;
		font-size: 28rpx;
		border-radius: 50%;
	}
	.repair_btn{
		background: #0DD474;
		color: #fff;
		width: 500rpx;
		height: 80rpx;
		margin: 80rpx auto 40rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 80rpx;
		border-radius: 100rpx;
	}
}
</style>