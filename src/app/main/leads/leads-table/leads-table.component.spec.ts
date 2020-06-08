import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsTableComponent } from './leads-table.component';

describe('LeadsTableComponent', () => {
	let component: LeadsTableComponent;
	let fixture: ComponentFixture<LeadsTableComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LeadsTableComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LeadsTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
