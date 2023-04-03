import Vue from 'vue'
import http from '@/util/http'

//工作流程跳转详情
export const navToDetails = function(taskId) {
	http.get(`/app/fboot/flowable/proc/undo/${taskId}`).then(res => {
		console.log('res',res)
		var jsons = {
			'repairApply': {
				'niban': `/pages/service/repair/repair-niban`,
				'handle': `/pages/service/repair/repair-handle`,
				'examine': `/pages/service/repair/repair-examine`,
			},
			'carApply': {
				'edit': `/pages/service/vehicle/car-approval/use-car-register-edit`,
				'handle': `/pages/service/vehicle/car-approval/useCar-handle`,
				'givekey': `/pages/service/vehicle/car-approval/use-car-register-detail`,
			},
			"carRepair":{
				'edit': `/pages/service/vehicle/vehicle-maintain/vehicle-maintain-edit`,
				'handle': `/pages/service/vehicle/vehicle-maintain/vehicle-maintain-handle`,
			},
			"meetingApply":{
				'handle': `/pages/service/meeting/meeting-handle`,
			}
		};
		if (res.taskKey.indexOf("[") > 0) {
			res.taskKey = res.taskKey.substring(0, res.taskKey.indexOf("["))
		}
		uni.navigateTo({
			url: jsons[res.businessCode][res.taskKey] + `?id=${res.businessId}&taskId=${taskId}&code=${res.businessCode}&isAudit=${res.isAudit}&taskKey=${res.taskKey}`
		});
	}).catch(err => {
		uni.showToast({
			title: err,
			icon: 'none'
		})
	});
}

//待办事项(已办)跳转详情
export const ToDoedDetails = function(businessCode, businessId) {
	var jsons = {
		'repairApply': {
			'detail': `/pages/service/repair/repair-detail`
		},
		'carApply': {
			'detail': `/pages/service/vehicle/use-car-register/use-car-register-detail`
		},
		'carRepair': {
			'detail': `/pages/service/vehicle/vehicle-maintain/vehicle-maintain-detail`
		},
		"meetingApply":{
			'detail': `/pages/service/meeting/meeting-detail`,
		}
	};
	uni.navigateTo({
		url: jsons[businessCode]['detail'] + `?id=${businessId}`
	});
}