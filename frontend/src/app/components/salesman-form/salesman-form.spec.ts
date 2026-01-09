import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanForm } from './salesman-form';

describe('SalesmanForm', () => {
  let component: SalesmanForm;
  let fixture: ComponentFixture<SalesmanForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesmanForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesmanForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
