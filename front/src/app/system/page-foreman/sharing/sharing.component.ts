import { Component, OnInit } from '@angular/core';

export interface SharingItem {
  img: String;
  name: String;
  state: String;
}

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  sharingList: SharingItem[] = [
    {
      img: "../../../../assets/img/sharing__bg.png",
      name: "Название",
      state: "стоит сдать"
    },
    {
      img: "../../../../assets/img/sharing__bg.png",
      name: "Название",
      state: "можно сдать "
    },
    {
      img: "../../../../assets/img/sharing__bg.png",
      name: "Название",
      state: "сдавать не стоит"
    },
    {
      img: "../../../../assets/img/sharing__bg.png",
      name: "Название",
      state: "стоит сдать"
    },
    {
      img: "../../../../assets/img/sharing__bg.png",
      name: "Название",
      state: "можно сдать "
    },
    {
      img: "../../../../assets/img/sharing__bg.png",
      name: "Название",
      state: "сдавать не стоит"
    }, {
      img: "../../../../assets/img/sharing__bg.png",
      name: "Название",
      state: "стоит сдать"
    },
    {
      img: "../../../../assets/img/sharing__bg.png",
      name: "Название",
      state: "можно сдать "
    },
    {
      img: "../../../../assets/img/sharing__bg.png",
      name: "Название",
      state: "сдавать не стоит"
    }, {
      img: "../../../../assets/img/sharing__bg.png",
      name: "Название",
      state: "стоит сдать"
    },
    {
      img: "../../../../assets/img/sharing__bg.png",
      name: "Название",
      state: "можно сдать "
    },
    {
      img: "../../../../assets/img/sharing__bg.png",
      name: "Название",
      state: "сдавать не стоит"
    },
  ]
}
