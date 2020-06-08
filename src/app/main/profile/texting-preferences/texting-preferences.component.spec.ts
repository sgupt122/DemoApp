import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextingPreferencesComponent } from './texting-preferences.component';

describe('TextingPreferencesComponent', () => {
	let component: TextingPreferencesComponent;
	let fixture: ComponentFixture<TextingPreferencesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [TextingPreferencesComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(TextingPreferencesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
