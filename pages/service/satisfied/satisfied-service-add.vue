<template>
	<view class="container p15 ">
		<view class="field-box whiteBg radius4 p15 pt5 pb5">
			<u--form labelPosition="left" :model="applyInfo" :rules="rules" ref="applyInfoRef">
				<u-form-item label="监督类型" prop="type" labelWidth="80" @click="showType = true; hideKeyboard()"
					ref="item1">
					<u--input input-align="right" v-model="applyInfo.type" disabled disabledColor="#ffffff" placeholder="请选择监督类型"
						border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="监督标题" prop="title" labelWidth="80" ref="item2">
					<u--input input-align="right"  v-model="applyInfo.title" border="none" placeholder="请输入"></u--input>
				</u-form-item>
				<u-form-item class="textarea-full" label="监督内容" prop="content" labelWidth="80" ref="item3">
					<u--textarea placeholder="内容请尽可能详情~" confirmType="done" maxlength="200" v-model="applyInfo.content" count></u--textarea>
				</u-form-item>
				
				<view class="uploadFile-wrap whiteBg no-bb mb15" @click="chooseImage()">
					<view class="uploadFile-inner">
						<view class="iconfont icon-paizhao"></view>
						<text class="text">照片/拍照</text>
					</view>
				</view>
				<view class="atts-item" v-for="(image,index) in fileList" :key="image.id">
					<view class="flex flexbet">
						<view class="atts-image">
							<image class="is-image" :src="image.url" :data-src="image.url" @tap="previewImage"></image>
						</view>
						<text class="atts-shanchu" @click="del(index)">
							<text class="iconfont icon-shanchu"></text>
						</text>
					</view>
				</view>
				<u-form-item label="" prop="onname" labelWidth="80" ref="item4">
					<u-checkbox-group v-model="applyInfo.onname" shape="square" @change="change">
						<u-checkbox activeColor="#0DD474" shape="circle" size="12" :customStyle="{marginRight: '16px'}" v-for="(item, index) in onnameList"
							:key="index" :label="item.name" :name="item.name">
						</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
			</u--form>
			<u-action-sheet :show="showType" :actions="typeList" title="请选择监督类型" @close="showType = false"
				@select="TypeSelect">
			</u-action-sheet>
			
			<view class="fixed-btn-bottom grayBg">
				<view class="btn" @tap="submit">提交</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				showType: false,
				applyInfo: {
					type: "",
					title: "",
					content: "",
					onname:[]
				},
				typeList: [{
						name: '投诉',
					},
					{
						name: '表扬',
					},
					{
						name: '建议',
					},
					{
						name: '咨询',
					}
				],
				onnameList: [{
						name: '匿名',
						disabled: false
					}
				],
				 rules: {
					type: [{
						 type: 'string',
						 required: true,
						 message: '请选择监督类型',
						 trigger: ['blur', 'change']
					}],
					title:[{
						type: 'string',
						required: true,
						message: '请输入监督标题',
						trigger: ['blur', 'change']
					}],
					content:[{
						type: 'string',
						min: 3,
						required: true,
						message: '不低于3个字',
						trigger: ['change']
					}]
				},
				fileList:[]
				
			}
		},
		methods: {
			TypeSelect(e) {
				this.applyInfo.type = e.name
				this.$refs.applyInfoRef.validateField('type');
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			change(e) {
				this.applyInfo.onname = e.name
			},
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
							_self.fileList = [
								{
									id:"01",
									url:"http://t14.baidu.com/it/u=1723704570,2113336346&fm=224&app=112&f=JPEG?w=500&h=500",
									fileName:"食堂卫生1",
									fileType:"image"
									
								},
								{
									id:"02",
									url:"https://img0.baidu.com/it/u=3705791208,2585553811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333",
									fileName:"食堂卫生2",
									fileType:"image"
								},
								{
									id:"03",
									url:"http://t14.baidu.com/it/u=1723704570,2113336346&fm=224&app=112&f=JPEG?w=500&h=500",
									fileName:"食堂卫生1",
									fileType:"image"
									
								}
							]
						/* 	this.$http.uploadFile({
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
							}) */
						})
						
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
			submit(){
				console.log('this.applyInfo',this.applyInfo)
				this.$refs.applyInfoRef.validate().then(res => {
					uni.$u.toast('提交成功')
					setTimeout(() =>{
						this.jump('/pages/service/satisfied/satisfied-service')
					},1000)
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style lang="scss">
	.u-form{
		/deep/.u-form-item__body__left__content__label{
			font-size: 28rpx!important;
			color:#999
		}	
		/deep/.u-input__content__field-wrapper__field,
		/deep/.u-textarea__field{
			font-size: 28rpx!important;
		}
	}
	
	.textarea-full{
		/deep/.u-form-item__body{
			flex-direction: column!important;
		}
		/deep/.u-form-item__body__left{
			margin-bottom:30rpx!important;
		}
		/deep/.u-textarea{
			background-color:#F5F5F5;
			border: 0 !important;
		}
		/deep/.u-textarea__count{
			background-color: transparent!important;
		}
	}
	
	.uploadFile-wrap{
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		flex: 1;
		.uploadFile-inner{
			width: 144rpx;
			height: 144rpx;
			border:2rpx dashed #ACACAC;
			border-radius: 8rpx;
			text-align: center;
			.iconfont{
				font-size: 60rpx;
				margin-top: 18rpx;
				margin-bottom: -10rpx;
				color:#ACACAC
			}
			.text{
				font-size: 24rpx;
				color:#ACACAC
			}
		}
	}
	
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
</style>
