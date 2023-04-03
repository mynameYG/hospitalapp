<template>
	<view class="home">
		<!-- 头部图片 -->
		<view class="content p15">
			<view class="home-header-img radius10 whiteBg">
				<image src="../../static/home-img/homeBanner.png" mode=""></image>
			</view>
		</view>
		<!-- 中间图标内容 -->
		<view class="home-center-boxContent whiteBg pb15">
			<u-grid :border="false" col="4">
				<u-grid-item v-for="(listItem,listIndex) in getHomeList" :key="listIndex" @tap="jump(listItem.url)" v-if="listIndex < 7">
					<view class="icon-bg flex flexmid" :style="{background:listItem.color}">
						<text class="iconfont flex1" :class="'icon-' + listItem.icon"></text>
					</view>
					<text class="grid-text">{{listItem.title}}</text>
				</u-grid-item>
				<u-grid-item @tap="jump('/pages/person-picker')">
					<view class="icon-bg flex flexmid" style="background-color: #f00;">
						<text class="iconfont flex1 icon-gengduo" ></text>
					</view>
					<text class="grid-text">人员demo</text>
				</u-grid-item>
				<u-grid-item @tap="jump('/pages/fileDemo')">
					<view class="icon-bg flex flexmid" style="background-color: #fe0;">
						<text class="iconfont flex1 icon-gengduo" ></text>
					</view>
					<text class="grid-text">附件demo</text>
				</u-grid-item>
				<u-grid-item @tap="jump('/pages/home/many')">
					<view class="icon-bg flex flexmid" style="background-color: gray;">
						<text class="iconfont flex1 icon-gengduo" ></text>
					</view>
					<text class="grid-text">更多</text>
				</u-grid-item>
			</u-grid>
		</view>
		<!-- 通知公告 -->
		<view class="whiteBg home-list-content mb15 mr15 ml15 pb15">
			<view class="announcement pt10">
				<text class="ml10"></text>
				<text class="pl10 ">通知公告</text>
			</view>
			<view class="pt20 inform">
				<view class="dining-inform fl ml10">
					暂停食堂服务通知
					<text class="red-circle"></text>
				</view>
				<view class="inform-time fr mr10">2022-03-26 13:06</view>
			</view>
			<view class="pt20 inform">
				<view class="dining-inform fl ml10">
					暂停食堂服务通知
					<text class="red-circle"></text>
				</view>
				<view class="inform-time fr mr10">2022-03-26 13:06</view>
			</view>
			<view class="pt20 inform">
				<view class="dining-inform fl ml10">
					暂停食堂服务通知
					<text class="red-circle"></text>
				</view>
				<view class="inform-time fr mr10">2022-03-26 13:06</view>
			</view>
		</view>
		<!-- 代办事项 -->
		<view class="whiteBg home-list-content mb15 pb10 mr15 ml15">
			<view class="flex flexbet flexmid p15" @click="jump('/pages/home/task')">
				<view class="flex1 fs16 label">代办事项</view>
				<text class="fr fs12 color999">查看更多>></text>
			</view>
			<view class="inform flex mb10" v-for="item in undoList" :key="item.businessId" @click="Detail(item)">
				<view class="dining-inform fl ml10 flex1">
					<text style="max-width: 80%;display: inline-block;" class="text-ellipsis">{{item.title}}</text>
					<text class="red-circle"></text>
				</view>
				<view class="inform-time fr mr10">{{dateFilter(item.submitTime)}}</view>
			</view>
			<view v-if="undoList.length < 1">
				<view class="emptyText pl15">暂无代办事项</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapGetters, mapMutations} from 'vuex'
	import { navToDetails } from '@/util/task.js'
	export default {
		data() {
			return {
				undoList:[]
				//applyList:this.$store.getters.getApplyList,//获取拥有的所有应用个数
			}
		},
		onShow(){
			if(this.$store.state.hasLogin){
				this.$store.dispatch("storageAppList");
				this.$http.get('/app/resources').then(resources => {
					// console.log('resources---',resources)
					this.setResources({
						resources
					});
				})
				this.getUndoList();
			}
		},
		computed: {
		  // 使用对象展开运算符将 getter 混入 computed 对象中
			...mapGetters([
				'getHomeList'
			])
		},
		methods: {
			...mapMutations(['setResources']),
			getUndoList(){
				let param = {
					"page": 1,
					"pageSize": 4
				};
				this.$http.get(`/app/fboot/flowable/proc/undo`,param).then(res =>{
					this.undoList = res.list;
				})
			},
			Detail(item){
				if(!item.assignee){
					uni.showToast({
						title: '请抢单签收',
						icon: 'none'
					})
					this.jump('/pages/home/task');
					return
				}
				navToDetails(item.taskId);
			},
		}
	}
</script>

<style lang="scss">
	page {
		background-color: rgb(244, 244, 244);
	}

	.home {
		.content {
			.home-header-img {
				width: 690rpx;
				height: 260rpx;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.home-center-boxContent {
			border-radius: 10rpx;
			width: 690rpx;
			// min-height: 280rpx;
			margin: 0 30rpx 30rpx 30rpx;
		}
		.grid-text {
			font-size: 14px;
			color: #909399;
			// padding: 10upx 0 20upx 0rpx;
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
		
		.home-list-content {
			// width: 690rpx;
			// min-height: 330rpx;
			border-radius: 10rpx;
			.label{
				position: relative;
				padding-left: 20rpx;
				&:before{
					position: absolute;
					top:0;
					left: 0;
					content: "";
					margin-right: 20rpx;
					display: inline-block;
					width: 6rpx;
					height: 38rpx;
					background: inherit;
					background-color: rgba(13, 212, 116, 1);
				}
			}
			.announcement {
				>text:first-child {
					display: inline-block;
					width: 6rpx;
					height: 38rpx;
					background: inherit;
					background-color: rgba(13, 212, 116, 1);
				}

				>text:last-child {
					font-family: '微软雅黑', sans-serif;
					font-weight: 400;
					font-style: normal;
					font-size: 32rpx;
					display: inline-block;
					transform: translateY(-7rpx);
				}
			}

			.inform {
				overflow: hidden;
				font-family: '微软雅黑', sans-serif;
				font-weight: 400;
				font-style: normal;

				.dining-inform {
					font-size: 28rpx;

					.red-circle {
						width: 16rpx;
						height: 16rpx;
						background-color: orangered;
						border-radius: 50%;
						display: inline-block;
						transform: translateY(-15rpx)translateX(5rpx);
					}
				}

				.inform-time {
					font-size: 22rpx;
					color: #777777;
					transform: translateY(7rpx);
				}
			}

		}
	}
</style>
