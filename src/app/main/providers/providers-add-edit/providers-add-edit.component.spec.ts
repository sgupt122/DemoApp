import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersAddEditComponent } from './providers-add-edit.component';

describe('ProvidersAddEditComponent', () => {
	let component: ProvidersAddEditComponent;
	let fixture: ComponentFixture<ProvidersAddEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProvidersAddEditComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProvidersAddEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
