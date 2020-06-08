import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingsFilterComponent } from './campaings-filter.component';

describe('CampaingsFilterComponent', () => {
	let component: CampaingsFilterComponent;
	let fixture: ComponentFixture<CampaingsFilterComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CampaingsFilterComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CampaingsFilterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
