<template>
	<view>
		<view class="repair">
			<view class="bxd">
				<view class="leftkey">报修院区</view>
				<view class="rightval">xx医院郑东院区</view>
			</view>
			<view class="bxd">
				<view class="leftkey">报修科室</view>
				<view class="rightval">后勤部-巡查组</view>
			</view>
			<view class="bxd">
				<view class="leftkey">报修人员</view>
				<view class="rightval">王海涛</view>
			</view>
			<view class="bxd">
				<view class="leftkey">报修电话</view>
				<view class="rightval">65318562</view>
			</view>
			<view class="bxd">
				<view class="leftkey">报修地点</view>
				<view class="rightval">门诊楼2F</view>
			</view>
			<view class="bxd">
				<view class="leftkey">报修地点</view>
				<view class="rightval">
					<picker @change="bindPickerChange" :value="index" :range="array">
						{{array[index]}}
						<text class="iconfont icon-jinru"></text>
					</picker>
				</view>
			</view>
		</view>
		
		<view class="beizhu">
			<view class="beizhu_title">备注说明</view>
			<u--textarea  height="100" placeholder="请输入内容" count ></u--textarea>
			<view class="camera">
				<text class="icon-paizhao iconfont cameraclolr"></text>
				<text class="paizhao">照片\拍照</text>
			</view>
		</view>
		
		<view class="repair_btn">提交</view>
		
	</view>
	
</template>

<script>
	export default {
		data(){
			return{
				array: ['普通设备', '高级设备', '顶级设备'],
				index: 0,
			}
		},
		
		methods:{
			bindPickerChange: function(e) {
			    this.index = e.detail.value
			},
		}
		
	}
</script>

<style lang="scss">
page{
	background: #f2f2f2;
	padding: 30rpx 0;
}
.repair{
	border-radius: 10rpx;
	margin: auto;
	padding: 10rpx 0rpx;
	width: 690rpx;
	background: #fff;
	font-size: 26rpx;
	.bxd{
		padding: 20rpx 20rpx;
		margin-bottom: 20rpx;
		display:flex;
		justify-content: space-between;
		.icon-jinru{
			font-size: 24rpx;
		}
	}
	.bxd:last-child{
		margin-bottom: 0rpx;
	}
}
.beizhu{
		background: #fff;
		margin: 40rpx auto;
		width: 690rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		padding: 20rpx 20rpx 20rpx;
		.beizhu_title{
			color: #777777;
			margin: 0 0 20rpx;
		}
		.camera{
			margin: 30rpx 0 10rpx;
			width: 160rpx;
			height: 160rpx;
			border:1px dotted #cacaca; 
			color: #acacac;
			display: inline-block;
			margin-right: 20rpx;
			.cameraclolr{
				display: block;
				font-size: 70rpx;
				text-align: center;
				margin-top: 20rpx;
			}
			.paizhao{
				display: block;
				text-align: center;
				margin: auto;
			}
		}
	}
.repair_btn{
	background: #0DD474;
	color: #fff;
	width: 500rpx;
	height: 80rpx;
	margin: 40rpx auto 40rpx;
	text-align: center;
	font-size: 30rpx;
	font-weight: bold;
	line-height: 80rpx;
	border-radius: 100rpx;
}	
</style>