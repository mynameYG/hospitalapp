<template>
	<view>
		<pulldownRefresh ref="pulldownRefresh" @refresh="pulldownRefresh">
			<scroll-view class="panel-scroll-box" scroll-y @scrolltolower="loadMoreData('add')">
				<view class="out mb15" v-for="item of list" @click="goto(item.id)">
					<view class="flex flexbet mb25">
						<view class="out_font">{{dateFilter(item.applyDate)}}</view>
					</view>
					<view class="flex mb15">						<view class="out_font">科室 <text class="ml5">:</text></view>						<view class="ml5">{{item.departmentName}}</view>					</view>					<view class="flex">						<view class="out_font">申请人 <text class="ml5">:</text></view>						<view class="ml5">{{item.applyName}}</view>					</view>
					<image v-if="item.status == 'report'" src="/static/img/yinzhang/daishenhe.png"></image>
					<image v-else-if="item.status == 'notconsuming'" src="/static/img/yinzhang/dailingyong.png"></image>
					<image v-else-if="item.status == 'consuming'" src="/static/img/yinzhang/yilingyong.png" mode=""></image>
					<image v-else-if="item.status == 'fail'" src="/static/img/yinzhang/butongguo.png" mode=""></image>
					<view class="btn_repair mt10">
						<view class="btn-del" v-if="resourcesCode.includes('consuming-del')" @click.stop="del(item.id)"> 删除</view>
						<view class="btn-sh" v-if="resourcesCode.includes('consuming-edit') && item.status != 'consuming' && item.status != 'notconsuming'"  @click.stop="edit(item.id)">编辑</view>
						<view class="btn-bj" v-if="resourcesCode.includes('consuming-check') && item.status == 'report'" @click.stop="check(item.id)">审核</view>
						<view class="btn-sh" v-if="resourcesCode.includes('consuming-qr') && item.status == 'notconsuming'" @click.stop="determine(item.id)">领用</view>
					</view>
				</view>
				<!-- 打补丁 -->
			<loadMore :status="loadMoreStatus"></loadMore>
			<view class="buding"></view> 
			</scroll-view> 
		</pulldownRefresh>
		
		<view class="xinzeng" v-if="resourcesCode.includes('consuming-add')">
			<view class="repair_btn" @click="add()">新增领用</view>
		</view>
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
				resourcesList:this.$store.getters.getModuleResources('consumables'),
				resourcesCode:[],
				page: 1,
				pageSize: 10,
				loadMoreStatus: 0,
				list:[],
				id:"",
			}
		},
		onShow() {
			this.pulldownRefresh();
			this.resourcesList[1].forEach(item =>{
				this.resourcesCode.push(item)
			})
		},
		mounted() {
			
		},
		methods:{
			check(id) { 
				uni.navigateTo({
					url: './consuming-audit?id='+id
				})
			},
			
			edit(id) {
				uni.navigateTo({
					url: `./consuming-editadd?id=${id}&type=edit`
				})
			},
			
			goto(id) {
				uni.navigateTo({
					url: './consuming-details?id='+id
				})
			},
			
			add() {
				uni.navigateTo({
					url: './consuming-editadd?type=add'
				})
			},
			//确认领用
			determine(id) {
				var self = this
				uni.showModal({
					title: '提示',
					content: '是否确认领用',
					success: function (res) {
						if (res.confirm) {
							self.$http.put(`/mobile/material/consuming/confirm/${id}`).then(res =>{
								self.pulldownRefresh();
								uni.showToast({
									title:"领用成功",
									icon:"none"
								})
							})
						}
					}
				});
			},
			
			del(id){
				var self = this
				uni.showModal({
					title: '提示',
					content: '是否确认删除该菜单',
					success: function (res) {
						if (res.confirm) {
							self.$http.del(`/mobile/material/consuming/${id}`).then(res =>{
								self.pulldownRefresh();
								uni.showToast({
									title:"删除成功",
									icon:"none"
								})
							})
						}
					}
				});
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
				let urlJson = `/mobile/material/consuming?page=${this.page}&pageSize=${this.pageSize}`;
				this.$http.get(urlJson).then(res => {
					console.log(res);
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
						console.log('add',this.list.length,res.total)
						this.loadMoreStatus = this.list.length < res.total ? 0 : 2;
					}
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			},
			
		}
	}
</script>

<style lang="scss" >
page{
	background: #f2f2f2;
}
.out{
	background: #fff;
	width: 690rpx;
	margin: 20rpx auto;
	padding: 20rpx;
	border-radius: 10rpx;
	font-size: 28rpx;
	position: relative;
	image{
		position: absolute;
		width: 120rpx;
		height: 120rpx;
		top: 20rpx;
		right: 20rpx;
		transform:rotate(30deg);
	}
	.btn_repair{
		height: 60rpx;
		view{
			width: 160rpx;
			height: 60rpx;
			text-align: center;
			line-height: 60rpx;
			color: #0DD474;
			border: 1rpx solid #0DD474;
			border-radius: 200rpx;
			float: right;
			margin: 0 0 0 20rpx;
		}
		.btn-bj{
			color: #1c87ea;
			border: 1rpx solid #1c87ea;	
		}
		.btn-del{
			color: #f56c6c;
			border: 1rpx solid #f56c6c;	
		}
	}
	.out_font{
		color: #777777;
	}
	.name{
		color: #0DD474;
	}
	.mb25{
		margin-bottom: 50rpx;
	}
	
}
.buding{
	height: 140rpx;
}
.xinzeng{
	width: 100%;
	background: #fff;
	height: 120rpx;
	position: fixed;
	bottom: 0;
	box-shadow: 0px -1px 6px #dfdfdf;
	.repair_btn{
		background: #0DD474;
		color: #fff;
		width: 500rpx;
		height: 80rpx;
		margin: auto;
		margin-top: 20rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 80rpx;
		border-radius: 100rpx;
	}
}

.popup{
	background: #fff;
	position: fixed;
	width: 600rpx;
	height: 400rpx;
	left: 50%;
	top: 50%;
	margin-left: -300rpx;
	margin-top: -420rpx;
	border-radius: 10rpx;
	/deep/.u-textarea{
		background: #f5f5f5;
		height: 220rpx;
		color: #333333;
		border: none;
	}
	.title{
		color: #777777;
		font-size: 28rpx;
		height: 100rpx;
		line-height: 100rpx;
		background: #fffff;
		padding: 0 20rpx;
		.close{
			width: 100rpx;
			text-align: right;
		}
	}
	.btn_list{
		display: flex;
		justify-content: space-around;
		font-size: 26rpx;
		text-align: center;
		view{
			width: 50%;
			height: 80rpx;
			line-height: 80rpx;
		}
		.quxiao{
			background: #fff;
			color: #777777;
		}
		.baocun{
			background: #0dd474;
			color: #ffffff;
		}
	}
}
.icon-chuku{
	vertical-align: middle;
}
</style>