import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AppService} from "../../../app.service";
import validate = WebAssembly.validate;



@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements OnInit {
  public req1:any;
  public sharingList:any = []
  constructor(private servise: AppService,private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
this.update()
  }
  async getsharing(tech:any){
    if(tech.stat=='в простое'){
     await this.servise.changeshering(tech.id,'в аренде').subscribe(value => {
       console.log(value)
     })
    }
    if(tech.stat=='в аренде'){
      await this.servise.changeshering(tech.id,'в простое').subscribe(value => {
        console.log(value)
      })
    }
    await this.update();
    this.changeDetection.detectChanges();

  }
 update(){
   this.servise.getshering().subscribe(value => {
     this.req1=value;
     this.sharingList=this.req1.items;
     console.log(this.sharingList);
     this.changeDetection.detectChanges();
   })
 }

}
