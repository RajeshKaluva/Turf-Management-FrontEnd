import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}
 
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
 
  constructor(private http: HttpClient) {}
 
  ngOnInit() {
    this.fetchUserDetails();
  }
 
  fetchUserDetails() {
    this.http.get('http://localhost:8080/users/').subscribe(
      (users:any) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}