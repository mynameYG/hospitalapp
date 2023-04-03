<template>
	<view class="container p15">
		<view class="whiteBg mb15">
			<detailInfo :infoId="id" @getHistory="getHistory"></detailInfo>
		</view>
		<view class="opinion-wrap whiteBg radius5">
			<view class="p15">
				<view class="opinion-title">拟办意见</view>
				<view class="whiteBg-opacity mt15 radius4 textarea-full">
					<u--textarea placeholder="请输入" maxlength="200"
					v-model="proposedOpinion" confirmType="done" count>
					</u--textarea>
				</view>
			</view>
		</view>
		<ikdo-process-approval :taskId="taskId" :isAudit="false" :history="history" @submitData="submitData" />
		<ikdo-process-submit ref="submit"
			:url="`/app/repair/niban`"
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
				proposedOpinion:"",//拟办意见
				instanceId: "",
				formKey: ""
			}
		},
		onLoad(option) {
			this.id = option.id;
			this.taskId = option.taskId;
		},
		methods: {
			getHistory(data){
				this.history = data;
			},
			submitData(wfParam) {
				let params = {
					id:this.id,
					wfParam
				};
				if(!this.proposedOpinion){
					uni.showToast({
						title: "请输入拟办意见",
						icon: 'none'
					});
					return;
				}
				params.proposedOpinion = this.proposedOpinion;
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
		overflow: auto;
	}
</style>
