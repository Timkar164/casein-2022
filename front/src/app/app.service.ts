import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { API} from "../../enveriment";


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }
  register(name:any,fname:any,oname:any,email:any,pas:any,post:any){
    const req = this.http.post(API+'user',{name:name,fname:fname,oname:oname,email:email,pas:pas,post:post});
    return req
  }
  auth(email:any,pas:any){
    const req = this.http.get(API+'authuser?email='+email+'&pas='+pas);
    return req
  }
  getworker(){
    const req = this.http.get(API+'getworker');
    return req
  }
  gettech(){
    const req = this.http.get(API+'gettеch');
    return req
  }
  gettask(){
    const req = this.http.get(API+'gettask');
    return req
  }
  getallusers(){
    const req = this.http.get(API+'getusers');
    return req
  }
  getalltech(){
    const req = this.http.get(API+'gettechs');
    return req
  }

  setTask(user:any,tech:any,text:any,data:any){
    const req = this.http.get(API+'settask?user='+user+'&tech='+tech+'&task='+text+'&date='+data);
    return req
  }
  getadminfo(){
    const req = this.http.get(API+'getadminf');
    return req
  }
  changeStat(taskid:any){
    const req = this.http.get(API+'changestattask?id='+taskid);
    return req
  }
  getworkerinfo(user:any){
    const req = this.http.get(API+'wokerinfo?id='+user);
    return req
  }
   getshering(){
     const req = this.http.get(API+'getshering');
     return req
   }
}
