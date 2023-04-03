<template>
	<view class="container p15">
		<view class="field-box whiteBg radius4 p15 position-relative">
			<status :status="status"></status>
			<view class="field-title fs16 flex1">
				{{info.name}}
				<text class="fs12 color999 ml15">{{info.time}}</text>
			</view>
			<view class="field-item flex">
				<view class="field-label">监督类型：</view>
				<view class="field-con flex1" :class="{'danger' : typeTitle == '投诉'}">{{typeTitle}}</view>
			</view>
			<view class="field-item flex">
				<view class="field-label">{{typeTitle}}标题：</view>
				<view class="field-con flex1">{{info.title}}</view>
			</view>
			<view class="field-item">
				<view class="field-label">{{typeTitle}}内容：</view>
				<view class="field-con pl15 mt10">{{info.content}}</view>
			</view>
			<view class="pl15">
				<attachmentCheck v-if="file.length>0" className="atts-imgWrap" :atts="file" :previewImgList="previewImgList"></attachmentCheck>
				
				<view class="radius4 grayBg fs12 p15 pt10 reply-box">
					<text v-if="status == 'daihuifu'" class="color999">等待回复中~</text>
					<text v-if="status == 'yihuifu'" class="color333">【<text class="colormain">处理回复</text>】{{info.reply}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import status from "@/components/ikdo/status.vue"
	export default {
		components:{
			status
		},
		data(){
			return{
				info:{
					name:"刘海陶",
					time:"2022-06-01 10:40",
					title:"食堂卫生",
					content:"食堂菜品不卫生干净，今天中午吃的青菜里面有虫子，并且工作人员态度恶劣拒不承认，希望加强医院食堂卫生监督和食堂工作人员管理。",
					reply:"您的投诉我们已经知悉，会尽快处理存在问题，感谢您的建议。"
				},
				file:[
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
						
					},
				],
				previewImgList:[
					"http://t14.baidu.com/it/u=1723704570,2113336346&fm=224&app=112&f=JPEG?w=500&h=500","https://img0.baidu.com/it/u=3705791208,2585553811&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333"
				],
				status:"",
				typeTitle:""
			}
		},
		onLoad(option){
			this.typeTitle = option.typeTitle;
			this.status = option.status;
			if(option.status == 1){
				this.show = false
			}
		},
		methods:{}
	}
</script>

<style lang="scss">
	.container{
		/* #ifdef H5 */
		height: calc(100vh - 88upx);
		/*  #endif */
	}
	.field-box {
		.field-title{
			padding-bottom:20rpx;
			color:#777;
		}
		.field-label{
			padding-left: 40rpx;
			position: relative;
			&:before{
				content:"";
				position: absolute;
				top:10rpx;
				left:0;
				width:20rpx;
				height: 20rpx;
				background-color: #0DD474;
				border-radius: 50%;
			}
		}
	}
	.reply-box{
		line-height: 1.6;
	}
	/deep/.atts-imgWrap{
		.atts-tt{
			display: none;
		}
		.atts-item{
			display: inline-block;
			margin-right: 20rpx;
			margin-top:0;
			margin-bottom: 20rpx;
			width: 136rpx;
			height: 136rpx;
			border-radius: 8rpx;
			overflow: hidden;
			.atts-image{
				width: 100%;
				height: 100%;
				padding:0;
				.is-image{
					width: 136rpx;
					height: 136rpx;
				}
			}
			.atts-name,.atts-download{
				display: none;
			}
		}
	}
</style>