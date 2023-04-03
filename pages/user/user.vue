<template>
	<view class="container">
		<view class="my-header-wrap">
			<view class="my-header-box">
				<view class="title">个人中心</view>
				<view class="flex flexcenter">
					<view class="my-photo">
						<image src="../../static/img/user-worker.png"></image>
					</view>
					<view class="flex1">
						<view class="my-name text-ellipsis">{{user.nickname || ""}}</view>
						<view class="my-department text-ellipsis">{{user.orgName}}<text class="line"></text>{{user.worker　||　""}}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="my-nav">
			<view class="my-nav-inner radius4">
				<view class="my-item flex flexmid arrow" @click="jump('/pages/user/user-news')">
					<text class="iconfont icon-tixing"></text>
					<text class="my-text flex1">我的消息</text>
				</view>
				<view class="my-item flex flexmid arrow" @click="jump('/pages/user/user-submit')">
					<text class="iconfont icon-woyaotidan"></text>
					<text class="my-text flex1">我的提交</text>
				</view>
				<view class="my-item flex flexmid arrow" @click="jump('/pages/user/user-password')">
					<text class="iconfont icon-xiugaimima"></text>
					<text class="my-text flex1">修改密码</text>
				</view>
				<view class="my-item flex flexmid arrow" style="padding-right: 30px;" @click="update">
					<text class="iconfont icon-banbengengxin"></text>
					<text class="my-text flex1">版本更新</text>
					<text class="my-text fs12" style="color:#666">当前版本  {{version || "1.0"}}</text>
				</view>
			</view>
		</view>
		<view class="logOut-btn">
			<view class="logOut-btn-inner radius4"  @click="doLogout()">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mapGetters} from 'vuex'
	import upgrade from '@/util/upgrade'
	export default {
		data() {
			return {
				info:{},
				user: this.$store.state.user,
				// user:{
				// 	nickname:"刘海涛",
				// 	orgName:"后勤部",
				// 	worker:"维修"
				// },
				version:""
			}
		},
		mounted() {
			// #ifdef APP-PLUS
			plus.runtime.getProperty(plus.runtime.appid,(inf)=>{
				this.version = inf.version
			})
			// #endif
			// console.log(this.user);
		},
		methods: {
			...mapMutations(['logout']),
			doLogout(){
				this.$http.post('/app/logout').then(r => {
					this.logout();
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}).catch(err => {
					uni.showToast({title: err,icon: 'none'})});
			},
			update(){
				upgrade.check("myUpdate");
			}
		}
	}
</script>

<style lang="scss">
	/*我的*/
	.my-header-wrap{
	    width: 100%;
	    min-height: 400rpx;
		background: url(@/static/img/user-bg.png) no-repeat;
	    background-size:100% auto ;
		/* #ifdef H5 */
		padding: 20px 15px 0;
		/* #endif */
		/* #ifndef H5 */
		padding: var(--status-bar-height) 15px 0;
		/* #endif */
	}
	.my-header-box{
	    width: 100%;
	    position:relative;  
		.title{
			margin-bottom: 40rpx;
			font-size: 32rpx;
			line-height: 88rpx;
			color:#fff;
			text-align: center;
		}
	}
	.my-photo{
	    display: block;
	    width: 160rpx;
	    height: 160rpx;
		background:#fff;
		border-radius: 50%;
		overflow: hidden;
	    image{
	        display: block;
	        width: 90%;
	        height: 90%;
			margin:5% auto;
	    }
	}
	.my-name{
	    width: 100%;
	    font-size: 32rpx;
	    color:#fff;
	    padding: 0 25px;
	    margin: 15px auto;
	}
	.my-department{
	    width: 100%;
	    font-size: 28rpx;
	    color:rgba(255, 255, 255, 0.8);
	    padding: 0 25px;
		.line{
			margin:-2rpx 16rpx;
			display: inline-block;
			width: 6rpx;
			height: 26rpx;
			background-color: rgba(255, 255, 255, 0.8);
		}
	}
	.my-nav{
		margin-top: 30rpx;
	    padding: 0 30rpx;
		.my-nav-inner{
			overflow: hidden;
			background-color: #fff;
		}
	}
	.my-item{
	    width: 100%;
		margin:24rpx 0;
		padding-left: 20rpx;
	    .iconfont{
			margin-right: 12rpx;
	        color:#0DD474;
			font-size:36rpx;
	    }
	}
	.my-text{
	    font-size: 28rpx;
	    color:#333;
	    line-height: 26px;
	}
	.logOut-btn{
		padding:30rpx;
		.logOut-btn-inner{
			background-color: #fff;
			font-size: 30rpx;
			color:#FF4C4C;
			line-height: 88rpx;
			height: 88rpx;
			text-align: center;
		}
	}
</style>
