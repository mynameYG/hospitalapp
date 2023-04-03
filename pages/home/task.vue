<template>
	<view class="container">
		<!-- 顶部选项卡 -->
		<scroll-view id="nav-bar" class="nav-bar whiteBg" scroll-x scroll-with-animation :scroll-left="scrollLeft">
			<view v-for="(item,index) in tabBars" :key="item.name" class="nav-item w50 fl fs16" :class="{current: index === tabCurrentIndex}"
			 :id="'tab'+index" @click="changeTab(index)">{{item.title}}</view>
		</scroll-view>
		<pulldownRefresh ref="pulldownRefresh" @refresh="onPulldownReresh">
			<swiper id="swiper" class="swiper-box  pl15 pr15" :duration="300" :current="tabCurrentIndex" @change="changeTab">
				<swiper-item v-for="(tabItem,tabIndex) in tabBars" :key="tabIndex">
					<scroll-view class="panel-scroll-box" scroll-y @scrolltolower="loadNewsList('add')">
						<view class="whiteBg-opacity p15 radius6 mt15 position-relative"  v-for="(item, i) in tabItem.newsList" :key="i" @click="Detail(item)">
							<view class="field-title fs15 text-ellipsis">【{{item.submitterName}}】{{item.title}}</view>
							<view class="mt10">
								<text class="fs12 mr15" :class="item.className">{{item.definitionName}}</text>
								<text class="field-light">{{dateFilter(item.submitTime)}}</text>
							</view>
							<view v-if="hasPermission('r-repairHandled')
							&& tabItem.type == 'undo'
							&& !item.assignee" 
							class="useCar_btn fs15">
								<view @tap.stop="grab(item)">抢单</view>
							</view>
						</view>
						<!-- 上拉加载 -->
						<loadMore :status="tabItem.loadMoreStatus"></loadMore>
						<view :style="{height: footerbottom}"></view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</pulldownRefresh>
	</view>
</template>

<script>
	import pulldownRefresh from '@/components/pulldown/pulldown.vue';
	import loadMore from '@/components/loadMore/loadMore.vue';
	import { hasPermission } from '@/applyList.js'
	import { navToDetails, ToDoedDetails } from '@/util/task.js'
	const module_key = 'repair';
	let windowWidth = 0,
		scrollTimer = false,
		tabBar;
	export default {
		components: {
			pulldownRefresh,
			loadMore
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
					{
						title: "待办事项",
						newsList: [],
						loadMoreStatus: 0,
						refreshing: 0,
						type: "undo",
						page: {
							pageNo: 1,
							total: 0,
						},
					},
					{
						title: "已办事项",
						newsList: [],
						loadMoreStatus: 0,
						refreshing: 0,
						type: "handled",
						page: {
							pageNo: 1,
							total: 0,
						},
					}
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
					'undo' : '/app/fboot/flowable/proc/undo',
					'handled': '/app/fboot/flowable/proc/handled'
				}
				var jsonClass = {
					'carApply': 'colorCar',
					'carRepair':'colorDispatch',
					'repairApply' :'colorRepair',
					'meetingApply' :'colorMeeting'
				};
				this.$http.get(`${urlJsons[tabItem.type]}?pageSize=${this.pageSize}&page=${tabItem.page.pageNo}`).then(res => {
					tabItem.page.total = res.total;
					tabItem.page.pageNo++ ;
					if (type === 'refresh') {
						tabItem.newsList = []; //刷新前清空数组
					}
					res.list.forEach((item,index) => {
						item.className = jsonClass[item.businessCode];
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
				let crollLeft = tabBar.scrollLeft;
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
			Detail(item){
				// console.log('item',item)
				let type = this.tabBars[this.tabCurrentIndex].type;
				if (type == 'undo') {
					if(!item.assignee){
						uni.showToast({
							title: '请抢单签收',
							icon: 'none'
						})
						return
					}
					navToDetails(item.taskId);
				}else{
					// console.log('---',item)
					ToDoedDetails(item.businessCode, item.businessId);
				}
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
	/* 待办事项 颜色 背景色 */
	.colorCar {
		padding:2px 4px;
		background: rgba(29,143,225, 0.1);
		color: rgb(29,143,225);
	}
	
	.colorSeal {
		padding:2px 4px;
		background: rgba(241,90,74, 0.1);
		color: rgb(241,90,74);
	}
	
	.colorDispatch {
		padding:2px 4px;
		background: rgba(243,153,39, 0.1);
		color: rgb(243,153,39);
	}
	
	.colorOut {
		padding:2px 4px;
		background: rgba(41,171,145, 0.1);
		color: rgb(41,171,145);
	}
	
	.colorReceipt {
		padding:2px 4px;
		background: rgba(232,121,190, 0.1);
		color: rgb(232,121,190);
	}
	
	.colorLeave {
		padding:2px 4px;
		background: rgba(121,121,226, 0.1);
		color: rgb(121,121,226);
	}
	.colorSign {
		padding:2px 4px;
		background: rgba(193,58,158, 0.1);
		color: #C13A9E;
	}
	.colorMeeting ,.colorBorrow{
		padding:2px 4px;
		background: rgba(3, 211, 103, 0.1);
		color: #03D367;
	}
	.colorWebsite{
		padding:2px 4px;
		background: rgba(61, 156, 252, 0.1);
		color: #3D9CFC;
	}
	.colorRepair{
		padding:2px 4px;
		background: rgba(241,90,74, 0.1);
		color: #f00
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