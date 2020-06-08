import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsFormShellComponent } from './agents-form-shell.component';

describe('AgentsFormShellComponent', () => {
	let component: AgentsFormShellComponent;
	let fixture: ComponentFixture<AgentsFormShellComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AgentsFormShellComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AgentsFormShellComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
