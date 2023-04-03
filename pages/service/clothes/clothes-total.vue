<template>
	<view class="container">
		<pulldownRefresh ref="pulldownRefresh" @refresh="initData">
			<view class="listHead flex whiteBg">
				<text class="flex1 type">类型</text>
				<text class="flex1">库存数量</text>
				<text class="flex1">滞留数量</text>
				<text class="flex1">报废数量</text>
			</view>
			<scroll-view class="panel-scroll-box" scroll-y @scrolltolower="loadMoreData">
				<view class="field-box whiteBg" v-for="item in list" :key="item.id">
					<view class="field-item flex">
						<text class="field-con type text-ellipsis">{{item.clothesType|| "-"}}</text>
						<text class="field-con flex1 text-ellipsis">{{item.total || "-"}}</text>
						<text class="field-con flex1 text-ellipsis">{{item.retentionNum || "-"}}</text>
						<text class="field-con flex1 text-ellipsis">{{item.writtenOffNum || "-"}}</text>
					</view>
				</view>
				<!-- 上拉加载 -->
				<loadMore :status="loadMoreStatus"></loadMore>
				<view :style="{height: footerbottom}"></view>
			</scroll-view>
		</pulldownRefresh>
	</view>
</template>

<script>
	import pulldownRefresh from '@/components/pulldown/pulldown.vue';
	import loadMore from '@/components/loadMore/loadMore.vue';
	export default {
		components: {
			pulldownRefresh,
			loadMore
		},
		data(){
			return{
				page: 1,
				size: 10,
				loadMoreStatus: 0,
				footerbottom: 0,
				list:[]
			}
		},
		onLoad() {
			this.initData();
			// 兼容h5的底部菜单
			// #ifdef H5
			this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight + "px";
			// #endif
		},
		methods:{
			initData() {
				this.page = 1;
				this.$http.get(`https://uniapp-toutiao.herokuapp.com/api/profiles/video_list/${this.page}/${this.size}`).then(res=>{
					// this.list = res;
					for(var i = 0;i <=10 ;i++){
						let itemJson = {
								id:i+1,
								clothesType:i == 0 ? "病人服装" : i== 1?"医技人员服装" : i == 2 ?'药房人员服装' : i==3 ?'行政管理人员服装' :'护士服',
								total:980,
								retentionNum:12,
								writtenOffNum:3
							}
						this.list.push(itemJson);
					}
					this.loadMoreStatus = 0;
					this.$refs.pulldownRefresh && this.$refs.pulldownRefresh.endPulldownRefresh();
				})
			},
			loadMoreData() {
				// 更改加载页数
				this.page++;
				this.loadMoreStatus = 1;
				// 数据请求
				this.$http.get(`https://uniapp-toutiao.herokuapp.com/api/profiles/video_list/${this.page}/${this.size}`).then(res=>{
					if (res.length > 0) {
						res.forEach(item => {
							let itemJson = {
									id:item.id,
									clothesType:"病人服装",
									total:980,
									retentionNum:12,
									writtenOffNum:3
								}
							this.list.push(itemJson);
						})
						this.loadMoreStatus = 0;
					} else {
						// 返回数据为空 没有更多数据
						this.loadMoreStatus = 2;
						return false;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		/* #ifdef H5 */
		height: calc(100vh - 88rpx);
		/*  #endif */
	}
	.panel-scroll-box{
		height: calc(100% - 102rpx);
	}
	.listHead{
		border-bottom: 2rpx solid #EFEFEF;
		font-size:28rpx;
		font-weight: 600;
		color:#333;
		line-height: 100rpx;
		.type{
			padding-left: 30rpx;
			min-width: 300rpx;
		}
	}
	.field-box{
		.type{
			padding-left: 30rpx;
			min-width: 300rpx;
		}
	}
</style>