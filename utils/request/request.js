import Vue from 'vue';
import axios from 'axios';
const service = axios.create({
	baseURL: 'http://2020.whce.gov.cn/',
	timeout: 10000
});
// request拦截器,在请求之前做一些处理
service.interceptors.request.use(
	config => {
		// if (store.state.token) {
		//     // 给请求头添加user-token
		//     config.headers["user-token"] = store.state.token;
		// }
		console.log('请求拦截成功')
		return config;
	},
	error => {
		console.log(error); // for debug
		return Promise.reject(error);
	}
);

// //配置成功后的拦截器
service.interceptors.response.use(res => {
	console.log("res-------", res)
	if (res.status == 200) {
		console.log("res.status=>", res.status)
		return res
	} else {
		return Promise.reject(res.status);
	}
}, error => {
	console.log("error-------", error)
	if (error.status) {
		switch (error.status) {
			case 401:
				break;
			default:
				break;
		}
	}
	return Promise.reject(error)
})
export default service;
