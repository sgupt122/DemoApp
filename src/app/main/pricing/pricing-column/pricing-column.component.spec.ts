import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingColumnComponent } from './pricing-column.component';

describe('PricingColumnComponent', () => {
  let component: PricingColumnComponent;
  let fixture: ComponentFixture<PricingColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
