import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from "../../../app.service";

export interface Equipment {
  worker: String;
  name: String;
  date: String;
  state: String;
  id?: String;
  change?: boolean;
}

@Component({
  selector: 'app-equipment-employee',
  templateUrl: './equipment-employee.component.html',
  styleUrls: ['./equipment-employee.component.scss']
})
export class EquipmentEmployeeComponent implements OnInit {
  public pipls: any;
  public techs: any;
  public user: any;
  public tech: any;
  public text = '';

  public flag1 = false;
  public flag2 = false;
  public ids: any;
  constructor(private servise: AppService) { }

  ngOnInit(): void {
    this.update()
    for (let index = 0; index < this.equipments.length; index++) {
      this.equipments[index].change = false;
    }
  }

  @Input()
  equipments: Equipment[] = [];

  @Output()
  onRemoveEquipments = new EventEmitter<Equipment>();
  @Output()
  onAddEquipments = new EventEmitter<Equipment>();
  @Output()
  onCnageEquipments = new EventEmitter<Equipment>();

  onRemoveClick(element: Equipment) {
    this.onRemoveEquipments.emit(element);
  }
  onAddClick(elenent: Equipment) {
    this.onAddEquipments.emit(elenent);
  }
  onCnangeClick(element: Equipment) {
    this.onCnageEquipments.emit(element)
  }
  onEditClick(element: Equipment) {
    element.change = !element.change;
  }

  update() {
    this.servise.getallusers().subscribe(value => {
      this.pipls = value;
      this.flag1 = true;
    })
    this.servise.getalltech().subscribe(value => {
      this.techs = value;
      this.flag2 = true;
    })
  }

  mySelectHandler1(e: any) {
    this.user = e
  }
  mySelectHandler2(e: any) {
    this.tech = e
  }
  cangeStat(task: Equipment) {
    this.onCnangeClick(task);
    this.servise.changeStat(task.id).subscribe(value => {
      console.log(value)
    })
  }
  addTask() {
    let Data = new Date();
    let data = Data.getDate() + '.' + Data.getMonth() + '.' + Data.getFullYear();
    this.servise.setTask(this.user.id, this.tech.id, this.text, data).subscribe(value => {
      console.log(value);
      this.ids = value;
      this.onAddClick({
        worker: this.user.fname + '.' + this.user.name[0] + '.' + this.user.oname[0],
        name: this.tech.name,
        date: data,
        state: "В работе",
        id: this.ids.id
      })
    })
  }
}
