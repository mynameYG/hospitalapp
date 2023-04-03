<template>
	<view class="container p15">
		<view class="whiteBg mb15">
			<view class="field-item flex pt10 pb10">
				<text class="ml10 color999 ">申请单位</text>
				<text class="flex1 tr mr15">{{userInfo.orgName || '-'}}</text>
			</view>
			<view class="field-item flex pt10 pb10">
				<text class="ml10 color999 ">申请人员</text>
				<text class="flex1 tr mr15">{{userInfo.nickname || '-'}}</text>
			</view>
			<view v-if="userInfo.mobile" class="field-item flex pt10 pb10">
				<text class="ml10 color999 ">联系电话</text>
				<text class="flex1 tr mr15">{{userInfo.mobile || '-'}}</text>
			</view>
		</view>
		<view class="whiteBg p15 radius4 no-pt">
			<u--form labelPosition="left" :model="applyInfo" :rules="rules" ref="applyInfoRef">
				<u-form-item label="报修类型" :required="true" prop="type" labelWidth="80" borderBottom
				@click="showType = true; hideKeyboard()" ref="item1">
					<u--input input-align="left" v-model="applyInfo.type" disabled disabledColor="#ffffff"
						placeholder="请选择报修类型" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="报修设备" prop="sn" labelWidth="80" borderBottom @click="showSn = true; hideKeyboard()" ref="item1">
					<u--input input-align="left" v-model="applyInfo.sn" disabled disabledColor="#ffffff"
						placeholder="请选择报修设备" border="none">
					</u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item class="textarea-full" :required="true" label="报修详情" prop="repairInfo" labelWidth="80" ref="item2">
					<u--textarea placeholder="请输入报修详情" maxlength="200" 
					v-model="applyInfo.repairInfo" confirmType="done" count>
					</u--textarea>
				</u-form-item>
			</u--form>	
		</view>
		<u-action-sheet :show="showType" :actions="TypeList" title="请选择报修类型" @close="showType = false"
			@select="TypeSelect">
		</u-action-sheet>
		<u-action-sheet :show="showSn" :actions="snList" title="请选择报修设备" @close="showSn = false"
			@select="SnSelect">
		</u-action-sheet> 
		<view class="submit-wrap fixed-btn">
			<ikdo-process-submit ref="submit"
				url="/app/repair/save"
				:definitionId="processId"
				@success="submitCallback" />
			<button class="tj blue-bg" @click="submitData">提交</button>
		</view>
	</view>
</template>

<script>
	import IkdoProcessSubmit from '@/components/ikdo/ikdo-process-submit.vue'
	export default{
		components:{
			"ikdo-process-submit": IkdoProcessSubmit
		},
		data(){
			return{
				code:"",
				processId:"",
				userInfo:this.$store.state.user,
				submitting:false,
				showType:false,
				showSn:false,
				applyInfo:{
					type:"",
					assetsType:"",
					assetsId:"",
					sn:"",
					assetsSn:"",
					repairInfo:""
				},
				TypeList:[],
				snList:[],
				rules:{
					type: {
						type: 'string',
						required: true,
						message: '请选择报修类型',
						trigger: ['blur', 'change']
					},
					// sn: {
					// 	type: 'string',
					// 	required: true,
					// 	message: '请选择报修设备',
					// 	trigger: ['blur', 'change']
					// },
					repairInfo: {
						type: 'string',
						required: true,
						message: '请输入报修详情',
						trigger:['blur', 'change']
					}
				}
			}
		},
		onLoad(option){
			this.code = option.code;
		},
		onNavigationBarButtonTap(e) {
			uni.navigateTo({
				url:`/pages/service/process-instructions?processId=${this.processId}`
			})
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				this.getData();
				this.getProcessId();
			},
			getProcessId(){
				this.$http.get('/app/fboot/flowable/proc/list').then(processTypes => {
					console.log('processTypes',processTypes)
					processTypes.forEach(item =>{
						for (let definition of item.definitions) {
							if(definition.key == this.code){
								this.processId = definition.id
							}
						}
					})
					console.log('this.processId',this.processId)
				})
			},
			TypeSelect(e) {
				this.applyInfo.type = e.name;
				this.applyInfo.assetsType = e.id;
				this.$refs.applyInfoRef.validateField('type');
			},
			SnSelect(e) {
				let arr = e.name.split(' ');
				console.log('arr',arr)
				this.applyInfo.sn = e.name;
				this.applyInfo.assetsSn = arr[1];
				this.applyInfo.assetsId = e.id;
				this.$refs.applyInfoRef.validateField('sn');
			},
			getData(){
				this.$http.get(`/app/repair/add`).then(res =>{
					console.log('res',res)
					this.TypeList = [];
					res.items.forEach(item =>{
						this.TypeList.push({name:item.title,id:item.code})
					})
					this.snList = [];
					res.equs.forEach(item =>{
						this.snList.push({name:item.name + ' ' + item.sn,id:item.id})
					})
				})
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			submitData() {
				let _self = this;
				console.log('this.$refs.applyInfoRef',this.$refs.applyInfoRef.model)
				this.$refs.applyInfoRef.validate().then(res => {
					let params = {
						"assetsId":this.$refs.applyInfoRef.model.assetsId,
						"assetsSn":this.$refs.applyInfoRef.model.assetsSn,
						"assetsType":this.$refs.applyInfoRef.model.assetsType,
						"repairInfo":this.$refs.applyInfoRef.model.repairInfo,
						"reporter":this.userInfo.id,
							wfParam:{
								definitionId:this.processId
							}
						}
						console.log('params',params)
						// return
					this.$refs.submit.submit(params);
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			submitCallback() {
				// 获取当前的页面栈
				let pages = getCurrentPages();
				if (pages.length > 1) {
					// 获取上一级页面，即pageA的page对象
					let prevPage = pages[pages.length - 2];
					prevPage.$vm.loadNewsList('refresh');
				}
				setTimeout(() => {
					uni.navigateBack({
						delta: 1
					});
				}, 1500);
			}
		}
	}
</script>

<style lang="scss">
	.container{
		padding-bottom: 140upx!important;
	}
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
	.fixed-btn{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 9;
	}
</style>