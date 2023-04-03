<template>
	<view class="grayBg p15">
		<view v-for="(listItem,listIndex) in list" :key="listIndex" class="content_list mb15"
			@tap="jump(listItem.url)">
			<view class="nav-item flex flexmid" :style="{background:listItem.bgColor}">
				<view class="grid-text flex1">
					<view class="name">{{listItem.title}}</view>
					<view>{{listItem.introduce}}</view>
				</view>
				<view class="icon-bg" :style="{background:listItem.color}">
					<text class="iconfont" :class="'icon-' + listItem.name"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				list: [
					{
						name: 'tousu',
						bgColor: "linear-gradient(to right, #F1BF8E 0, #F2D2B3 100%)",
						color: "#F0861E",
						title: '服务监督',
						introduce:"良好医院环境需要众人共同监督",
						url: "/pages/service/satisfied/satisfied-service"
					},
					{
						name: 'wenjuan1',
						bgColor: "linear-gradient(to right, #7FE2B3 0, #A3DABF 100%)",
						color: "#0DD474",
						title: '问卷调查',
						introduce:"参与后勤满意度小调研",
						url: "/pages/service/satisfied/satisfied-question"
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.grayBg{
		height: 100vh;
		// #ifdef H5
		height: calc(100vh - 88rpx);
		// #endif
	}
	.content_list {
		width: 690rpx;
		height: 200rpx;
		background: white;
		margin: auto;
		.nav-item{
			padding:20rpx 40rpx;
			height: 100%;
			width: 100%;
			border-radius: 8rpx;
		}
	}
	.icon-bg {
		width: 160rpx;
		height: 160rpx;
		line-height: 160rpx;
		border-radius: 50%;
		color: #fff;
		text-align: center;
	}
	
	.iconfont {
		font-size: 96upx;
		font-weight: 500;
	}
	
	.grid-text {
		font-size: 28rpx;
		color: #fff;
		.name{
			font-size: 34rpx;
			margin-bottom: 30rpx;
		}
	}
</style>