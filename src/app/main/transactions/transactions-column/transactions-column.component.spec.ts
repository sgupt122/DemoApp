import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsColumnComponent } from './transactions-column.component';

describe('TransactionsColumnComponent', () => {
  let component: TransactionsColumnComponent;
  let fixture: ComponentFixture<TransactionsColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionsColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
