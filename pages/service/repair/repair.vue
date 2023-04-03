<template>
	<view class="container" :class="hasPermission('r-repairAdd')?'paddingBottom' : ''">
		<!-- 顶部选项卡 -->
		<scroll-view v-if="tabBars.length > 1" id="nav-bar" class="nav-bar whiteBg" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tabBars" :key="item.name" class="nav-item fl fs16" 
			:class="[index === tabCurrentIndex ? 'current' : '',tabBars.length > 2 ? 'w33' : 'w50']"
			 :id="'tab'+index" @click="changeTab(index)">{{item.title}}</view>
		</scroll-view>
		<pulldownRefresh ref="pulldownRefresh" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box  pl15 pr15" :duration="300" :current="tabCurrentIndex" @change="changeTab">
				<swiper-item v-for="(tabItem,tabIndex) in tabBars" :key="tabIndex">
					<scroll-view class="panel-scroll-box" scroll-y @scrolltolower="loadNewsList('add')">
						<view class="field-box radius4 whiteBg mt15 pl15 pr15" 
						v-for="item in tabItem.newsList" :key="item.id"
						@tap="detail(item)">
							<!-- 申请记录 -->
							<template v-if="hasPermission('r-repairAdd')">
								<view class="carNumber">{{item.carNo}}</view>
								<view class="field-item flex">
									<text class="field-title">报修时间：</text>
									<text class="field-con flex1">{{dateFilter(item.reportTime) || "-"}}</text>
								</view>
								<view class="field-item flex">
									<text class="field-title">报修设备：</text>
									<text class="field-con flex1">{{item.assetsTypeName}}{{item.assetsSn}}</text>
								</view>
								<view class="field-item flex">
									<text class="field-title">报修原因：</text>
									<text class="field-con flex1 text-ellipsis-2">{{item.repairInfo || "-"}}</text>
								</view>
								<status :status="item.status"></status>
							</template>
							<!-- 待办列表 -->
							<template v-else>
								<view class="time">{{dateFilter(item.submitTime)}}</view>
								<view class="field-item flex">
									<text class="field-title">申请人员：</text>
									<text class="field-con flex1">{{item.submitterName || "-"}}</text>
								</view>
								<view class="field-item flex">
									<text class="field-title">流程环节：</text>
									<text class="field-con flex1">{{item.taskName || "-"}}</text>
								</view>
								<view v-if="hasPermission('r-repairHandled') 
								&& tabItem.type == 'undo'
								&& !item.assignee" 
								class="useCar_btn fs15">
									<view @tap.stop="grab(item)">抢单</view>
								</view>
							</template>
						</view>
						<!-- 上拉加载 -->
						<loadMore :status="tabItem.loadMoreStatus"></loadMore>
						<view :style="{height: footerbottom}"></view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</pulldownRefresh>
		<view v-if="hasPermission('r-repairAdd')" class="fixed-btn-bottom grayBg">
			<view class="btn" @tap="add">新增申请</view>
		</view>
	</view>
</template>

<script>
	import status from "@/components/ikdo/status.vue"
	import pulldownRefresh from '@/components/pulldown/pulldown.vue';
	import loadMore from '@/components/loadMore/loadMore.vue';
	import { hasPermission } from '@/applyList.js'
	const module_key = 'repair';
	let windowWidth = 0,
		scrollTimer = false,
		tabBar;
	export default {
		components: {
			pulldownRefresh,
			loadMore,
			status
		},
		data(){
			return{
				code:"",
				resourcesCode:this.$store.getters.getModuleResources(module_key)[2],//用户权限标识
				tabCurrentIndex: 0, //当前选项卡索引
				enableScroll: true,
				scrollLeft: 0, //顶部选项卡左滑距离
				pageSize: 10,
				loadMoreStatus: 0,
				footerbottom: 0,
				list:[],
				tabBars:[
					// {
					// 	title: "申请记录",
					// 	newsList: [],
					// 	loadMoreStatus: 0,
					// 	refreshing: 0,
					// 	type: "apply",
					// 	page: {
					// 		pageNo: 1,
					// 		total: 0,
					// 	},
					// },
					// {
					// 	title: "待办记录",
					// 	newsList: [],
					// 	loadMoreStatus: 0,
					// 	refreshing: 0,
					// 	type: "undo",
					// 	page: {
					// 		pageNo: 1,
					// 		total: 0,
					// 	},
					// }
				]
			}
		},
		async onLoad(opt) {
			// 获取屏幕宽度
			windowWidth = uni.getSystemInfoSync().windowWidth;
			this.code = opt.code;
			// this.loadNewsList('add');
			// #ifdef H5
			this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight;
			// #endif
		},
		onShow(){
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				this.resourcesCode.forEach(item => {
					this.tabBars.push({
						title: item.title,
						code:item.code,
						newsList: [],
						loadMoreStatus: 0,
						refreshing: 0,
						type: item.type,
						page: {
							pageNo: 1,
							total: 0,
						}
					});
				})
				this.onPulldownReresh();
			},
			hasPermission(perm){
				return hasPermission(this.resourcesCode, perm)
			},
			//列表
			loadNewsList(type) {
				let tabItem = this.tabBars[this.tabCurrentIndex];
				//type add 加载更多 refresh下拉刷新
				if (type === 'add') {
					if (tabItem.loadMoreStatus === 2) {
						return;
					}
					tabItem.loadMoreStatus = 1;
				}
				// #ifdef APP-PLUS
				else if (type === 'refresh') {
					tabItem.refreshing = true;
				}
				// #endif
				if (type === 'refresh') {
					tabItem.page.pageNo = 1;
				}
				let urlJsons = {
					'r-repairAdd': `/app/repair/orders`,
					'r-repairHandled': `/app/repair/undo`,
					'r-repairShenhe': `/app/repair/handled`,
				};
				this.$http.get(`${urlJsons[tabItem.code]}?pageSize=${this.pageSize}&page=${tabItem.page.pageNo}`).then(res => {
					tabItem.page.total = res.total;
					tabItem.page.pageNo++ ;
					if (type === 'refresh') {
						tabItem.newsList = []; //刷新前清空数组
					}
					res.list.forEach((item,index) => {
						tabItem.newsList.push(item);	
					});
					if (type === 'refresh') {
						tabItem.loadMoreStatus = 0;
						this.$refs.pulldownRefresh && this.$refs.pulldownRefresh.endPulldownRefresh();
						// #ifdef APP-PLUS
						tabItem.refreshing = false;
						// #endif
						tabItem.loadMoreStatus = tabItem.newsList.length < res.total ? 0 : 2;
					}
					//上滑加载 处理状态
					if (type === 'add') {
						tabItem.loadMoreStatus = tabItem.newsList.length < res.total ? 0 : 2;
					}
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			},
			//下拉刷新
			onPulldownReresh(){
				this.loadNewsList('refresh');
			},
			//tab切换
			async changeTab(e) {
				if (scrollTimer) {
					//多次切换只执行最后一次
					clearTimeout(scrollTimer);
					scrollTimer = false;
				}
				let index = e;
				if (typeof e === 'number') {
					// 点击选项卡
					index = e;
				} else if (e.detail.source == "touch") {
					// 左右滑动
					index = e.detail.current;
				} else {
					// 改变输入框的值,点搜索按钮，会触发change事件
					let tabItem = this.tabBars[this.tabCurrentIndex];
					if (this.tabCurrentIndex !== 0 && tabItem.loaded !== true) {
						this.loadNewsList('add');
						tabItem.loaded = true;
					}
					return;
				}
				if (typeof tabBar !== 'object') {
					tabBar = await this.getElSize("nav-bar")
				}
				//计算宽度相关
				let tabBarScrollLeft = tabBar.scrollLeft;
				let width = 0;
				let nowWidth = 0;
				//获取可滑动总宽度
				for (let i = 0; i <= index; i++) {
					let result = await this.getElSize('tab' + i);
					width += result.width;
					if (i === index) {
						nowWidth = result.width;
					}
				}
				if (typeof e === 'number') {
					//点击切换时先切换再滚动tabbar，避免同时切换视觉错位
					this.tabCurrentIndex = index;
				}
				//延迟300ms,等待swiper动画结束再修改tabbar
				scrollTimer = setTimeout(() => {
					if (width - nowWidth / 2 > windowWidth / 2) {
						//如果当前项越过中心点，将其放在屏幕中心
						this.scrollLeft = width - nowWidth / 2 - windowWidth / 2;
					} else {
						this.scrollLeft = 0;
					}
					if (typeof e === 'object') {
						this.tabCurrentIndex = index;
					}
					this.tabCurrentIndex = index;
					//第一次切换tab，动画结束后需要加载数据
					let tabItem = this.tabBars[this.tabCurrentIndex];
					if (this.tabCurrentIndex !== 0 && tabItem.loaded !== true) {
						this.loadNewsList('add');
						tabItem.loaded = true;
					}
				}, 300)
			
			},
			//获得元素的size
			getElSize(id) {
				return new Promise((res, rej) => {
					let el = uni.createSelectorQuery().select('#' + id);
					el.fields({
						size: true,
						scrollOffset: true,
						rect: true
					}, (data) => {
						res(data);
					}).exec();
				});
			},
			detail(item){
				let type = this.tabBars[this.tabCurrentIndex].type;
				if (type == 'undo') {
					if(!item.assignee){
						uni.showToast({
							title: '请抢单签收',
							icon: 'none'
						})
						return
					}
					this.$http.get(`/app/fboot/flowable/proc/undo/${item.taskId}`).then(res => {
						let jsons = {
							'niban': `/pages/service/repair/repair-niban`,
							'handle': `/pages/service/repair/repair-handle`,
							'examine': `/pages/service/repair/repair-examine`,
						};
						uni.navigateTo({
							url: jsons[res.taskKey] + `?id=${item.businessId}&status=${item.status}&code=${this.code}&taskId=${item.taskId}&isAudit=${res.isAudit}`
						});
					}).catch(err => {
						uni.showToast({
							title: err,
							icon: 'none'
						})
					});
				} else if(type == 'handled'){
					this.jump(`/pages/service/repair/repair-detail?id=${item.businessId}&status=${item.status}`)
				}
				else {
					this.jump(`/pages/service/repair/repair-detail?id=${item.id}&status=${item.status}`)
				}
			},
			add(){
				this.jump(`/pages/service/repair/repair-add?code=${this.code}`)
			},
			// 编辑
			Edit(item){
				this.jump(`/pages/service/vehicle/vehicle-maintain/vehicle-maintain-edit?id=${item.id}&code=${this.code}`)
			},
			//抢单
			grab(item){
				let _self = this;
				//#ifdef APP-PLUS
				var bts=["确定", "取消"];
				plus.nativeUI.confirm("确认抢单吗？", (e)=>{  
					if(e.index == 0){
						let url = `/app/repair/claim/${item.taskId}`;
						this.$http.get(url).then(res => {
							uni.showToast({title: "抢单成功",icon: 'none'});
							_self.onPulldownReresh();
						}).catch(err => {
							uni.showToast({
								title: err,
								icon: 'none'
							})
						});
					}
				},"提示",bts);
				//#endif
				//#ifdef H5
				uni.showModal({
				    title: '提示',
				    content: '确认抢单吗？',
				    success: function (res) {
				        if (res.confirm) {
							let url = `/app/repair/claim/${item.taskId}`;
							_self.$http.get(url).then(res => {
								uni.showToast({title: "抢单成功",icon: 'none'});
								_self.onPulldownReresh();
							}).catch(err => {
								uni.showToast({
									title: err,
									icon: 'none'
								})
							});
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				//#endif
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
	.paddingBottom{
		padding-bottom:140rpx;
	}
	.nav-bar{
		height: 88rpx;
		.nav-item{
			height: 88rpx;
			line-height: 88rpx;
			&:after{
				width: 20%;
				border-width: 6rpx;
			}
		}
	}
	.field-box{
		position: relative;
		.carNumber{
			margin-bottom: 20rpx;
			font-size: 30rpx;
		}
	}
	.status-btn{
		top:20upx;
		width: 88upx;
		height: 88upx;
	}
	.useCar_btn{
		position: absolute;
		bottom:20rpx;
		right:20rpx;
		>view{
			border: 1px solid #1C87EA;
			color: #1C87EA;
			border-radius: 20px;
			text-align: center;
			padding: 6rpx 20rpx;
		}
	}
</style>