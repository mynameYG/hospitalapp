<template>
	<view>
		<view class="field-top flex flexbet flexmid">
			<view class="flex1">
				编号：{{itemInfo.No || "-"}}
			</view>
			<view class="time">{{dateFilter(itemInfo.time)}}</view>
		</view>
		<view class="flex flexbet">
			<view class="field-item flex flex1 flexmid">
				<text class="field-title"><i class="iconfont icon-quanke-"></i></text>
				<text class="field-con flex1">{{itemInfo.orgName || "-"}}</text>
			</view>
			<view class="field-item tr">
				<text class="field-title"><i class="iconfont icon-wode-weixuanzhong"></i></text>
				<text class="field-con text-ellipsis" style="display: inline;">{{itemInfo.person || "-"}}</text>
			</view>
		</view>
		<view class="type" :class="itemInfo.type.code">
			{{itemInfo.type.name}}
		</view>
		<view class="total">
			<text class="fs18 bold mr5">{{itemInfo.weight}}</text>kg
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			itemInfo:{
				type: Object,
				default: () => {}
			}
		}
	}
</script>

<style lang="scss">
	.field-box {
		.type {
			position: initial;
			max-width: 50px;
		}
	
		.total {
			right:50%;
			bottom:20rpx;
			transform: translateX(50%);
		}
	}
</style>