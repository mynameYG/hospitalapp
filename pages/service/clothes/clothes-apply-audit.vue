<template>
	<view class="container p15 ">
		<detailInfo :info="info"></detailInfo>
		<view class="field-box whiteBg radius4 p15 pt5 pb5 mt15">
			<u--form labelPosition="left" :model="auditInfo" :rules="rules" ref="auditInfoRef">
				<u-form-item class="radio-group" label="审核结果" labelWidth="80" prop="auditResult" borderBottom ref="item2">
					<u-radio-group v-model="auditInfo.auditResult">
						<u-radio activeColor="#0DD474" size="12" :customStyle="{marginRight: '16px'}" v-for="(item, index) in auditResult" :key="index"
							:label="item.name" :name="item.name">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item class="textarea-full" label="审核备注" prop="remark" labelWidth="80" ref="item3">
					<u--textarea placeholder="请输入" maxlength="200" v-model="auditInfo.remark" count></u--textarea>
				</u-form-item>
			</u--form>
			<view class="fixed-btn-bottom grayBg">
				<view class="btn" @tap="submit">提交</view>
			</view>
		</view>
	</view>
</template>
<script>
	import detailInfo from "./components/detailInfo.vue"
	export default {
		components: {
			detailInfo
		},
		data() {
			return {
				info: {
					time: "2022-05-31",
					No: "B66558899",
					orgName: "后勤部-维修组",
					applyName: "刘婷",
					phone: "17322665588",
					applyNum: "62",
					applyType: "医技人员服装",
					reason: "新工作服"
				},
				auditInfo: {
					auditResult:"通过",
					remark: ""
				},
				auditResult: [{
						name: '通过',
						disabled: true
					},
					{
						name: '驳回',
						disabled: false
					}
				],
				rules: {
					remark: [{
						type: 'string',
						min: 3,
						required: true,
						message: '不低于3个字',
						trigger: ['change']
					}]
				}
			}
		},
		onLoad(option) {
			this.status = option.status;
			this.info.status = this.status;
		},
		methods: {
			submit() {
				this.$refs.auditInfoRef.validate().then(res => {
					uni.$u.toast('提交成功')
					setTimeout(() => {
						this.jump('/pages/service/clothes/clothes-apply')
					}, 1000)
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style lang="scss">
	.u-form {
		/deep/.u-form-item__body__left__content__label {
			font-size: 28rpx !important;
			color: #999
		}

		/deep/.u-input__content__field-wrapper__field,
		/deep/.u-textarea__field {
			font-size: 28rpx !important;
		}
	}

	.textarea-full {
		/deep/.u-form-item__body {
			flex-direction: column !important;
		}

		/deep/.u-form-item__body__left {
			margin-bottom: 30rpx !important;
		}

		/deep/.u-textarea {
			background-color: #F5F5F5;
			border: 0 !important;
		}

		/deep/.u-textarea__count {
			background-color: transparent !important;
		}
	}
</style>
