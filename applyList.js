var applicationList = [
	{
		code:"repair",
		icon: 'weixiu',
		color: "linear-gradient(to bottom, #FBD8B1 0, #FAAC62 100%)",
		title: '维修',
		url:"/pages/service/repair/repair?code=repair-apply",
		resources: [
			{code:"r-repairAdd",title: '维修申请',type:'apply'},
			{
				code:"r-repairHandled",
				type:'undo',
				title: '维修待办',
				buttons: ['niban','handled','transfer']},
			{code:"r-repairShenhe",title: '已办列表', permission: 'r-repairHandled',type:'handled'},
		]
	},
	{
		code:"inspection",
		icon: 'xunjian',
		color: "linear-gradient(to bottom, #B4DBF4 0, #80C6F2 100%)",
		title: '巡检',
		url:"/pages/service/inspection/inspection"
	},
	{
		code:"vehicle",
		icon: 'cheguan',
		color: "linear-gradient(to bottom, #F9ABA0 0, #E66756 100%)",
		title: '车管',
		url:"/pages/service/vehicle/vehicle",
		resources: [
			{
				code:"v-useCarRead",
				icon: 'icon-yongcheshenqingliucheng',
				iconBgcolor: "#3780e3",
				color: "linear-gradient(to bottom, #95b9ea 0, #b4cced 100%)",
				title: '用车登记',
				url:"/pages/service/vehicle/use-car-register/use-car-register?code=car-apply",
			},
			{code:"v-useCarAdd",title: '用车登记（新增）'},
			{code:"v-useCarEdit",title: '用车登记（编辑）'},
			{code:"v-useCarBack",title: '用车登记（归还）'},
			{code:"v-useCarHandled",title: '用车审批（审批）'},
			{
				code:"v-carRepairRead",
				icon: 'icon-a-ziyuan5',
				iconBgcolor: "#0DD474",
				color: "linear-gradient(to bottom, #84E3B5 0, #A2E7C6 100%)",
				title: '车辆报修',
				// url:"/pages/service/vehicle/vehicle-maintain/vehicle-maintain?code=carRepair",
				url:"/pages/service/vehicle/vehicle-maintain/vehicle-maintain?code=car-repair",
			},
			{code:"v-carRepairAdd",title: '车辆报修（新增）'},
			{code:"v-carRepairEdit",title: '车辆报修（编辑）'},
			{code:"v-carRepairEnd",title: '车辆报修（结束）'},
			{
				code:"v-useCarHandledR",
				icon: 'icon-yongcheshenqingliucheng',
				iconBgcolor: "#3780e3",
				color: "linear-gradient(to bottom, #95b9ea 0, #b4cced 100%)",
				title: '用车审批',
				url:"/pages/service/vehicle/car-approval/useCar-approval-list",
			},
			{
				code:"v-RepairHandledR",
				icon: 'icon-a-ziyuan5',
				iconBgcolor: "#0DD474",
				color: "linear-gradient(to bottom, #84E3B5 0, #A2E7C6 100%)",
				title: '报修审批',
				url:"/pages/service/vehicle/car-approval/repair-approval-list",
			},
			{code:"v-RepairHandled",title: '报修审批（审批）'}
		]
	},
	{
		code:"consumables",
		icon: 'cangku',
		color: "linear-gradient(to bottom, #BBEFD6 0, #91EABF 100%)",
		title: '耗材',
		url:"/pages/service/consumables/consumables",
		resources:[
			{
				code:"consumables-list",
				icon: 'icon-pandiansvg',
				iconBgcolor: "#3780e3",
				color: "linear-gradient(to left, #95b9ea 0, #b9cfed 100%)",
				title: '耗材列表',
				url: "/pages/service/consumables/consumables-list"
			},
			{
				code:"enter-recordSee",
				icon: 'icon-ruku',
				iconBgcolor: "#f0861e",
				color: "linear-gradient(to left, #f1bc89 0, #f2d1b1 100%)",
				title: '耗材入库',
				url: "/pages/service/consumables/record/consumables-enter"
			},
			{
				code:"enter-add",
				title: '耗材入库新增',
			},
			{
				code:"enter-edit",
				title: '耗材入库编辑',
			},
			{
				code:"enter-check",
				title: '耗材入库审核',
			},
			{
				code:"enter-del",
				title: '耗材入库删除',
			},
			{
				code:"outrecord",
				icon: 'icon-chuku',
				color: "linear-gradient(to left, #80e3b3 0, #abe9cb 100%)",
				iconBgcolor: "#0dd474",
				title: '耗材出库',
				url: "/pages/service/consumables/outrecord/consumables-out"
			},
			{
				code:"out-add",
				title: '耗材出库新增',
			},
			{
				code:"out-edit",
				title: '耗材出库编辑',
			},
			{
				code:"out-check",
				title: '耗材出库审核',
			},
			{
				code:"out-del",
				title: '耗材出库删除',
			},
			{
				code:"purchaseapply",
				icon: 'icon-chuku',
				color: "linear-gradient(to left, #FF7F97 0, #FFB2C0 100%)",
				iconBgcolor: "#FF7F97",
				title: '耗材采购',
				url: "/pages/service/consumables/purchaseapply/index"
			},
			{
				code:"purchase-add",
				title: '耗材采购新增',
			},
			{
				code:"purchase-edit",
				title: '耗材采购编辑',
			},
			{
				code:"purchase-check",
				title: '耗材采购审核',
			},
			{
				code:"purchase-del",
				title: '耗材采购删除',
			},
			{
				code:"consumingapply",
				icon: 'icon-pandiansvg',
				iconBgcolor: "#3780e3",
				color: "linear-gradient(to left, #95b9ea 0, #b9cfed 100%)",
				title: '耗材领用',
				url: "/pages/service/consumables/consumingapply/index"
			},
			{
				code:"consuming-add",
				title: '耗材领用新增',
			},
			{
				code:"consuming-edit",
				title: '耗材领用编辑',
			},
			{
				code:"consuming-check",
				title: '耗材领用审核',
			},
			{
				code:"consuming-qr",
				title: '耗材领用确认',
			},
			{
				code:"consuming-del",
				title: '耗材领用删除',
			},
		]
	},
	{
		code:"contract",
		icon: 'hetong',
		color: "linear-gradient(to bottom, #BBEFD6 0, #8AE8BB 100%)",
		title: '合同',
		url:"/pages/service/contract/contract"
	},
	{
		code:"equipment",
		icon: 'shebei',
		color: "linear-gradient(to bottom, #FBD9B2 0, #F9A75A 100%)",
		title: '设备',
		url:"/pages/service/equipment/equipment"
	},
	{
		code:"clothes",
		icon: 'gongfu',
		color: "linear-gradient(to bottom, #BBEFD6 0, #8AE8BB 100%)",
		title: '工服',
		url:"/pages/service/clothes/clothes"
	},
	{
		code:"project",
		icon: 'gongcheng',
		color: "linear-gradient(to bottom, #FBD8B2 0, #FAA75A 100%)",
		title: '项目',
		url:"/pages/service/project/project"
	},
	{
		code:"satisfied",
		icon: 'manyidu',
		color: "linear-gradient(to bottom, #B1DBF5 0, #80C7F2 100%)",
		title: '满意度',
		url:"/pages/service/satisfied/satisfied"
	},
	{
		code:"medicalWaste",
		icon: 'yifei1',
		color: "linear-gradient(to bottom, #FFB2C0 0, #FF7F97 100%)",
		title: '医废',
		url:"/pages/service/medicalWaste/medicalWaste",
		resources: [
			{
				code:"c-collect",
				icon: 'icon-xinxishouji',
				color: "linear-gradient(to bottom, #FBD8B1 0, #FAAC62 100%)",
				title: '医废收集',
				url:"/pages/service/medicalWaste/collect/collect",
			},
			{
				code:"c-collectRecord",
				icon: 'icon-bijijilu',
				color: "linear-gradient(to bottom, #B1DBF5 0, #80C7F2 100%)",
				title: '收集记录',
				url:"/pages/service/medicalWaste/collectRecord/collectRecord?code=Record",
			},
			{
				code:"c-statistics",
				icon: 'icon-tongji',
				color: "linear-gradient(to bottom, #BBEFD6 0, #8AE8BB 100%)",
				title: '收集统计',
				url:"/pages/service/medicalWaste/statistics/statistics?pageName=收集统计&code=collect",
			},
			{
				code:"c-abnormal",
				icon: 'icon-gaojingxinxi',
				color: "linear-gradient(to bottom, #FFB2C0 0, #FF7F97 100%)",
				title: '收集异常',
				url:"/pages/service/medicalWaste/abnormal/abnormal?code=collect&pageName=收集",
			},
			{
				code:"c-storage",
				icon: 'icon-gaojingxinxi',
				color: "linear-gradient(to bottom, #FFB2C0 0, #FF7F97 100%)",
				title: '入库异常',
				url:"/pages/service/medicalWaste/abnormal/abnormal?code=storage&pageName=收集",
			},
			// 医废出入库人员应用
			{
				code:"k-putIn",
				icon: 'icon-rukuguanli',
				color: "linear-gradient(to bottom, #FBD8B1 0, #FAAC62 100%)",
				title: '入库核验',
				url:"/pages/service/medicalWaste/putInOut/putInOut?pageName=入库&code=putIn",
			},
			{
				code:"k-putOut",
				icon: 'icon-chukuguanli',
				color: "linear-gradient(to bottom, #B4DBF4 0, #80C6F2 100%)",
				title: '出库核验',
				url:"/pages/service/medicalWaste/putInOut/putInOut?pageName=出库&code=putOut",
			},
			{
				code:"k-abnormal-putIn",
				icon: 'icon-gaojingxinxi',
				color: "linear-gradient(to bottom, #F9ABA0 0, #E66756 100%)",
				title: '入库异常',
				url:"/pages/service/medicalWaste/abnormal/abnormal?code=putIn&pageName=入库异常"
			},
			{
				code:"k-storage",
				icon: 'icon-rukudan',
				color: "linear-gradient(to bottom, #BBEFD6 0, #8AE8BB 100%)",
				title: '入库统计',
				url:"/pages/service/medicalWaste/statistics/statistics?pageName=入库统计&code=storage",
			},
			{
				code:"k-out",
				icon: 'icon-chukudan',
				color: "linear-gradient(to bottom, #FBD9B2 0, #F9A75A 100%)",
				title: '出库统计',
				url:"/pages/service/medicalWaste/statistics/statistics?pageName=出库统计&code=out",
			},
			{
				code:"k-temporary",
				icon: 'icon-zancun-icon',
				color: "linear-gradient(to bottom, #BBEFD6 0, #8AE8BB 100%)",
				title: '库存统计',
				url:"/pages/service/medicalWaste/statistics/statistics?pageName=暂存统计&code=temporary",
			},
			// 医废分拣人员应用
			{
				code:"n-sorting",
				icon: 'icon-fenjian-line',
				color: "linear-gradient(to bottom, #FBD8B2 0, #FAA75A 100%)",
				title: '医废分拣',
				url:"/pages/service/medicalWaste/sorting/sorting"
			},
			{
				code:"n-collectRecord",
				icon: 'icon-bijijilu',
				color: "linear-gradient(to bottom, #B1DBF5 0, #80C7F2 100%)",
				title: '分拣记录',
				url:"/pages/service/medicalWaste/collectRecord/collectRecord?code=sorting&pageName=分拣记录",
			},
			{
				code:"n-statistics",
				icon: 'icon-tongji',
				color: "linear-gradient(to bottom, #BBEFD6 0, #8AE8BB 100%)",
				title: '分拣统计',
				url:"/pages/service/medicalWaste/statistics/statistics?pageName=分拣统计&code=sorting",
			},
			{
				code:"n-abnormal",
				icon: 'icon-gaojingxinxi',
				color: "linear-gradient(to bottom, #FFB2C0 0, #FF7F97 100%)",
				title: '异常处理',
				url:"/pages/service/medicalWaste/abnormal/abnormal?code=sorting&pageName=分拣",
			}
		]
	},
	{
		code:"transport",
		icon: 'yunsong',
		color: "linear-gradient(to bottom, #FAA89D 0, #E66756 100%)",
		title: '运送',
		url:"/pages/service/transport/transport"
	},
	{
		code:"diet",
		icon: 'shanshi',
		color: "linear-gradient(to bottom, #B8DDF5 0, #80C7F2 100%)",
		title: '膳食',
		url:"/pages/service/diet/diet"
	},
	{
		code:"cleaning",
		icon: 'baojie',
		color: "linear-gradient(to bottom, #FFB7C4 0, #FF7F98 100%)",
		title: '保洁',
		url:"/pages/service/cleaning/cleaning"
	},
	{
		code:"meeting",
		icon: 'jilu2',
		color: "linear-gradient(to bottom, #FFB7C4 0, #FF7F98 100%)",
		title: '会议',
		url:"/pages/service/meeting/meeting?code=oa-meeting",
		resources: [
			{code:"m-Add",title: '会议申请',type:'apply'},
			{code:"m-Join",title: '待参加',type:'join'},
			{
				code:"m-Handled",
				type:'undo',
				title: '待办列表',
				buttons: ['niban','handled','transfer']},
			{code:"m-Shenhe",title: '已办列表', permission: 'm-Handled',type:'handled'},
		]
	}
]

var disable_application = ['contract','equipment','project',
'satisfied','transport','cleaning'];//正在开发中的应用

applicationList.forEach((item,index) =>{
	if(disable_application.includes(item.code)){
		item.url = '';
	}
});

var enableApplicationList = applicationList;
export const hasPermission = (moduleResources, permission) => {
	for(var r of moduleResources){
		if((r.permission || r.code) == permission){
			return true;
		}
		if(r.buttons && r.buttons.length > 0){
			for(var b of r.buttons){
				if(b == permission){
					return true;
				}
			}
		}
	}
	return false;
}
//用户某模块内的权限
export const userModuleResources = (moduleKey, resources) => {
	const reourceKey = Object.keys(resources);
	let len = reourceKey.length;
	let channelList = [];
	let channelCode = [];
	let channelItems = [];
	if(len > 0){
		var modules = enableApplicationList.filter(app => app.permission || app.code == moduleKey);
		// console.log('modules',modules)
		if(modules.length > 0){
			modules[0].resources.forEach((item) => {
				// console.log('item.code',reourceKey,item)
				if(reourceKey.indexOf(item.permission || item.code) > -1){
					if(item.url){
						channelList.push(Object.assign({id: resources[item.code].id}, item))
					}
					channelCode.push(item.code);
					channelItems.push(item);
				}
			})
		}
	}
	// console.log('channelCode',channelList,channelCode)
	return [channelList, channelCode, channelItems];
}
/**
 * 获取用户在应用信息
 */
export const userPrograms = (res) => {
	let applyList = []; //拥有的应用
	let homeList = []; //常用的应用
			
	enableApplicationList.forEach((item) => {
		//拥有的应用
		let programs = res.programs.filter(programs => {
			return programs.key === item.code;
		});
		
		let tops = res.tops;
		if (programs != null && programs.length > 0) {
			let item_b = Object.assign({
			              id: programs[0].id
			            }, item)
			applyList.push(item_b);
			
			//常用的应用
			if (tops.length > 0) {
				let i = tops.indexOf(item.code);
				if (i > -1) {
					item_b.sn = i;
					homeList.push(item_b);
				}
			} else {
				if (homeList.length < 7) {
					item_b.sn = homeList.length;
					homeList.push(item_b);
				}
			}
		}
	})
	homeList.sort((s1, s2) => {
		if (s1.sn <= s2.sn) return -1;
		return 1;
	});
	return [applyList, homeList];
}