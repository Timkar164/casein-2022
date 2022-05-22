import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {API} from "../../../../enveriment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-bar-chart-one',
  templateUrl: './bar-chart-one.component.html',
  styleUrls: ['./bar-chart-one.component.scss']
})
export class BarChartOneComponent implements OnInit{
  @Input() title: number;
  @Output() dataChanged: EventEmitter<
    any
    > = new EventEmitter<any>();
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(private httpService: HttpClient) {
    this.title= 4;
    this.numbers = []

  }
  public user_id = localStorage.getItem("user");
  public data: any;
  public lastLabels:any = [];
  public lastTime:any = [];
  public columns = [];
  public column = 'Пробег, км';
  public clusterID = 'Все';
  public funcs = ['Cреднее значение','Медиана','Сумма'];
  public funcID = 'Cреднее значение';
  public numbers: string[];
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };
  ngOnInit(): void {
    setInterval(() => {
      this.buildArr()
    }, 1000);
    this.httpService.get(API+'getcolum'+ '?userId=' + this.user_id).subscribe(value => {
      this.data = value;
      this.columns = this.data.items;

    })
    this.get_data_by_id(this.funcID,this.clusterID,this.column);
  }
  get_data_by_id(func:string,cluster:string,colum:string){
    this.httpService.get(API+'getinfoagr?func='+func+'&cluster='+cluster+'&colum='+ colum + '&userId=' + this.user_id).subscribe(value => {
      this.data=value;
      if((JSON.stringify(this.lastLabels)!=JSON.stringify(this.data.items.time))||(JSON.stringify(this.lastTime)!=JSON.stringify(this.data.items.label))){
      this.barChartData.labels = this.data.items.time;
      this.barChartData.datasets = [{data:this.data.items.label,label:colum}];
      this.chart?.update();
      this.lastLabels=this.data.items.time;
      this.lastTime=this.data.items.label;
      }
    })
  }
  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
 buildArr(){
   this.numbers = [];
   this.numbers.length = 0;
   let i = 1;
   while (i.toString() < (this.title+1).toString()) {
     this.numbers.push(i.toString());
     i++;
   }
   this.numbers.push(('Все'));
   this.get_data_by_id(this.funcID,this.clusterID,this.column);
 }

}
