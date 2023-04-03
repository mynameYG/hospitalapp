<template>
	<view class="container">
		<pulldownRefresh ref="pulldownRefresh" @refresh="initData">
			<scroll-view class="panel-scroll-box" scroll-y @scrolltolower="loadMoreData">
				<view class="field-box whiteBg mt15 pl15 pr15" v-for="item in list" :key="item.id">
					<view class="time">{{item.time}}</view>
					<view class="status" :class="item.status.value">{{item.status.title}}</view>
					<view class="field-item flex">
						<text class="field-title">提交人员：</text>
						<text class="field-con flex1">{{item.submitName || "-"}}</text>
					</view>
					<view class="field-item flex">
						<text class="field-title">提交内容：</text>
						<text class="field-con flex1 text-ellipsis">{{item.content || "-"}}</text>
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
				size: 3,
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
					this.list = [
						{
							id:1,
							time:"2022-05-27",
							submitName:"后勤部-王海涛",
							content:"xx设备出现异常，请尽快修理",
							status:{
								code:0,
								value:"unExamine",
								title:"待审核"
							}
						},
						{
							id:2,
							time:"2022-05-27",
							submitName:"后勤部-王海涛",
							content:"xx设备出现异常，请尽快修理",
							status:{
								code:1,
								value:"pass",
								title:"已通过"
							}
						},
						{
							id:2,
							time:"2022-05-27",
							submitName:"后勤部-王海涛",
							content:"xx设备出现异常，请尽快修理",
							status:{
								code:2,
								value:"unEvaluate",
								title:"待评价"
							}
						}
					]
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
									time:"2022-05-27",
									submitName:"后勤部-王海涛",
									content:"xx设备出现异常，请尽快修理",
									status:{
										code:2,
										value:"unEvaluate",
										title:"待评价"
									}
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
		height: calc(100vh - 88upx);
		/*  #endif */
	}
	.field-box{
		position: relative;
		.time{
			margin-bottom: 20rpx;
			font-size: 30rpx;
			color:#777777
		}
		.status{
			position: absolute;
			top:20rpx;
			right: 30rpx;
			font-size: 32rpx;
			&.unExamine{
				color:#FF0000
			}
			&.pass{
				color:#0DD474
			}
			&.unEvaluate{
				color:#F6BF34
			}
		}
	}
</style>