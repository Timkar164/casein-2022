import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarChartTwoComponent } from './polar-chart-two.component';

describe('PolarChartTwoComponent', () => {
  let component: PolarChartTwoComponent;
  let fixture: ComponentFixture<PolarChartTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolarChartTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarChartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
