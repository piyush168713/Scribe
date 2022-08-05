import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> |  Promise<boolean> | boolean  {
    
      return new Promise((resolve, reject) => {

      firebase.auth().onAuthStateChanged((user) => {
        if(user) {
          resolve(true);
        } else {

          this.router.navigate(['/login']);

          resolve(false);
        }
      })

    })
  }
  
}
