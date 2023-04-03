<template>
	<view class="bg">
		<view class="condition">
			<view>
				<MyPicker @change="screen" :options="statusSelect" placeholoder="状态" v-model="result.status" range-key="name"></MyPicker> <text class="iconfont icon-jinru"></text>
			</view>
			<view>
				<MyPicker @change="screen" :options="region" placeholoder="区域" range-key="name" v-model="result.region" range-value="id"></MyPicker> <text class="iconfont icon-jinru"></text>
			</view>
			<view>
				<MyPicker @change="screen" :options="types" placeholoder="设备" range-key="title" v-model="result.type" range-value="code"></MyPicker> <text class="iconfont icon-jinru"></text>
			</view>
		</view>
		<pulldownRefresh ref="pulldownRefresh" @refresh="pulldownRefresh">
			<scroll-view class="panel-scroll-box" scroll-y @scrolltolower="loadMoreData('add')">
				<view class="device">
					<view class="device_list" @click="punchCard(item)"
						:class="item.recordStatus == '1' ? 'zhengchang' : item.recordStatus == '0' ? 'yichang' : ''"
						v-for="(item,index) of list" :key="index">
						<view>
							<text>设备名称:</text>
							<text>{{item.name}}</text>
						</view>
						<view>
							<text>设备编号:</text>
							<text>{{item.sn}}</text>
						</view>
						<view>
							<text>设备位置:</text>
							<text>{{item.position}}</text>
						</view>
						<view class="saoma" v-if="item.recordStatus == null ">
							<text class="iconfont icon-saoyisao sao"></text>
							打卡巡检
						</view>

						<view class="type" v-if="item.recordStatus == 1 ">
							<!-- <view class="successmsg">设备电压值过高</view> -->
							<image src="../../../static/img/yinzhang/yiwancheng.png" mode=""></image>
						</view>

						<view class="type" v-if="item.recordStatus == 0 ">
							<!-- <view class="errmsg">设备电压值过高</view> -->
							<image src="../../../static/img/yinzhang/yichang.png" mode=""></image>
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
	import MyPicker from '@/components/MyPicker/MyPicker.vue'
	export default {
		components: {
			pulldownRefresh,
			loadMore,
			MyPicker
		},
		data() {
			return {
				list: "",
				taskId: "",
				page: 1,
				pageSize: 10,
				loadMoreStatus: 0,
				statusSelect: [
					{
						name:"未开始",
						value:0
					},
					{
						name:"已开始",
						value:1
					}
				],
				region:[], //区域
				types:[], //类型
				result:{
					status:"",
					region:"",
					type:""
				},
				status:""
			}
		},
		onLoad(options) {
			this.taskId = options.taskId;
			this.status = options.status;
		},
		onShow() {
			this.pulldownRefresh();
		},
		mounted() {
			this.area();
			this.type();
			this.pulldownRefresh();
		},
		methods: {
			screen(){
				this.pulldownRefresh();
			},

			pulldownRefresh() {
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
				let urlJson = `/mobile/inspection/area/equipment/${this.taskId}?page=${this.page}&pageSize=${this.pageSize}&areaId=${this.result.region}&status=${this.result.status}&type=${this.result.type}`;
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

			area() { //区域
				this.$http.get(`/mobile/inspection/equipment/area/${this.taskId }`).then(res => {
					this.region = res;
					console.log(res);
				})
			},
			
			type(){ //类型
				this.$http.get(`/mobile/inspection/equipment/types`).then(res => {
					this.types = res;
				})
			},
			
			punchCard(item) {
				if(item.recordStatus == 0 || item.recordStatus == 1) {
					uni.navigateTo({
						url: `./inspection-inventory-edit?id=${item.id}&name=${item.name}&taskId=${this.taskId}&recordStatus=${item.recordStatus}&status=${this.status}`
					})
				} else {
					uni.navigateTo({
						url: `./inspection-inventory-add?id=${item.id}&name=${item.name}&taskId=${this.taskId}&recordStatus=${item.recordStatus}&status=${this.status}`
					})
				}
				
			},
			
			onNavigationBarButtonTap(e) {
				console.log(e);
				uni.showToast({
					icon: "none",
					title: "扫码"
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #f2f2f2;
	}
	.bg {
		background: #f2f2f2;
	}
	.condition{
		width: 100%;
		display: flex;
		padding: 15rpx 40rpx;
		justify-content: space-between;
		position: absolute;
		top: 0rpx;
		z-index: 999;
		background: #fff;
		view{
			display: flex;
			align-items: center;
			.icon-jinru{
				font-size: 20rpx;
			}
		}
		/deep/.my-picker{
			
		}
	}
	.device {
		padding-top: 100rpx;
		display: flex;
		margin: auto;
		width: 690rpx;
		justify-content: space-between;
		flex-wrap: wrap;

		.device_list {
			padding: 20rpx;
			background: #fff;
			width: 48%;
			border-radius: 10rpx;
			margin-bottom: 30rpx;

			view {
				font-size: 26rpx;
				margin-bottom: 45rpx;

				text:first-child {
					color: #777777;
					margin-right: 10rpx;
				}
			}

			.saoma {
				width: 200rpx;
				height: 60rpx;
				border: 1rpx solid #0DD474;
				line-height: 52rpx;
				border-radius: 30rpx;
				text-align: center;
				color: #0DD474;
				float: right;
				margin-bottom: 0;

				.sao {
					color: #0DD474;
					font-size: 26rpx;
				}
			}
		}

		.yichang {
			background: #f3ebe9;
			position: relative;

			.type {
				margin-bottom: 0;
				.errmsg {
					color: #fd5433;
					height: 60rpx;
					line-height: 52rpx;
					margin-bottom: 0;
				}

				image {
					position: absolute;
					width: 120rpx;
					height: 120rpx;
					top: 20rpx;
					right: 20rpx;
					transform: rotate(30deg);
				}
			}

		}

		.zhengchang {
			background: #e8f1ec;
			position: relative;

			.type {
				margin-bottom: 0;

				.successmsg {
					color: #0dd474;
					height: 60rpx;
					line-height: 52rpx;
					margin-bottom: 0;
				}

				image {
					position: absolute;
					width: 120rpx;
					height: 120rpx;
					top: 20rpx;
					right: 20rpx;
					transform: rotate(30deg);
				}
			}

		}

	}
</style>
