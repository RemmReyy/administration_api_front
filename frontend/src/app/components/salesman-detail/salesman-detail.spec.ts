import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesmanDetail } from './salesman-detail';

describe('SalesmanDetail', () => {
  let component: SalesmanDetail;
  let fixture: ComponentFixture<SalesmanDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesmanDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesmanDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
