<template>
	<view class="contact">
		<view class="contacts-biglist contacts-checkbox">
			<view class="check-all" v-if="multi && list.orgs.length > 0">
				<label class="org-checkbox" @click="allcheckAction()"><checkbox :checked="allcheck"/><text>全选</text></label>
			</view>
			<checkbox-group @change="checkboxChange"  v-if="multi">
				<view class="contacts-bigitem flex flexmid" v-for="(item,n) in list.orgs" :key="n" v-show="list.orgs.length > 0">
					<label class="org-checkbox">
						<checkbox :value="item.id" :checked="users.has(item.id)"/>
					</label>
					<view class="flex1" @click="ToList(item)">
						<view class="flex flexmid">
							<view class="contacts-biglink flex1">
								<view class="contacts-smallname text-ellipsis">{{item.name}}</view>
								<view class="contacts-smallname text-ellipsis">
									<text>{{item.orgName || ""}}</text>
									<text class="contacts-job" style="margin-left: 20px;">{{item.postName || ""}}</text>
								</view>
							</view>
							<text class="contacts-bigright iconfont icon-jinru" v-if="item.hasChildOrg"></text>
						</view>
					</view>
				</view>
			</checkbox-group>
			<radio-group @change="checkboxChange"  v-else>
				<view class="contacts-bigitem flex flexmid" v-for="(item,n) in list.orgs" :key="n" v-show="list.orgs.length > 0">
					<label class="org-checkbox">
						<radio :value="item.id" :checked="users.has(item.id)" />
					</label>
					<view class="flex1" @click="ToList(item)">
						<view class="flex flexmid">
							<view class="contacts-biglink flex1">
								<view class="contacts-smallname text-ellipsis">{{item.name}}</view>
								<view class="contacts-smallname text-ellipsis">
									<text>{{item.orgName || ""}}</text>
									<text class="contacts-job" style="margin-left: 20px;">{{item.postName || ""}}</text>
								</view>
							</view>
							<text class="contacts-bigright iconfont icon-jinru"></text>
						</view>
					</view>
				</view>
			</radio-group>
		</view>
		<view class="share-wrap">
			<view class="share-box flex flexmid">
				<view class="flex1 share-num" @click="open()">已选择：{{orgs.length || 0}}个<text class="iconfont icon-xiangshang" style="color:#3D9CFC;margin: 10px;"></text></view>
				<button class="share-btn" @click="ToAdd()">确定</button>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup-list-wrap">
				<view class="popup-top flex flexmid">
					<text @click="delAll()">清空</text>
					<view class="flex1">已选择{{orgs.length || 0}}个</view>
					<text @click="close()">确定</text>
				</view>
				<view class="contacts-smalllist ">
					<view class="tc" style="font-size: 14px;margin:30px auto;" v-if="orgs.length < 1">暂无数据！</view>
					<view class="contacts-smalllink flex flexmid" v-else v-for="(item,i) in orgs" :key="i">
						<image class="contacts-smallleft" src="../../static/img/default-photo.png" mode=""></image>
						<view class="contacts-smallmid flex1 text-ellipsis">
							<view class="contacts-smallname text-ellipsis">{{item.name}}</view>
							<view class="contacts-smallname text-ellipsis">
								<text>{{item.orgName || ""}}</text>
								<text class="contacts-job" style="margin-left: 20px;">{{item.postName || ""}}</text>
							</view>
						</view>
						<view style="font-size:14px;color:#FF0000" @click="del(item)">移除</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>	
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		props: {
			t: String,
			m: Boolean
		},
		data() {
			return {
				list:{users:[],orgs:[]},
				pid: 0,
				type: this.t,
				multi: this.m,
				allcheck:false
			}
		},
		components: {uniPopup},
		onLoad(opt) {
			this.pid = opt.pid || 0;
			this.type = opt.type || '';
			this.multi = opt.multi !== 'false';
			uni.setNavigationBarTitle({
				title: opt.pname || '通讯录'
			})
		},
		onBackPress() {
			/* this.$store.commit(`${this.type}/init`); */
		},
		computed:{
			users() {
				return this.$store.state[this.type].datas;
			},
			orgs(){
				return this.$store.getters[`${this.type}/list`];
			},
		},
		mounted(){
			this.init();
		},
		methods: {
			init(){
				this.$http.get(`/app/address?pid=${this.pid}`).then(res => {
					this.list = res;
					
					this.allcheck = true;
					for (let org of res.orgs) {
						if (!this.users.has(org.id)) {
							this.allcheck = false;
							break;
						}
					}
				}).catch(err => {
					uni.showToast({title: err,icon: 'none'})
				});
			},
			ToList(item){
				if(!item.hasChildOrg){
					uni.showToast({title: "暂无下级部门",icon: 'none'})
				}else{
					uni.navigateTo({
						url: `/pages/contacts/org-contacts-list?pid=${item.id}&pname=${item.name}&type=${this.type}&multi=${this.multi}`
					});
				}
			},
			allcheckAction(){
				this.allcheck = !this.allcheck;
				for (let item of this.list.orgs) {
					if(this.allcheck) {
						this.$store.commit(`${this.type}/put`, {data: item, multi: this.multi});
					} else {
						this.$store.commit(`${this.type}/remove`, item);
					}
				}
			},
			checkboxChange: function (e) {
				const values = e.detail.value;
				
				for (let item of this.list.orgs) {
					if(values.includes(item.id)){
						this.$store.commit(`${this.type}/put`, {data: item, multi: this.multi});
					}else{
						this.$store.commit(`${this.type}/remove`, item);
					}
				}
				
				this.allcheck = values.length === this.list.orgs.length;
			},
			open(){
				// 需要在 popup 组件，指定 ref 为 popup
				this.$refs.popup.open();
			},			
			close(){
				this.$refs.popup.close();
			},	
			del(item){
				this.$store.commit(`${this.type}/remove`, item);
			},
			delAll(){
				this.orgs.forEach((item, index) => {
					this.$store.commit(`${this.type}/remove`, item);
				})
			},
			ToAdd(){
				this.$emit("ok");
				uni.$emit(`person-choosed-${this.type}`, this.orgs);
				
				let pages = getCurrentPages();
				let index = 0;
				for (let page of pages) {
				  if (page.route === 'pages/contacts/org-contacts') {
					break;
				  }
				  index++;
				}
				
				uni.navigateBack({delta: pages.length - index});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/common/contacts.scss';

	.contact {
		min-height: calc(100vh - 94px);
		background-color: #FBFBFB;
		padding-bottom: 60px;
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
	.check-all{
		width: 100%;
		background-color: #fff;
		padding: 10px 15px;
		font-size: 15px;
		.org-checkbox{
			display: block;
			width: 100%;
		}
		text{
			margin-left: 15px;
		}
	}
	/* #ifdef APP-PLUS || H5 */
	/deep/ .contacts-checkbox .contacts-smalllink uni-checkbox .uni-checkbox-input, /deep/ .check-all .uni-checkbox-input, /deep/ .uni-checkbox-input{
		border-radius: 50% !important;
		margin-left: 10px;
	} 
	/* #endif */
	.share-wrap{
		width: 100%;
		height: 50px;
		background-color: #fff;
		box-shadow: 0 -2px 3px #efefef;
		padding: 10px 15px;
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
	.contacts-bigitem{
		height: 54px;
		padding: 0 15px;
		border-bottom: 1px solid #EEEEEE;
		.contacts-biglink{
			height:39px;
			line-height: 24px;
			padding: 10px 15px;
			border-bottom: 1px solid transparent !important;
		}
	}
	.popup-list-wrap{
		width: 100vw;
		height: calc(100vh - 44px);
		background-color: #fff;
		overflow: hidden;
		.contacts-smalllist{
			height: calc(100vh - 94px);
			overflow-y: auto;
			margin-top: 0;
		}
	}
	/deep/ .uni-popup{
		z-index: 9999;
	}
	.popup-top{
		width: 100%;
		height: 50px;
		background-color: #fff;
		padding:0 15px;
		view{
			background-color: #fff;
			font-size: 15px;
			color:#333;
			line-height: 20px;
			padding: 15px 0 15px 50px;
			text-align: center;
		}
		text{
			width:50px;
			border-radius: 4px;
			background-color: #3D9CFC;
			font-size: 14px;
			color:#fff;
			line-height: 20px;
			text-align: center;
			padding:5px 0;
		}
	}
	.contacts-biglink .contacts-smallname{
		font-size: 14px;
	}
	.contacts-bigright{
		width: 16px;
		margin-left: 0;
	}
</style>
