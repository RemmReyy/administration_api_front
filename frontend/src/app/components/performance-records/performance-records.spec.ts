import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerformanceRecords } from './performance-records';

describe('PerformanceRecords', () => {
  let component: PerformanceRecords;
  let fixture: ComponentFixture<PerformanceRecords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerformanceRecords]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerformanceRecords);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
