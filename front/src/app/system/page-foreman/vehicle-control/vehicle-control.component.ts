import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Technic {
  name: String;
  worker: String;
  state: String;
}

@Component({
  selector: 'app-vehicle-control',
  templateUrl: './vehicle-control.component.html',
  styleUrls: ['./vehicle-control.component.scss']
})

export class VehicleControlComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  technics: Technic[] = [];

  // @Output()
  // onRemove = new EventEmitter();

  @Output()
  onRemoveTechnics = new EventEmitter<Technic>();

  // onRemoveClick(id: String, index: number) {
  //   this.technics.splice(index, 1);
  //   this.onRemove.emit();
  // }

  // onRemoveClick(element: Technic) {
  //   this.onRemoveTechnics.emit(...this.technics.splice(index, 1));
  // }

  onRemoveClick(element: Technic) {
    this.onRemoveTechnics.emit(element);
  }

}
