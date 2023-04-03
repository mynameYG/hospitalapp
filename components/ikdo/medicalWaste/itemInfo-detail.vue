<template>
	<view>
		<view class="field-top flex flexbet flexmid">
			<view class="flex1">
				编号：{{itemInfo.wasteSn || "-"}}
			</view>
			<view class="time">[{{itemInfo.progressTitle}}]</view>
		</view>
		<view class="field-item flex flexmid">
			<text class="field-title"><i class="iconfont icon-quanke-"></i></text>
			<text class="field-con flex1">{{itemInfo.departmentName || "-"}}</text>
		</view>
		<view class="type" :class="itemInfo.biz">
			{{itemInfo.typeName}}
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