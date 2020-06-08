import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderColumnComponent } from './order-column.component';

describe('OrderColumnComponent', () => {
  let component: OrderColumnComponent;
  let fixture: ComponentFixture<OrderColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
