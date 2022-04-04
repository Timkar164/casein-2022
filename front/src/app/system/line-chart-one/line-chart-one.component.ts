import {Component, OnInit, ViewChild} from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {API} from "../../../../enveriment";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-line-chart-one',
  templateUrl: './line-chart-one.component.html',
  styleUrls: ['./line-chart-one.component.scss']
})
export class LineChartOneComponent implements OnInit {
  public techID = '734';
  public techs = [];
  public data: any;
  public columns = [];
  public column = 'Пробег, км';
  constructor(private httpService: HttpClient) { }
   ngOnInit(): void {
     this.get_data_by_id(734,'Пробег, км');
     setInterval(() => {
       this.get_id_column()
     }, 1000);
     this.get_id_column();

  }
  get_id_column(){
    this.httpService.get(API+'gettech').subscribe(value => {
      this.data = value;
      this.techs = this.data.items;

    })
    this.httpService.get(API+'getcolum').subscribe(value => {
      this.data = value;
      this.columns = this.data.items;

    })
  }
  get_data_by_id(id:any,label:any){
    this.httpService.get(API+'getinfo?id='+this.techID + '&label='+this.column).subscribe(value => {
      this.data = value;
      this.lineChartData.datasets = [];

      for(let i = 0; i<this.data.labels.length;i++){
        let R = this.getRandomInt(255);
        let G = this.getRandomInt(255);
        let B = this.getRandomInt(255);
        this.lineChartData.datasets.push({
          data:this.data.labels[i].array,
          label:this.data.labels[i].name,
          backgroundColor: 'rgba('+R+','+G+','+B+',0.2)',
          borderColor: 'rgba('+R+','+G+','+B+',1',
          pointBackgroundColor: 'rgba('+R+','+G+','+B+',1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba('+R+','+G+','+B+',1)',
          fill: 'origin',})
      }
      this.lineChartData.labels = this.data.time;
      this.chart?.update();
    })
  }


  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
      {
        position: 'left',
      },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  private static generateNumber(i: number): number {
    return Math.floor((Math.random() * (i < 2 ? 100 : 1000)) + 1);
  }

  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  getRandomInt(max:number){
    return Math.floor(Math.random() * max);
  }

}
