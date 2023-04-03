<template>
	<view class="bg">
		<view class="list_repair">
			<view class="flex mb">
				<view class="default">设备名称: </view>
				<view>1号锅炉设备</view>
			</view>
			<view class="flex mb">
				<view class="default">设备品牌: </view>
				<view>大录企业</view>
			</view>
			<view class="flex mb">
				<view class="default">设备编号: </view>
				<view>123-11-0F</view>
			</view>
			<view class="flex mb">
				<view class="default">设备型号: </view>
				<view>05716032</view>
			</view>
			<view class="flex mb">
				<view class="default">设备厂家: </view>
				<view>海尔集团</view>
			</view>
			<view class="flex mb">
				<view class="default">安装位置: </view>
				<view>门诊楼3F-312心电室</view>
			</view>
		</view>
		<view class="" v-if="sing">
			<view class="xjdk" @click="inventory()">
				<view>巡检打卡</view>
				<view class="time">{{clock | FormatTime}}</view>
			</view>
			<view class="msg">
				您已进入该设备巡检打卡范围：xx医院门诊楼3F
			</view>
		</view>
		
		<view class="" v-if="!sing">
			<view class="xjdk">
				<view>打卡成功</view>
				<view class="time">09:30:25</view>
			</view>
			<view class="msg">
				即将开始巡检
			</view>
		</view>
		
	</view>
</template>

<script>
	function getDate(datetime, startType) {
		var date = new Date(datetime); 
		var year = date.getFullYear(),
		month = ("0" + (date.getMonth() + 1)).slice(-2),
		sdate = ("0" + date.getDate()).slice(-2),
		hour = ("0" + date.getHours()).slice(-2),
		minute = ("0" + date.getMinutes()).slice(-2),
		second = ("0" + date.getSeconds()).slice(-2);
		let resStr = "";
		if (startType === "year") resStr = year + "-" + month + "-" + sdate +" " + hour + ":" + minute + ":" + second;
		if (startType === "day") resStr = year + "-" + month + "-" + sdate;
		if (startType === "month") resStr = month + "-" + sdate;
		if (startType === "hour") resStr = hour + ":" + minute + ":" + second;
		return resStr;
	}
	export default {
		data(){
			return{
				sing: true,
				clock: Date.parse(new Date()),
			}
		},
		methods:{
			inventory(){
				this.sing = !this.sing;
				if(!this.sing){
					setTimeout(() => {
						uni.navigateTo({
							url:"./inspection-inventory"
						})
					}, 1000)
				}
			}
		},
		mounted() {
		    setInterval(()=> {
				this.clock = Date.parse(new Date());
		    }, 1000);
		},
		filters: {
		    FormatTime(val) {
				return getDate(val, "hour");
		    },
		},
	}
</script>

<style lang="scss" scoped>
page{
	background: #f2f2f2;
	padding-top: 30rpx;
}
.bg{
	background: #f2f2f2;
	padding-top: 30rpx;
	height: 100vh;
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
	
	.mb{
		margin-bottom: 40rpx;
	}
	.mb:last-child{
		margin-bottom: 20rpx;
	}
}
.xjdk{
	width: 200rpx;
	height: 200rpx;
	margin: 50rpx auto;
	border-radius: 50%;
	text-align: center;
	// background: #10d576;
	color: #fff;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items:center;
	background: linear-gradient(to bottom, #6ae2ab 0, #10d576 100%);
	view{
		margin: 10rpx 0;
	}
	.time{
		font-size: 24rpx;
	}
}
.msg{
	color: #777777;
	margin: auto;
	text-align: center;
	width: 690rpx;
	font-size: 28rpx;
}

</style>