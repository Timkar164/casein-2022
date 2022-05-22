import {Component, OnInit, ViewChild} from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import {HttpClient} from "@angular/common/http";
import {API} from "../../../../enveriment";
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-polar-chart-one',
  templateUrl: './polar-chart-one.component.html',
  styleUrls: ['./polar-chart-one.component.scss']
})
export class PolarChartOneComponent implements OnInit{

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  public data:any;
  // PolarArea
  public polarAreaChartLabels: string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'];
  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: this.polarAreaChartLabels,
    datasets: []
  };
  public polarAreaLegend = true;
  public user_id = localStorage.getItem("user");
  public polarAreaChartType: ChartType = 'polarArea';
  constructor(private httpService: HttpClient) {
  }  ngOnInit(): void {
    this.httpService.get(API+'getclusterinfo'+ '?userId=' + this.user_id).subscribe(value => {
      this.data=value;
      this.polarAreaChartData.labels=this.data.time;
      this.polarAreaChartData.datasets=[];
      this.polarAreaChartData.datasets.push({data:this.data,label:'Кластера'});
      this.chart?.update()
    })
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
