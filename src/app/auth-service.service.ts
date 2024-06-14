import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate {

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    let loggedIn;
    let role = localStorage.getItem('role');
    if(role=="admin"){
       return true;
    }else if(role==='user'){
      loggedIn = localStorage.getItem('id');
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
