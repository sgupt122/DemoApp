import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersTableComponent } from './providers-table.component';

describe('ProvidersTableComponent', () => {
	let component: ProvidersTableComponent;
	let fixture: ComponentFixture<ProvidersTableComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProvidersTableComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProvidersTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
