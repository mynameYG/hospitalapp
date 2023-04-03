<template>
	<view>
		<view class="out mb15">
			<view class="flex mb10 flexbet">
				<view class="out_font">{{dateFilter(info.outDate)}}</view>
				<view class="name">
					<text class="iconfont icon-chuku"></text>
					<text class="ml5">{{info.outName}}</text>
				</view>
			</view>
			<view class="flex mb10">
				<view class="out_font">单号:</view>
				<view>
					<text class="ml5">{{info.billSn}}</text>
				</view>
			</view>
			<view class="flex mb10">
				<view class="out_font">类型:</view>
				<view>
					<text class="ml5">{{info.type == 'consume' ? '消耗' : info.type == 'out' ? '出库' : ''}}</text>
				</view>
			</view>
			<view class="flex mb10">
				<view class="out_font">接收人:</view>
				<view>
					<text class="ml5">{{info.handoverName}}</text>
				</view>
			</view>
			<view class="flex">
				<view class="out_font">仓库:</view>
				<view>
					<text class="ml5">{{info.warehouseName}}</text>
				</view>
			</view>
			<!-- <attachmentUpload :file="info.files"></attachmentUpload> -->
			<attachmentCheck v-if="file.length>0" className="atts-imgWrap" :atts="file" :previewImgList="previewImgList"></attachmentCheck>
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
			<view class="flex mt10" v-if="info.auditReason">
				<view class="out_font">审核内容:</view>
				<view>
					{{info.auditReason}}
				</view>
			</view>
		</view>
		
		
		<view class="out mb15" v-for="(item,index) of info.details" :key="index">
			<view class="flex mb15">
				<view class="out_font">耗材名称 <text class="ml5">:</text></view>
				<view class="ml5">{{item.name}}</view>
			</view>
			<view class="flex mb15">
				<view class="out_font">耗材分类 <text class="ml5">:</text></view>
				<view class="ml5">{{item.type.title}}</view>
			</view>
			<view class="flex mb15">
				<view class="out_font">耗材编码 <text class="ml5">:</text></view>
				<view class="ml5">{{item.sn}}</view>
			</view>
			<view class="flex mb15">
				<view class="out_font">规格型号 <text class="ml5">:</text></view>
				<view class="ml5">{{item.model}}</view>
			</view>
			<view class="flex mb15">
				<view class="out_font">计量单位 <text class="ml5">:</text></view>
				<view class="ml5">{{item.unit}}</view>
			</view>
			<view class="flex mb15">
				<view class="out_font">耗材单价 <text class="ml5">:</text></view>
				<view class="ml5">¥{{item.unitPrice}}</view>
			</view>
			<view class="flex mb15">
				<view class="out_font">品牌 <text class="ml5">:</text></view>
				<view class="ml5">{{item.brand}}</view>
			</view>
			<view class="flex">
				<view class="out_font">出库数量 <text class="ml5">:</text></view>
				<view class="ml5">{{item.outNumber}}</view>
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
			this.$http.get(`/mobile/material/manage/out/${this.id}`).then(res =>{
				this.info = res;
				res.files.forEach(item =>{
					this.file.push({
						id: item.id,
						url: this.fileRUrl(item.filePath),
						fileName: item.fileName,
						downloadUrl:this.fileRUrl(item.filePath)
					})
					this.previewImgList.push(this.fileRUrl(item.filePath))
				})
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