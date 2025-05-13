import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

    constructor(private router: Router) { }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('authToken');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.isLoggedIn()) {
            // User is already logged in, redirect to dashboard
            this.router.navigate(['/AllRecord']);  // ✅ Change to your default route
            return false;
        }
        return true;
    }
}
