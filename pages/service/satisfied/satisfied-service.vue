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
						<view class="field-box radius4 whiteBg mt15 pl15 pr15" 
						v-for="news in tabItem.newsList" :key="news.id"
						@tap="navToDetail(news)">
							<view class="time">{{news.time}}</view>
							<view class="field-item flex">
								<text class="field-title">监督类型：</text>
								<text class="field-con flex1" :class="{'danger' : news.type.code == 'complain'}">{{news.type.title || "-"}}</text>
							</view>
							<view class="field-item flex">
								<text class="field-title">{{news.type.title}}内容：</text>
								<text class="field-con flex1 text-ellipsis-2">{{news.content || "-"}}</text>
							</view>
							<status :status="news.status"></status>
						</view>
						<!-- 上拉加载 -->
						<loadMore :status="tabItem.loadMoreStatus"></loadMore>
						<view :style="{height: footerbottom}"></view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</pulldownRefresh>
		
		<view class="fixed-btn-bottom grayBg">
			<view class="btn" @tap="jump('/pages/service/satisfied/satisfied-service-add')">新增</view>
		</view>
	</view>
</template>

<script>
	import status from "@/components/ikdo/status.vue"
	import pulldownRefresh from '@/components/pulldown/pulldown.vue';
	import loadMore from '@/components/loadMore/loadMore.vue';
	
	let windowWidth = 0,
		scrollTimer = false,
		tabBar;
	export default {
		components: {
			status,
			pulldownRefresh,
			loadMore
		},
		data(){
			return{
				tabCurrentIndex: 0, //当前选项卡索引
				enableScroll: true,
				scrollLeft: 0, //顶部选项卡左滑距离
				pageSize: 5,
				loadMoreStatus: 0,
				footerbottom: 0,
				list:[],
				tabBars:[
					{
						title: "待回复",
						newsList: [],
						loadMoreStatus: 0,
						refreshing: 0,
						type: "unreply",
						page: {
							pageNo: 1,
							total: 0,
						},
					},
					{
						title: "已回复",
						newsList: [],
						loadMoreStatus: 0,
						refreshing: 0,
						type: "replyed",
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
			
			this.loadNewsList('add');
			// #ifdef H5
			this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight;
			// #endif
		},
		methods:{
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
				let url = `https://uniapp-toutiao.herokuapp.com/api/profiles/video_list/${tabItem.page.pageNo}/${this.pageSize}`;
				this.$http.get(url).then(res => {
					res.total = 16;
					tabItem.page.total = res.total;
					tabItem.page.pageNo++ ;
					if (type === 'refresh') {
						tabItem.newsList = []; //刷新前清空数组
					}
					res.forEach((item,index) => {
						let itemJson = {
								id:item.id,
								time:"2022-05-27 16:06:33",
								type:{
									code:index == 0 ?'complain' :index == 1 ? "praise" : 'proposal',
									title:index == 0 ? "投诉" : index == 1 ?'表扬' : '建议'
								},
								content:"食堂菜品不卫生，不干净，吃出虫子，并且工作人员态度恶劣",
								status:"daihuifu"
							}
						if(tabItem.type == 'replyed'){
							itemJson.status = 'yihuifu'
						}
						
						tabItem.newsList.push(itemJson);
					});
					//下拉刷新 关闭刷新动画
					if (type === 'refresh') {
						this.$refs.mixPulldownRefresh && this.$refs.mixPulldownRefresh.endPulldownRefresh();
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
				console.log('e',e)
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
			navToDetail(item){
				this.jump(`/pages/service/satisfied/satisfied-service-detail?typeTitle=${item.type.title}&status=${item.status}`)
			}
			
		}
	}
</script>

<style lang="scss">
	.container{
		height: calc(100vh - 140upx);
		/* #ifdef H5 */
		height: calc(100vh - (88upx + 140upx));
		/*  #endif */
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
		.time{
			margin-bottom: 20rpx;
			font-size: 30rpx;
			color:#777777
		}
	}
</style>