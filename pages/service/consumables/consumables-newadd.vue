<template>
	<view>
		<view class="out mb15" >
			<view class="flex flexbet mb25">
				<view class="out_font">采购人 <text class="ml5">:</text></view>
				<view class="ml5"><input type="text" placeholder="请输入"></view>
			</view>
			<view class="flex flexbet mb25">
				<view class="out_font">所属科室 <text class="ml5">:</text></view>
				<view class="ml5">插座</view>
			</view>
			<view class="flex flexbet">
				<view class="out_font">所属院区 <text class="ml5">:</text></view>
				<view class="ml5">一分院</view>
			</view>
		</view>
		<view class="cgmx"> 采购明细 </view>
		<view class="out mb15" >
			<view class="flex flexbet mb25">
				<view class="out_font">耗材分类 <text class="ml5">:</text></view>
					<picker class="pickercontent" @change="bindPickerChange" :value="index" :range="array">
						<text>{{array[index]}}</text>
						<text class="iconfont pickericon icon-jinru"></text>
					</picker>
			</view>
			<view class="flex flexbet mb25">
				<view class="out_font">耗材名称 <text class="ml5">:</text></view>
				<view class="ml5">插座</view>
			</view>
			<view class="flex flexbet mb25">
				<view class="out_font">耗材型号 <text class="ml5">:</text></view>
				<view class="ml5">12345</view>
			</view>
			<view class="flex flexbet mb25">
				<view class="out_font">采购数量 <text class="ml5">:</text></view>
				<view class="ml5">20</view>
			</view>
			<view class="add">添加</view>
		</view>
		
		<!-- 打补丁 -->
		<view class="buding"></view>
		<view class="xinzeng">
			<view class="repair_btn">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				array: ['五金材料', '电工材料', '五金材料', '电工材料'],
				index: "",
			}
		},
		methods:{
			bindPickerChange: function(e) {
				console.log(e);
			    this.index = e.detail.value;
			},
		}
	}
</script>

<style lang="scss">
page{
	background: #f2f2f2;
	padding-top: 30rpx;
}
.out{
	background: #fff;
	width: 690rpx;
	margin: auto;
	padding: 20rpx;
	border-radius: 10rpx;
	font-size: 28rpx;
	.out_font{
		color: #777777;
	}
	.name{
		color: #0DD474;
	}
	.mb25{
		margin-bottom: 50rpx;
	}
	input{
		text-align: right;
		font-size: 28rpx;
	}
	.pickercontent{
		padding-left: 100rpx;
		.pickericon{
			color: #777777;
			font-size: 26rpx;
		}
	}
	
	.file{
		border: 1rpx solid #d7d7d7;
		width: 260rpx;
		height: 90rpx;
		line-height: 80rpx;
		// text-align: center;
		background: #f6f6f6;
		text{
			color: #fcd165;
			font-size: 60rpx;
			vertical-align:middle;
			margin: 0 20rpx;
		}
	}
	
	.add{
		text-align: center;
		width: 140rpx;
		height: 60rpx;
		border: 1rpx solid #0DD474;
		color: #0DD474;
		border-radius: 30rpx;
		line-height: 60rpx;
		margin: auto;
	}
}
.cgmx{
	width: 690rpx;
	margin: auto;
	font-size: 28rpx;
	margin-bottom: 30rpx;
}
.buding{
	height: 140rpx;
}
.xinzeng{
	width: 100%;
	height: 120rpx;
	position: fixed;
	bottom: 0;
	.repair_btn{
		background: #0DD474;
		color: #fff;
		width: 500rpx;
		height: 80rpx;
		margin: auto;
		margin-top: 20rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 80rpx;
		border-radius: 100rpx;
	}
}
</style>