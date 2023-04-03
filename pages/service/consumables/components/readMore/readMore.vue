<template>
	<view>
		<view id="readMore" :style="{'height': !show ? '' : height+'px'}"  class="readMore" :class=" show ? 'readMore' : 'on'">
			<slot name="readMore"></slot>
			<view class="xia" v-if="show" @click="toChange()">
				<text class="iconfont icon-xiala1 xiala"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:["height"],
		data(){
			return{
				show: true,//是否展开
			}
		},
		methods:{
			toChange(){
				this.show = false;
			}
		}
	}
</script>

<style lang="scss">
.readMore{
	overflow: hidden;
	position: relative;
	height: 400rpx;
}
.on{
	height: auto;
}
.xia{
	position: absolute;
	z-index: 99999;
	bottom: 0;
	display: block;
	background: #FFFFFF;
	margin: auto;
	width: 690rpx;
	left: 50%;
	transform:translateX(-50%);
	// border: 1rpx solid red;
	text-align: center;
	color: #0DD474;
	font-size: 50rpx;
	font-weight: bold;
	.xiala{
		font-size: 50rpx;
	}
}
</style>