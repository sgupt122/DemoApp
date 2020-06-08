import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentsColumnComponent } from './agents-column.component';

describe('AgentsColumnComponent', () => {
  let component: AgentsColumnComponent;
  let fixture: ComponentFixture<AgentsColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentsColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentsColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
