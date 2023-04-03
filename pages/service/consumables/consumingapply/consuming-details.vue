<template>
	<view>
		<view class="out mb15">
			<view class="flex mb10 flexbet">
				<view class="out_font">{{dateFilter(info.applyDate)}}</view>
				<view class="name">
					<text class="iconfont icon-chuku"></text>
					<text class="ml5">{{info.applyName}}</text>
				</view>
			</view>
			<view class="flex">
				<view class="out_font">所属科室:</view>
				<view>
					<text class="ml5">{{info.departmentName}}</text>
				</view>
			</view>
		</view>
		
		<view class="out mb15" v-if="info.auditDate">
			<view class="flex mb10">
				<view class="out_font">审核人:</view>
				<view>
					<text class="ml5">{{info.auditName}}</text>
				</view>
			</view>
			<view class="flex">
				<view class="out_font">审核时间:</view>
				<view>
					<text class="ml5">{{dateFilter(info.auditDate)}}</text>
				</view>
			</view>
			<view class="flex mt10" v-if="info.remark">
				<view class="out_font">审核内容:</view>
				
				{{info.remark}}
				
			</view>
		</view>
		
		<view class="out mb15" v-for="(item,index) of info.details" :key="index">
			<view class="flex mb15">
				<view class="out_font">耗材名称 <text class="ml5">:</text></view>
				<view class="ml5">{{item.name}}</view>
			</view>
			<view class="flex mb15">
				<view class="out_font">仓库 <text class="ml5">:</text></view>
				<view class="ml5">{{item.warehouseName}}</view>
			</view>
			<view class="flex">
				<view class="out_font">领用数量 <text class="ml5">:</text></view>
				<view class="ml5">{{item.consumingNumber}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				id:"",
				info:{},
				previewImgList:[],
				file:[]
			}
		},
		onLoad(options) {
			this.id = options.id;
		},
		mounted() {
			this.$http.get(`/mobile/material/consuming/${this.id}`).then(res =>{
				this.info = res;
			})
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
page{
	background: #f2f2f2;
	padding-top: 30rpx;
}

.out{
	background: #fff;
	width: 690rpx;
	margin: auto;
	padding: 20rpx;
	border-radius: 10rpx;
	font-size: 28rpx;
	.out_font{
		color: #777777;
	}
	.name{
		color: #0DD474;
		.icon-chuku{
			vertical-align: middle;
		}
	}
	.mb25{
		margin-bottom: 50rpx;
	}
	.file{
		border: 1rpx solid #d7d7d7;
		width: 260rpx;
		height: 90rpx;
		line-height: 80rpx;
		// text-align: center;
		background: #f6f6f6;
		text{
			color: #fcd165;
			font-size: 60rpx;
			vertical-align:middle;
			margin: 0 20rpx;
		}
	}
}
</style>