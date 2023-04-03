<template>
	<view class="contact">
		<view class="contacts-smalllink flex flexmid">
			<view class="contacts-smallmid flex1 text-ellipsis">
				<p class="contacts-smallname text-ellipsis">{{info.name}}</p>
				<!-- <p class="contacts-smallxi text-ellipsis">院系主任</p> -->
			</view>
			<image class="contacts-smallleft" src="../../static/img/default-photo.png" mode=""></image>
		</view>

		<view class="contact-item">
			<view class="dt-p">
				<text class="p-label">手机</text>
				<text class="p-txt">{{info.phoneNumber || ""}}</text>
				<text class="iconfont icon-shoujiyanzheng fr" v-if="info.phoneNumber"  @click="phone(info.phoneNumber)"></text>
			</view>
			<!-- <view class="dt-p">
				<text class="p-label">固定电话</text>
				<text class="p-txt">{{info.officeTel}}</text>
				<text class="iconfont icon-shoujiyanzheng fr"></text>
			</view> -->
			<view class="dt-p" v-if="info.email">
				<text class="p-label">邮箱</text>
				<text class="p-txt">{{info.email || ""}}</text>
			</view>
		</view>
		<view class="contact-item">
			<!-- <view class="dt-p">
				<text class="p-label">地址</text>
				<text class="p-txt">{{info.homeAddr}}</text>
			</view> -->
			<view class="dt-p" v-for="(item,index) in userOrg" :key="index">
				<text class="p-label">部门</text>
				<text class="p-txt">{{item.name}}</text>
			</view>
		</view>

		<!-- 发消息 -->
		<!-- <view class="button-sp-area" v-if="id != myId"> -->
		<view class="button-sp-area" v-if="id != myId">
			<button class="tj blue-bg" @click="goToChat">发消息</button>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
		    this.id = options.id;
			this.myId = this.$store.state.user.id;
		},
		data() {
			return {
				id:"",
				myId:"",
				info:{},
				userOrg:[]
			}
		},
		mounted(){
			this.init();
		},
		methods: {
			init(){
				this.$http.get('/app/address/user?id=' + this.id).then(res => {
					this.info = res.user;
					this.userOrg = res.orgs;
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			},
			phone(phonenum){
				uni.makePhoneCall({
				    phoneNumber: phonenum,
					success:(res=>{
						console.log(res)
					}),
					fail:(err=>{
						console.log(err)
					})
				}); 
			},
			// 跳转到聊天室且传入当前对话人ID
			goToChat(){
				uni.navigateTo({
				 // ? 后面加要传的参数， 多个参数用 & 隔开 
				 url: '/pages/chat/chat-index?id=' + this.id + '&name=' + this.info.name
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/contacts.scss';
	
	.tj {
		width: 100%;
		height: 40px;
		background-color: #3D9CFC;
		border-radius: 5px;
		font-size: 14px;
		color: #fff;
		line-height: 40px;
		padding: 0 !important;
		border: none;
	}
	.contacts-smalllink{
		padding: 9px 15px;
	}
	.contact {
		min-height: calc(100vh - 45px);
		background-color: #FBFBFB
	}

	/* #ifdef MP-WEIXIN */
	.contact {
		min-height: 100vh;
	}

	/* #endif */
	/* #ifdef APP-PLUS */
	.contact {
		min-height: 100vh;
	}

	/* #endif */
	.search-box-inner {
		padding-left: 10px;
		background-color: #F2F2F2;

		.icon-sousuo {
			color: #333;
			font-size: 20px;
		}

		.search-input {
			color: #333
		}
	}
	.contact-item{
		margin-top: 15px;
		background-color: #fff;
		font-size:14px;
		.dt-p{
			padding:15px 15px;
			border-bottom: 1px solid #FBFBFB;
		}
	}
	.dt-p {
		.p-label {
			display: inline-block;
			color: #333;
			width:60px;
		}
		.p-txt {
			margin-left: 5px;
			color:#666;
		}
		.icon-shoujiyanzheng{
			margin-top: -4px;
			font-size:24px;
			color: #2FB1F5;
		}
	}
	.button-sp-area{
		padding:30px 15px;
	}
</style>
