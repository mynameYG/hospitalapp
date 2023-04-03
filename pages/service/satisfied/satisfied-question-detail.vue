<template>
	<view class="container pl15 pr15">
		<view class="whiteBg mt15 radius4 p10" v-for="question in questionList" :key="question.id">
			<view class="title fs14 mb15">
				<text class="colormain fs12" v-if="question.type.value == 'checkbox' || question.type.value == 'radio'">【{{question.type.name}}】</text>
				{{question.title}}</view>
			<!-- 多选 -->
			<template v-if="question.type.value == 'checkbox'">
				<view class="question-item">
					<checkbox-group @change="checkboxChange">
						<view class="item-list" v-for="(item,i) in question.list" :key="i" >
							<label class="item-list-label flex">
								<checkbox color="#0DD474" style="transform: scale(0.6);" :checked="answer == 'true' && question.options.indexOf(item.id) >-1 " :value="item.id + '-' + question.id"/>
								<view class="item-list-title flex1">{{item.optionText}}</view>
							</label>
						</view>
					</checkbox-group>
				</view>
			</template>
			<!-- 单选 -->
			<template v-if="question.type.value == 'radio'">
				<view class="question-item">
					<radio-group @change="checkboxChange">
						<view class="item-list" v-for="(item,i) in question.list" :key="i" >
							<label class="item-list-label flex">
								<radio color="#0DD474" :checked="answer == 'true' && question.options.indexOf(item.id) >-1 "  :value="item.id + '-' + question.id" style="transform: scale(0.7);" />
								<view class="item-list-title flex1">{{item.optionText}}</view>
							</label>
						</view>
					</radio-group>
				</view>
			</template>
			
			<!-- 文本框 -->
			<template v-if="question.type.value == 'textarea'">
				<view class="question-item">
					<view class="model-editText">
						<textarea :name="question.id + 'content'" v-model="question.content" maxlength="-1" placeholder="请输入" placeholder-class="gray-place" class="model-textarea"></textarea>
					</view>
				</view>
			</template>
			
			
		</view>
		<view class="submit-wrap grayBg" v-if="status == 'progress'">
			<button class="tj no-after" :disabled="submitting"  @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				status:"progress",
				answer:"",
				submitting:false,
				questionList:[
					{
						id:"01",
						title:"您对后勤部的满意程度",
						type:{
							value:"radio",
							name:"单选"
						},
						list:[
							{
								id:"0101",
								optionText:"十分满意",
							},
							{
								id:"0102",
								optionText:"满意",
							},
							{id:"0103",optionText:"一般"},
							{id:"0104",optionText:"不满意"}
						]
					},
					{
						id:"04",
						title:"您对后勤部的满意程度1",
						type:{
							value:"radio",
							name:"单选"
						},
						list:[
							{
								id:"0101",
								optionText:"十分满意",
							},
							{
								id:"0102",
								optionText:"满意",
							},
							{id:"0103",optionText:"一般"},
							{id:"0104",optionText:"不满意"}
						]
					},
					{
						id:"02",
						title:"您对后勤部人员的评价",
						type:{
							value:"checkbox",
							name:"多选"
						},
						list:[
							{id:"0201",optionText:"服务周到服务周到服务周到服务周到服务周到服务服务周到服务周到服务周到服务周到"},
							{id:"0202",optionText:"用心良苦"},
							{id:"0203",optionText:"有待提高"},
							{id:"0204",optionText:"提交质量"}
						]
					},
					{
						id:"03",
						title:"您对后勤部的建议",
						type:{
							value:"textarea",
							name:"文本框"
						}
					}
				]
			}
		},
		onLoad(option) {
			this.status = option.status || "progress";
			this.answer = option.answer;
			if(option.answer == 'true'){
				this.questionList = [
					{
						id:"01",
						title:"您对后勤部的满意程度",
						type:{
							value:"radio",
							name:"单选"
						},
						list:[
							{
								id:"0101",
								optionText:"十分满意",
							},
							{
								id:"0102",
								optionText:"满意",
							},
							{id:"0103",optionText:"一般"},
							{id:"0104",optionText:"不满意"}
						],
						options:['0104']
					},
					{
						id:"02",
						title:"您对后勤部人员的评价",
						type:{
							value:"checkbox",
							name:"多选"
						},
						list:[
							{id:"0201",optionText:"服务周到服务周到服务周到服务周到服务周到服务服务周到服务周到服务周到服务周到"},
							{id:"0202",optionText:"用心良苦"},
							{id:"0203",optionText:"有待提高"},
							{id:"0204",optionText:"提交质量"}
						],
						options:['0201','0202']
					},
					{
						id:"03",
						title:"您对后勤部的建议",
						content:"暂时对后勤部没有什么建议",
						type:{
							value:"textarea",
							name:"文本框"
						}
					}
				]
			}
			if(option.pageName){
				uni.setNavigationBarTitle({
					title:option.pageName
				})
			}
		},
		methods:{
			checkboxChange: function (e) {
				const values = e.detail.value;
				console.log(e);
				let typeofV = typeof values;
				
				let options = [];
				let questionId = "";
				
				if(typeofV == 'string'){
					let list = values.split('-');
					console.log(values);
					console.log(list);
					options.push(list[0]);
					questionId = list[1];
				}else{
					values.forEach(item =>{
						let list = item.split('-');
						options.push(list[0]);
						questionId = list[1];
					})
				}
				this.questionList.forEach(item =>{
					let pushOptions = [];
					if(item.id == questionId){
						item.pushOptions = options;
					}
				})
				console.log(this.questionList);
			},
			submit(){
				console.log(this.questionList);
				let pushItem = this.questionList.map(function(item){
				  return {
				          questionId: item.id,
				          content: item.content,
				          options: item.pushOptions
				      }
				})
				let params = pushItem;
				console.log('info.questions',params);
				return
				uni.showToast({title: "提交成功",icon: 'none'});
				setTimeout(() =>{
					this.jump('/pages/service/satisfied/satisfied-question')
				},1000)
			}
		}
	}
</script>

<style lang="scss">
	.container{
		/* #ifdef H5 */
		height: calc(100vh - 88rpx);
		overflow: auto;
		/*  #endif */
	}
	.question-item{
		font-size: 28rpx;
		line-height: 1.4;
		.item-list{
			margin-bottom: 20rpx;
		}
		.item-list-title{
			line-height: 1.7;
		}
		.model-editText{
			padding:6rpx 16rpx;
			font-size: 28rpx;
			color: #333;
			line-height: 1.7;
			background-color: #F5F5F5;
			border-radius: 8rpx;
			max-height: 100px;
			overflow: auto;
			.model-textarea{
				font-size:28rpx;
				height: 100%;
				min-height: 100rpx;
			}
		}
	}
</style>