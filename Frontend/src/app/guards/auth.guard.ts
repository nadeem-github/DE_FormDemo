import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // Token exists
  }

  isAdmin(): boolean {
    return localStorage.getItem('roles') === 'admin';
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      // Force redirect to login page
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }
}