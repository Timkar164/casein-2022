import { Component, OnInit } from '@angular/core';
import {AppService} from "../../../app.service";

export interface SharingItem {
  img: String;
  name: String;
  stat: String;
}

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements OnInit {
  public req1:any;
  constructor(private servise: AppService) { }

  ngOnInit(): void {
    this.servise.getshering().subscribe(value => {
      this.req1=value;
      this.sharingList=this.req1.items;
    })
  }
  getsharing(tech:any){
    console.log(tech.id)
  }
  sharingList: SharingItem[] = [

  ]
}
