<template>
	<view>
		<view class="field-box whiteBg radius4 p15">
			<status :status="info.status"></status>
			<view class="field-title fs16 flex1 no-bb pb10">{{dateFilter(info.reportTime)}}</view>
			<view class="field-item flex">
				<view class="field-label mr5">申请单位：</view>
				<view class="field-con flex1">{{info.orgName || '-'}}</view>
			</view>
			<view class="field-item flex">
				<view class="field-label mr5">申请人员：</view>
				<view class="field-con flex1">{{info.reporterName || '-'}}</view>
			</view>
			<view class="field-item flex"  v-if="userInfo.mobile">
				<view class="field-label mr5">联系电话：</view>
				<view class="field-con flex1">{{userInfo.mobile || '-'}}</view>
			</view>
			<view class="field-item flex">
				<view class="field-label mr5">设备类型：</view>
				<view class="field-con flex1">{{info.assetsTypeName || ""}}</view>
			</view>
			<view class="field-item flex" v-if="info.assetsSn">
				<view class="field-label mr5">设备编号：</view>
				<view class="field-con flex1">{{info.assetsSn || ""}}</view>
			</view>
			<view class="field-item flex">
				<view class="field-label mr5">报修详情：</view>
				<view class="field-con flex1">{{info.repairInfo}}</view>
			</view>
			<view class="field-item flex" v-if="info.proposedOpinion">
				<view class="field-label mr5">拟办意见：</view>
				<view class="field-con flex1">{{info.proposedOpinion}}</view>
			</view>
			<view class="field-item flex" v-if="record && record.repairManName">
				<view class="field-label mr5">转单人：</view>
				<view class="field-con flex1">{{record.repairManName}}</view>
			</view>
			<view class="field-item flex" v-if="record && record.transferTime">
				<view class="field-label mr5">转单时间：</view>
				<view class="field-con flex1">{{dateFilter(record.transferTime)}}</view>
			</view>
			<view class="field-item flex" v-if="record && record.transferReason">
				<view class="field-label mr5">转单原因：</view>
				<view class="field-con flex1">{{record.transferReason}}</view>
			</view>
			<view class="field-item flex" v-if="record && record.transferManName">
				<view class="field-label mr5">办理人：</view>
				<view class="field-con flex1">{{record.transferManName}}</view>
			</view>
			<view class="field-item flex" v-if="record && record.finishTime">
				<view class="field-label mr5">办理时间：</view>
				<view class="field-con flex1">{{dateFilter(record.finishTime)}}</view>
			</view>
			<view class="field-item flex" v-if="record && record.repairContent">
				<view class="field-label mr5">办理内容：</view>
				<view class="field-con flex1">{{record.repairContent}}</view>
			</view>
			<view class="detail-box">
				<attachmentCheck v-if="fileList.length > 0" color="#999" :atts="fileList" :previewImgList="previewImgList" title="附件"></attachmentCheck>
			</view>
		</view>
		
		<!-- 审核结果 -->
		<view class="detail-info" v-if="optionList.length > 0">
			<view class="detail-wrap mt15 no-mb" v-for="(item,index) in optionList" :key="index">
				<view class="detail-item flex">
					<text class="detail-label">审核时间：</text>
					<text class="detail-text flex1">{{item.approvalTime || '-'}}</text>
				</view>
				<view class="detail-item flex">
					<text class="detail-label">审核人：</text>
					<text class="detail-text flex1">{{item.userName || ''}}</text>
				</view>
				<view class="detail-item flex">
					<text class="detail-label">审核结果：</text>
					<text class="detail-text flex1">{{item.result == '1'?'通过':'未通过'}}</text>
				</view>
				<view class="detail-item flex">
					<text class="detail-label">审核意见：</text>
					<text class="detail-text flex1">
						<text class="textarea-auto">
							{{item.option || '-'}}
						</text>
					</text>
				</view>
			</view>
		</view>
		
		<!-- 评价结果 -->
		<view class="detail-info mt15" v-if="evaluate">
			<view class="detail-wrap no-mb">
				<view class="detail-item flex">
					<text class="detail-label">评价时间：</text>
					<text class="detail-text flex1">{{dateFilter(evaluate.commentTime)}}</text>
				</view>
				<view class="detail-item flex">
					<text class="detail-label">评分：</text>
					<view class="detail-text flex1">
						<u-rate class="rate" size="22" :readonly="true"  activeColor="#f6bf34" count="5" v-model="evaluate.commentStar">
						</u-rate>
					</view>
				</view>
				<view class="detail-item flex" v-if="evaluate.commentInfo">
					<text class="detail-label">评价内容：</text>
					<text class="detail-text flex1">
						<text class="textarea-auto">
							{{evaluate.commentInfo || '-'}}
						</text>
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import status from "@/components/ikdo/status.vue"
	export default {
		components:{
			status
		},
		props: {
			infoId:"",
			status:"",
		},
		data(){
			return {
				show:true,
				info:{},
				record:{
					repairManName:"",
					transferManName:"",
				},
				fileList:[],
				previewImgList:[],
				userInfo:this.$store.state.user,
				optionList:[],
				evaluate:null
			}
		},
		mounted() {
			this.init();
		},
		methods:{
			init(){
				this.getInfo();
			},
			getInfo(){
				this.$http.get(`/app/repair/detail?id=${this.infoId}`).then(res=>{
					this.info = res.data;
					this.record = res.record;
					if(res.repairMan){
						this.record.repairManName = res.repairMan;//转办人
					}
					if(res.transferMan){
						this.record.transferManName = res.transferMan;//被转办人
					}
					this.info.orgName = res.orgName;
					this.info.status = res.data.status;
					this.history = res.history;
					this.previewImgList = [];
					this.fileList = [];
					if(res.fileList){
						let FList = JSON.parse(res.fileList);
						console.log('FList',FList)
						for (var i = 0; i < FList.length; i++) {
							if(this.matchType(FList[i].fileName) == 'image'){
								this.previewImgList.push(this.fileUrl(FList[i].url))
							}
							this.fileList.push({
								url:this.fileUrl(FList[i].url),
								fileName:FList[i].fileName,
								fileType:this.matchType(FList[i].fileName),
								downloadUrl:this.fileUrl(FList[i].url)
							})
						}
						
					}
					this.$emit("getHistory", this.history);
					if(this.record){
						this.$emit("getTransfer", this.record.transfer);
					}
					if(res.optionList && res.optionList.length > 0){
						this.optionList = [];
						this.optionList = res.optionList;
					}
					if(res.evaluate){
						this.evaluate = res.evaluate;
						this.$emit("getEvaluate", res.evaluate);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.field-label{
		min-width:70px;
		text-align-last:justify;
	}
	.detail-wrap{
		position: relative;
		padding:15px;
		margin-bottom:15px;
		background-color: #fff;
		border-radius: 5px;
		.detail-item{
			.detail-label {
				display: inline-block;
				line-height: 26px;
				margin-right: 10px;
				min-width:70px;
				text-align-last: justify;
				font-size: 14px;
				color: #777;	
			}
			
			.detail-text {
				font-size: 14px;
				color: #333;
				line-height: 26px;
				/deep/ uni-text + uni-text{
					margin-left:5px;
				}
				.iconfont{
					color:#ddd;
				}
				.icon-xuanzhong{
					color:#FFC200
				}
			}
		}
		.textarea-auto{
			max-height: 72px;
			overflow-y: auto;
		}
	}
</style>