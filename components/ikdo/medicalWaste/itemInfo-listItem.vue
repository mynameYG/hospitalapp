<template>
	<view class="menuWrap">
		<view class="field-top flex flexbet flexmid">
			<view class="flex1">
				编号：{{itemInfo.sn || "-"}}
			</view>
			<template v-if="pageCode == 'collect'">
				<text class="success fs12" v-if="itemInfo.status === 0">[正在收集]</text>
				<text class="gray-place fs12" v-else>[已结束]</text>
			</template>
			<template v-if="pageCode == 'putIn'">
				<text class="success fs12" v-if="itemInfo.status === 0">[正在核验入库]</text>
				<text class="gray-place fs12" v-else>[已入库]</text>
			</template>
			<template v-if="pageCode == 'putOut'">
				<text class="success fs12" v-if="itemInfo.status === 0">[待出库]</text>
				<text class="gray-place fs12" v-else>[已出库]</text>
			</template>
		</view>
		<view v-if="pageCode == 'collect'" class="field-item flex flexmid">
			<text class="field-title"><i class="iconfont icon-shebeiguanli"></i></text>
			<text class="field-con flex1">{{itemInfo.collectEquipment || "-"}}</text>
		</view>
		<view class="field-item flex flexmid">
			<text class="field-title"><i class="iconfont icon-wode-weixuanzhong"></i></text>
			<text class="field-con flex1 text-ellipsis">
				<template v-if="pageCode == 'collect'">
					{{itemInfo.collectName || "-"}}
				</template>
				<template v-if="pageCode == 'putIn'">
					{{itemInfo.storageName || "-"}}
				</template>
				<template v-if="pageCode == 'putOut'">
					{{itemInfo.outName || "-"}}
				</template>
			</text>
		</view>
		<view class="field-item flex flexmid">
			<text class="field-title"><i class="iconfont icon-jilu"></i></text>
			<text class="field-con flex1 text-ellipsis">{{dateFilter(itemInfo.startTime,'dateminutes') || "-"}} 至 {{dateFilter(itemInfo.endTime,'dateminutes') || "-"}}</text>
		</view>
		<view class="total">
			<text class="fs18 bold mr5">
				<template v-if="pageCode == 'putOut'">
					{{itemInfo.outWeight}}
				</template>
				<template else>
					{{itemInfo.weight}}
				</template>
			</text>kg
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
	.menuWrap .total{
		bottom: 41%;
	}
</style>