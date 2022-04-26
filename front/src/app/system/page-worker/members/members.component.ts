import { Component, Input, OnInit } from '@angular/core';

export interface Member {
  img: String;
  name: String;
  post: String;
}

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  members: Member[] = []

}
