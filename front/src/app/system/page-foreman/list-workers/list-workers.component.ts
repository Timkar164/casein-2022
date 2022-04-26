import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, Input, OnInit } from '@angular/core';

export interface Worker {
  img: String;
  name: String;
  post: String;
}

@Component({
  selector: 'app-list-workers',
  templateUrl: './list-workers.component.html',
  styleUrls: ['./list-workers.component.scss']
})
export class ListWorkersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  workers: Worker[] = []

}
