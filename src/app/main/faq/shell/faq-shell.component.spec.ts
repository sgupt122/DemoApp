import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqShellComponent } from './faq-shell.component';

describe('FaqShellComponent', () => {
	let component: FaqShellComponent;
	let fixture: ComponentFixture<FaqShellComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FaqShellComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(FaqShellComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
