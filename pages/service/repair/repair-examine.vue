<template>
	<view class="container p15">
		<view class="mb15">
			<detailInfo :infoId="id" @getHistory="getHistory"></detailInfo>
		</view>
		<view class="whiteBg p15 radius4 mb15">
			<view class="field-item flex flexmid mb10">
				<text class="field-title require" style="width: 70px;">是否通过</text>
				<u-radio-group v-model="transfer">
					<u-radio activeColor="#0DD474" size="12" :customStyle="{marginRight: '16px'}" v-for="(item, index) in TransferResult" :key="index"
						:label="item.name" :name="item.value">
					</u-radio>
				</u-radio-group>
			</view>
			<view class="opinion-title require">审核意见</view>
			<view class="whiteBg-opacity mt15 radius4 textarea-full">
				<u--textarea placeholder="请输入" maxlength="200"
				v-model="comment" confirmType="done" count>
				</u--textarea>
			</view>
		</view>
		<view class="opinion-wrap whiteBg radius5 pb15">
			
		</view>
		<ikdo-process-approval :taskId="taskId" :isAudit="isAudit" :history="history" @submitData="submitData" />
		<ikdo-process-submit ref="submit"
			:url="`/app/repair/examine`"
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
				comment:"",//办理内容
				instanceId: "",
				transfer:true,
				TransferIndex:0,
				TransferResult: [
					{
						name: '是',
						value:true,
						disabled: true
					},
					{
						name: '否',
						value:false,
						disabled: false
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
			getHistory(data){
				this.history = data;
			},
			submitData(wfParam) {
				let params = {
					orderId:this.id,
					wfParam
				};
				if(!this.comment){
					uni.showToast({
						title: "请输入审核意见",
						icon: 'none'
					});
					return;
				}
				params.approvalDirector = this.transfer? '1' : '0';
				params.proposedOpinion = this.comment;
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
