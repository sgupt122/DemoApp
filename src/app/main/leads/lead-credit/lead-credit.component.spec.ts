import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadCreditComponent } from './lead-credit.component';

describe('LeadCreditComponent', () => {
	let component: LeadCreditComponent;
	let fixture: ComponentFixture<LeadCreditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LeadCreditComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LeadCreditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
