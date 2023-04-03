<template>
	<view class="pt10">
		<u-grid :border="false" col="4">
			<u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex" @tap="jump(listItem.url)">
				<view class="icon-bg flex flexmid" :style="{background:listItem.color}">
					<text class="iconfont flex1" :class="'icon-' + listItem.icon"></text>
				</view>
				<text class="grid-text">{{listItem.title}}</text>
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
				list: [],
			}
		},
		mounted(){
			let getApplyList = this.$store.getters.getApplyList;
			console.log('getApplyList',getApplyList)
			if(getApplyList.length == 1){
				let moudelTitle = getApplyList[0].code;
				this.list = this.$store.getters.getModuleResources(moudelTitle)[0];
				this.list.forEach(item=>{
					item.icon = item.icon.substr(5)
				})
			}else{
				this.list = getApplyList;
			}
			console.log('this.list',this.list)
		},
		methods: {
		},
	}
</script>

<style lang="scss">
	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10upx 0 20upx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}

	.icon-bg {
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
