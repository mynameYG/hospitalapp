<template>
	<view class="popup-wrap" v-if="popup">
		<view class="popup-box">
			<view class="popup-close" @click="cancle">
				<text class="iconfont icon-guanbi"></text>
			</view>
			<view class="popup-con detail-wrap no-mt">
				<view class="detail-item flex tc">
					<text class="detail-label flex1 no-mr p15 color333">满意度评价</text>
				</view>
				<view class="detail-item flex mb10">
					<text class="detail-label" style="width:46px">评分</text>
					<view class="detail-text flex1 text-ellipsis">
						<u-rate class="rate" size="22" activeColor="#f6bf34" :count="count" v-model="value">
						</u-rate>
					</view>
				</view>
				<view class="detail-item flex">
					<text class="detail-label" style="width:46px">内容</text>
					<textarea maxlength="-1" name="descripe" v-model="commentInfo" placeholder="请输入内容" placeholder-class="gray-place" class="flex1 model-textarea"></textarea>
				</view>	
				<view class="popup-btn flex flexmid">
					<view class="popup-btn-item flex1">
						<button class="popup-cancle" @click="cancle">取消</button>
					</view>
					<view class="popup-btn-item flex1">
						<button class="popup-confirm" @click="confirm">确定</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'popup',
		props:{
			info:""
		},
		data() {
			return {
				popup: false,
				count:5,
				value:5,
				commentInfo:""
			}
		},
		methods: {
			init(){
				this.popup = true;
			},
			cancle() {
				this.popup = false;
			},
			confirm() {
				var params = {};
				params = {
					orderId:this.info.infoId,
					commentStar:this.value,
					commentInfo:this.commentInfo
				}
				console.log('params',params) 
				this.$http.post(`${this.info.putUrl}`,params).then(res =>{
					uni.showToast({title: "评价成功",icon: 'none'});
					this.popup = false;
					this.$emit('refresh')
				})
			}
		}
	}
</script>

<style lang="scss">
	.popup-wrap{
		background-color:rgba(0,0,0,0.5);
		position: fixed;
		top: 0;bottom: 0;
		left: 0;right: 0;
		z-index: 1000;
	}
	.popup-box{
		width:88vw;
		height: auto;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -60%);
		.popup-close{
			display: block;
			width: 24px;
			height: 24px;
			border-radius: 50%;
			border: 1px solid #fff;
			text-align: center;
			position: absolute;
			right: -6px;
			top: -12px;
			z-index: 1;
			background: #fff;
			.iconfont{
				font-size:13px;
				color:#666;
				line-height: 24px;
				vertical-align: super;
			}
		}
	}
	.popup-title{
		margin-bottom: 21px;
		font-size:16px;
		color:#333;
		text-align: center;
	}
	.popup-con{
		background-color: #fff;
		padding: 20px 30px 30px;
		border-radius: 5px;
	}
	.popup-btn{
		margin-top: 30px;
	}
	.popup-cancle{
		width:80px;
		height: 30px;
		border-radius: 5px;
		background-color: #5BA5F0;
		font-size:14px;
		color:#999;
		line-height: 30px;
		background: #E4E4E4; 
	}
	.popup-confirm{
		@extend .popup-cancle;
		color:#fff;
		background: #0DD474; 
	}
	.popup-con .describe{
		line-height: 1.5;
		max-height: 60px;
		overflow-y: auto;
	}
	.model-textarea{
		overflow-y: auto;
		width: 100%;
		max-height: 71px;
		font-size: 14px;
		line-height: 24px;
		border:1px solid #EEEEEE;
		border-radius: 5px;
		padding-left: 5px;
	}
</style>
