import { FusePage } from './app.po';

describe('Fuse App', () => {
	let page: FusePage;

	beforeEach(() => {
		page = new FusePage();
	});

	it('should display welcome message', () => {
		FusePage.navigateTo();
		expect(FusePage.getParagraphText()).toEqual('Welcome to Fuse!');
	});
});
