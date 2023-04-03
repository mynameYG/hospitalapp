<template>
	<view class="container p15 ">
		<view class="field-box whiteBg radius4 p15 pt5 pb5">
			<view class="field-item flex">
				<view class="field-label mr10">申请科室</view>
				<view class="field-con flex1 tr">后勤部-巡检组</view>
			</view>
			<view class="field-item flex">
				<view class="field-label mr10">申请人员</view>
				<view class="field-con flex1 tr">王海涛</view>
			</view>
			<view class="field-item flex">
				<view class="field-label mr10">所属院区</view>
				<view class="field-con flex1 tr">郑东院区</view>
			</view>
		</view>
		<view class="field-box whiteBg radius4 p15 pt5 pb5 mt15">
			<u--form labelPosition="left" :model="applyInfo" :rules="rules" ref="applyInfoRef">
				<u-form-item label="被服类型" prop="type" labelWidth="80" @click="showType = true; hideKeyboard()"
					ref="item1">
					<u--input input-align="right" v-model="applyInfo.type" disabled disabledColor="#ffffff" placeholder="请选择被服类型"
						border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="被服数量" prop="number" labelWidth="80" ref="item2">
					<u--input input-align="right"  v-model="applyInfo.number" border="none" placeholder="请输入申请被服数量"></u--input>
				</u-form-item>
				<u-form-item class="textarea-full" label="报废原因" prop="reason" labelWidth="80" ref="item3">
					<u--textarea placeholder="请输入报废原因" maxlength="200" v-model="applyInfo.reason" count></u--textarea>
				</u-form-item>
			</u--form>
			<u-action-sheet :show="showType" :actions="typeList" title="请选择被服类型" @close="showType = false"
				@select="TypeSelect">
			</u-action-sheet>
			
			<view class="fixed-btn-bottom grayBg">
				<view class="btn" @tap="submit">提交</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				showType: false,
				applyInfo: {
					type: "",
					number: "",
					reason: ""
				},
				typeList: [{
						name: '病人服装',
					},
					{
						name: '医技人员服装',
					},
					{
						name: '药房人员服装',
					},
					{
						name: '行政人员服装',
					},
					{
						name: '护士服',
					}
				],
				 rules: {
					type: [{
						 type: 'string',
						 required: true,
						 message: '请选择被服类型',
						 trigger: ['blur', 'change']
					}],
					number:[{
						type: 'string',
						required: true,
						message: '请输入申请被服数量',
						trigger: ['blur', 'change']
					}],
					reason:[{
						type: 'string',
						min: 3,
						required: true,
						message: '不低于3个字',
						trigger: ['change']
					}]
				}
			}
		},
		methods: {
			TypeSelect(e) {
				this.applyInfo.type = e.name
				this.$refs.applyInfoRef.validateField('type');
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			submit(){
				this.$refs.applyInfoRef.validate().then(res => {
					uni.$u.toast('提交成功')
					setTimeout(() =>{
						this.jump('/pages/service/clothes/clothes-writtenOff')
					},1000)
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			}
		}
	}
</script>

<style lang="scss">
	.u-form{
		/deep/.u-form-item__body__left__content__label{
			font-size: 28rpx!important;
			color:#999
		}	
		/deep/.u-input__content__field-wrapper__field,
		/deep/.u-textarea__field{
			font-size: 28rpx!important;
		}
	}
	
	.textarea-full{
		/deep/.u-form-item__body{
			flex-direction: column!important;
		}
		/deep/.u-form-item__body__left{
			margin-bottom:30rpx!important;
		}
		/deep/.u-textarea{
			background-color:#F5F5F5;
			border: 0 !important;
		}
		/deep/.u-textarea__count{
			background-color: transparent!important;
		}
	}
</style>
