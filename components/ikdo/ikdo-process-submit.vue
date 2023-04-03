<template>
	<uni-popup ref="nextTaskAssigneePopup" type="bottom" :maskClick="false" @change="change">
		<view class="ikdo-wf-submit">
			<text class="ikdo-wf-submit-title">{{title}}</text>
			<view class="ikdo-wf-submit-content">
				<view class="goout-item flex" @click="$refs.nextTaskAssignee.choose()">
					<text class="goout-text1 require">任务办理人</text>
					<view class="flex1 tr">
						<template v-if="nextTaskAssignee.length < 1">
							<text style="color:#909090;font-size: 14px;">请选择</text>
						</template>
						<person-picker ref="nextTaskAssignee" type="nextTaskAssignee" :multi="false" :persons.sync="nextTaskAssignee"></person-picker>
					</view>
					<text class="goout-text3"><text class="iconfont icon-jinru" style="color: #909090;"></text></text>
				</view>
			</view>
			<view class="submit-wrap flex position-static">
				<button class="tj flex1 grayBg" @click="close()">取消</button>
				<button class="tj blue-bg flex1" @click="submit_()">提交</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import PersonPicker from "@/components/contacts-picker/person-picker.vue"
	
	export default {
		components: {
			uniPopup,
			PersonPicker
		},
		props: {
			url: String,
			callback: {
				type: Function
			}
		},
		data() {
			return {
				title: '',
				param: undefined,
				nextTaskAssignee: []
			}
		},
		methods: {
			close(){
				this.$refs.nextTaskAssigneePopup.close();
			},
			change(e) {
				if (!e.show) {
					this.param = undefined;
				}
				this.nextTaskAssignee = [];
			},
			submit(params) {
				this.param = params;
				this.post();
			},
			submit_() {
				if (this.nextTaskAssignee.length <= 0) {
					uni.showToast({
						title: "请选择任务办理人",
						icon: 'none'
					});
					return;
				};
				if (this.param.wfParam) {
					this.param.wfParam.nextTaskAssignee = this.nextTaskAssignee[0].id;
				} else {
					this.param.nextTaskAssignee = this.nextTaskAssignee[0].id;
				}
				this.post();
			},
			post() {
				this.$http.post(this.url, this.param).then(res => {
					uni.showToast({
						title: "提交成功！",
						icon: 'none'
					});
					this.$emit("success");
				}).catch(({code, msg, toast}) => {
					if (code === 20200214) {
						this.title = msg;
						this.$refs.nextTaskAssigneePopup.open();
					} else {
						toast(msg);
					}
				});
			}
		}
	}
</script>

<style scoped>
	.ikdo-wf-submit {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		background-color: #fff;
	}
	
	.ikdo-wf-submit-title {
		line-height: 60rpx;
		font-size: 36rpx;
		padding: 15rpx 0;
		text-align: center;
	}
	
	.ikdo-wf-submit-content {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 15px;
	}
	
	.ikdo-wf-submit-btn {
		margin:30px 15px;
		height: 80rpx;
		background-color: #3D9CFC;
		border-radius: 5px;
		line-height: 80rpx;
		font-size: 14px;
		border-top-color: #f5f5f5;
		border-top-width: 1px;
		border-top-style: solid;
		text-align: center;
		color: #fff;
	}
	.goout-item{
		width: 100%;
	}
	.goout-text1{
		font-size: 14px;
	}
	.goout-text3 .iconfont{
	    font-size: 14px;
	    color: #909090;
	}
</style>
