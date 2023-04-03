<template>
	<view class="container p15">
		<view class="whiteBg mb15">
			<detailInfo :infoId="id" @getHistory="getHistory" @getTransfer="getTransfer"></detailInfo>
		</view>
		<view v-if="showTransfer" class="whiteBg p15 radius4 mb15">
			<view class="field-item flex flexmid">
				<text class="field-title require" style="width: 70px;">是否转办</text>
				<u-radio-group v-model="transfer" @change="changeTransfer">
					<u-radio activeColor="#0DD474" size="12" :customStyle="{marginRight: '16px'}" v-for="(item, index) in TransferResult" :key="index"
						:label="item.name" :name="item.value">
					</u-radio>
				</u-radio-group>
			</view>
		</view>
		<template v-if="!transfer">
			<view class="opinion-wrap whiteBg radius5 pb15">
				<view class="p15">
					<view class="opinion-title require">办理内容</view>
					<view class="whiteBg-opacity mt15 radius4 textarea-full">
						<u--textarea placeholder="请输入" maxlength="200"
						v-model="repairContent" confirmType="done" count>
						</u--textarea>
					</view>
				</view>
				<view class="pl15 pr15">
					<view class="flex flexmid">
						<text class="field-title require">附件</text>
						<view class="flex1 tr" @click="openFileManager(files)">
							<view class="file-border">
								<text class="iconfont icon-zengjia"></text>
							</view>
						</view>
					</view>
					<tki-file-manager ref="filemanager" @result="resultPath($event,files)"></tki-file-manager>
					<attachmentUpload :file="files" @getFile="getFile"></attachmentUpload>
				</view>
			</view>
		</template>
		<template v-else>
			<view class="opinion-wrap whiteBg radius5">
				<view class="p15">
					<view class="opinion-title require">转办原因</view>
					<view class="whiteBg-opacity mt15 radius4 textarea-full">
						<u--textarea placeholder="请输入" maxlength="200"
						v-model="transferReason" confirmType="done" count>
						</u--textarea>
					</view>
				</view>
			</view>
		</template>
		<ikdo-process-approval :taskId="taskId" :isAudit="isAudit" :history="history" @submitData="submitData" />
		<ikdo-process-submit ref="submit"
			:url="`/app/repair/handle/${id}`"
			@success="submitCallback" />
	</view>

</template>

<script>
	import IkdoProcessApproval from '@/components/ikdo/ikdo-process-approval.vue';
	import IkdoProcessSubmit from '@/components/ikdo/ikdo-process-submit.vue';
	import detailInfo from "@/pages/service/repair/components/detailInfo.vue"
	export default {
		components: {
			detailInfo,
			'ikdo-process-approval': IkdoProcessApproval,
			"ikdo-process-submit": IkdoProcessSubmit
		},
		data() {
			return {
				id: "",
				taskId: "",
				isAudit: false,
				info: {},
				files:[],
				previewImgList: [], //附件预览
				CurProcess:"",
				history: {},
				repairContent:"",//办理内容
				transferReason:"",
				instanceId: "",
				showTransfer:true,
				transfer:false,
				TransferIndex:0,
				TransferResult: [
					{
						name: '否',
						value:false,
						disabled: false
					},
					{
						name: '是',
						value:true,
						disabled: true
					}
				],
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.taskId = option.taskId;
			this.isAudit = option.isAudit === 'true';
		},
		methods: {
			changeTransfer(e){
				console.log('applyInfo.transfer',this.transfer)
				// this.TransferIndex = index;
			},
			getHistory(data){
				this.history = data;
			},
			getTransfer(data){
				// 获取是否转办过
				// console.log('------======',data)
				this.showTransfer = !data;
				this.transfer = !data;
				if(!this.transfer){
					this.isAudit = false;
				}
			},
			getFile(data){//接收修改后的组件数据
				this.files = data;
				// console.log('this.files',this.files)
			},
			submitData(wfParam) {
				let params = {
					id:this.id,
					files:{
						files:[]
					},
					wfParam
				};
				if(this.showTransfer){
					params.transfer = this.transfer;
				}
				if(!this.transfer){
					if(!this.repairContent){
						uni.showToast({
							title: "请输入办理内容",
							icon: 'none'
						});
						return;
					}
					if(this.files.length < 1){
						uni.showToast({
							title: "请上传办理照片",
							icon: 'none'
						});
						return;
					}else{
						let postFile = [];
						for (var i = 0; i < this.files.length; i++) {
							postFile.push({
								id:this.files[i].id,
								fileName:this.files[i].fileName,
								filePath:this.files[i].filePath,
								fileType:this.matchType(this.files[i].fileName) 
							})
						};		
						// console.log('postFile',postFile)
						params.files.files = postFile;
					}
					params.repairContent = this.repairContent;
				}else{
					if(!this.transferReason){
						uni.showToast({
							title: "请输入转办原因",
							icon: 'none'
						});
						return;
					}
					params.transferMan = this.$store.state.user.id;
					params.transferReason = this.transferReason;
				}
				
				console.log('params',params)
				// return false
				this.$refs.submit.submit(params);
			},
			
			submitCallback() {
				this.pageBack('loadNewsList','refresh');
			},
			preview(currentUrl, imgList) {
				let previewImgList = [];				
				imgList.forEach((item) => {
					previewImgList.push(this.fileUrl(item.url));
				});				
				uni.previewImage({
					urls: previewImgList,
					current:this.fileUrl(currentUrl)
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		height: auto;
		padding-bottom: 140upx!important;
	}
	.file-border {
		display: inline-block;
		width: 30px;
		height: 30px;
		border: 1px solid #eeeeee;
		text-align: center;
		.icon-zengjia {
			font-size: 14px;
			color: #bfbfbf;
			line-height: 30px;
		}
	}
</style>
