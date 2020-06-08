import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestErrorsComponent } from './request-errors.component';

describe('RequestErrorsComponent', () => {
	let component: RequestErrorsComponent;
	let fixture: ComponentFixture<RequestErrorsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [RequestErrorsComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(RequestErrorsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
