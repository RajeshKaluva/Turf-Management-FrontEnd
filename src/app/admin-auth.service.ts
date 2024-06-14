import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
 
  constructor(private route:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    let role = localStorage.getItem('role');
    if(role==='admin'){
      return true;
    }else{
      this.route.navigate(['/login']);
      alert("UnAuthorized Access");
      return false;
    }
  }
}