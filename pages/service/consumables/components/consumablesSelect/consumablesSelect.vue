<template>
	<view>
		<view @click="choice" class="choice">{{data.name || '请选择'}}</view>
		<u-popup :show="show" mode="bottom"  @close="close" >
			<view class="popup">
				<view class="search-stock">
					<view class="quxiao"></view>
					<input type="text" @input="input" v-model="inputvalue">
					<view class="quxiao" @click="confirm">取消</view>
				</view>
				<view class="searchresult" v-if="stockname.length > 0">
					<view class="item" @click="resdata(item)" v-for="(item,index) of stockname">
						{{item.name}}
					</view>
				</view>
				<view class="select" v-if="stockname.length == 0">
					<scroll-view scroll-y class="select-one">
						<view class="item" :class="{'ac':tabTopCurrent == index}" @click="addcolor(item,index)" v-for="(item, index) of type">{{item.title}}</view>
					</scroll-view>
					<scroll-view scroll-y class="select-two">
						<view class="item" :class="{'results':resCurrent == index}"  @click="check(item,index)" v-for="(item,index) of list">{{item.name}}</view>
					</scroll-view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		props:{
			material: null,
			currentIndex: null
		},
		data(){
			return{
				show: false,
				type:"",
				stocklist:"",
				tabTopCurrent: -1,
				resCurrent: -1,
				list:[],
				data:"",
				stockname:"",
				inputvalue:"",
			}
		},
		mounted() {
			this.getstock();
			this.gettype();
		},
		watch:{
			material(newV,oldV){
				if(newV){
					this.stocklist.forEach(res =>{
						if(res.id == newV){
							this.data = res;
						}
					})
				}
			}
		},
		methods:{
			getstock(){
				this.$http.get("/material/stock/list").then(res=>{
					this.stocklist = res;
					if(this.material){
						this.stocklist.forEach(res =>{
							if(res.id == this.material){
								this.data = res;
							}
						})
					}
				})	
			},
			gettype(){
				this.$http.get("/material/stock/type").then(res=>{
					this.type = res;
				})	
			},
			choice(){
				this.inputvalue = "";
				this.stockname = "";
				this.show = true;
			},
			addcolor(item,index){
				this.list = [];
				if(this.tabTopCurrent  != -1 && this.tabTopCurrent == index){} else {  //连续点中第一菜单 
					this.resCurrent = -1;
				}
				this.tabTopCurrent = index;
				if(this.stocklist){
					this.stocklist.forEach(res=>{
						if(res.type.code == item.code){
							this.list.push(res);
						}
					})
				}
			},
			check(item,index){
				this.resCurrent = index;
				this.data = item;
				this.$emit("change", item);
				this.show = false;
			},
			
			confirm(){
				if(this.data){
					this.$emit("change", this.data);
				}
				this.show = false;
			},
			input(e){
				var name = e.detail.value;
				if(name.length > 0 ){
					this.$http.get(`/mobile/material/manage/list?name=${name}`).then(res =>{
						this.stockname = res;
					})
				} else {
					this.stockname = "";
				}
			},
			resdata(e){
				this.data = e;
				this.$emit("change", e);
				this.show = false;
			},
			close() {
			  this.show = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
.choice{
	width:400rpx;
	text-align: right;
}	
.popup{
	width: 750rpx;
	height: 600rpx;
	padding: 20rpx;
	.search-stock{
		margin-top: 20rpx;
		display: flex;
		justify-content: space-between; 
		align-items: center;	
		.quxiao{
			font-size: 30rpx;
			color: #909193;
		}
		.queren{
			font-size: 30rpx;
			color: #0DD474;
		}
		input{
			height: 60rpx;
			width: 520rpx;
			font-size: 30rpx;
			border-radius: 10rpx;
			background-color: rgb(239, 239, 239);
			text-align: left;
		}
	}
	.searchresult{
		width: 520rpx;
		background: #fff;
		padding: 20rpx;
		margin-top: 20rpx;
		box-shadow: 0rpx 6rpx 5rpx #eee;
		text-align: center;
		margin: auto;
		.item{
			// width: 300rpx;
			height: 80rpx;
			text-align: center;
			line-height: 80rpx;
			border: 1rpx solid #eee;
			border-top: none;
			padding-left: 20rpx;
		}
	}
	
	.select{
		display: flex;
		margin-top: 30rpx;
		height: 1200rpx;
		.select-one{
			width: 350rpx;
			height: 450rpx;
			.item:first-child{
				border-top: 1rpx solid #eee;
			}
			.item{
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				border: 1rpx solid #eee;
				border-top: none;
			}
		}
		.select-two{
			width: 350rpx;
			height: 450rpx;
			.item:first-child{
				border-top: 1rpx solid #eee;
			}
			.item{
				height: 80rpx;
				text-align: center;
				line-height: 80rpx;
				border: 1rpx solid #eee;
				border-top: none;
			}
			.results{
				background: #0DD474;
				color: #FFF;
			}
		}
	}
}
.ac{
	background: #eee !important;
	color: #17181B;
}
</style>