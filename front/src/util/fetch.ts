import { processMessage } from './processMessage';
import { kernelError } from '../dialog/processSystem';

export const fetchPost = (url: string, data?: any, cb?: (response: IWebSocketData) => void, headers?: IObject) => {
	const init: RequestInit = {
		method: 'POST'
	};
	if (data) {
		if (['/api/search/searchRefBlock', '/api/graph/getGraph', '/api/graph/getLocalGraph'].includes(url)) {
			window.siyuan.reqIds[url] = new Date().getTime();
			if (data.type === 'local' && url === '/api/graph/getLocalGraph') {
				// 当打开文档A的关系图、关系图、文档A后刷新，由于防止请求重复处理，文档A关系图无法渲染。
			} else {
				data.reqId = window.siyuan.reqIds[url];
			}
		}
		// 并发导出后端接受顺序不一致
		if (url === '/api/transactions') {
			data.reqId = new Date().getTime();
		}
		if (data instanceof FormData) {
			init.body = data;
		} else {
			init.body = JSON.stringify(data);
		}
	}
	if (headers) {
		init.headers = headers;
	}
	fetch(url, init)
		.then((response) => {
			if (response.status === 404) {
				return {
					data: null,
					msg: response.statusText,
					code: response.status
				};
			} else {
				if (response.headers.get('content-type')?.indexOf('application/json') > -1) {
					return response.json();
				} else {
					return response.text();
				}
			}
		})
		.then((response: IWebSocketData) => {
			if (typeof response === 'string') {
				if (cb) {
					cb(response);
				}
				return;
			}
			if (['/api/search/searchRefBlock', '/api/graph/getGraph', '/api/graph/getLocalGraph'].includes(url)) {
				if (response.data.reqId && window.siyuan.reqIds[url] && window.siyuan.reqIds[url] > response.data.reqId) {
					return;
				}
			}
			if (typeof response === 'object' && typeof response.msg === 'string' && typeof response.code === 'number') {
				if (processMessage(response) && cb) {
					cb(response);
				}
			} else if (cb) {
				cb(response);
			}
		})
		.catch((e) => {
			console.warn('fetch post error', e);
			if (
				url === '/api/transactions' &&
				(e.message === 'Failed to fetch' || e.message === 'Unexpected end of JSON input')
			) {
				kernelError();
				return;
			}
		});
};

export const fetchSyncPost = async (url: string, data?: any) => {
	const init: RequestInit = {
		method: 'POST'
	};
	if (data) {
		init.body = JSON.stringify(data);
	}
	const res = await fetch(url, init);
	const res2 = (await res.json()) as IWebSocketData;
	processMessage(res2);
	return res2;
};

export const fetchGet = (url: string, cb: (response: IWebSocketData | IObject | string) => void) => {
	fetch(url)
		.then((response) => {
			if (response.headers.get('content-type')?.indexOf('application/json') > -1) {
				return response.json();
			} else {
				return response.text();
			}
		})
		.then((response) => {
			cb(response);
		});
};
