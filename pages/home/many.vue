<template>
	<view>
		<view class="whiteBg header">
			<text class="fs14 pl15">首页应用</text>
			<text class="header-icon">
				<text v-for="(item,index) in getHomeList" :key="index" class="ml10" v-if="index < 5">
					<text class="icon-bg" :style="{background:item.color}">
						<text class="iconfont" :class="'icon-' + item.icon"></text>
					</text>
				</text>
				<text class="ml10">...</text>
				<text class="fs14 compile" @tap="edit">编辑</text>
			</text>
		</view>
		<view class="pb15 mt15">
			<u-grid :border="false" col="4">
				<u-grid-item v-for="(listItem,listIndex) in applyList" :key="listIndex" @tap="jump(listItem.url)">
					<view class="icon-bg1 flex flexmid" :style="{background:listItem.color}">
						<text class="iconfont flex1" :class="'icon-' + listItem.icon"></text>
					</view>
					<text class="grid-text">{{listItem.title}}</text>
				</u-grid-item>
			</u-grid>
		</view>
	</view>
</template>

<script>
	import { mapGetters} from 'vuex'
	export default {
		data() {
			return {
				applyList:this.$store.getters.getApplyList,//拥有的所有应用
			}
		},
		computed: {
		  // 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters([
				'getHomeList'
			])
		},
		methods:{
			edit(){
				uni.navigateTo({
					url: './compile'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background:rgb(242,242,242);
	}

	.header {
		height: 106rpx;
		line-height: 106rpx;
	}

	.icon-bg {
		border-radius: 50%;
		color: #fff;
		width:52upx;
		height:52upx;
		line-height: 52upx;
		display:inline-block;
		text-align:center;
	}

	.compile {
		display: inline-block;
		width: 100rpx;
		height: 54rpx;
		text-align: center;
		border: 1px solid #0DD474;
		color: #0DD474;
		line-height: 54rpx;
		border-radius: 100rpx;
		margin-left: 80rpx;
	}
	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10upx 0 20upx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}
	
	.icon-bg1 {
		width: 100upx;
		height: 100upx;
		border-radius: 50%;
		color: #fff;
		position: relative;
		margin: 20upx auto 0;
	
		.iconfont {
			display: block;
			font-size: 48upx;
			font-weight: 500;
			text-align: center;
		}
	}
</style>
