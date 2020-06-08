import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingFormShellComponent } from './pricing-form-shell.component';

describe('PricingFormShellComponent', () => {
	let component: PricingFormShellComponent;
	let fixture: ComponentFixture<PricingFormShellComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PricingFormShellComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PricingFormShellComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
