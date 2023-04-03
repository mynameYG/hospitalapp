<template>
	<view class="field-box whiteBg radius4 p15">
		<status :status="info.status"></status>
		<view class="field-title fs16 flex1 no-bb">{{info.time}}</view>
		<view class="field-item flex">
			<view class="field-label mr5">申请单号：</view>
			<view class="field-con flex1">{{info.No}}</view>
		</view>
		<view class="field-item flex">
			<view class="field-label mr5">申请科室：</view>
			<view class="field-con flex1">{{info.orgName}}</view>
		</view>
		<view class="field-item flex">
			<view class="field-label mr5">申请人员：</view>
			<view class="field-con flex1">{{info.applyName}}</view>
		</view>
		<view class="tc" v-if="show" @click="show = !show" >
			<text class="iconfont icon-xiala1" style="color:#0dd474"></text>
		</view>
		<template v-if="!show">
			<view class="field-item flex">
				<view class="field-label mr5">联系电话：</view>
				<view class="field-con flex1">{{info.phone}}</view>
			</view>
			<view class="field-item flex">
				<view class="field-label mr5">申请被服数量：</view>
				<view class="field-con flex1">{{info.applyNum}}</view>
			</view>
			<view class="field-item flex">
				<view class="field-label mr5">申请被服类型：</view>
				<view class="field-con flex1">{{info.applyType}}</view>
			</view>
			<view class="field-item flex">
				<view class="field-label mr5">申请原因：</view>
				<view class="field-con flex1">{{info.reason}}</view>
			</view>
		</template>
		<view class="tc" v-if="!show" @click="show = !show" >
			<text class="iconfont icon-xiangshang"  style="color:#0dd474"></text>
		</view>
	</view>
</template>

<script>
	import status from "@/components/ikdo/status.vue"
	export default {
		components:{
			status
		},
		props: {
			info: {
				type: Object,
				default: () => {}
			},
		},
		data(){
			return {
				show:true
			}
		}
	}
</script>

<style>
</style>