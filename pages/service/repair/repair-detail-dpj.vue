<template>
	<view class="bg">
		<view class="list_repair">
			<image class="state" src="../../../static/img/yinzhang/daijieshou.png"></image>
			<view class="default mb">2小时56分钟前</view>
			<view class="flex mb">
				<view class="default">报修院区: </view>
				<view>xx医院郑东院区</view>
			</view>
			<view class="flex mb">
				<view class="default">报修科室: </view>
				<view>院本部</view>
			</view>
			<view class="flex mb">
				<view class="default">报修人员: </view>
				<view>刘婷</view>
			</view>
			<view class="flex mb">
				<view class="default">报修电话: </view>
				<view>05716032</view>
			</view>
			<view class="flex mb">
				<view class="default">报修地址: </view>
				<view>整合楼1F西楼梯间</view>
			</view>
			<view class="flex mb">
				<view class="default">报修内容: </view>
				<view>楼道内灯泡坏了!</view>
			</view>
			<view class="list_img">
				<image v-for="(item,index) of imglist" :src="item" mode="" @click="preview(index,imglist)"></image>
			</view>
		</view>
		
		<view class="list_repair">
			<view class="flex mb">
				<view class="default">耗材申领: </view>
				<view class="hcsl">
					<view>灯泡*2</view>
					<view>插头电源线*1</view>
				</view>
			</view>
			<view class="flex mb">
				<view class="default">总计工时: </view>
				<view>1.5工时</view>
			</view>
			<view class="flex mb">
				<view class="default">总计费用: </view>
				<view>18元</view>
			</view>
			<view class="flex mb">
				<view class="default">维修备注: </view>
				<view>此电源线易折断,需注意</view>
			</view>
			<view class="flex mb">
				<view class="default">审核备注: </view>
				<view>审核通过</view>
			</view>
		</view>
		 
		<view class="gdlc">
			<view class="gdlc_title">工单流程</view>
			<steps :step="list"></steps>
			<!-- 	
				<view class="steps">
					<view class="steps_list">
						<text class="steps_title">李婷(工单发起)</text> <text class="steps_time">2022-05-26  10:40</text>
						<view class="steps_msg">好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理</view>
					</view>
					<view class="steps_list">
						<text class="steps_title">李婷(工单发起)</text> <text class="steps_time">2022-05-26  10:40</text>
						<view class="steps_msg">好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理好好处理</view>
					</view>
				</view>
			-->
			<view class="repair_btn" @click="repair_btn()">确认接单</view>
		</view>
	</view>
</template>

<script>
	import steps from "./components/steps.vue"
	export default {
		components: {
			steps
		},
		data(){
			return{
				imglist:[
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656062902&t=4bb86fc4f4bcf73feb83bf43cdacda14',
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656062902&t=4bb86fc4f4bcf73feb83bf43cdacda14',
					'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656062902&t=4bb86fc4f4bcf73feb83bf43cdacda14'
				],
				list:[
					{
						name: "张三11111",
						time:"2022-05-26  10:40",
						msg: "好好处理好好处理好好处理好好处理好好处理好好处理"
					}, {
						name: "张三22222",
						time:"2022-05-26  10:40",
						msg: "好好处理好好处理好好处理好好处理好好处理好好处理"
					}, {
						name: "张三33333",
						time:"2022-05-26  10:40",
						msg: "好好处理好好处理好好处理好好处理好好处理好好处理"
					}
				]
			}
		},
		methods:{
			repair_btn(){
				uni.navigateTo({
					url:"./repair"
				})
			},
		}
	}
</script>

<style lang="scss">
page{
	background: #f2f2f2;
}
.bg{
	background: #f2f2f2;
	padding-top: 30rpx;
}
.list_repair{
	border-radius: 10rpx;
	position: relative;
	margin: auto;
	padding: 20rpx;
	width: 690rpx;
	background: #fff;
	font-size: 28rpx;
	.state{
		position: absolute;
		width: 120rpx;
		height: 120rpx;
		top: 20rpx;
		right: 20rpx;
		transform:rotate(30deg);
	}
	.default{
		color: #777777;
		margin-right: 15rpx;
	}
	.hcsl{
		view{
			// margin: 25rpx 0;
			margin-top: 30rpx;
		}
		view:first-child{
			margin: 0;
		}
	}
	.mb{
		margin-bottom: 40rpx;
	}
	.list_img{
		text-align: right;
		image{
			width: 160rpx;
			height: 160rpx;
			margin: 0 10rpx;
			border-radius: 10rpx;
		}
	}
}
.gdlc{
	margin: auto;
	padding: 20rpx;
	width: 690rpx;
	.gdlc_title{
		font-size: 30rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
	}
	.gdlc{
		
	}

	.steps_list {
		position: relative;
		padding: 0 30rpx;
		list-style: none;
		border-left: 2rpx solid #ccc;
		min-height: 85rpx;
		margin-left: 60rpx;
		display:flex;
		justify-content: space-between;
		.steps_title{
			font-size: 30rpx;
			position: absolute;
			top: -10rpx;
		}
		.steps_time{
			position: absolute;
			right: 0;
			top: -10rpx;
			color: #999999;
			font-size: 24rpx;
		}
		.steps_msg{
			margin: 40rpx 0;
			color: #999999;
			font-size: 24rpx;
		}
	}

	.steps_list:before {
		content: "";
		display: block;
		position: absolute;
		margin-left: -5rpx;
		top: 0;
		left: -7rpx;
		width: 20rpx;
		height: 20rpx;
		line-height: 22rpx;
		text-align: center;
		background: #0DD474;
		color: #fff;
		font-size: 28rpx;
		border-radius: 50%;
	}
	.repair_btn{
		background: #0DD474;
		color: #fff;
		width: 500rpx;
		height: 80rpx;
		margin: 80rpx auto 40rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 80rpx;
		border-radius: 100rpx;
	}
}
</style>