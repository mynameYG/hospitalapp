<template>
	<view class="bg">
		<readMore :height="200">
			<template class="readmore" slot="readMore">
				<view class="list_repair">
					<view class="default mb">2022-03-21</view>
					<view class="flex mb">
						<view class="default">报修院区:</view>
						<view>xx医院郑东院区</view>
					</view>
					<view class="flex mb">
						<view class="default">报修科室:</view>
						<view>院本部</view>
					</view>
					<view class="flex mb">
						<view class="default">报修人员:</view>
						<view>刘婷</view>
					</view>
					<view class="flex mb">
						<view class="default">报修电话:</view>
						<view>05716032</view>
					</view>
					<view class="flex mb">
						<view class="default">报修地址:</view>
						<view>整合楼1F西楼梯间</view>
					</view>
					<view class="flex mb">
						<view class="default">报修内容:</view>
						<view>楼道内灯泡坏了!</view>
					</view>
					<view class="list_img">
						<!-- <image src="../../../static/img/yinzhang/yihuanche.png"></image>
					<image src="../../../static/img/yinzhang/yihuanche.png"></image>
					<image src="../../../static/img/yinzhang/yihuanche.png"></image> -->
						<image
							src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656062902&t=4bb86fc4f4bcf73feb83bf43cdacda14"
							mode=""
						></image>
						<image
							src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656062902&t=4bb86fc4f4bcf73feb83bf43cdacda14"
							mode=""
						></image>
						<image
							src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F113020142315%2F201130142315-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656062902&t=4bb86fc4f4bcf73feb83bf43cdacda14"
							mode=""
						></image>
					</view>
				</view>
			</template>
		</readMore>
		<view class="shenhe">
			<radio-group @change="radioChange">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="item.value">
					<view class="radio_list">
						<radio style="transform:scale(0.6)" color="#0DD474" :value="item.value" :checked="index === current" />
						<text>{{ item.name }}</text>
					</view>
				</label>
			</radio-group>
			<view>审核备注:</view>
			<u--textarea class="shbz" placeholder="请输入内容" confirmType="done" count height="100"></u--textarea>
		</view>
		<view class="repair_btn">提交</view>
	</view>
</template>

<script>
import readMore from './components/readMore/readMore.vue';
export default {
	components: {
		readMore
	},
	data() {
		return {
			isShow: false, //是否展开
			items: [
				{
					value: 'true',
					name: '通过',
				},
				{
					value: 'false',
					name: '驳回'
				}
			],
			current: 0
		};
	},
	methods: {
		toChange() {
			this.isShow = !this.isShow;
		},
		radioChange: function(evt) {
			console.log(evt.detail.value);
		}
	}
};
</script>

<style lang="scss">
page {
	background: #f2f2f2;
}
.bg {
	background: #f2f2f2;
	height: 100vh;
}
.list_repair {
	border-radius: 10rpx;
	position: relative;
	margin: 30rpx auto;
	margin-bottom: 0;
	padding: 20rpx;
	width: 690rpx;
	overflow: hidden;
	background: #fff;
	font-size: 28rpx;
	.state {
		position: absolute;
		width: 120rpx;
		height: 120rpx;
		top: 20rpx;
		right: 20rpx;
		transform: rotate(30deg);
	}
	.default {
		color: #777777;
		margin-right: 15rpx;
	}
	.mb {
		margin-bottom: 40rpx;
	}
	.list_img {
		text-align: right;
		image {
			width: 160rpx;
			height: 160rpx;
			margin: 0 10rpx;
			border-radius: 10rpx;
		}
	}
}

.xia {
	display: block;
	background: #ffffff;
	margin: auto;
	padding: 20rpx;
	width: 690rpx;
	text-align: center;
	color: #0dd474;
	font-size: 50rpx;
	font-weight: bold;
}

.on {
	height: 794rpx;
}
.shenhe {
	border-radius: 10rpx;
	margin: 30rpx auto;
	padding: 20rpx;
	width: 690rpx;
	overflow: hidden;
	background: #fff;
	font-size: 28rpx;
	color: #777777;
	.radio_list {
		margin: 10rpx 0 40rpx;
	}
	.shbz {
		margin: 30rpx 0;
	}

	/deep/.u-textarea {
		background: #f5f5f5;
	}
}
.repair_btn {
	// position: absolute;
	background: #0dd474;
	color: #fff;
	width: 500rpx;
	height: 80rpx;
	margin: 180rpx auto 40rpx;
	text-align: center;
	font-size: 30rpx;
	font-weight: bold;
	line-height: 80rpx;
	border-radius: 100rpx;
}
</style>
