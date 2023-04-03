<template>
	<view class="yh-bg">
		<view class="contact">
			<view class="p15">
				<uni-search-bar placeholder="搜索" bgColor="#fff" @input="input"></uni-search-bar>
			</view>
			<view class="contacts-default" v-if="!searchShow">
				<view class="contacts-biglist whiteBg-opacity">
					<view class="contacts-bigitem" v-for="(item,n) in list.orgs" :key="n" v-show="list.orgs.length > 0">
						<view class="contacts-biglink flex flexmid" @click="ToList(item.id,item.name,n,'type1')">
							<view class="contacts-bigmid flex1 text-ellipsis">{{item.name}}（{{item.userCount}}）</view>
							<text class="contacts-bigright iconfont icon-jinru"></text>
						</view>
					</view>
				</view>
				<view class="contacts-smalllist">
					<view class="contacts-smalllink flex flexmid" v-for="(item,i) in list.users" :key="i" v-show="list.users.length > 0"  @click="ToDetail(item.id)">
						<image class="contacts-smallleft" src="../../static/img/default-photo.png" mode=""></image>
						<view class="contacts-smallmid flex1 text-ellipsis">
							<view class="contacts-smallname text-ellipsis">
								{{item.name}} 
								<text class="contacts-job" style="margin-left: 20px;" v-if="item.postName">{{item.postName}}</text>
								</view>
							<view class="contacts-smallxi text-ellipsis">{{item.phoneNumber}}</view>
						</view>
						<view class="phone"><text class="iconfont icon-shoujiyanzheng" v-if="item.phoneNumber"  @click.stop="phone(item.phoneNumber)"></text></view>
					</view>
				</view>
			</view>
			<view class="contacts-sousuo" v-if="searchShow">
				<view class="contacts-smalllist">
					<view class="contacts-smalllink flex flexmid" v-for="(item,i) in searchList" :key="i" v-show="searchList.length > 0"  @click="ToDetail(item.id)">
						<image class="contacts-smallleft" src="../../static/img/default-photo.png" mode=""></image>
						<view class="contacts-smallmid flex1 text-ellipsis">
							<view class="contacts-smallname text-ellipsis">{{item.name}}</view>
							<view class="contacts-smallname text-ellipsis">
								<text  v-if="item.orgName">{{item.orgName || ""}} </text>
								<text class="contacts-job" style="margin-left: 20px;" v-if="item.postName">{{item.postName}}</text></view>
							<view class="contacts-smallxi text-ellipsis">{{item.phoneNumber}}</view>
						</view>
						<view class="phone"><text class="iconfont icon-shoujiyanzheng" v-if="item.phoneNumber"  @click.stop="phone(item.phoneNumber)"></text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:{emps:[],orgs:[]},
				searchShow:false,
				keyword:"",
				searchList:[],
				pid: 0
			}
		},
		watch:{
			keyword(newVal, oldVal){
				if(newVal && newVal != ""){
					this.searchShow = true;
				}else{
					this.searchShow = false;
				}
				this.delay(() => {
				  this.search();
				}, 300);
			}
		},
		mounted(){
			this.init();
		},
		onNavigationBarButtonTap(e) {
			if (e.index === 0) {
				uni.reLaunch({
					url: '/pages/contacts/contacts'
				})
			}
		},
		onLoad(opt) {
			this.pid = opt.pid || 0;
			uni.setNavigationBarTitle({
				title: opt.pname || '通讯录'
			})
		},
		methods: {
			init(){
				this.$http.get(`/app/address?pid=${this.pid}`).then(res => {
					this.list = res;
				}).catch(err => {
					uni.showToast({title: err,icon: 'none'})
				});
			},
			input(res){
				this.keyword = res.value
			},
			search(){
				this.$http.get('/app/address/search',{keyword:this.keyword}).then(res => {
					this.searchList = res;
				}).catch(err => {
					uni.showToast({title: err,icon: 'none'})
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
			ToList(id,name,index,type){
				uni.navigateTo({
					url: `/pages/contacts/contacts-list?pid=${id}&pname=${name}`
				});
			},
			ToDetail(id){
				uni.navigateTo({
					url: '/pages/contacts/contacts-detail?id=' + id
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/contacts.scss';

	.contact {
		min-height: calc(100vh - 94px);
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
			color: #999;
			font-size: 20px;
		}
	
		.search-input {
			color: #333
		}
	}
	/* #ifdef APP-PLUS || H5 */
	/deep/ .contacts-checkbox .contacts-smalllink uni-checkbox .uni-checkbox-input{
		border-radius: 50% !important;
		margin: 0 20px 0 10px;
	} 
	/* #endif */
	.share-wrap{
		width: 100%;
		height: 40px;
		background-color: #fff;
		padding: 5px 15px;
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9;
	}
	.share-box .share-num{
		font-size: 14px;
		color:#333;
		line-height: 30px;
	}
	/deep/ .share-box .share-btn{
		background-color: #3D9CFC;
		line-height: 30px;
		font-size: 14px;
		color:#fff;
		line-height: 30px;
	}
	.icon-shoujiyanzheng{
		margin-right: 10px;
		font-size:24px;
		color: #2FB1F5;
		margin-top: 8px;
	}
	.phone{
		display: inline-block;
		width: 40px;
		height: 40px;
		text-align: center;
	}
</style>
