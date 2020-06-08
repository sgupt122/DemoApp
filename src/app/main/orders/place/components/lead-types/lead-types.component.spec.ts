import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadTypesComponent } from './lead-types.component';

describe('LeadTypesComponent', () => {
	let component: LeadTypesComponent;
	let fixture: ComponentFixture<LeadTypesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [LeadTypesComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(LeadTypesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
