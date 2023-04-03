<template>
	<view class="container pl15 pr15">
		<pulldownRefresh ref="pulldownRefresh" @refresh="initData">
			<scroll-view class="panel-scroll-box" scroll-y @scrolltolower="loadMoreData">
				<view class="field-box radius4 whiteBg mt15 pl15 pr15" 
				v-for="item in list" :key="item.id"
				@tap="navToDetail(item)">
					<view v-if="item.answer" class="tag" :class="{'grayBg':item.status == 'end'}">
						已回答
					</view>
					<view class="title" :class="{'noAnswer':!item.answer,'noAnswerEnd':item.status == 'end'}">{{item.title}}
					</view>
					<view class="field-item">
						<text class="field-con flex1 text-ellipsis-2">{{item.content || "-"}}</text>
					</view>
					<view class="item-info flex flexbet">
						<text class="time flex1"><text class="iconfont icon-shijian"></text>{{item.datetime}}</text>
						<text class="total flex1 tc"><text class="iconfont icon-wenjuantiaocha1"></text>共{{item.total}}道题</text>
						<text class="read flex1 tr"><text class="iconfont icon-liulan"></text>{{item.readNum}}人查看</text>
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
				size: 5,
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
							title:"后勤部门满意度调查",
							content:"为倾听医院广大职工心声，了解职工的真实想法和建议，进一步提高后勤服务质量，请各职工如实填写！",
							datetime:"4.02-4.10",
							total:20,
							readNum:112,
							answer:false,
							status:"progress"
						},
						{
							id:2,
							title:"后勤部门满意度调查",
							content:"为倾听医院广大职工心声，了解职工的真实想法和建议，进一步提高后勤服务质量，请各职工如实填写！",
							datetime:"4.02-4.10",
							total:20,
							readNum:112,
							answer:false,
							status:"notStarted"
						},
						{
							id:3,
							title:"后勤部门满意度调查",
							content:"为倾听医院广大职工心声，了解职工的真实想法和建议，进一步提高后勤服务质量，请各职工如实填写！",
							datetime:"4.02-4.10",
							total:20,
							readNum:112,
							answer:true,
							status:"end"
						},
						{
							id:4,
							title:"后勤部门满意度调查",
							content:"为倾听医院广大职工心声，了解职工的真实想法和建议，进一步提高后勤服务质量，请各职工如实填写！",
							datetime:"4.02-4.10",
							total:20,
							readNum:112,
							answer:true,
							status:"end"
						},
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
						res.forEach((item,i) => {
							let itemJson = {
									id:item.id,
									title:"后勤部门满意度调查",
									content:"为倾听医院广大职工心声，了解职工的真实想法和建议，进一步提高后勤服务质量，请各职工如实填写！",
									datetime:"4.02-4.10",
									total:20,
									readNum:112,
									answer:true,
									status:"end"
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
			},
			navToDetail(item){
				/* if(item.status == 'end'){
					uni.showToast({title: "问卷调查已结束",icon: 'none'});
					return false
				}*/
				if(item.status == 'notStarted'){
					uni.showToast({title: "问卷调查未开始",icon: 'none'});
					return false
				} 
				uni.navigateTo({
					url:`/pages/service/satisfied/satisfied-question-detail?pageName=${item.title}&status=${item.status}&answer=${item.answer}`
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
		.tag{
			position: absolute;
			top:0;
			right: 0;
			padding: 8rpx 30rpx;
			border-radius: 0 6rpx 0 34rpx;
			font-size: 26rpx;
			color:#fff;
			background-color: #0DD474;
		}
		.grayBg{
			background-color: #999!important;
		}
		.title{
			margin-bottom: 20rpx;
			font-size: 30rpx;
			color:#333
		}
		.noAnswer{
			position: relative;
			&:before{
				content:"";
				position: absolute;
				left: -18rpx;
				top: 4rpx;
				width: 16rpx;
				height: 16rpx;
				border-radius: 50%;
				text-align: center;
				cursor: pointer;
				background-color: #F74830;
			}
		}
		.noAnswerEnd:before{
			background-color: #999;
		}
		.item-info {
			margin-top: 12rpx;
			color: #999;
			overflow: hidden;
			font-size: 24rpx;
			.iconfont{
				margin-right: 6rpx;
				font-size: 26rpx;
			}
		}
	}
</style>