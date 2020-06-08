import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsActionComponent } from './leads-action.component';

describe('LeadsActionComponent', () => {
  let component: LeadsActionComponent;
  let fixture: ComponentFixture<LeadsActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
