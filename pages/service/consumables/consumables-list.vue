<template>
	<view class="container">
		<pulldownRefresh ref="pulldownRefresh" @refresh="pulldownRefresh">
			<scroll-view class="panel-scroll-box" scroll-y @scrolltolower="loadMoreData('add')">
				<view class="collapse" v-for="(item,index) of list" :key="index">
					<view class="title"  :class=" active == index &&  sign ? 'active' : '' "  @click.stop="open(index,item.id)">
						<view>
							<text v-if="active == index &&  sign"  class="iconfont icon-shouqi"></text>
							<text v-else class="iconfont icon-shouqi1"></text>
							<text class="textname">{{item.name}}</text>
						</view>
						<view>
							库存共计 <text class="total">{{item.count}}</text>{{item.unit}}
						</view>
					</view>
					<view class="content" v-if="index == active && sign">
						<view class="gird_item">
							<text>耗材编码:</text>
							<text>{{info.sn}}</text>
						</view>
						<view class="gird_item">
							<text>耗材价格:</text>
							<text>{{info.unitPrice}}</text>
						</view>
						<view class="gird_item">
							<text>耗材类别:</text>
							<text>{{info.type.title}}</text>
						</view>
						<view class="gird_item">
							<text>耗材规格:</text>
							<text>{{info.model}}</text>
						</view>
						<view class="gird_item">
							<text>生产厂商:</text>
							<text>{{info.brand}}</text>
						</view>
						<view class="gird_item" v-for="res of info.details">
							<text>{{res.warehouseName}}:</text>
							<text>{{res.number}}{{res.unit}}</text>
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
				active: "",
				sign: false,
				list:[],
				info:{
					type:{}
				},
				page: 1,
				pageSize: 10,
				loadMoreStatus: 0,
			}
		},
		mounted() {
			this.pulldownRefresh();
		},
		
		methods:{
			open(index,id) {
				if(this.active == index) {
					this.sign = !this.sign;
				} else {
					this.sign = true;
				}
				this.active = index;	
				
				this.$http.get(`/mobile/material/manage/stock/${id}`).then(res =>{
					this.info = res;
				})
				
			},
			pulldownRefresh(){
				this.loadMoreData('refresh');
			},
			
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
				let urlJson = `/mobile/material/manage/stock?page=${this.page}&pageSize=${this.pageSize}`;
				this.$http.get(urlJson).then(res => {
					this.total = res.total;
					this.page++;
					if (type === 'refresh') {
						this.list = []; //刷新前清空数组
					}
					res.list.forEach((item, index) => {
						this.list.push(item)
					})
					// console.log('this.list',this.list.length,res.total)
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
			}
			
		}
	}
</script>

<style lang="scss">
.container{
	/* #ifdef H5 */
	height: calc(100vh - 88rpx);
	/*  #endif */
	background: #f2f2f2;
}
.collapse{
	width: 690rpx;
	margin: 30rpx auto;
	font-size: 28rpx;
	.title{
		border-radius: 10rpx;
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		background: #FFFFFF;
		color: #777777;
		font-size: 24rpx;
		.total{
			margin: 0 10rpx;
			color: #333333;
		}
		.textname{
			font-size: 28rpx;
			color: #333333;
			margin: 0 10rpx;
		}
	}
	.active{
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
		background: #3ada8d;
		color: #FFFFFF !important;
		.total{
			font-weight: 700;
			margin: 0 10rpx;
			color: #ffffff;
		}
		.textname{
			font-size: 28rpx;
			color: #ffffff;
			margin: 0 10rpx;
		}
	}
	.content{
		padding: 0 20rpx;
		background: #e8f1ec;
		.gird_item{
			// margin: 40rpx 0;
			padding: 20rpx 0;
			padding-left: 40rpx;
			text:first-child{
				color: #777777;
				margin-right: 10rpx;
			}
		}
	}
}
</style>