import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarChartOneComponent } from './radar-chart-one.component';

describe('RadarChartOneComponent', () => {
  let component: RadarChartOneComponent;
  let fixture: ComponentFixture<RadarChartOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadarChartOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarChartOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
