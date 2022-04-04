import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartOneComponent } from './bar-chart-one.component';

describe('BarChartOneComponent', () => {
  let component: BarChartOneComponent;
  let fixture: ComponentFixture<BarChartOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
