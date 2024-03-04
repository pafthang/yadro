import { fetchPost } from '../util/fetch';

export const ai = {
	element: undefined as Element,
	genHTML: () => {
		const responsiveHTML = '';
		return `<div class="fn__flex-column" style="height: 100%">
<div class="layout-tab-bar fn__flex">
    <div data-type="openai" class="item item--full item--focus"><span class="fn__flex-1"></span><span class="item__text">OpenAI</span><span class="fn__flex-1"></span></div>
</div>
<div class="fn__flex-1">
    <div data-type="openai">
        ${responsiveHTML}
    </div>
</div>
</div>`;
	},
	bindEvent: () => {
		ai.element.querySelectorAll('input,select').forEach((item) => {
			item.addEventListener('change', () => {
				fetchPost(
					'/api/setting/setAI',
					{
						openAI: {
							apiUserAgent: (ai.element.querySelector('#apiUserAgent') as HTMLInputElement).value,
							apiBaseURL: (ai.element.querySelector('#apiBaseURL') as HTMLInputElement).value,
							apiVersion: (ai.element.querySelector('#apiVersion') as HTMLInputElement).value,
							apiKey: (ai.element.querySelector('#apiKey') as HTMLInputElement).value,
							apiModel: (ai.element.querySelector('#apiModel') as HTMLSelectElement).value,
							apiMaxTokens: parseInt((ai.element.querySelector('#apiMaxTokens') as HTMLInputElement).value),
							apiProxy: (ai.element.querySelector('#apiProxy') as HTMLInputElement).value,
							apiTimeout: parseInt((ai.element.querySelector('#apiTimeout') as HTMLInputElement).value),
							apiProvider: (ai.element.querySelector('#apiProvider') as HTMLSelectElement).value
						}
					},
					(response) => {
						window.siyuan.config.ai = response.data;
					}
				);
			});
		});
	}
};
