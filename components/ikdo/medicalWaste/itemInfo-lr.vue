<template>
	<view :class="pageCode ? pageCode:''">
		<view class="field-top flex flexbet flexmid">
			<view class="flex1"  v-if="itemInfo.No">
				编号：{{itemInfo.No || "-"}}
			</view>
			<view class="time">{{dateFilter(itemInfo.time)}}</view>
		</view>
		<view class="field-item flex flexmid" v-if="itemInfo.orgName">
			<text class="field-title"><i class="iconfont icon-quanke-"></i></text>
			<text class="field-con flex1">{{itemInfo.orgName || "-"}}</text>
		</view>
		<view class="field-item flex flexmid">
			<text class="field-title"><i class="iconfont icon-wode-weixuanzhong"></i></text>
			<text class="field-con flex1 text-ellipsis">{{itemInfo.person || itemInfo.storageName}}</text>
		</view>
		<view class="type" :class="itemInfo.type.code">
			{{itemInfo.type.name}}
		</view>
		<view class="total" v-if="itemInfo.weight">
			<text class="fs18 bold mr5">{{itemInfo.weight}}</text>kg
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			pageCode:String,
			itemInfo:{
				type: Object,
				default: () => {}
			}
		}
	}
</script>
<style lang="scss">
	.putOut .total{
		bottom:10px;
		right: 50%;
		-webkit-transform: translateX(50%);
		transform: translateX(50%);
	}
</style>