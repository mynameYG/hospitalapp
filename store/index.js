import Vue from 'vue'
import Vuex from 'vuex'
import { userPrograms, userModuleResources } from '@/applyList.js'


Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		/**
		 * 是否需要强制登录
		 */
		hasLogin: false,
		user: {
			id: '',
			username: '',
			nickname: '',
			sessionId: ''
		},
		resources: {} ,//拥有权限
		ApplyList: [], //拥有的应用列表
		HomeList: [], //首页的应用列表
	},
	mutations: {
		login(state, {
			user,
			resources
		}) {
			state.user = user;
			state.resources = resources;
			state.hasLogin = true;
			// #ifdef APP-PLUS || H5
			getApp().globalData.user = user;
			//#endif
			uni.setStorageSync('userinfo', {
				user,
				resources,
				hasLogin: true
			});
			
		},
		setResources(state, {resources}) {
			state.resources = resources;
			uni.setStorageSync('userinfo', {
				user: state.user,
				resources,
				hasLogin: true
			});
		},
		setApplyList(state, data) {
			state.ApplyList = data;
		},
		setHomeList(state, data) {
			state.HomeList = data;
		},
		loadUserFromStorage(state) {
			let {
				user,
				resources,
				hasLogin
			} = uni.getStorageSync("userinfo");
			if (user) {
				state.user = user;
				state.resources = resources;
				state.hasLogin = hasLogin;
			}
			// #ifdef APP-PLUS || H5
			getApp().globalData.user = user;
			//#endif
		},
		logout(state) {
			state.user = {
				id: '',
				username: '',
				nickname: '',
			};
			state.resources = {};
			state.hasLogin = false;
			state.ApplyList.length = 0;
			state.HomeList.length = 0;
			console.log('logout state',state)
			uni.removeStorageSync("userinfo");
		},
	},
	actions: {
		logout() {
			Vue.prototype.$http.get('/logout').then(() => {
				this.commit("logout");
			});
		},
		storageAppList() {
			Vue.prototype.$http.get('/app/fboot/user/programs').then((resources) => {
				// console.log('resources----------',resources)
				let result = userPrograms(resources);
				//拥有的应用
				this.commit("setApplyList", result[0]);
				//常用的应用
				this.commit("setHomeList", result[1]);
			}).catch(err => {
				uni.showToast({
					title: err,
					icon: 'none'
				})
			});
		}
	},
	getters: {
		showNickname(state) {
			return state.user.nickname;
		},
		
		getApplyList: state => state.ApplyList,
		getHomeList(state) {
			// console.log('state.HomeList',state.HomeList)
			return state.HomeList
		},
		getModuleResources: (state) => {
			return (module) => {
				return userModuleResources(module, state.resources);
			}
		},
		
		getProjectName: state => state.projectName,
		getProjectEnglish: state => state.projectEnglish

	},
})
export default store
