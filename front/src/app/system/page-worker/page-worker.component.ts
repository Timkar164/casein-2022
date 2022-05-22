import { Component, OnInit } from '@angular/core';
import { Member } from './members/members.component';
import { Task } from './tasks/tasks.component';
import {Router} from "@angular/router";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-page-worker',
  templateUrl: './page-worker.component.html',
  styleUrls: ['./page-worker.component.scss']
})
export class PageWorkerComponent implements OnInit {
  public req:any;
  public name ='';
  constructor(private router: Router,private servise:AppService) { }

  ngOnInit(): void {
    if(localStorage.getItem('type')!=='0'){
      localStorage.clear();
      this.router.navigate(['auth'])
    }
    this.servise.getworkerinfo(localStorage.getItem('user')).subscribe(value => {
      this.req = value;
      console.log(this.req);
      this.numberTasks=this.req.all;
      this.notFinishedTasks=this.req.all;
      this.tasks = this.req.task;
      this.workClock=this.req.timer;
      this.members = this.req.users;
      this.name = this.req.name;
    })
  }

  machine = "название техники";

  numberTasks = 0;
  notFinishedTasks = 0;

  workClock = 8;

  members: Member[] = [];

  tasks: Task[] = [];

}
