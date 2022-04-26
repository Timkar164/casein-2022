import { Component, OnInit } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut-chart-one',
  templateUrl: './doughnut-chart-one.component.html',
  styleUrls: ['./doughnut-chart-one.component.scss']
})
export class DoughnutChartOneComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Doughnut
  public doughnutChartLabels: string[] = ['УРАЛ ППУА', 'УРАЛ Самосвал 1', 'Mercedes-3341 Самосвал 7'];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] },
      // { data: [50, 150, 120] },
      // { data: [250, 130, 70] }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
