<template>
	<view class="container p15">
		<detailInfo :info="info"></detailInfo>
		<processList :processList="processList"></processList>
		
	</view>
</template>

<script>
	
	import detailInfo from "./components/detailInfo.vue"
	import processList from "./components/processList.vue"
	export default {
		components:{
			detailInfo,
			processList
		},
		data(){
			return{
				status:"",
				info:{
					time:"2022-05-31",
					No:"B66558899",
					orgName:"后勤部-维修组",
					applyName:"刘婷",
					phone:"17322665588",
					applyNum:"62",
					applyType:"医技人员服装",
					reason:"新工作服"
				},
				processList:[
					{name:'刘婷',createTime:"2022-05-31 10:25"},
					{name:"张海涛",createTime:"2022-05-31 11:30",auditResult:true,auditComment:"审核通过"}
					
				]
			}
		},
		onLoad(option){
			this.status = option.status;
			this.info.status = this.status;
			if(option.pageName){
				uni.setNavigationBarTitle({
					title: option.pageName + '详情'
				})
			}
		},
		methods:{}
	}
</script>

<style lang="scss">
	.container{
		/* #ifdef H5 */
		height: calc(100vh - 88upx);
		/*  #endif */
	}
	.field-box {
		position: relative;
		.field-title{
			padding-bottom:20rpx;
			color:#777;
			border-bottom: 2rpx solid #F2F2F2;
		}
	}
</style>