<template>
	<view class="container p15">
		<detailInfo ref="detailInfoRef" :infoId="id" :status="status" @getHistory="getHistory" @getEvaluate="getEvaluate"></detailInfo>
		<processList v-if="history" :history="history"></processList>
		<view class="submit-wrap fixed-btn"  
			v-if="resourcesCode.includes('r-repairAdd')
			&& !evaluate
			&& status == 'over'">
			<button class="tj blue-bg" @click="evaluateFun(id)">评价</button>
		</view>
		
		<!-- 评价 -->
		<evaluateVue v-if="resourcesCode.includes('r-repairAdd') && !evaluate && status == 'over'" ref="evaluatePopup" :info="info" @refresh="updateData"></evaluateVue>
	</view>
</template>
<script>
	import evaluateVue from "./components/popup-evaluate.vue"
	import detailInfo from "@/pages/service/repair/components/detailInfo.vue"
	import processList from "@/pages/service/vehicle/components/processList.vue"
	export default {
		components:{
			detailInfo,
			processList,
			evaluateVue
		},
		data(){
			return{
				id:"",
				resourcesCode:this.$store.getters.getModuleResources('repair')[1],//用户权限标识
				status:'',
				history: {},
				evaluate:null,
				info:{}
			}
		},
		onLoad(option) {
			this.status = option.status,
			this.id = option.id
		},
		methods:{
			getHistory(data){
				console.log('data',data)
				this.history = data;
			},
			getEvaluate(data){
				this.evaluate = data;
				console.log('this.evaluate ',this.evaluate )
			},
			//评价
			evaluateFun(item){
				this.info ={
					infoId:this.id,
					putUrl:'/app/repair/evaluate'
				}
				this.$refs.evaluatePopup.init();
			},
			updateData(){
				this.$refs.detailInfoRef.init();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		/* #ifdef H5 */
		height: calc(100vh - 88upx);
		/*  #endif */
		overflow: auto;
		background: rgb(242, 242, 242);
	}
	.fixed-btn{
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 9;
	}
</style>
