import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeDialogComponent } from './order-type-dialog.component';

describe('OrderTypeDialogComponent', () => {
	let component: OrderTypeDialogComponent;
	let fixture: ComponentFixture<OrderTypeDialogComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [OrderTypeDialogComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(OrderTypeDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
