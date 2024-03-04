import { openFileById } from '../editor/util';
import { Constants } from '../constants';
import { MenuItem } from './Menu';
import { App } from '../index';
import { isInAndroid, updateHotkeyTip } from '../protyle/util/compatibility';
import { checkFold } from '../util/noRelyPCFunction';

export const openEditorTab = (app: App, id: string, notebookId?: string, pathString?: string) => {
	const openSubmenus: IMenu[] = [
		{
			icon: 'iconLayoutRight',
			label: window.siyuan.languages.insertRight,
			accelerator: `${updateHotkeyTip(window.siyuan.config.keymap.editor.general.insertRight.custom)}/${updateHotkeyTip(
				'⌥Click'
			)}`,
			click: () => {
				if (notebookId) {
					openFileById({ app, id, position: 'right', action: [Constants.CB_GET_FOCUS, Constants.CB_GET_SCROLL] });
				} else {
					checkFold(id, (zoomIn, action) => {
						openFileById({
							app,
							id,
							position: 'right',
							action,
							zoomIn
						});
					});
				}
			}
		},
		{
			icon: 'iconLayoutBottom',
			label: window.siyuan.languages.insertBottom,
			accelerator: '⇧Click',
			click: () => {
				if (notebookId) {
					openFileById({ app, id, position: 'bottom', action: [Constants.CB_GET_FOCUS, Constants.CB_GET_SCROLL] });
				} else {
					checkFold(id, (zoomIn, action) => {
						openFileById({
							app,
							id,
							position: 'bottom',
							action,
							zoomIn
						});
					});
				}
			}
		}
	];
	if (window.siyuan.config.fileTree.openFilesUseCurrentTab) {
		openSubmenus.push({
			label: window.siyuan.languages.openInNewTab,
			accelerator: '⌥⌘Click',
			click: () => {
				if (notebookId) {
					openFileById({
						app,
						id,
						action: [Constants.CB_GET_FOCUS, Constants.CB_GET_SCROLL],
						removeCurrentTab: false
					});
				} else {
					checkFold(id, (zoomIn, action) => {
						openFileById({
							app,
							id,
							action,
							zoomIn,
							removeCurrentTab: false
						});
					});
				}
			}
		});
	}
	openSubmenus.push({ type: 'separator' });
	openSubmenus.push({
		icon: 'iconPreview',
		label: window.siyuan.languages.preview,
		click: () => {
			openFileById({ app, id, mode: 'preview' });
		}
	});

	window.siyuan.menus.menu.append(
		new MenuItem({
			label: window.siyuan.languages.openBy,
			icon: 'iconOpen',
			submenu: openSubmenus
		}).element
	);
};

export const copyPNG = (imgElement: HTMLImageElement) => {
	if (isInAndroid()) {
		window.JSAndroid.writeImageClipboard(imgElement.getAttribute('src'));
	} else {
		const canvas = document.createElement('canvas');
		const tempElement = document.createElement('img');
		tempElement.onload = (e: Event & { target: HTMLImageElement }) => {
			canvas.width = e.target.width;
			canvas.height = e.target.height;
			canvas.getContext('2d').drawImage(e.target, 0, 0, e.target.width, e.target.height);
			canvas.toBlob(
				(blob) => {
					navigator.clipboard.write([
						new ClipboardItem({
							// @ts-ignore
							['image/png']: blob
						})
					]);
				},
				'image/png',
				1
			);
		};
		tempElement.src = imgElement.getAttribute('src');
	}
};
