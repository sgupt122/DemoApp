import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsFormShellComponent } from './campaigns-form-shell.component';

describe('CampaignsFormShellComponent', () => {
	let component: CampaignsFormShellComponent;
	let fixture: ComponentFixture<CampaignsFormShellComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CampaignsFormShellComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CampaignsFormShellComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
