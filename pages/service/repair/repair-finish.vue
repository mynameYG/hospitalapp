<template>
	<view class="finish">
		<view class="finish_bx mb15">
			<view class="finish_m">
				<text class="title">报修院区:</text>
				<text>xx医院郑东院区</text>
			</view>
			<view class="">
				<text class="title">报修科室:</text>
				<text>院本部</text>
			</view>
		</view>
		<view class="content">
			<view class="title title_col">
				<view>维修内容</view>
				<view>工时</view>
				<view>操作</view>
			</view>
			<view class="title">
				<view>灯</view>
				<view>工时</view>
				<text class="caozuo">
					<text class="iconfont icon-shanchu shanchu"></text>
					<text class="iconfont icon-zengjia1 zengjia"></text>
				</text>
			</view>
			<view class="title">
				<view>灯</view>
				<view>工时</view>
				<text class="caozuo">
					<text class="iconfont icon-shanchu shanchu"></text>
					<text class="iconfont icon-zengjia1 zengjia"></text>
				</text>
			</view>
		</view>
		
		<view class="content mt15">
			<view class="title title_col">
				<view>耗材领用</view>
				<view>数量</view>
				<view>价格</view>
			</view>
			<view class="title">
				<view>灯泡</view>
				<view>2</view>
				<view>¥8.00</view>
			</view>
			<view class="title">
				<view>插头电源线</view>
				<view>2</view>
				<view>¥10.00</view>
			</view>
		</view>
		
		<view class="sgbz mt15">
			<view class="zjgs">
				<text class="sgbz_title">总计工时:</text>
				<text class="gs">1.5工时</text>
			</view>
			<view class="wxbz">
				<text class="sgbz_title">维修备注:</text>
				<text>此电源线易折断，需注意</text>
			</view>
		</view>
		<view class="repair_btn" @click="repair_btn()">确认</view>
	</view>
</template>

<script>
	export default {
		
	}
</script>

<style lang="scss" scoped>
page{
	background: #f2f2f2;
}
.finish{
	padding-top: 30rpx;
	background: #f2f2f2;
	height: 100vh;
	.finish_bx{
		padding: 20rpx 10rpx;
		margin: auto;
		width: 690rpx;
		background: #fff;
		font-size: 26rpx;
		border-radius: 10rpx;
		.finish_m{
			margin-bottom: 50rpx;
		}
		view{
			.title{
				color: #777777;
				margin-right: 20rpx;
			}
		}
		
	}
	.content{
		width: 690rpx;
		margin: auto;
		background: #fff;
		border-radius: 10rpx;
		font-size: 26rpx;
		.title_col{
			view{
				color: #777777 !important;
			}
		}
		.title{
			display: flex;
			justify-content: space-around;
			view{
				width: 100%;
				text-align: center;
				padding: 30rpx 0;
				border: 1rpx solid #eaeaea;
				border-right: 0;
				border-bottom: 0;
				color: #333333;
			}
			.caozuo{
				display: block;
				width: 100%;
				padding: 20rpx 0;
				border: 1rpx solid #eaeaea;
				border-right: 0;
				border-bottom: 0;
				color: #777777;
				.shanchu{
					color: #a3a3a3;
					font-size: 40rpx;
					margin-left: 50rpx;
				}
				.zengjia{
					color: #5ae3a5;
					font-size: 40rpx;
					margin-left: 50rpx;
				}
			}
			
		}
	}
	.sgbz{
		width: 690rpx;
		margin: auto;
		background: #fff;
		border-radius: 10rpx;
		font-size: 26rpx;
		padding: 20rpx;
		.zjgs{
			margin-bottom: 40rpx;
			.sgbz_title{
				color: #777777;
				margin-right: 10rpx;
			}
			.gs{
				color: #5ae3a5;
			}
		}
		.wxbz{
			.sgbz_title{
				color: #777777;
				margin-right: 10rpx;
			}
		}
	}
	.repair_btn{
		position: absolute;
		background: #0DD474;
		color: #fff;
		width: 500rpx;
		height: 80rpx;
		// margin: 180rpx auto 40rpx;
		left: 50%;
		margin-left: -250rpx;
		bottom: 30rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 80rpx;
		border-radius: 100rpx;
	}
}

</style>