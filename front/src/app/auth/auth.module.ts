import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AuthComponent} from "./auth.component";
import {RouterModule} from "@angular/router";
import {AuthRoutingModule} from "./auth.routing-module";
import { LoginComponent } from './login/login.component';
import { ReginComponent } from './regin/regin.component';
import { FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    ReginComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AuthRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: []
})
export class AuthModule { }
