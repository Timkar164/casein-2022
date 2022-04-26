import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartThreeComponent } from './bar-chart-three.component';

describe('BarChartThreeComponent', () => {
  let component: BarChartThreeComponent;
  let fixture: ComponentFixture<BarChartThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarChartThreeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
