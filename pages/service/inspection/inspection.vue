<template>
	<view class="">
		<!-- 打补丁 -->
		<pulldownRefresh ref="pulldownRefresh" @refresh="pulldownRefresh">
			<scroll-view class="panel-scroll-box" scroll-y @scrolltolower="loadMoreData('add')">
				<view class="time">{{dateFilter(dayTime,"date")}}</view>
				<view>
					<view  class="jinri" @click="order(item)" v-for="(item, index) in list" :key="index">
						<view class="jinri_list">
							<view class="jinri_item1">
								<view class="timeitem">{{dateFilter(item.startTime,"datetime")}}</view>
								<view :class="item.status.value == 'not' || item.status.value == 'incomplete'  ? 'wwc' : item.status.value == 'complete' ? 'ywc' : ''  ">{{item.status.title}}</view>
							</view>
							<view class="jinri_item2">
								<view class="itemtitle">{{item.planName}}</view>
								<view class="iconfont icon-jinru jinru"></view>
							</view>
						</view>
					</view>
				</view>
			<loadMore :status="loadMoreStatus"></loadMore>
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
				dayTime:"",
				list:[],
				page: 1,
				pageSize: 10,
				loadMoreStatus: 0,
			}
		},
		onShow() {
			this.pulldownRefresh();
		},
		mounted() {
			this.pulldownRefresh();
			this.dayTime = Date.now(); //获取当前时间日期
		},
		
		methods:{
			pulldownRefresh(){
				this.loadMoreData('refresh');
			},
			// 今日巡检
			
			loadMoreData(type) {
				
				//type add 加载更多 refresh下拉刷新
				if (type === 'add') {
					if (this.loadMoreStatus === 2) {
						return;
					}
					this.loadMoreStatus = 1;
				}
				// #ifdef APP-PLUS
				else if (type === 'refresh') {
					this.refreshing = true;
				}
				// #endif 
				if (type === 'refresh') {
					this.page = 1;
				}
				let urlJson = `/mobile/inspection/task/today?page=${this.page}&pageSize=${this.pageSize}`;
				this.$http.get(urlJson).then(res => {
					this.total = res.total;
					this.page++;
					if (type === 'refresh') {
						this.list = []; //刷新前清空数组
					}
					res.list.forEach((item, index) => {
						this.list.push(item)
					})
					console.log('this.list',this.list,res.total)
					//下拉刷新 关闭刷新动画
					if (type === 'refresh') {
						this.loadMoreStatus = 0;
						this.$refs.pulldownRefresh && this.$refs.pulldownRefresh.endPulldownRefresh();
						// #ifdef APP-PLUS
						this.refreshing = false;
						// #endif
						this.loadMoreStatus = this.list.length < res.total ? 0 : 2;
					}
					//上滑加载 处理状态
					if (type === 'add') {
						// console.log('add',this.list.length,res.total)
						this.loadMoreStatus = this.list.length < res.total ? 0 : 2;
					}
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			},

			order(item){
				uni.navigateTo({
					url:`./inspection-device?taskId=${item.id}&status=${item.status.value}`
				})
			},
		}
	}
</script>

<style lang="scss">
page{
	background: #f2f2f2;
}
.ac {
	border-bottom: 6rpx solid #0DD474;
	color: #0DD474;
}
.header_repair{
	height: 88rpx;
	width: 100%;
	background: #fff;
	position: fixed;
	z-index: 1000;
	// top: 50rpx;
	view{
		display: inline-block;
		width: 50%;
		line-height: 88rpx;
		text-align: center;
		text{
			font-size: 32rpx;
			padding-bottom: 20rpx;
		}
	}
}

.list_repair{
	border-radius: 10rpx;
	position: relative;
	margin: auto;
	margin-bottom: 30rpx;
	padding: 20rpx;
	width: 690rpx;
	background: #fff;
	// height: 364rpx;
	font-size: 28rpx;
}
.time{
	text-align: center;
	color: #333333;
	margin: 20rpx 0;
}
.jinri{
	border-radius: 10rpx;
	margin: auto;
	margin-bottom: 30rpx;
	padding: 15rpx 20rpx 5rpx;
	width: 690rpx;
	font-size: 28rpx;
	background: #fff;
	.jinri_list{
		margin-bottom: 30rpx;
		.jinri_item1{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 40rpx;
			.timeitem{
				color: #777777;
				font-size: 20rpx;
			}
			.wwc{
				border: 1rpx solid #ea3e1c;
				padding: 10rpx 32rpx;
				border-radius: 30rpx;
				font-size: 28rpx;
				color: #ea3e1c;
			}
			.ywc{
				background: #0DD474;
				padding: 10rpx 32rpx;
				border-radius: 30rpx;
				font-size: 28rpx;
				color: #ffffff;
			}
		}
		.jinri_item2{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.itemtitle{
				color: #333333;
				font-size: 26rpx;
			}
			.jinru{
				color: #777777;
				font-size: 26rpx;
				font-weight: bold;
			}
		}
	}
}
</style>