<template>
	<view class="process-tips-con">
		<jyf-parser v-if="tips.notice" class="art-con" :html="tips.notice" :domain="fileUrl()"></jyf-parser>
		<view class="tipsImg-box">
			<image :src="tips.base64Image" mode="" @click="bigImg()"></image>
		</view>
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '@/components/image-tools/index.js'
	export default {
		data() {
			return {
				processId:"",
				tips:{}
			}
		},
		onLoad(opt) {
			if(opt.processId){
				this.processId = opt.processId;
			}
		},
		mounted() {
			this.init();
		},
		methods: {
			init(){
				this.$http.get(`/app/fboot/flowable/proc/${this.processId}/notice`).then(res => {
					this.tips = res;
				}).catch(err => {
					uni.showToast({title: err,icon: 'none'})
				});
			},
			bigImg(){
				var previewImgList = [];
				base64ToPath(this.tips.base64Image).then(path => {
				    // console.log(path)
					this.currentUrl = path;
					previewImgList.push(path);
					this.preview(this.currentUrl, previewImgList);
				  }).catch(error => {
				    console.error(error)
				  })
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.process-tips-con{
		width: 100%;
		height:calc(100vh - 80px);
		padding: 15px;
		overflow-y: auto;
		font-size: 14px;
		color:#333;
		line-height: 24px;
		.tipsImg-box{
			width: 100%;
			image{
				min-width: 100%;
				/* height: 100px; */
				margin-top: 30px;
			}
			/deep/ uni-image>img{
				min-width: 100%;
			}
			/deep/ uni-image>div{
				background-size: contain !important;
			}
		}
	}
	
</style>
