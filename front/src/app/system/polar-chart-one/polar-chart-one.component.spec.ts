import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolarChartOneComponent } from './polar-chart-one.component';

describe('PolarChartOneComponent', () => {
  let component: PolarChartOneComponent;
  let fixture: ComponentFixture<PolarChartOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolarChartOneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolarChartOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
