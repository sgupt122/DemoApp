import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersButtonsComponent } from './orders-buttons.component';

describe('OrdersButtonsComponent', () => {
	let component: OrdersButtonsComponent;
	let fixture: ComponentFixture<OrdersButtonsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [OrdersButtonsComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrdersButtonsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
