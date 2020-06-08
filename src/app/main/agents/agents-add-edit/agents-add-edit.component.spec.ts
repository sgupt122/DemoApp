import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsAddEditComponent } from './agents-add-edit.component';

describe('AgentsAddEditComponent', () => {
	let component: AgentsAddEditComponent;
	let fixture: ComponentFixture<AgentsAddEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [AgentsAddEditComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AgentsAddEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
