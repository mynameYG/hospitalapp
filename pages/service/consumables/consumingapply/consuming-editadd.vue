<template>
	<view>
		<view class="out mb15" v-for="(item,index) of ruleForm.stocks" :key="index">
			<view class="iconfont close icon-guanbi" @click="close(index,ruleForm.stocks)"></view>
			<view class="flex flexbet mb25 require">
				<view class="out_font">耗材名称 <text class="ml5">:</text></view>
				<!-- <MyPicker v-model="item.materialId" @change="gethcname($event,item)"  :options="hcname" range-value="id" range-key="name"></MyPicker> -->
				<consumablesSelect @change="consumables($event,item)" :material="item.materialId" :currentIndex="index"></consumablesSelect>
			</view>
			<view class="flex flexbet mb25 require">
				<view class="out_font">仓库 <text class="ml5">:</text></view>
				<MyPicker v-model="item.warehouseId" @change="getckname($event,item)" :options="ckname" range-value="id" range-key="name"></MyPicker>
			</view>
			<view class="flex flexbet mb25 require">
				<view class="out_font">库存 <text class="ml5">:</text></view>
				<view class="ml5">{{item.stockNumber}}</view>
			</view>
			<view class="flex flexbet require">
				<view class="out_font">领用数量 <text class="ml5">:</text></view>
				<view class="ml5"><input type="text" v-model="item.consumingNumber" placeholder="请输入"></view>
			</view>
		</view>
		<view @click="addstocks" class="add mb15">添加</view>
		<view class="xinzeng">
			<view class="repair_btn" @click="add()">提交</view>
		</view>
	</view>
</template>

<script>
	import PersonPicker from "@/components/contacts-picker/person-picker.vue"
	import MyPicker from "../components/MyPicker/MyPicker.vue"
	import consumablesSelect from "../components/consumablesSelect/consumablesSelect.vue"
	export default {
		components: {
			MyPicker,
			PersonPicker,
			consumablesSelect
		},
		data(){
			return{
				hcname:[],
				ckname:[],
				ruleForm:{
					stocks:[
						{
							materialId: "",//耗材名称
							warehouseId: "",//仓库id
							stockNumber:"", //库存
							consumingNumber:"",//领用数量
						}
					]
				},
				id:"",
				type:""
			}
		},
		onLoad(options) {
			if(options.type){
				this.type = options.type;
				uni.setNavigationBarTitle({
					title: options.type == 'add' ? '新增领用' : '编辑'
				})
			}
			if(options.id){
				this.id = options.id
			}
			
		},
		mounted() {
			this.getck();
			if(this.type == 'edit' && this.id) {
				this.$http.get(`/mobile/material/consuming/${this.id}`).then(res =>{
					this.ruleForm.stocks = res.details;	 
				})
			}
		},
		methods:{
			consumables(e,item){
				item.materialId = e.id;
				if(item.warehouseId){
					this.$http.get(`/material/check/record/number/${e.id}?warehouseId=${item.warehouseId}`).then(res =>{
						item.stockNumber = res;
					})
				}
			},
			//耗材名称
			gethcname(e,item){
				if(item.warehouseId){
					this.$http.get(`/material/check/record/number/${e}?warehouseId=${item.warehouseId}`).then(res =>{
						item.stockNumber = res;
					})
				}
			},
			
			//仓库
			getckname(e,item){
				if(item.materialId){
					this.$http.get(`/material/check/record/number/${item.materialId}?warehouseId=${e}`).then(res =>{
						item.stockNumber = res;
					})
				}
			},
			
			getname(){
				this.$http.get(`/material/stock/list`).then(res =>{
					this.hcname = res;
				})
			},
			
			getck(){
				this.$http.get(`/material/stock/warehouse/list`).then(res =>{
					this.ckname = res;
				})
			},
			
			addstocks(){
				this.ruleForm.stocks.push({
					materialId: "",//耗材名称
					warehouseId: "",//仓库id
					stockNumber:"", //库存
					consumingNumber:"",//领用数量
				})
			},
			
			close(index,list){
				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					success: function (res) {
						if (res.confirm) {
							list.splice(index,1);
						}
					}
				});
			},
			
			add(){
				var sign = false;
				this.ruleForm.stocks.forEach(res =>{
					if(!res.materialId){
						uni.showToast({
							title:"请选择耗材",
							icon:"none"
						})
						return
					}
					if(!res.warehouseId){
						uni.showToast({
							title:"请选择仓库",
							icon:"none"
						})
						return
					}
					if(!res.consumingNumber){
						uni.showToast({
							title:"请输入领用数量",
							icon:"none"
						})
						return
					}
					if(res.consumingNumber > res.stockNumber) {
						uni.showToast({
							title:"库存不足",
							icon:"none"
						})
						return
					}
					sign = true;
				})
				var params = {
					details: this.ruleForm.stocks
				}
				
				if(sign) {
					
					if(this.type == "add"){
						this.$http.post(`/mobile/material/consuming`,params).then(res =>{
							uni.navigateBack();
						})
					}	
					
					if(this.type == "edit") {
						this.$http.put(`/mobile/material/consuming/${this.id}`,params).then(res =>{
							uni.navigateBack();
						})
					}
				}
			},
			
			getFile(data){//接收修改后的组件数据
				this.files = data; 
			},
		}
	}
</script>

<style lang="scss">
page{
	background: #f2f2f2;
	padding-top: 30rpx;
}
.out{
	position: relative;
	background: #fff;
	width: 690rpx;
	margin: auto;
	padding: 20rpx;
	padding-top: 60rpx;
	border-radius: 10rpx;
	font-size: 28rpx;
	.out_font{
		color: #777777;
	}
	.name{
		color: #0DD474;
	}
	.mb25{
		margin-bottom: 50rpx;
	}
	input{
		text-align: right;
		font-size: 28rpx;
	}
	.pickercontent{
		border: 1px solid red;
		padding-left: 100rpx;
		.pickericon{
			color: #777777;
			font-size: 26rpx;
		}
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
	.close{
		// border: 1px solid ;
		width: 60rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		border-radius: 50%;
		position: absolute;
		right: -10rpx;
		top: -10rpx;
		background-color: #fff;
		// float: right;
		// font-size: 20px;
	}
	
}
.add{
	width: 100rpx;
	height: 50rpx;
	border-radius: 10rpx;
	font-size: 28rpx;
	margin-left: 40rpx;
	background: #e6a23c;
	color: #fff;
	line-height: 50rpx;
	text-align: center;	
	margin-bottom: 100rpx;
}
.add:after{
	content:"";
	display: block;
	height: 300rpx;
}
.xinzeng{
	width: 100%;
	background: #fff;
	height: 120rpx;
	position: fixed;
	bottom: 0;
	box-shadow: 0px -1px 6px #dfdfdf;
	.repair_btn{
		background: #0DD474;
		color: #fff;
		width: 500rpx;
		height: 80rpx;
		margin: auto;
		margin-top: 20rpx;
		text-align: center;
		font-size: 30rpx;
		font-weight: bold;
		line-height: 80rpx;
		border-radius: 100rpx;
	}
}
.file-border {
	display: inline-block;
	width: 30px;
	height: 30px;
	border: 1px solid #eeeeee;
	text-align: center;
	.icon-zengjia {
		font-size: 14px;
		color: #bfbfbf;
		line-height: 30px;
	}
}
/deep/.name{
	color: #000;
}
</style>