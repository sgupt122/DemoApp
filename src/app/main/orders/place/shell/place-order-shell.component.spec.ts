import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderShellComponent } from './place-order-shell.component';

describe('PlaceOrderShellComponent', () => {
	let component: PlaceOrderShellComponent;
	let fixture: ComponentFixture<PlaceOrderShellComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PlaceOrderShellComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PlaceOrderShellComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
