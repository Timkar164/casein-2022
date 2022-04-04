import { HttpClient } from '@angular/common/http';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {API} from "../../../../enveriment";
import {BarChartOneComponent} from "../bar-chart-one/bar-chart-one.component";


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, AfterViewInit{

  @ViewChild(BarChartOneComponent)
  // не дает присвоить null
  // public fileToUpload: File = null;
  public fileToUpload: File | undefined;
  public isFile = false;
  public isPlay = true;
  public cluster:number =4;
  public table:any;
  public tabledata:any = [];
  public stylecolor =['#e57947', '#54b1de','#d82096','#7fad6c','#d3c95b','#ca57d7', '#82ab58','#c947e0', '#03e9', '#961c4d', '#ea13c2', '#a4a64d'];
  public lastl = 0;
  constructor(public fb: FormBuilder, private httpService: HttpClient, private router: Router) {

  }

  ngOnInit(): void {
    this.gettable();
    setInterval(() => {
      this.gettable()
    }, 1000);
  }
  ngAfterViewInit() {
  }
  sendcluster(){
    this.httpService.get(API+'lenclusters?len='+this.cluster).subscribe(value => {
      console.log(value);
      console.log(this.cluster)
    })
  }
  gettable(){
    this.httpService.get(API+'getclusterid').subscribe(value => {
      this.table=value;
      console.log(this.table);

      /**if(this.lastl!=this.table.len) {
        this.stylecolor = [];
        for (let i = 0; i < this.table.len+1; i++) {
          let r = Math.floor(Math.random() * (256));
          let g = Math.floor(Math.random() * (256));
          let b = Math.floor(Math.random() * (256));
          let color = '#' + r.toString(16) + g.toString(16) + b.toString(16);
          // @ts-ignore
          this.stylecolor.push(color);
        }
      }**/
      console.log(this.stylecolor);
      this.tabledata = this.table.items;
    })
  }
  myFiles: string[] = [];
  getFileDetails(e: any) {
    console.log(e.target.files);

    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  uploadFiles() {

    this.isPlay = false;
    this.isFile = false;
    const frmData = new FormData();
    console.log(frmData);

    for (var i = 0; i < this.myFiles.length; i++) {
      frmData.append("fileUpload", this.myFiles[i]);
    }

    this.httpService.post(API + 'files', frmData).subscribe(
      value => {
        // SHOW A MESSAGE RECEIVED FROM THE WEB API.
        console.log(value);
      },

    );
    this.myFiles = [];
  }

}
