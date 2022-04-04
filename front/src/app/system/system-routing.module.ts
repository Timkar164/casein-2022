import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { MainComponent } from './main/main.component';
import { StreamPageComponent } from './stream-page/stream-page.component';
import { SystemComponent } from './system.component';

const routes: Routes = [
  {
    path: '', component: SystemComponent, children: [
      { path: '', component: MainComponent },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'stream', component: StreamPageComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
