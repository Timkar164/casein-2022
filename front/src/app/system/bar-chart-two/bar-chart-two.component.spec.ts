import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartTwoComponent } from './bar-chart-two.component';

describe('BarChartTwoComponent', () => {
  let component: BarChartTwoComponent;
  let fixture: ComponentFixture<BarChartTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
