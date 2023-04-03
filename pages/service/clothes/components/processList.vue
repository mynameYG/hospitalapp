<template>
	<view class="timeline-wrap" v-if="processList.length > 0">
		<view class="timeline-item"  v-for="(item, i) in processList">
			<text class="timeline-axis"></text>
			<view class="timeline-content">
				<view class="title pl15 flex flexmid">
					<text class="name">{{item.name}}</text>
					<text v-if="item.auditResult">({{item.auditResult ? "已同意" : "已拒绝"}})</text>
					<text v-else>(发起申请)</text>
					<text class="flex1 tr time" v-if="item.createTime">{{dateFilter(item.createTime,'')}}</text>
				</view>
				<view class="content pl15" v-if="item.auditComment">
					{{item.auditComment || '-'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props: {
			processList: {
				type: Array,
				default: () => []
			},
		},
	}
</script>

<style lang="scss">
	$mainColor:#0DD474;
	.timeline-wrap{
		padding:30rpx;
	}
	.timeline-item{
		position: relative;
		min-height: 100rpx;
		&:before {
			content: "";
			position: absolute;
			left: 0;
			top: 18rpx;
			z-index: 0;
			width: 2rpx;
			height: 100%;
			background-color: $mainColor;
		}
		&:last-of-type:before{
			display: none;
		}
		.timeline-axis {
		    position: absolute;
		    left: -9rpx;
		    top: 12rpx;
		    width: 18rpx;
		    height: 18rpx;
		    border-radius: 50%;
		    text-align: center;
		    cursor: pointer;
			background-color: $mainColor;
			border:2rpx solid $mainColor;
		}
		.content{
			color:#999;
			font-size: 26rpx;
		}
		.timeline-content {
			color:#333;
			font-size: 28rpx;
			width: 100%;
			.title{
				margin-bottom: 6rpx;
			}
			.name{
				min-width: 84rpx;
				margin-right: 20rpx;
			}
			.time{
				color:#999;
				font-weight: 500;
				font-size:24upx;
			}
			.content{
				color: #999;
				font-size:26rpx;
			}
		}
	}
</style>