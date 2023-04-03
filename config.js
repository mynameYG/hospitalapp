const config = {}

const initConfig = function() {
	config.contextPath = contextPath;
	// #ifdef APP-PLUS
	config.serverHost = server_app;
	// #endif
	// #ifdef MP-WEIXIN
	config.serverHost = server_weixin;
	// #endif
	if(process.env.NODE_ENV === 'development'){
		// #ifdef H5
		config.serverHost = '';
		// #endif
		// #ifndef H5
		config.serverHost = server_test;
		// #endif
	}
}

config.init = initConfig;
const server_app = "";
// const server_app = "";
const server_weixin = "";

// const ip = "";
// const port = "8081";
// const server_test = "";
const server_test = ""; //线上

config.debug = false;//测试数据

const contextPath = "/logistics";

initConfig();
// url处理
config.url = function(url){
	if(url.substr(0, 4) === 'http'){
		return url;
	}
	return `${config.serverHost}${config.contextPath}${url}`;
}
// 页面登录地址
config.loginUrl = 'pages/login/login';

config.getLoginUrl = function(url){
	return config.loginUrl;
}
config.projectName = '智慧后勤综合管理平台'
export default config