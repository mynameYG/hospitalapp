<script>
	// import '@/static/font/iconfont.css';
	import Vue from 'vue';
	import upgrade from '@/util/upgrade';
	import { mapMutations } from 'vuex'
	
	export default {
		globalData: {
			user: {}
		},
		onLaunch: function() {
			console.log('App Launch');
			this.loadUserFromStorage();
			console.log('this.loadUserFromStorage',this.loadUserFromStorage())
			// #ifdef H5
			upgrade.check();
			// #endif
			if(process.env.NODE_ENV !== 'development'){
				upgrade.check();
			}
			// 处理推送消息
			//this.handlePush();
			
			// #ifdef APP-PLUS
			// 锁定屏幕方向
			//plus.screen.lockOrientation('landscape-primary') //竖屏正方向
			plus.screen.lockOrientation('portrait-primary') //竖屏正方向
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		computed: {
			getLoginUsers() {
				//通过store.getter获取是否登录数据
				// console.log('=======',this.$store.state.hasLogin)
				return this.$store.state.hasLogin
			}
		},
		watch: {
			getLoginUsers(newVal) {
				// console.log('newVal',newVal)
				if (newVal) {
					//获取应用列表
					this.$store.dispatch("storageAppList");
				}
			}
		},
		methods:{
			...mapMutations(['loadUserFromStorage'])
		}
	}
</script>

<style lang="scss">
	@import './static/font/iconfont.css';
	/*每个页面公共css */
	@import '@/common/common.scss';
	@import "uview-ui/index.scss";
	.container {
		width: 750upx;
		height: 100vh;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		font-size: 28rpx;
		font-family: 'STHeiti', 'Microsoft YaHei', 'Helvetica', 'Arial', sans-serif;
		overflow: hidden;
		background-color: #F7F7F7;
	}
	
	.field-box{
		position: relative;
		font-size:24rpx;
		.field-top{
			padding-bottom:20rpx;
			border-bottom:1px solid #eee;
			font-size:30rpx;
		}
		.field-item{
			padding:0
		}
		.type{
			min-width: 100rpx;
			text-align: center;
			position: absolute;
			top:92rpx;
			right: 30rpx;
			padding:6rpx 12rpx;
			border-radius: 6rpx;
			&.infect{
				background-color: #FCEABD;
				color:#FF941F;
				border:1px solid #FFC878;
			}
			&.pathology{
				background-color: #B2FFEA;
				color:#69B692;
				border:1px solid #37C8A8;
			}
			&.medicine{
				background-color: #FED0F1;
				color:#C30FE7;
				border:1px solid #C30FE7;
			}
			&.chemistry{
				background-color: #F7D5D3;
				color:#F83D03;
				border:1px solid #F83D03;
			}
			&.damage{
				background-color: #FCDCFF;
				color:#976595;
				border:1px solid #976595;
			}
			&.other{
				background-color: #D7F0FE;
				color:#58B9C5;
				border:1px solid #58B9C5;
			}
		}
		.total{
			position: absolute;
			bottom:30rpx;
			right: 30rpx;
		}
		.iconfont{
			font-size: 40rpx;
			margin-right:10rpx;
		}
		.time{
			font-size: 24rpx;
			color:#777777
		}
	}
	
	.u-form {
		/deep/.u-form-item__body__left__content__label {
			font-size: 28rpx !important;
			color: #999
		}
	
		/deep/.u-input__content__field-wrapper__field,
		/deep/.u-textarea__field {
			font-size: 28rpx !important;
		}
	}
	/deep/.u-action-sheet__item-wrap{
		max-height: 65vh;
		overflow: auto;
	}
</style>
