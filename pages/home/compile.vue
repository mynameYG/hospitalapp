<template>
	<view class="container">
		<view class="apply-wrap whiteBg p10 mb15">
			<view class="apply-box apply-edit-box">
				<view class="apply-title">首页应用</view>
				<drag-sorts :list="list" :props="props" ref="mychild" @complete="onDragSortComplete" @listenChild="formChild"></drag-sorts>
			</view>
		</view>
		<view class="apply-wrap whiteBg p10">
			<view class="apply-box apply-edit-box">
				<text class="apply-title">更多应用</text>
				<view class="apply-list flex flexmid">
					<view class="apply-item" v-for="(item,index) in allMenus" :key="index" :id="item.id" @click="jia(item,index)">
						<view  class="apply-link">
							<view class="icon-bg flex flexmid" :style="{background:item.color}">
								<text class="iconfont flex1" :class="'icon-'+item.icon"></text>
							</view>
							<text class="icon-text tc text-ellipsis">{{item.title}}</text>
						</view>
						<view class="opt opt-reduce"><text class="iconfont icon-tianjia"></text></view>
					</view>
					<view v-if="allMenus.length < 1" class="emptyText p15">暂无更多应用</view>
				</view>
			</view>
		</view>	
	</view>
</template>

<script>
	import dragSorts from '@/components/drag-sorts/index.vue'
	export default {
	    components: {
			dragSorts
	    },
	    data () {
			return {
				// 对应需要显示的标题
				props: {
					label: 'label',
					text: 'icon',
					text2: 'delicon'
				},
				list:[],
				postList:[],
				allMenus:[],
			}
	    },
		onNavigationBarButtonTap(e) {
			let addList = [];
			this.postList.forEach((item,index) => {
				//console.log(item)
				addList.push({
					programId:item.id,
					sn:index
				})
			});
			console.log('this.list',addList)
			// return
			this.$http.post('/app/fboot/user/programs',{programs:addList}).then(res => {
				uni.showToast({
					title: "编辑成功",
					icon: 'none'
				});
				this.$store.dispatch('storageAppList');//重新加载应用列表
				
				
				setTimeout(()=>{
					uni.navigateBack({delta: 1});
				},1000);
			}).catch(err => {
				uni.showToast({title: err,icon: 'none'})
			});
		},
		mounted(){
			// 获取常用菜单
			let homeList = this.$store.getters.getHomeList;
			let allList = this.$store.getters.getApplyList;
			homeList.forEach((item,index) => {
				this.list.push({
					delicon: 'icon-yichu2',
					icon: 'icon-' + item.icon,
					bgColor:item.color,
					label: item.title,
					id:item.id,
					isShow:1
				});
				this.postList.push({
					id:item.id
				})
				
			})
			//拥有菜单与常用菜单去重
			allList.forEach((item,index) => {
				var t = homeList.findIndex(value => {
					return value.id === item.id;
				});
				if (t === -1) {
					this.allMenus.push(item)
				}
			})
			
		},
	    methods: {
			jia(item,index){
				this.list.push({
					delicon: 'icon-yichu2',
					icon: 'icon-' + item.icon,
					bgColor:item.color,
					label: item.title,
					id:item.id,
					isShow:1
				});
				this.postList.push({
					id:item.id
				});
				this.allMenus.splice(index,1);
			},
			formChild(data){
				console.log('data',data[1])
				this.postList = [];
				this.allMenus.push({
					icon:data[1].icon.substring(5),
					color:data[1].bgColor,
					title: data[1].label,
					id:data[1].id
				});
				data[0].forEach((item,index) => {
					if(item.isShow == 1){
						this.postList.push({
							id:item.id
						});
					}
				})
				this.list.splice(data[1].index,1);
			},
			onDragSortComplete (e) {
				this.postList = [...e].sort(this.compare("SortNumber"));
			},
			compare(property) {
			    return function(a,b) {
			        var value1 = a[property];
			        var value2 = b[property];
			        return value1 - value2
				}
			}
	    },
	}
</script>

<style lang="scss" scoped>
	.container{
		/* #ifdef H5 */
		height: calc(100vh - 88upx);
		overflow: auto;
		/*  #endif */
	}
	.apply-title{
	    padding: 0 30rpx;
	    font-size: 32rpx;
	    color:#333;
		margin-bottom: 30rpx;
	}
	.apply-item{
	    width:25%;
	    padding: 7px;
	    position: relative;
	}
	.apply-link{
	    display: block;
	    width: 100%;
	    text-align: center;
	    .icon-text{
			display: block;
	        font-size: 14px;
	        color: #333;
	        line-height: 26px;
	        margin-bottom: 0;
	    }
	}
	
	.iconfont{
		font-size: 28px;
		color:#3D9CFC;
	}
	/deep/ text.icon-yichu2 {
		font-size: 40rpx;
		color: #BDBDBD;
		font-weight: bolder;
	}
	
	
	text.icon-tianjia {
		font-size: 34rpx;
		color: #0DD474;
		font-weight: bolder;
	}
	/deep/ .drag-sort-item{
		background-color: transparent;
	}
	/deep/ .item{
		display: block;
		font-size: 14px;
		color: #333;
		line-height: 26px;
		margin-bottom: 0;
	}
	/deep/.iconopt{
		display: block;
		width: 30px;
		height: 30px;
		position: absolute;
		top: -6px;
		right: 0;
	}
	.opt{
	    width: 30px;
	    height: 30px;
	    text-align: center;
	    position: absolute;
	    top: 12px;
	    right: -6px;
	}
	/deep/.drag-sort-item{
		width:25%;
		min-width: 56px;
		margin-left:-15px;
	}
	/deep/.drag-sort-item:nth-of-type(4n+2){
		margin-left:-16px;
	}
	/deep/.drag-sort-item:nth-of-type(4n+3){
		margin-left:-17px;
	}
	/deep/.icon-bg {
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
			color:#fff;
		}
	}
</style>
