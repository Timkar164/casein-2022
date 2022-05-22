import {Component, OnInit, ViewChild} from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {HttpClient} from "@angular/common/http";
import {API} from "../../../../enveriment";

@Component({
  selector: 'app-line-chart-two',
  templateUrl: './line-chart-two.component.html',
  styleUrls: ['./line-chart-two.component.scss']
})
export class LineChartTwoComponent implements OnInit{
  public user_id = localStorage.getItem("user");
  public dataID = localStorage.getItem('dataID') || '01.06.2021';
  public datas = [];
  public data: any;
  public columns = [];
  public column = localStorage.getItem('column2') || 'Пробег, км';
  constructor(private httpService: HttpClient) { }
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [],
    labels: []
  };
  ngOnInit(): void {
    this.get_data_by_id(734,'Пробег, км');
    setInterval(() => {
      this.get_id_column()
    }, 1000);
    this.get_id_column();

  }
  get_id_column(){
    this.httpService.get(API+'getdays'+ '?userId=' + this.user_id).subscribe(value => {

      this.data = value;
      this.datas = this.data.items;

    })
    this.httpService.get(API+'getcolum'+ '?userId=' + this.user_id).subscribe(value => {

      this.data = value;
      this.columns = this.data.items;

    })
  }
  get_data_by_id(id:any,label:any){
    this.httpService.get(API+'getdata?data='+this.dataID + '&label='+this.column+ '&userId=' + this.user_id).subscribe(value => {
      this.data = value;
      this.lineChartData.datasets = [];

      for(let i = 0; i<this.data.labels.length;i++){;
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
      localStorage.setItem('dataID', this.dataID);
      localStorage.setItem('column2', this.column);
    })
  }

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

  public randomize(): void {
    for (let i = 0; i < this.lineChartData.datasets.length; i++) {
      for (let j = 0; j < this.lineChartData.datasets[i].data.length; j++) {
        this.lineChartData.datasets[i].data[j] = LineChartTwoComponent.generateNumber(i);
      }
    }
    this.chart?.update();
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart?.isDatasetHidden(1);
    this.chart?.hideDataset(1, !isHidden);
  }

  public pushOne(): void {
    this.lineChartData.datasets.forEach((x, i) => {
      const num = LineChartTwoComponent.generateNumber(i);
      x.data.push(num);
    });
    this.lineChartData?.labels?.push(`Label ${this.lineChartData.labels.length}`);

    this.chart?.update();
  }

  public changeColor(): void {
    this.lineChartData.datasets[2].borderColor = 'green';
    this.lineChartData.datasets[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;

    this.chart?.update();
  }

  public changeLabel(): void {
    if (this.lineChartData.labels) {
      this.lineChartData.labels[2] = ['1st Line', '2nd Line'];
    }

    this.chart?.update();
  }
  getRandomInt(max:number){
    return Math.floor(Math.random() * max);
  }
}
