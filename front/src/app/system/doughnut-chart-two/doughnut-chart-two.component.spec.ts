import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartTwoComponent } from './doughnut-chart-two.component';

describe('DoughnutChartTwoComponent', () => {
  let component: DoughnutChartTwoComponent;
  let fixture: ComponentFixture<DoughnutChartTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoughnutChartTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutChartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
