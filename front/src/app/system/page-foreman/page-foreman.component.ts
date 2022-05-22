import { Component, OnInit } from '@angular/core';
import { Equipment } from './equipment-employee/equipment-employee.component';
import { Technic } from './vehicle-control/vehicle-control.component';
import { Worker } from './list-workers/list-workers.component';
import { Router } from "@angular/router";
import { AppService } from "../../app.service";

@Component({
  selector: 'app-page-foreman',
  templateUrl: './page-foreman.component.html',
  styleUrls: ['./page-foreman.component.scss']
})
export class PageForemanComponent implements OnInit {
  public req: any;
  public info: any;
  constructor(private router: Router, private service: AppService) { }

  ngOnInit(): void {
    if (localStorage.getItem('type') !== '1') {
      localStorage.clear();
      this.router.navigate(['auth'])
    }
    this.service.getworker().subscribe(value => {
      console.log(value);
      this.req = value;
      this.workers = this.req.items
    })
    this.service.gettech().subscribe(value => {
      console.log(value);
      this.req = value;
      this.technics = this.req.items
    })
    this.service.gettask().subscribe(value => {
      console.log(value);
      this.req = value;
      this.equipments = this.req.items
    })
    this.service.getadminfo().subscribe(value => {
      this.info = value;
      this.tasks = this.info.all;
      this.notFinishedTasks = this.info.open;
    })
  }

  message = 1567;
  unreadMessage = 45;

  tasks = 0;
  notFinishedTasks = 0;

  DeadLinedays = 10;

  technics: Technic[] = [

  ]

  workers: Worker[] = [

  ]

  equipments: Equipment[] = [
  ]

  handleRemoveTechnics(element: Technic) {
    this.technics = this.technics.filter((e) => element.name !== e.name);
    console.log("removed", element);
  }

  handleRemoveEquipments(element: Equipment) {
    this.equipments = this.equipments.filter((e) => element.name !== e.name);
    console.log("removed", element);
  }

  handleAddEquipments(element: Equipment) {
    this.equipments.push(element);
    console.log(this.equipments)
  }

  handleChangeEquipments(element: Equipment) {
    console.log('sdasdasd');
    for (let i = 0; i < this.equipments.length; i++) {
      console.log(this.equipments[i].id);
      if (this.equipments[i].id == element.id) {
        this.equipments[i].state = 'Выполнено';
        console.log('change')
      }
    }
  }

}
