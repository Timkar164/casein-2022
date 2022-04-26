import { Component, OnInit } from '@angular/core';
import { AppService } from "../../app.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public login = '';
  public pas = '';
  public req: any;
  constructor(private service: AppService, private router: Router) { }

  ngOnInit(): void {
  }
  auth() {
    this.service.auth(this.login, this.pas).subscribe(value => {
      console.log(value);
      this.req = value;
      if (this.req.response) {
        localStorage.setItem('user', this.req.user);
        localStorage.setItem('type', this.req.type);
        if (this.req.type == 1) {
          this.router.navigate(['page-foreman'])

        }
        else {
          this.router.navigate(['page-worker'])
        }
      }


    })
  }
}
