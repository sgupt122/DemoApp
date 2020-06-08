import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersColumnComponent } from './providers-column.component';

describe('ProvidersColumnComponent', () => {
  let component: ProvidersColumnComponent;
  let fixture: ComponentFixture<ProvidersColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProvidersColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidersColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
