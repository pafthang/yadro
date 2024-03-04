import { adjustLayout, JSONToLayout, resetLayout, resizeTopBar } from '../layout/util';
import { resizeTabs } from '../layout/tabUtil';
import { Constants } from '../constants';
import { appearance } from '../config/appearance';
import { fetchPost } from '../util/fetch';
import { addGA, initAssets, setInlineStyle } from '../util/assets';
import { renderSnippet } from '../config/util/snippets';
import { isWindow } from '../util/functions';
import { initStatus } from '../layout/status';
import { initBar } from '../layout/topBar';
import { openChangelog } from './openChangelog';
import { App } from '../index';
import { initWindowEvent } from './globalEvent/event';

const matchKeymap = (
	keymap: Record<string, IKeymapItem>,
	key1: 'general' | 'editor',
	key2?: 'general' | 'insert' | 'heading' | 'list' | 'table'
) => {
	if (key1 === 'general') {
		if (!window.siyuan.config.keymap[key1]) {
			window.siyuan.config.keymap[key1] = keymap;
			return false;
		}
	} else {
		if (!window.siyuan.config.keymap[key1]) {
			window.siyuan.config.keymap[key1] = JSON.parse(JSON.stringify(Constants.SIYUAN_KEYMAP.editor));
			return false;
		}
		if (!window.siyuan.config.keymap[key1][key2]) {
			window.siyuan.config.keymap[key1][key2] = keymap;
			return false;
		}
	}
	let match = true;
	Object.keys(keymap).forEach((key) => {
		if (key1 === 'general') {
			if (
				!window.siyuan.config.keymap[key1][key] ||
				window.siyuan.config.keymap[key1][key].default !== keymap[key].default
			) {
				match = false;
				window.siyuan.config.keymap[key1][key] = keymap[key];
			}
		} else {
			if (
				!window.siyuan.config.keymap[key1][key2][key] ||
				window.siyuan.config.keymap[key1][key2][key].default !== keymap[key].default
			) {
				match = false;
				window.siyuan.config.keymap[key1][key2][key] = keymap[key];
			}
		}
	});
	return match;
};

const hasKeymap = (
	keymap: Record<string, IKeymapItem>,
	key1: 'general' | 'editor',
	key2?: 'general' | 'insert' | 'heading' | 'list' | 'table'
) => {
	let match = true;
	if (key1 === 'editor') {
		if (
			Object.keys(window.siyuan.config.keymap[key1][key2]).length !==
			Object.keys(Constants.SIYUAN_KEYMAP[key1][key2]).length
		) {
			Object.keys(window.siyuan.config.keymap[key1][key2]).forEach((item) => {
				if (!Constants.SIYUAN_KEYMAP[key1][key2][item]) {
					match = false;
					delete window.siyuan.config.keymap[key1][key2][item];
				}
			});
		}
	} else {
		if (Object.keys(window.siyuan.config.keymap[key1]).length !== Object.keys(Constants.SIYUAN_KEYMAP[key1]).length) {
			Object.keys(window.siyuan.config.keymap[key1]).forEach((item) => {
				if (!Constants.SIYUAN_KEYMAP[key1][item]) {
					match = false;
					delete window.siyuan.config.keymap[key1][item];
				}
			});
		}
	}
	return match;
};

export const onGetConfig = (isStart: boolean, app: App) => {
	const matchKeymap1 = matchKeymap(Constants.SIYUAN_KEYMAP.general, 'general');
	const matchKeymap2 = matchKeymap(Constants.SIYUAN_KEYMAP.editor.general, 'editor', 'general');
	const matchKeymap3 = matchKeymap(Constants.SIYUAN_KEYMAP.editor.insert, 'editor', 'insert');
	const matchKeymap4 = matchKeymap(Constants.SIYUAN_KEYMAP.editor.heading, 'editor', 'heading');
	const matchKeymap5 = matchKeymap(Constants.SIYUAN_KEYMAP.editor.list, 'editor', 'list');
	const matchKeymap6 = matchKeymap(Constants.SIYUAN_KEYMAP.editor.table, 'editor', 'table');

	const hasKeymap1 = hasKeymap(Constants.SIYUAN_KEYMAP.general, 'general');
	const hasKeymap2 = hasKeymap(Constants.SIYUAN_KEYMAP.editor.general, 'editor', 'general');
	const hasKeymap3 = hasKeymap(Constants.SIYUAN_KEYMAP.editor.insert, 'editor', 'insert');
	const hasKeymap4 = hasKeymap(Constants.SIYUAN_KEYMAP.editor.heading, 'editor', 'heading');
	const hasKeymap5 = hasKeymap(Constants.SIYUAN_KEYMAP.editor.list, 'editor', 'list');
	const hasKeymap6 = hasKeymap(Constants.SIYUAN_KEYMAP.editor.table, 'editor', 'table');
	if (
		!window.siyuan.config.readonly &&
		(!matchKeymap1 ||
			!matchKeymap2 ||
			!matchKeymap3 ||
			!matchKeymap4 ||
			!matchKeymap5 ||
			!matchKeymap6 ||
			!hasKeymap1 ||
			!hasKeymap2 ||
			!hasKeymap3 ||
			!hasKeymap4 ||
			!hasKeymap5 ||
			!hasKeymap6)
	) {
		fetchPost('/api/setting/setKeymap', {
			data: window.siyuan.config.keymap
		});
	}

	if (!window.siyuan.config.uiLayout || (window.siyuan.config.uiLayout && !window.siyuan.config.uiLayout.left)) {
		window.siyuan.config.uiLayout = Constants.SIYUAN_EMPTY_LAYOUT;
	}
	initWindowEvent(app);
	fetchPost('/api/system/getEmojiConf', {}, (response) => {
		window.siyuan.emojis = response.data as IEmoji[];
		try {
			JSONToLayout(app, isStart);
			setTimeout(() => {
				adjustLayout();
			}); // 等待 dock 中 !this.pin 的 setTimeout

			openChangelog();
		} catch (e) {
			resetLayout();
		}
	});
	initBar(app);
	initStatus();
	initWindow();
	appearance.onSetappearance(window.siyuan.config.appearance);
	initAssets();
	setInlineStyle();
	renderSnippet();
	let resizeTimeout = 0;
	window.addEventListener('resize', () => {
		window.clearTimeout(resizeTimeout);
		resizeTimeout = window.setTimeout(() => {
			adjustLayout();
			resizeTabs();
			resizeTopBar();
		}, 200);
	});
	addGA();
};

export const initWindow = async () => {
	if (!isWindow()) {
		document.querySelector('.toolbar').classList.add('toolbar--browser');
	}
};
