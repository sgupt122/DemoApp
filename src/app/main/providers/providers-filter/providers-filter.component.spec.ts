import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersFilterComponent } from './providers-filter.component';

describe('ProvidersFilterComponent', () => {
	let component: ProvidersFilterComponent;
	let fixture: ComponentFixture<ProvidersFilterComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProvidersFilterComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProvidersFilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
