import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DispositionDialogComponent } from './disposition-dialog.component';

describe('DispositionDialogComponent', () => {
  let component: DispositionDialogComponent;
  let fixture: ComponentFixture<DispositionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DispositionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DispositionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
