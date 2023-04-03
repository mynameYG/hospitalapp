<template>
	<view class="container">
		<view class="model-input-box whiteBg">
			<view class="model-input-item flex flexmid">
				<text class="model-label require">原密码：</text>
				<input type="text" v-model="oldPassword" placeholder="请输入原密码" class="model-input flex1 " require>
			</view>
		</view>
		<view class="model-input-box whiteBg">
			<view class="model-input-item flex flexmid">
				<text class="model-label require">新密码：</text>
				<input type="text" v-model="password" placeholder="请输入新密码" class="model-input flex1 " require>
			</view>
			<view class="model-input-item flex flexmid">
				<text class="model-label require">确认密码：</text>
				<input type="text" v-model="passwordCopy" placeholder="请再次输入新密码" class="model-input flex1 " require>
			</view>
		</view>
		
		<view class="submit-wrap">
			<view class="tj" @click="submitData()">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPassword: "",
				password: "",
				passwordCopy: ""
			}
		},
		mounted() {},
		methods: {
			submitData() {
				if (!this.oldPassword) {
					uni.showToast({
						icon: 'none',
						title: '请输入原始密码'
					});
					return;
				}
				if (!this.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入新密码'
					});
					return;
				}
				if (!this.passwordCopy) {
					uni.showToast({
						icon: 'none',
						title: '请输入确认密码'
					});
					return;
				}

				if (this.password != this.passwordCopy) {
					uni.showToast({
						icon: 'none',
						title: '新密码和确认密码不一致'
					});
					return;
				}
				this.$http.post('/app/password?oldPassword=' + this.oldPassword + '&password=' + this.password).then(r => {
					uni.showToast({
						icon: 'none',
						title: '提交成功'
					})
					setTimeout(() => {
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}, 2000)
				}).catch(err => {
					uni.showToast({
						title: err,
						icon: 'none'
					})
				});
			}
		},
	}
</script>

<style lang="scss">
	.model-input-box {
		margin-top:30rpx;
		padding: 0 30rpx;
		.model-input-item {
			padding:24rpx 0;
			.model-label {
				margin-right: 20rpx;
				font-size: 28rpx;
				color: #333;
				line-height: 42rpx;
			}

			.model-input {
				font-size: 28rpx;
			}
		}
	}
	.submit-wrap{
		margin-top: 80rpx;
	}
</style>
