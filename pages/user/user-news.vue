<template>
	<view class="container">
		<pulldownRefresh ref="pulldownRefresh" @refresh="initData">
			<scroll-view class="panel-scroll-box" scroll-y @scrolltolower="loadMoreData">
				<view class="whiteBg pl15 pr15">
					<view class="field-box whiteBg pl15 pr15" v-for="item in list" :key="item.id">
						<view class="title">{{item.title}}</view>
						<view class="time">{{item.time}}</view>
						<view class="field-item flex">
							<text class="field-con flex1 text-ellipsis">{{item.content || "-"}}</text>
						</view>
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
								time:"2022-05-27 08:50",
								title:"后勤部-王海涛",
								content:"xx设备出现异常，请尽快修理",
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
									time:"2022-05-27 08:50",
									title:"后勤部-王海涛",
									content:"xx设备出现异常，请尽快修理",
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
		border-bottom:2rpx solid #F2F2F2;
		&:last-of-type{
			border-bottom: 0;
		}
		.title{
			font-size: 30rpx;
		}
		.time{
			position: absolute;
			top:20rpx;
			right: 0;
			font-size:24rpx;
			color:#999
		}
	}
</style>