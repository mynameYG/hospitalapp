import Vue from 'vue'

import App from './App'
import store from './store'
import http from '@/util/http'
import hasPermission from '@/util/hasPermission'
import config from '@/config.js'
import attachmentCheck from '@/components/attachment/attachment-check.vue'
import attachmentUpload from "@/components/attachment/attachment-upload.vue"
import uniSearchBar from '@/components/uni-components/uni-search-bar/uni-search-bar.vue'
// 医废组件
import processListVue from "@/components/ikdo/medicalWaste/processList.vue"
import itemInfoDetailVue from "@/components/ikdo/medicalWaste/itemInfo-detail.vue"
import itemInfoListItem from "@/components/ikdo/medicalWaste/itemInfo-listItem.vue"

// 引入uview组件
import uView from "uview-ui";
Vue.use(uView);
Vue.component("uni-search-bar",uniSearchBar)

Vue.component("attachmentCheck", attachmentCheck)
Vue.component("attachmentUpload", attachmentUpload)
Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.prototype.$config = config
Vue.prototype.$http = http

Vue.component("process-list",processListVue)
Vue.component("itemInfo-detail",itemInfoDetailVue)
Vue.component("itemInfo-listItem",itemInfoListItem)

Vue.mixin({
	methods: {
		hasPermission,
		fileUrl(url) {
			if(url){
				let fileUrl = url;
				if(config.contextPath){
					if(url.substr(0, config.contextPath.length) != config.contextPath){
						fileUrl = config.contextPath + fileUrl;
					}
				}
				return config.serverHost + fileUrl;
			}
		},
		fileRUrl(url) {
			return this.fileUrl('/r/' + url);
		},
		//主域名
		mainHost(url){
			return config.serverHost;
		}
	}
})

import util from '@/util/util.js'
for(var p in util){
	Vue.prototype[p] = util[p]
}

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
