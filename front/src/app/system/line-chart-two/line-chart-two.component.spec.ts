import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartTwoComponent } from './line-chart-two.component';

describe('LineChartTwoComponent', () => {
  let component: LineChartTwoComponent;
  let fixture: ComponentFixture<LineChartTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
