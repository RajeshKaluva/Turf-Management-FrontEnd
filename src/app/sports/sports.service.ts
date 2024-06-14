import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class SportService {
private baseUrl = 'http://localhost:8080/sports/get';
 
  constructor(private http: HttpClient) { }
 
  getSports(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
 
}