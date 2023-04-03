<template>
	<view>
		<view class="opinion-wrap mt15 whiteBg radius5" v-if="isAudit">
			<view class="p15">
				<view class="opinion-title">审批意见</view>
				<view class="whiteBg-opacity mt15 radius4 textarea-full">
					<!-- <ikdo-textarea :maxlength="255" :autoHeight="true" :focus="focus" placeholder="请输入(字数在255以内)" class="opinion-textarea" v-model="auditComment"></ikdo-textarea> -->
					<u--textarea placeholder="请输入" maxlength="200"
					v-model="auditComment" confirmType="done" count>
					</u--textarea>
				</view>
			</view>
		</view>
		<processList :history="history" v-if="!isResubmit && !history"></processList>
		<view>
			<view class="submit-wrap flex fixed-btn" v-if="isAudit">
				<button class="tj grayBg flex1" @click="submit(false)">拒绝</button>
				<button class="tj blue-bg flex1" v-if="signFile" @click="submit(true)">同意去签字</button>
				<button class="tj blue-bg flex1" v-else @click="submit(true)">同意</button>
			</view>
			<view class="submit-wrap fixed-btn" v-else>
				<button class="tj blue-bg flex1" v-if="isResubmit" @click="submit(true)">提交</button>
				<button class="tj blue-bg flex1" v-else @click="submit(true)">去办理</button>
			</view>
		</view>
	</view>
</template>

<script>
	import processList from "@/pages/service/vehicle/components/processList.vue"
	
	const sign = uni.requireNativePlugin('SignKinggrid');
	
	export default {
		components: {
			processList
		},
		props: {
			taskId: '',
			isAudit: false,
			history: {},
			signFile: {
				type: Object
			},
			isResubmit: false
		},
		data() {
			return {
				auditComment: '',
				focus:false
			}
		},
		mounted() {
			if (this.isResubmit) {
				uni.setNavigationBarTitle({
					title: "重新提交申请"
				})
			}
		},
		methods: {
			clickPdf(wfParam) {
				var _self  = this;
				
				let userinfo = uni.getStorageSync("userinfo")
				
				if(sign && sign.openPdf){
					try{
						sign.openPdf({
							filename: _self.signFile.name, 
							url: _self.fileUrl(_self.signFile.path),
							username: userinfo.user.nickname, 
							sessionId: userinfo.user.sessionId,
							sign: true,
							fbootUrl: _self.$config.signPath
						}, result => {
							if(result.success){
								plus.io.resolveLocalFileSystemURL( result.msg, function( entry ) {
									_self.$http.uploadFile({
										filePath: entry.toLocalURL()
									}).then(data => {
										_self.$emit("submitData", wfParam, data.path);
									}).catch(err =>{
										uni.showToast({title: err,icon: 'none'})
									})
								})
							}else{
								if(result.msg){
									uni.showToast({title: result.msg,icon: 'none'})
								}
							}
						});
					}catch(e){
						plus.nativeUI.toast("err: " + e);
					}
				}
			},
			submit(auditResult){
				let wfParam = {
					taskId: this.taskId,
					audit: {
						agree: auditResult,
						comment: this.auditComment
					}
				};
				if(!auditResult){
					if(!wfParam.audit.comment){
						this.focus = true;
						uni.showToast({title: "请输入审批意见",icon: 'none'});
						return;
					}
				}
				if(auditResult && this.signFile) {
					this.clickPdf(wfParam);
				} else {
					this.$emit("submitData", wfParam);
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.textarea-full {
		/deep/.u-form-item__body {
			flex-direction: column !important;
		}
	
		/deep/.u-form-item__body__left {
			margin-bottom: 30rpx !important;
		}
	
		/deep/.u-textarea {
			background-color: #F5F5F5;
			border: 0 !important;
		}
		/deep/.u-textarea__field{
			font-size: 28rpx;
		}
		/deep/.u-textarea__count {
			background-color: transparent !important;
		}
	}
	.fixed-btn{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 9;
	}
</style>
