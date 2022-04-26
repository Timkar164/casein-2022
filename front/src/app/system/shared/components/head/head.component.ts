import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from "@angular/forms";
// @ts-ignore
@Component({
  selector: 'system-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.css'],
})

export class HeadComponent implements OnInit {

  constructor() {

  }
  ngOnInit(): void {

  }

  navIsAvtive: boolean = false;

  navActive() {
    this.navIsAvtive = !this.navIsAvtive;
  }
  exit(){
    localStorage.clear()
  }
}


