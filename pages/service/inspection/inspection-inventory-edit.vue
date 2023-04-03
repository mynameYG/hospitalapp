<template>
	<view class="bg">
		<view class="inventory">
			<view class="shebei"><text></text> {{name}} </view>
			
			<template>
				<view v-for="(item,index) in list" :key="index">
					<view class="shenhe" v-if="item.type == 'radio'">
						<view class="panduan">{{item.paramName}}</view>
						<radio-group @change="radioChange($event,list)">
							<label class="uni-list-cell uni-list-cell-pd" v-for="(name, index) in item.list"  >
								<view class="radio_list">
									<radio style="transform:scale(0.6)" color="#0DD474"  :checked="item.optionId == name.id" :value="name.optionValue + '-' + item.id +'-'+ name.optionName +'-'+ name.id" /><text>{{name.optionName}}</text>
								</view>
							</label>
						</radio-group>
					</view>
					
					<view class="shenhe" v-else-if="item.type == 'textarea' ">
						<view class="beizhu_title">{{item.paramName}}</view>
						<u--textarea  height="100" v-model="item.value" class="mb15" placeholder="请输入内容" count  confirmType="done"></u--textarea>
					</view>
					
					<view class="shenhe flex flexbet"  v-else-if="item.type == 'input'">
						<text class="beizhu_title">{{item.paramName}}</text>
						<input type="text" v-model="item.value">
					</view>
				</view>
			</template>
			
			<view class="beizhu">
				<view class="camera" @click="shot()">
					<text class="icon-yuyin iconfont cameraclolr"></text>
					<text class="paizhao">视频\拍摄</text>
				</view>
				<view class="camera" @click="chooseImage()">
					<text class="icon-paizhao iconfont cameraclolr"></text>
					<text class="paizhao">照片\拍照</text>
				</view>
			</view>
			
			<view class="model-item atts-item" v-for="(item, index) in fileList">
				<view class="flex flexbet">
					<view class="atts-image">
						<image  v-if="matchType(item.filePath) == 'image'" class="is-image" :src="fileRUrl(item.filePath)" :data-src="fileRUrl(item.filePath)" @tap="previewImage(index)"></image>
						<view class="is-image" v-if="matchType(item.filePath) == 'video'">
							{{item.fileName}}
						</view>
					</view>
					<text class="atts-shanchu" @click="del(index)">
						<text class="iconfont icon-shanchu"></text>
					</text>
				</view>
			</view>	
		</view>	
		
		<view class="buding"></view>  <!--补丁-->
		<view class="bottom_btn">
			<view class="zwx" @click="zwx()">转维修</view>
			<!-- <view class="save" @click="getData()">保存</view> -->
			<!-- <view  class="submit obsolete" @click="submit()">提交</view> -->
			<view  :class="status == 'complete' ? 'submit' : 'obsolete'" class="" @click="submit()">提交</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data(){
			return{
				id:"",
				name:"",
				list:"",
				fileList: [], //照片
				attachment:[], //回显照片视频附件
				taskId:"",
				status:""
			}
		},
		onLoad(options) {
			this.taskId = options.taskId;
			this.id = options.id; 
			this.name = options.name;
			this.status = options.status;
		},
		
		mounted() {
			this.getdetail();
		},
		
		methods:{
			// 获取回显内容
			getdetail(){
				this.$http.get(`/mobile/inspection/equipment/detail?equipmentId=${this.id}&taskId=${this.taskId}`).then(res => {
					this.list = res.details;
					if(res.attachment){
						res.attachment.forEach((item, index)=>{
							this.fileList.push({
								fileName: item.fileName,
								filePath: item.filePath,
							})
						})
					}
					
					if(res.details) {
						res.details.forEach((item, index)=>{
							item.value = item.paramValue;
							item.list.forEach(res =>{
								if(item.optionId == res.id) {
									item.optionName = res.optionName;
								}
							})
						})
					}
					
				})
			},
			
			radioChange(e) {
				var values = e.detail.value;
				let options = [];
				let questionId = "";
				let optionName = "";
				let optionId = "";
				let list = values.split('-');
				options.push(list[0]);
				questionId = list[1];
				optionName = list[2];
				optionId = list[3];
				if(this.list){
					this.list.forEach(item =>{
						let pushOptions = [];
						if(item.id == questionId){
							item.optionName = optionName;
							item.pushOptions = options;
							item.optionId = optionId
						}
					})
				}
			},
			
			zwx() {
				uni.navigateTo({
					url: `/pages/service/repair/repair-add?id=${this.id}`
				})
			},
			
			submit() {
				if(this.status == 'complete'){
					uni.showToast({
						icon: "none",
						title: "巡检已完成"
					})
					return
				}
				var params = [];
				var status = ""
				this.list.forEach((item,index)=>{
					if(item.pushOptions) {
						var value = item.pushOptions[0]; 
					} else if(item.value) {
						var value = item.value;
					} else {
						var value = "";
					}
					if(item.optionName){ //单选框选中的文本
						var optionName = item.optionName;
					} else {
						var optionName = "";
					}
					//判断设备是否正常选项
					if(item.parameterValue == "working") {
						item.optionName == "不正常" ? status = 0 : status = 1
					}
					if(item.optionId){
						var optionId = item.optionId;
					} else {
						var optionId = "";
					}
					params.push({
						paramId: item.paramId,
						paramName: item.paramName,
						paramValue: value,
						optionName: optionName,
						optionId: optionId,
						type: item.parameterValue == "other" ? item.parameterValue : item.type
					})
				})
				//对表单进行验证
				for (var i = 0; i < params.length; i++) {
					if (params[i].type == "radio") {
						if (params[i].optionId == "") {
							uni.showToast({
								icon: "none",
								title: "请选择" + params[i].paramName
							})
							return false
						}
					} else if(params[i].type == "input" || params[i].type == "textarea") {
						
						if (params[i].paramValue == "") {
							uni.showToast({
								icon: "none",
								title: "请输入" + params[i].paramName
							})
							return false
						}
					}
				}
				
				this.$http.post(`/mobile/inspection/submit?equipmentId=${this.id}&taskId=${this.taskId}`,{
					attachment: this.fileList,
					details:params,
					status:status
				}).then(res => {
					uni.showToast({
						icon: "none",
						title: "提交成功"
					})
					setTimeout(() => {
						uni.navigateBack();
					}, 1000)
				})
			},
			
			//上传照片视频等一些列方法
			
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
								}); 
							})
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
			
			shot(){
				var self = this;
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					success: (res)=> {
						this.$http.uploadFile({
							filePath: res.tempFilePath
						}).then(data => {
							self.fileList.push({
								fileName: data.orginName,
								filePath: data.path,
							});
						})
					}
				});
			},
			
			del(index){
				this.fileList.splice(index, 1);
			}, 
			
			previewImage(index){
				let imgList =[];
				this.fileList.forEach(item =>{
					imgList.push(this.fileRUrl(item.filePath));
				})
				uni.previewImage({
					urls: imgList,
					current: imgList[index]
				});
			},
			
			
		}
	}
</script>

<style lang="scss">
page{
	background: #f2f2f2;
	padding-top: 30rpx;
}

.inventory{
	margin: auto;
	width: 690rpx;
	.shebei{
		padding: 0 10rpx;
		font-size: 28rpx;
		color: rgb(51, 51, 51);
	}
	.shebei:before{
		content: "";
		display: inline-block;
		width: 10rpx;
		height:40rpx;
		background: #0DD474;
		vertical-align:middle;
		border-radius: 30rpx;
		margin-right: 15rpx;
	}
	.shenhe{
		border-radius: 10rpx;
		margin: 30rpx auto;
		padding: 20rpx 20rpx 0;
		width: 690rpx;
		overflow: hidden;
		background: #fff;
		font-size: 28rpx;
		input{
			color: #777777;
			border:1rpx solid #dadbde;
			text-align: right;
			font-size: 28rpx;
		}
		.beizhu_title{
			margin: 0 0 20rpx;
		}
		.panduan{
			margin: 10rpx 0 30rpx;
		}
		.radio_list{
			margin: 10rpx 0 30rpx;
		}
		.shbz{
			margin: 30rpx 0;
		}
	}
	.dianyazhi{
		background: #fff;
		margin: 40rpx auto;
		width: 690rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		padding: 20rpx 20rpx 10rpx;
		view{
			margin: 0 0 20rpx;
		}
	}
	.beizhu{
		background: #fff;
		margin: 40rpx auto;
		width: 690rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		padding: 20rpx 20rpx 20rpx;
		.beizhu_title{
			color: #777777;
			margin: 0 0 20rpx;
		}
		.camera{
			margin: 30rpx 0 10rpx;
			width: 160rpx;
			height: 160rpx;
			border:1px dotted #cacaca; 
			color: #acacac;
			display: inline-block;
			margin-right: 20rpx;
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
	.model-item .smallInput{
		width: 56px;
		display: inline-block;
		vertical-align: -6px;
		text-align: center;
		border-bottom: 1px solid #333;
		height: 23px;
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
			line-height: 40px;
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
	
}

.buding{
	height: 140rpx;
}

.bottom_btn{
		position: fixed;
		bottom: 0;
		height: 120rpx;
		background: #fff;
		width: 100%;
		display: flex;
		justify-content: space-around;
		padding: 0 30rpx;
		view{
			font-size: 26rpx;
			width: 180rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			margin-top: 20rpx;
			border-radius: 50rpx;
		}
		.zwx{
			color: #f6bf34;
			border: 1rpx solid #f6bf34;
		}
		.save{
			color: #1C87EA;
			border: 1rpx solid #1C87EA;
		}
		.submit{
			color: #fff;
			border: none;
			background: #777777;
		}
		.obsolete{
			color: #fff;
			border: 1rpx solid #10d576;
			background: #10d576;
		}
}

</style>