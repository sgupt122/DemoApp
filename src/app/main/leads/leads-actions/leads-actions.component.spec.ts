import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsActionsComponent } from './leads-actions.component';

describe('LeadsActionsComponent', () => {
	let component: LeadsActionsComponent;
	let fixture: ComponentFixture<LeadsActionsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LeadsActionsComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LeadsActionsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
