<template>
	<view>
		<person-contacts-list v-if="type" :t="type" :m="multi" @ok="ok"></person-contacts-list>
	</view>
</template>

<script>
	import PersonContactsList from './org-contacts-list'
	
	export default {
		components:{
			PersonContactsList
		},
		onBackPress() {
			return !this.isOk;
		},
		created() {
			// #ifdef APP-PLUS
			var page = this.$mp.page.$getAppWebview();
			page.setStyle({ popGesture: 'none' });
			// #endif
		},
		data() {
			return {
				type: undefined,
				multi: true,
				isOk: false
			}
		},
		onNavigationBarButtonTap(e) {
			this.isOk = true;
			
			let pages = getCurrentPages();
			let index = 0;
			for (let page of pages) {
			  if (page.route === 'pages/contacts/org-contacts') {
				break;
			  }
			  index++;
			}
			
			uni.navigateBack({delta: pages.length - index});
		},
		onLoad(opt) {
			this.type = opt.type;
			this.multi = opt.multi !== "false";
		},
		methods: {
			ok: function() {
				this.isOk = true;
			}
		}
	}
</script>