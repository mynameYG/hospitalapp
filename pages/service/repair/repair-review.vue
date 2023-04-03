<template>
	<view class="review container"> 
		<view class="xcsc">
			<view class="jcjg">检查结果:</view>
			<u--textarea placeholder="请输入内容" count height="100" ></u--textarea>
			<view class="camera" @click="chooseImage()">
				<text class="icon-paizhao iconfont cameraclolr"></text>
				<text class="paizhao">照片\拍照</text>
			</view>
		</view>
		
		<view class="hcsy">
			<view class="hcsy_title">耗材申领:</view>
			<view class="hcsy_btn">
				<text @click="yes()" :class="{btn_color:yesSign}">是</text>
				<text @click="no()" :class="{btn_color:noSign}">否</text>
			</view>
		</view>
		
		<u-popup :show="show" :overlay="overlay">
		    <view class="popup">
				<view class="sousuo">
					<view class="popup_top">
					   <text class="quxiao" @click="quxiao">取消</text>
					   <text class="queding" @click="queren">确定</text>
					</view>
					<view class="search">
						<text class="iconfont icon-top"></text>
						<input type="text">
					</view>
				</view>
				
				
				<view class="haocai">
					<view class="haocai_list">
						<view>LED大灯</view>
						<view>
							<u-number-box v-model="value" @change="valChange"></u-number-box>
						</view>
					</view>
					<view class="haocai_list">
						<view>6*100螺丝刀十字</view>
						<view>
							<u-number-box v-model="value" @change="valChange"></u-number-box>
						</view>
					</view>
					<view class="haocai_list">
						<view>软线接线板</view>
						<view>
							<u-number-box v-model="value" @change="valChange"></u-number-box>
						</view>
					</view>
					<view class="haocai_list">
						<view>电源延长线</view>
						<view>
							<u-number-box v-model="value" @change="valChange"></u-number-box>
						</view>
					</view>
				</view>
			   
		    </view>
			
		</u-popup>
		<view class="repair_btn" >确认</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				yesSign: false,
				noSign: true,
				overlay:false, //遮罩
				show : false, //弹出层
				value:""
			}
		},
		methods:{
			yes(){
				this.yesSign = true;
				this.noSign = false;
				this.show = true;
			},
			no(){
				this.yesSign = false;
				this.noSign = true;
				this.show = false;
			},
			quxiao(){
				this.show = false;
				this.yesSign = false;
				this.noSign = true;
			},
			queren(){
				this.show = false;
			},
			valChange(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
page{
	background: #f2f2f2;
}
.review{
	padding-top: 30rpx;
	font-size: 28rpx;
	background: #f2f2f2;
	.xcsc{
		padding: 20rpx 20rpx;
		margin: auto;
		width: 690rpx;
		background: #fff;
		font-size: 26rpx;
		border-radius: 10rpx;
		.jcjg{
			color: #777777;
			margin-bottom: 30rpx;
		}
		.camera{
			margin: 30rpx 0 10rpx;
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
	.hcsy{
		padding: 30rpx 20rpx;
		margin: 30rpx auto;
		width: 690rpx;
		background: #fff;
		font-size: 26rpx;
		border-radius: 10rpx;
		color: #777777;
		display: flex;
		justify-content: space-between;
		.hcsy_title{
			display: inline-block;
		}
		.hcsy_btn{
			display: inline-block;
			text{
				border-radius: 10rpx;
				background: #f5f5f5;
				padding: 15rpx 30rpx;
			}
		}
	}
	.btn_color{
		background: #0DD474 !important;
		color: #fff;
	}
	.popup{
		box-shadow: -3px -2px 5px #d1d1d1;	
		border-radius: 10rpx;
		font-size: 26rpx;
		.sousuo{
			padding: 30rpx 50rpx 0;
			.popup_top{
				font-size: 30rpx;
				display: flex;
				justify-content: space-between;
				.quxiao{
					color: #777777;
				}
				.queding{
					color: #0DD474;
				}
			}
			.search{
				display: flex;
				margin: 30rpx 0 0;
				border-radius: 30rpx;
				background: #f5f5f5;
				padding: 10rpx 0;
				text{
					color: #777777;
					font-size: 40rpx;
					margin: 0 20rpx; 
				}
				input{
					font-size: 28rpx;
					width: 100%;
				}
			}
		}
	
		.haocai{
			.haocai_list{
				padding: 15rpx 50rpx;
				display: flex;
				align-items:center;
				justify-content: space-between; 
			}
			view:nth-child(odd){
				background: #fff;
			}
			view:nth-child(even){
				background: #f5f5f5;
			}
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
}
</style>