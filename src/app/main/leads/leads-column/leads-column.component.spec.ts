import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsColumnComponent } from './leads-column.component';

describe('LeadsColumnComponent', () => {
  let component: LeadsColumnComponent;
  let fixture: ComponentFixture<LeadsColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadsColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
