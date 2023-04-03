<template>
	<view class="container">
		<u-grid :border="false" col="2">
			<u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex" @tap="jump(listItem.url)">
				<view class="nav-item" :style="{background:listItem.bgColor}">
					<view class="icon-bg flex flexmid" :style="{background:listItem.color}">
						<text class="iconfont flex1" :class="'icon-' + listItem.name"></text>
					</view>
					<text class="grid-text">{{listItem.title}}</text>
				</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				width: "",
				height: "",
				list: [{
						name: 'beifuruku',
						bgColor: "linear-gradient(to bottom, #F1BE8C 0, #F1CCA7 100%)",
						color: "#F0861E",
						title: '入库',
						url: "/pages/service/clothes/clothes-stockIn"
					},
					{
						name: 'beifuchuku',
						bgColor: "linear-gradient(to bottom, #84E3B5 0, #A2E7C6 100%)",
						color: "#0DD474",
						title: '出库',
						url: "/pages/service/clothes/clothes-stockOut"
					},
					{
						name: 'beifuxidi',
						bgColor: "linear-gradient(to bottom, #F7B9C5 0, #F6C9D2 100%)",
						color: "#FF7D96",
						title: '洗涤收取',
						url: "/pages/service/clothes/clothes-washReceive"
					},
					{
						name: 'beifuxidi',
						bgColor: "linear-gradient(to bottom, #BADCF2 0, #CAE2F1 100%)",
						color: "#7FC6F2",
						title: '洗涤发放',
						url: "/pages/service/clothes/clothes-washSend"
					},
					{
						name: 'tousu',
						bgColor: "linear-gradient(to bottom, #DBBBF8 0, #E1CBF5 100%)",
						color: "#C280FF",
						title: '申领',
						url: "/pages/service/clothes/clothes-apply"
					},
					{
						name: 'liebiao1',
						bgColor: "linear-gradient(to bottom, #F8CEBC 0, #F6D8CB 100%)",
						color: "#FFA780",
						title: '库存',
						url: "/pages/service/clothes/clothes-total"
					},
					{
						name: 'baofeiguanli',
						bgColor: "linear-gradient(to bottom, #F8B3AA 0, #F6C6C0 100%)",
						color: "#FF725F",
						title: '报废',
						url: "/pages/service/clothes/clothes-writtenOff"
					}
				],
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	.container {
		padding: 30rpx;
	}

	.nav-item {
		margin-bottom: 30rpx;
		width: 100%;
		height:290rpx;
		text-align: center;
		border-radius: 6rpx;
		
	}
	.u-grid-item{
		&:nth-child(odd){
			padding-right:15rpx
		}
		&:nth-child(even){
			padding-left:15rpx
		}
	}
	.icon-bg {
		width: 164upx;
		height: 164upx;
		border-radius: 50%;
		color: #fff;
		position: relative;
		margin: 30upx auto 20rpx;
	
		.iconfont {
			display: block;
			font-size: 100upx;
			font-weight: 500;
			text-align: center;
		}
	}
	.grid-text {
		font-size: 34rpx;
		color: #fff;
		padding: 10upx 0 20upx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
</style>
