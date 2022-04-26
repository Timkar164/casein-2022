import { Component, Input, OnInit } from '@angular/core';

export interface Task {
  img: String;
  date: String;
  text: String;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  numberTasks: number = 0;

  @Input()
  notFinishedTasks: number = 0;

  @Input()
  tasks: Task[] = [];

}
