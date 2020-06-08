import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsColumnComponent } from './campaigns-column.component';

describe('CampaignsColumnComponent', () => {
  let component: CampaignsColumnComponent;
  let fixture: ComponentFixture<CampaignsColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
