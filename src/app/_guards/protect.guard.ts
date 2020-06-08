import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate, CanActivateChild } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthenticationService } from '@/_services';

@Injectable({
    providedIn: 'root'
})
export class ProtectGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        if (state.url !== '/leads') {
            this.router.navigate(['/dashboard']);
            return false;
        }
        else {
            return true;
        }
    }
}
