import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartTwoComponent } from './pie-chart-two.component';

describe('PieChartTwoComponent', () => {
  let component: PieChartTwoComponent;
  let fixture: ComponentFixture<PieChartTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieChartTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
