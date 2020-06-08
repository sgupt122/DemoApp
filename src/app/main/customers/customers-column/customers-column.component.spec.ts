import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersColumnComponent } from './customers-column.component';

describe('CustomersColumnComponent', () => {
  let component: CustomersColumnComponent;
  let fixture: ComponentFixture<CustomersColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
