import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFormShellComponent } from './news-form-shell.component';

describe('NewsFormShellComponent', () => {
	let component: NewsFormShellComponent;
	let fixture: ComponentFixture<NewsFormShellComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [NewsFormShellComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(NewsFormShellComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
