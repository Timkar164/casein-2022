import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChartTwoComponent } from './radar-chart-two.component';

describe('RadarChartTwoComponent', () => {
  let component: RadarChartTwoComponent;
  let fixture: ComponentFixture<RadarChartTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadarChartTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarChartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
