import wepy from 'wepy'
import Tips from './tips';
import utils from './utils';
// HTTP工具类
export default class http {
	static token = '';
	static url = '';
	static time = 0;
	static urlList = [];
	static async request(method, url, data = {weJsCode: ''}, header) {
		// 防抖动
		if (this.urlList.indexOf(url) >= 0) {
			return false;
		} else {
			this.urlList.push(url);
		}
		// 500毫秒不能重复点击
		const now = new Date().getTime();
		if (this.url == url && (now - this.time) < 1000) {
			return;
		} else {
			this.url = url;
			this.time = now;
		}
		this.token = this.token.length > 0 ? this.token : await utils.getStorage('token');
		if (!this.token) {
			const loginData = await wepy.login();
			this.token = loginData.code;
			await utils.setStorage('token', loginData.code);
		}
		data.weJsCode = this.token;
		const param = {
			url: url,
			method: method,
			data: data,
			header: header ? header : { 'Content-Type': 'application/json' ,weJsCode : this.token}
		};
		const res = await wepy.request(param);
		this.urlList.splice(this.urlList.indexOf(url.toString()), 1);
		// console.log('二-'+this.urlList)
		if (res === undefined) {
			return 103; // 未联通服务器状态码
		}
		if (this.isSuccess(res)) {
			return res.data;
		} else {
			Tips.toast('网络异常，请稍后重试', 'none');
			// console.error(method, url, data, res);
			throw this.requestException(res);
		}
	}

	/**
	 * 判断请求是否成功
	 */
	static isSuccess(res) {
		const wxCode = res.statusCode;
		// 微信请求错误
		if (wxCode !== 200) {
			return false;
		}
		const wxData = res.data;
		return !!wxData;
	}

	/**
	 * 异常
	 */
	static requestException(res) {
		const error = {};
		error.statusCode = res.statusCode;
		const wxData = res.data;
		const serverData = wxData.data;
		if (serverData) {
			error.serverCode = wxData.code;
			error.message = serverData.message;
			error.serverData = serverData;
		}
		return error;
	}

	static get(url, data, header) {
		return this.request('GET', url, data, header)
	}

	static put(url, data, header) {
		return this.request('PUT', url, data, header)
	}

	static post(url, data, header) {
		return this.request('POST', url, data, header)
	}

	static delete(url, data, header) {
		return this.request('DELETE', url, data, header)
	}
}