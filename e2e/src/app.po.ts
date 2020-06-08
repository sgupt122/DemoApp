import { browser, by, element } from 'protractor';

export class FusePage {
	static navigateTo(): any {
		return browser.get('/');
	}

	static getParagraphText(): any {
		return element(by.css('app #main')).getText();
	}
}
