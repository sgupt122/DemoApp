import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingsTableComponent } from './campaings-table.component';

describe('CampaingsTableComponent', () => {
	let component: CampaingsTableComponent;
	let fixture: ComponentFixture<CampaingsTableComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CampaingsTableComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CampaingsTableComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
