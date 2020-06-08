import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaingsAddEditComponent } from './campaings-add-edit.component';

describe('CampaingsAddEditComponent', () => {
	let component: CampaingsAddEditComponent;
	let fixture: ComponentFixture<CampaingsAddEditComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CampaingsAddEditComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CampaingsAddEditComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
