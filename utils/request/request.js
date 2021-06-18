import Vue from 'vue';
import axios from 'axios';
const service = axios.create({
	baseURL: 'http://2020.whce.gov.cn/',
	timeout: 10000
});
export default service;
