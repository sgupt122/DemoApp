import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersFormShellComponent } from './providers-form-shell.component';

describe('ProvidersFormShellComponent', () => {
	let component: ProvidersFormShellComponent;
	let fixture: ComponentFixture<ProvidersFormShellComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ProvidersFormShellComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ProvidersFormShellComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
