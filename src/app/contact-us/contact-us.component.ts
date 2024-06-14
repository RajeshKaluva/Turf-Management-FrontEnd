import { Component } from '@angular/core';
import {GlobalService} from '../global.service';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  name:string='';
  email:string='';
  message:string='';
  constructor(private ms:GlobalService) { }
 
  ngOnInit(): void {
  }
  clearform() {
    this.name='';
    this.message='';
    this.email='';
   
  }
 saveContact(){
  let body={
    name:this.name,
    email:this.email,
    message:this.message
  }
  this.ms.postContact(body).subscribe(
    (res: any)=>{
    
    }
  )
  this.clearform();
 }
}
