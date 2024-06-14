import { Component, OnInit } from '@angular/core';
import {GlobalService} from '../global.service';
 
interface Sports {
  id: any,
  name: string;
  price: number;
 
}
 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
 
  sports:any=null;
  formHeader="Add Sport";
  id:any;
  name="";
  price: any;
  showForm=false;
 
  constructor(private ms:GlobalService){
 
  }
 
  ngOnInit(): void {
   
  this.getSport();
 
  }
  getSport(){
    this.ms.fetchSports().subscribe(
      (data)=>{
        this.sports=data;
      },
      (error)=>{
        console.log("error");
      }
     )
  }
  deleteSport(id: any){
    this.ms.deleteSport(id).subscribe((res)=>{this.getSport()})
  }
  openForm(data: Sports| null = null) {
   
    this.showForm = true;
    if (data) {
      this.formHeader="Edit Sport";
      this.id=data.id;
      this.name = data.name;
      this.price = data.price;
    }
    else{
      this.formHeader="Add Sport";
      this.clearform();
    }
  }
  closeForm(){
    this.showForm=false;
    this.clearform();
  }
  clearform() {
    this.id=null;
    this.name='';
    this.price=null;
  }
  saveSport(){
    this.showForm=false;
    let body={
      id:this.id,
      name:this.name,
      price:this.price,
    }
    if(this.id){
      body['id']=this.id;
      console.log("Updating sport with ID:", this.id, "Data:", body);
      this.ms.putSport(body,body['id']).subscribe(
        (res: any)=>{
          console.log("Update successful:", res);
          this.getSport();
        },
        (error: any) => {
          console.error("Update failed:", error);
        }
      )
      this.clearform();
    }
    else{
      this.ms.postSport(body).subscribe(
        (res: any)=>{
          this.getSport();
        }
      )
      this.clearform();
    }
  }
}