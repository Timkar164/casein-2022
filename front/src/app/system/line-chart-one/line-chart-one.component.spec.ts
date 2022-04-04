import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineChartOneComponent } from './line-chart-one.component';

describe('LineChartOneComponent', () => {
  let component: LineChartOneComponent;
  let fixture: ComponentFixture<LineChartOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineChartOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
