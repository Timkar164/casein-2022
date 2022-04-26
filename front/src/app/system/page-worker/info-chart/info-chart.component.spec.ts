import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoChartComponent } from './info-chart.component';

describe('InfoChartComponent', () => {
  let component: InfoChartComponent;
  let fixture: ComponentFixture<InfoChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
