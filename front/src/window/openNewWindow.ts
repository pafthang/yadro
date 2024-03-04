import { layoutToJSON } from '../layout/util';
import { Constants } from '../constants';
import { Tab } from '../layout/Tab';
import { fetchPost } from '../util/fetch';
import { showMessage } from '../dialog/message';

interface windowOptions {
	position?: {
		x: number;
		y: number;
	};
	width?: number;
	height?: number;
}

export const openNewWindow = (tab: Tab, options: windowOptions = {}) => {
	const json = {};
	layoutToJSON(tab, json);
	tab.parent.removeTab(tab.id);
};

export const openNewWindowById = (id: string, options: windowOptions = {}) => {
	fetchPost('/api/block/getBlockInfo', { id }, (response) => {
		if (response.code === 3) {
			showMessage(response.msg);
			return;
		}
		const json: any = {
			title: response.data.rootTitle,
			docIcon: response.data.rootIcon,
			pin: false,
			active: true,
			instance: 'Tab',
			action: 'Tab',
			children: {
				notebookId: response.data.box,
				blockId: id,
				rootId: response.data.rootID,
				mode: 'wysiwyg',
				instance: 'Editor',
				action: response.data.rootID === id ? Constants.CB_GET_SCROLL : Constants.CB_GET_ALL
			}
		};
	});
};
