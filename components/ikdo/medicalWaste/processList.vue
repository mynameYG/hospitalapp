<template>
	<view class="timeline-wrap" v-if="list.length > 0">
		<view class="timeline-item"  v-for="(item, i) in list">
			<text class="timeline-axis"></text>
			<view class="timeline-content pb10">
				<view class="title pl15 mb10">
					<text class="time" v-if="item.createTime">{{dateFilter(item.createTime,'')}}</text>
				</view>
				<view class="content pl15">
					<view class="flex whiteBg radius6 pl10 pt5 pb5 pr10 flexmid">
						<text class="iconfont mr10" 
						:class="[item.process.type == 'sorting'?'icon-quanke-'
						:item.process.type == 'collect'? 'icon-shujushouji' 
						:item.process.type == 'storage' ? 'icon-rukuguanli'
						:item.process.type == 'storaged' ? 'icon-gaojingxinxi'
						:item.process.type == 'collected' ? 'icon-gaojingxinxi'
						:item.process.type == 'sac' ? 'icon-bianji'
						:item.process.type == 'cac' ? 'icon-bianji'
						:'icon-chukuguanli']"></text>
						<view class="flex1">
							<view class="fs15 bold color333 mb5">{{item.process.name}}</view>
							<view class="fs12 color999">{{item.name}}</view>
							<view class="abnormal" v-if="item.abnormalType || item.remark">
								<view class="fs12 color999" v-if="item.abnormalType">异常类型：{{item.abnormalType}}</view>
								<view class="fs12 color999" v-if="item.abnormalReason">异常原因：{{item.abnormalReason}}</view>
								<view class="fs12 color999" v-if="item.remark">情况说明：{{item.remark}}</view>
							</view>
							<view class="mt10" v-if="item.correctUserSign || item.handoverUserSign">
								<img class="singImg" v-if="item.correctUserSign" @click="previewImg(fileRUrl(item.correctUserSign))" :src="fileRUrl(item.correctUserSign)" alt="">
								<img class="singImg" v-if="item.handoverUserSign"  @click="previewImg(fileRUrl(item.correctUserSign))" :src="fileRUrl(item.handoverUserSign)" alt="">
							</view>
						</view>
						<view class="color333 weight" v-if="item.weight"><text class="fs18 bold mr5">{{item.weight}}</text>kg</view>
					</view>
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
		data(){
			return {
				list:[]
			}
		},
		watch: {
			processList(val) {
				val.forEach(item =>{
					let itemJson = {
						name:item.userName,
						process:{
							name:item.type.title,
							type:item.type.value,
						},
						createTime:item.time,
						weight:item.weight,
						abnormalType:item.abnormalType,
						abnormalReason:item.abnormalReason,
						remark:item.remark,
						correctUserSign:item.correctUserSign,
						handoverUserSign:item.handoverUserSign
					}
					this.list.push(itemJson)
				})
			}
		},
		methods:{
			previewImg(currentUrl) {
				let imgList =[];
				imgList.push(currentUrl)
				uni.previewImage({
					urls: imgList,
					current: currentUrl
				});
			},
		}
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
		.abnormal{
			margin-top:20rpx;
			padding:10rpx 20rpx;
			background-color: #F7F7F7;
			border-radius: 5px;
		}
		.singImg{
			width: 50px;
			height: 50px;
			overflow: hidden;
			& + .singImg{
				margin-left:10px;
			}
		}
		.weight{
			position: absolute;
			right: 18rpx;
			top: 84rpx;
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
				.iconfont{
					font-size: 76rpx;
					color:#C1C1C1;
					min-width: 76rpx;
					text-align: center;
				}
				.icon-shouye-weixuanzhong{
					font-size: 74rpx;
				}
				.icon-bianji{
					font-size: 60rpx;
				}
			}
		}
	}
</style>