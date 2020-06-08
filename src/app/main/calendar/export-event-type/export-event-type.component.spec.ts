import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportEventTypeComponent } from './export-event-type.component';

describe('ExportEventTypeComponent', () => {
  let component: ExportEventTypeComponent;
  let fixture: ComponentFixture<ExportEventTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportEventTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportEventTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
