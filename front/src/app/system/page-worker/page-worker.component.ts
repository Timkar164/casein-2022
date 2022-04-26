import { Component, OnInit } from '@angular/core';
import { Member } from './members/members.component';
import { Task } from './tasks/tasks.component';
import {Router} from "@angular/router";

@Component({
  selector: 'app-page-worker',
  templateUrl: './page-worker.component.html',
  styleUrls: ['./page-worker.component.scss']
})
export class PageWorkerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('type')!=='0'){
      localStorage.clear();
      this.router.navigate(['auth'])
    }
  }

  machine = "название техники";

  numberTasks = 40;
  notFinishedTasks = 15;

  workClock = 8;

  members: Member[] = [
    {
      img: "../../../../assets/img/workers__img.png",
      name: "Иван Иванов",
      post: "Дизайнер"
    },
    {
      img: "../../../../assets/img/workers__img.png",
      name: "Рома Шахматов",
      post: "Тимлид"
    },
    {
      img: "../../../../assets/img/workers__img.png",
      name: "Аня Ромашкова",
      post: "Бухгалтер"
    },
    {
      img: "../../../../assets/img/workers__img.png",
      name: "София Захарова",
      post: "Дизайнер"
    },
  ]

  tasks: Task[] = [
    {
      img: "../../../../assets/img/task-point.png",
      date: "Суббота, 1 марта",
      text: "Подготовить отчет к предстоящему митингу"
    },
    {
      img: "../../../../assets/img/task-point.png",
      date: "Суббота, 1 марта, 13:10",
      text: "Провести митинг"
    },
    {
      img: "../../../../assets/img/task-point.png",
      date: "Вторник, 4 марта",
      text: "Отослать правки к презентации"
    },
    {
      img: "../../../../assets/img/task-point.png",
      date: "Вторник, 4 марта",
      text: "Отослать правки к отчетности о финансах"
    },
    {
      img: "../../../../assets/img/task-point.png",
      date: "Среда, 25 февраля",
      text: "Собрание по поводу ребрендинга"
    },
    {
      img: "../../../../assets/img/task-point.png",
      date: "Среда, 25 февраля",
      text: "Подготовить ребрендинг"
    },
  ]

}
