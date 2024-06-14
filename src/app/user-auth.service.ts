import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService implements CanActivate{

  constructor(private route:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
    let role = localStorage.getItem('role');
    if(role==='user'){
      return true;
    }else{
      this.route.navigate(['/login']);
      alert("UnAuthorized Access");
      return false;
    }
  }

}
