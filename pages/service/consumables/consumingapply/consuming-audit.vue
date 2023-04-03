<template>
	<view>
		<readMore :height="180">
			<template class="readmore" slot="readMore">
				<view class="out mb15">
					<view class="flex mb10 flexbet">
						<view class="out_font">{{dateFilter(info.applyDate)}}</view>
						<view class="name">
							<text class="iconfont icon-chuku"></text>
							<text class="ml5">{{info.applyName}}</text>
						</view>
					</view>
					<view class="flex">
						<view class="out_font">所属科室:</view>
						<view>
							<text class="ml5">{{info.departmentName}}</text>
						</view>
					</view>
				</view>
				
				<view class="out mb15" v-if="info.auditDate">
					<view class="flex mb10">
						<view class="out_font">审核人:</view>
						<view>
							<text class="ml5">{{info.auditName}}</text>
						</view>
					</view>
					<view class="flex">
						<view class="out_font">审核时间:</view>
						<view>
							<text class="ml5">{{dateFilter(info.auditDate)}}</text>
						</view>
					</view>
					<view class="flex" v-if="info.remark">
						<view class="out_font">审核内容:</view>
						{{info.remark}}
					</view>
				</view>
				
				<view class="out mb15" v-for="(item,index) of info.details" :key="index">
					<view class="flex mb15">
						<view class="out_font">耗材名称 <text class="ml5">:</text></view>
						<view class="ml5">{{item.name}}</view>
					</view>
					<view class="flex mb15">
						<view class="out_font">仓库 <text class="ml5">:</text></view>
						<view class="ml5">{{item.warehouseName}}</view>
					</view>
					<view class="flex">
						<view class="out_font">领用数量 <text class="ml5">:</text></view>
						<view class="ml5">{{item.consumingNumber}}</view>
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
			<u--textarea class="shbz" v-model="proposal" placeholder="请输入内容" confirmType="done" count height="100"></u--textarea>
		</view>
		<view class="repair_btn" @click="submit">提交</view>
	</view>
</template>

<script>
	import readMore from './../components/readMore/readMore.vue';
	export default {
		components: {
			readMore
		},
		data(){
			return{
				id:"",
				info:{},
				previewImgList:[],
				file:[],
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
				current: 0,
				result: true,
				proposal:""
			}
		},
		onLoad(options) {
			this.id = options.id;
		},
		mounted() {
			this.$http.get(`/mobile/material/consuming/${this.id}`).then(res =>{
				this.info = res;
			})
		},
		methods:{
			radioChange(e){
				this.result = e.detail.value;
			},
			submit(){
				this.$http.put(`/mobile/material/consuming/audit/${this.id}?auditReason=${this.proposal}&auditResult=${this.result}`).then(res =>{
					uni.navigateBack();
				})
			}
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
		.icon-chuku{
			vertical-align: middle;
		}
	}
	.mb25{
		margin-bottom: 50rpx;
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
	margin: 60rpx auto 40rpx;
	text-align: center;
	font-size: 30rpx;
	font-weight: bold;
	line-height: 80rpx;
	border-radius: 100rpx;
}
.repair_btn:after {
	content:"";
	display: block;
	height: 80rpx;
}
</style>