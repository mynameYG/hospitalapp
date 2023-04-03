<template>
	<view>
		<!-- <view class="nav-item" :style="{background:listItem.bgColor}">
			<view class="icon-bg flex flexmid" :style="{background:listItem.color}">
				<text class="iconfont flex1" :class="'icon-' + listItem.name"></text>
			</view>
			<text class="grid-text">{{listItem.title}}</text>
		</view> -->
		
		<view class="list_nav" v-for="(item,index) of channelList" :key="index" :style="{background:item.color}"  @click="goto(item.url)">
			<view class="icon_bg" :style="{background:item.iconBgcolor}"  >
				<text class="iconfont iconsize" :class="item.icon"></text>
			</view>
			<text class="grid_text">{{item.title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				list: [{
						name: 'icon-pandiansvg',
						bgColor: "linear-gradient(to left, #95b9ea 0, #b9cfed 100%)",
						color: "#3780e3",
						title: '耗材列表',
						url: "/pages/service/consumables/consumables-list"
					},
					{
						name: 'icon-chuku',
						bgColor: "linear-gradient(to left, #80e3b3 0, #abe9cb 100%)",
						color: "#0dd474",
						title: '耗材出库',
						url: "/pages/service/consumables/consumables-out"
					},
					{
						name: 'icon-ruku',
						bgColor: "linear-gradient(to left, #f1bc89 0, #f2d1b1 100%)",
						color: "#f0861e",
						title: '耗材入库',
						url: "/pages/service/consumables/record/consumables-enter"
					},
					{
						name: 'icon-liebiao1',
						bgColor: "linear-gradient(to left, #7fe3b3 0, #abe8cb 100%)",
						color: "#0dd474",
						title: '耗材采购',
						url: "/pages/service/consumables/consumables-purchase"
					}
				],
			}
		},
		onLoad(){
			let channelList = uni.getStorageSync('channelList');
			this.getChannelList();
			console.log(channelList);
		},
		methods:{
			goto(url){
				uni.navigateTo({
					url: url
				})
			},
			getChannelList(){
				let list = this.$store.getters.getModuleResources('consumables');
				console.log(list);
				this.channelList = list[0].filter(l => l.url);
				console.log(this.channelList);
				uni.setStorageSync('channelList', this.channelList);
			}
		}
	}
</script>

<style lang="scss">
page{
	background: #f2f2f2;
	padding-top: 30rpx;
}
.list_nav{
	width: 690rpx;
	height: 200rpx;
	margin: auto;
	margin-bottom: 30rpx;
	display: flex;
	align-items: center;
	border-radius: 10rpx;
	.icon_bg{
		width: 160rpx;
		height: 160rpx;
		background: blue;
		border-radius: 50%;
		line-height: 160rpx;
		text-align: center;
		margin: 0 50rpx;
		.iconsize{
			font-size: 80rpx;
			color: #fff;
		}
	}
	.grid_text{
		color: #fff;
		font-size: 34rpx;
	}
}
</style>