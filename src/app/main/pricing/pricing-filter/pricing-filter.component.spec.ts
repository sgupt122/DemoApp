import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingFilterComponent } from './pricing-filter.component';

describe('PricingFilterComponent', () => {
	let component: PricingFilterComponent;
	let fixture: ComponentFixture<PricingFilterComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PricingFilterComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PricingFilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
