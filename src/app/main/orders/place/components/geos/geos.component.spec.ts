import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeosComponent } from './geos.component';

describe('GeosComponent', () => {
	let component: GeosComponent;
	let fixture: ComponentFixture<GeosComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [GeosComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(GeosComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
