import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit 
{
   c:string="";
   userId:any;
   email:any;
   password:any;

  constructor(private auth:AuthServiceService,private ms: GlobalService, private router: Router){}
  ngOnInit(): void {
   localStorage.clear();
  }
   
submitForm(_t11: any) {
  console.log(_t11);
}
login(){
  if(this.email==="admin@gmail.com" && this.password==="admin@123"){
    localStorage.setItem("role","admin");
    this.router.navigate(["/admin"]);
  }
  else{
    this.ms.UserExists({"email":this.email,"password":this.password}).subscribe(
      (data:any)=>{
        if(data!==null){
          this.userId=data.id;
          localStorage.setItem("id",data.id);
          localStorage.setItem("role","user");
          this.router.navigate(["/home"]);
        }
        else{
          alert("Invalid Credentials");
        }
      }
    )
  }
}



}
