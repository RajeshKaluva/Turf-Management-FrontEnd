import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  constructor(private http:HttpClient) { }
 
  deleteBooking(id: any) {
    return this.http.delete("http://localhost:8080/bookings/"+id);
  }
  putBooking(booking: any,id:any) {
    return this.http.put(`http://localhost:8080/bookings/${id}`,booking);
  }
 
 
 
 postContact(body:any) {
    return this.http.post("http://localhost:8080/contact/",body);
  }
  deleteSport(food_id: any){
    return this.http.delete("http://localhost:8080/sports/d/"+food_id);
   }
 
   postSport(body: any){
    return this.http.post("http://localhost:8080/sports/",body);
   }
 
   putSport(body: any, id: any) {
    return this.http.put(`http://localhost:8080/sports/put/${id}`, body);
}
   fetchSports(){
    return this.http.get("http://localhost:8080/sports/get");
   }
   postBooking(body: any): Observable<any> {
    return this.http.post("http://localhost:8080/bookings/", body);
  }
  postUser(body:any){
    return this.http.post("http://localhost:8080/users/add",body);
  }
  getUserBooking(){
    return this.http.get("http://localhost:8080/bookings/");
  }
  UserExists(Credentials:any){
    return this.http.post("http://localhost:8080/users/login",Credentials);
  }
  getUsers(){
    return this.http.get("http://localhost:8080/users/");
  }
}