import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from "./auth.component";
import { LoginComponent } from './login/login.component';
import { ReginComponent } from './regin/regin.component';

const routes: Routes = [
  {
    path: '', component: AuthComponent, children: [
      { path: 'auth', component: LoginComponent },
      { path: 'registration', component: ReginComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
