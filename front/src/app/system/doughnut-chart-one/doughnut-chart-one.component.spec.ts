import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartOneComponent } from './doughnut-chart-one.component';

describe('DoughnutChartOneComponent', () => {
  let component: DoughnutChartOneComponent;
  let fixture: ComponentFixture<DoughnutChartOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoughnutChartOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutChartOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
