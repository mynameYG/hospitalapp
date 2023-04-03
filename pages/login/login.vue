<template>
	<view class="whiteBg container position-relative">
		<view class="login-bg-up"></view>
		<view class="login-bg-down"></view>
		<view class="login-inner">
			<view class="login-top">
				<image src="../../static/img/logo.png" @click="getSqlCheck"></image>
				<view class="login-top-text">
					<view class="login-top-name">{{projectName}}</view>
				</view>
			</view>
			<view class="login-mid">
				<view class="login-box flex flexmid">
					<text class="iconfont icon-zhanghao"></text>
					<input type="text" v-model="user.username" placeholder="请输入账号" class="flex1" placeholder-class="login-place">
				</view>
				<view class="login-box flex flexmid" style="margin-bottom: 20px;">
					<text class="iconfont icon-xiugaimima"></text>
					<input type="password" v-model="user.password" placeholder="请输入密码" class="flex1" placeholder-class="login-place">
				</view>
				<view class="login-tip">
					<view class="login-remeber">
						<label>
							<checkbox :checked='rememberPsw' @tap="rememberPsw =! rememberPsw" color="#0077AA" style="transform:scale(0.7)" />记住密码
						</label>
					</view>
				</view>
				<view class="submit-wrap no-all-p">
					<view class="tj"  @click="loginSubmit">登录</view>
				</view>
			</view>
		</view>
	</view>

</template>
<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var first = null;
	var count = 0,startTime,lastTime;
	export default {
		data() {
			return {
				projectName: this.$config.projectName,
				user: {
					username: '',
					password: '',
					smsCode:"",
					vcode:"",
				},
				rememberPsw: true,
			}
		},
		mounted() {
			let that = this;
			//页面加载完成，获取本地存储的用户名及密码
			const userName = uni.getStorageSync('userName');
			const userPsw = uni.getStorageSync('userPsw');
			if (userName && userPsw) {
				that.user.username = userName;
				that.user.password = userPsw;
			} else {
				that.user.username = "";
				that.user.password = "";
			}
		},
		methods: {

			...mapMutations(['login', 'setResources']),
			loginSubmit() {
				
				// uni.switchTab({
				// 	url: '/pages/home/home'
				// }); 
				
				//debugger
				if (!this.user.username) {
					uni.showToast({
						icon: 'none',
						title: '请输入账号信息'
					});
					return;
				}
				if (!this.user.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码'
					});
					return;
				}
				const that = this;
				this.$http.post('/app/login', this.user).then(user => {
					console.log(user);
					
					this.login({
						user
					});
					
					// // #ifdef APP-PLUS
					// var info = plus.push.getClientInfo();
					// var vinfo = info.clientid;
					// uni.setStorageSync('vinfo', vinfo);
					// this.getPushInfo(vinfo);
					// /* plus.nativeUI.toast("info.clientid" + plus.push.getClientInfo().clientid); */
					// // #endif
					//登录成功将用户名密码存储到用户本地
					if (that.rememberPsw) { //用户勾选“记住密码”
						uni.setStorageSync('userName', that.user.username);
						uni.setStorageSync('userPsw', that.user.password);
					} else { //用户没有勾选“记住密码”
						uni.removeStorageSync('userName');
						uni.removeStorageSync('userPsw');
						that.user.username = "";
						that.user.password = "";
					}
					uni.showToast({
						icon: 'none',
						title: '登录成功'
					});
					this.$http.get('/app/resources').then(resources => {
						console.log('resources',resources)
						this.setResources({
							resources
						});
						uni.hideToast();
						let pages = getCurrentPages();
						if (pages.length > 1) {
							uni.reLaunch({
								url: '/' + pages[pages.length - 2].route
							});
						} else {
							uni.switchTab({
								url: '/pages/home/home'
							});
						}
					})
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none',
					})
				});
			},
			getSqlCheck() {
				if (count === 0) {
					startTime = new Date();
					lastTime = startTime;
				} else if (count >= 1) {
					let nextTime = new Date();
					if (nextTime - startTime >= 2000) {
						// 超过2秒重置
						startTime = nextTime;
						lastTime = nextTime;
						count = 0;
					} else {
						lastTime = nextTime;
					}
					if (count === 3) {
						// 大于三次重置
						// this.sqlCheck(true);
						startTime = nextTime;
						lastTime = nextTime;
						count = 0;
						let url = this.$config.url('/');
						console.log("连点三次")
						uni.showToast({
							icon:'none',
							title:'当前服务：' + url
						})
					} 
				}
				count++;
				console.log('count',count)
			}
		}
	}
</script>

<style lang="scss">
	.login-bg-up{
		height: 492rpx;
		background: url(@/static/img/login-topBg.png) no-repeat center;
		background-size: 100% 100%;
	}
	.login-bg-down{
		position: absolute;
		bottom:0;
		left:0;
		width:100%;
		height: 200rpx;
		background: url(@/static/img/login-bottomBg.png) no-repeat center;
		background-size: 100% 100%;
	}
	.login-inner {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		width: 84%;
		min-height: 744rpx;
		margin: 0 auto;
		transform: translateY(-40%);
		background-color: #fff;
		border-radius: 20rpx;
		box-shadow: 0 0 42rpx rgba(13,212,116,.2);
	}

	.login-top {
		padding-top: 40rpx;
		margin-bottom:60rpx;
		image {
			display: block;
			margin:0 auto 20rpx;
			width: 80rpx;
			height: 80rpx;
			vertical-align: middle;
		}

		.login-top-text {
			display: block;
			vertical-align: middle;
			text-align: center;

			.login-top-name {
				font-size: 40rpx;
				color: #0DD474;
				font-weight: 700;
			}
		}
	}

	.login-mid {
		padding: 0 40rpx;
	}

	.login-box {
		margin-bottom: 60rpx;
		border: 2rpx solid #e6e6e6;
		padding: 15rpx 10rpx;
		border-radius: 10rpx;

		.iconfont {
			font-size: 36rpx;
			color: #D2D2D2;
		}

		.login-place {
			color: #999;
			font-size: 26rpx;
		}

		input {
			height: 20px !important;
			padding: 0 5px !important;
			margin: 0;
			font-size: 26rpx;
			color: #333;
			line-height: 20px;
			border: none !important;
		}
	}

	.login-tip {
		margin-bottom: 30px;

		.login-remeber {
			font-size: 14px;
			color: #949494;
			line-height: 20px;

			input {
				margin-right: 6px;
			}

		}
	}

	.login-bottom {
		width: 200px;
		margin: 38% auto 0;
	}

	.login-boootm-text {
		position: relative;

		.login-boootm-line {
			width: 100%;
			height: 1px;
			background-color: #e6e6e6;
		}

		text {
			background-color: #fff;
			padding: 5px 10px;
			font-size: 14px;
			color: #666;
			line-height: 20px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

		}
	}

	.login-boootm-link {
		margin-top: 15px;

		image {
			display: inline-block;
			width: 45px;
			height: 45px;
		}
	}

	/* #ifdef H5 */
	uni-checkbox .uni-checkbox-input {
		border-radius: 50% !important;
		color: #ffffff !important;
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		color: #fff;
		background: #3D9CFC;
	}

	.uni-checkbox-input.uni-checkbox-input-checked {
		border: none !important;
	}

	/* #endif */
	/* 微信中样式 */
	/* #ifdef APP-PLUS ||MP-WEIXIN */
	checkbox .wx-checkbox-input {
		border-radius: 50% !important;
		color: #ffffff !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		color: #fff;
		background: #3D9CFC;
	}

	.wx-checkbox-input.wx-checkbox-input-checked {
		border: none !important;
	}

	/* #endif */
	.login-code{
		border-bottom:0;
		.code-input{
			border-bottom: 1px solid #e6e6e6;
		}
		.icon-yanzhengma{
			font-size: 20px;
		}
		.code-btn{
			padding:0;
			margin-left: 5px;
			width:100px;
			height: 40px;
			line-height: 40px;
			font-size:14px;
			background-color: #FFF;
			border:1px solid #e6e6e6;
			.code-img{
				width:100%;
				height: 100%;
			}
		}
		.code-btn-disable{
			background-color:#e6e6e6 ;
		}
	}
	
</style>
