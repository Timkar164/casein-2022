import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth/auth.component';
import { ComputerVisionComponent } from './computer-vision/computer-vision.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { MainComponent } from './main/main.component';
import { PageForemanComponent } from './page-foreman/page-foreman.component';
import { PageWorkerComponent } from './page-worker/page-worker.component';
import { StreamPageComponent } from './stream-page/stream-page.component';
import { SystemComponent } from './system.component';
import {BimComponent} from "./bim/bim.component";

const routes: Routes = [
  {
    path: '', component: SystemComponent, children: [
      { path: '', component: MainComponent },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'stream', component: StreamPageComponent },
      { path: 'page-foreman', component: PageForemanComponent },
      { path: 'page-worker', component: PageWorkerComponent },
      { path: 'computer-vision', component: ComputerVisionComponent },
      { path: 'bim', component: BimComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
