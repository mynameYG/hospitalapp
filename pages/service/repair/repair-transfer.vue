<template>
	<view class="bg">
		<view class="list_repair">
			<view class="mb msg">该工单将直接转到总调度台</view>
			<view class="default">备注说明</view>
			<u-textarea  placeholder="请输入内容" height="120"  count></u-textarea>
			<view class="camera" @click="chooseImage()">
				<text class="icon-paizhao iconfont cameraclolr"></text>
				<text class="paizhao">照片\拍照</text>
			</view>
			<view class="model-item atts-item" v-for="(image,index) in fileList" :key="image.id">
				<view class="flex flexbet">
					<view class="atts-image">
						<image class="is-image" :src="image" :data-src="fileRUrl(image.filePath)" @tap="previewImage"></image>
					</view>
					<text class="atts-shanchu" @click="del(index)">
						<text class="iconfont icon-shanchu"></text>
					</text>
				</view>
			</view>				
		</view>
		<view class="repair_btn" @click="repair_btn()">提交</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				fileList: [
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656062902&t=4bb86fc4f4bcf73feb83bf43cdacda14',
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656062902&t=4bb86fc4f4bcf73feb83bf43cdacda14',
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656062902&t=4bb86fc4f4bcf73feb83bf43cdacda14'
				], //照片
			}
		},
		methods:{
			chooseImage() {
				let _self = this;
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					sizeType: ['compressed', 'original'],
					count: 9,
					success: (res) => {
						let arr = [];
						arr = res.tempFilePaths;
						arr.forEach((r) =>{
							this.$http.uploadFile({
								filePath: r
							}).then(data => {
								if(this.matchType(data.orginName) !== 'image'){
									uni.showToast({
										title: '请上传图片文件',
										icon: 'none'
									})
									return false;
								}
								_self.fileList.push({
									fileName: data.orginName,
									filePath: data.path,
									url: data.downloadUrl,
									orginName: data.orginName
								});
							})
						})
						console.log(_self.fileList);
					},
					fail: (err) => {
						// #ifdef APP-PLUS
						if (err['code'] && err.code !== 0 && this.sourceTypeIndex === 2) {
							this.checkPermission(err.code);
						}
						// #endif
						// #ifdef MP
						uni.getSetting({
							success: (res) => {
								let authStatus = false;
								authStatus = res.authSetting['scope.album'] && res.authSetting['scope.camera'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: '需要从您的相机或相册获取图片，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								}
							}
						})
						// #endif
					}
				})
			},
			del(index){
				if(index == 0){
					this.fileList = []
				}else{
					this.fileList = this.fileList.splice(index, 1);
				}
			},
			previewImage(){
				let imgList =[];
				this.fileList.forEach(item =>{
					imgList.push(this.fileRUrl(item.filePath));
				})
				uni.previewImage({
					urls: imgList,
					current: imgList[0]
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.bg{
	background: #f2f2f2;
	padding-top: 30rpx;
	height: 100vh;
}
.list_repair{
	background: #f2f2f2;
	border-radius: 10rpx;
	position: relative;
	margin: auto; 
	padding: 20rpx;
	width: 690rpx;
	background: #fff;
	font-size: 28rpx;
	.default{
		color: #8A8A8A;
		margin-right: 15rpx;
		margin-bottom: 30rpx;
	}
	.mb{
		margin-bottom: 30rpx;
	}
	.msg{
		border-bottom: 1px solid #eee;
		padding-bottom: 30rpx;
	}
	.camera{
		margin: 30rpx 0;
		width: 160rpx;
		height: 160rpx;
		border:1px dotted #cacaca; 
		color: #acacac;
		.cameraclolr{
			display: block;
			font-size: 70rpx;
			text-align: center;
			margin-top: 20rpx;
		}
		.paizhao{
			display: block;
			text-align: center;
			margin: auto;
		}
	}
}

//图片样式
	.atts-item {
		padding:0;
		height: 60px;
		border: 1px solid #F2F2F2!important;
		background: #FBFCFE;
		margin-bottom: 10px;
		position: relative;
		.atts-image {
			width: 60px;
			height: 60px;
			padding: 10px;
		}
	
		.no-image {
			position: absolute;
			top: 10px;
			left: 10px;
			max-width: 40px;
			max-height: 40px;
			border: none;
			box-shadow: none;
		}
	
		.is-image {
			width: 40px;
			height: 40px;
			border: none;
			box-shadow: none;
		}
	}
	.atts-shanchu {
		display: inline-block;
		width: 50px;
		height: 30px;
		margin-top: 15px;
		text-align: center;
		
		.icon-shanchu {
			font-size: 16px;
			color: #ccc;
		}
	}
	.repair_btn{
		position: absolute;
		background: #0DD474;
		color: #fff;
		width: 500rpx;
		height: 80rpx;
		// margin: 180rpx auto 40rpx;
		left: 50%;
		margin-left: -250rpx;
		bottom: 30rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 80rpx;
		border-radius: 100rpx;
	}
	
</style>