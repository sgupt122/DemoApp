import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@/_services';

@Injectable({
	providedIn: 'root'
})
export class SessionGuard implements CanActivate {
	/**
	 *
	 * @param {Router} router
	 * @param {AuthenticationService} authenticationService
	 */
	constructor(private router: Router, private authenticationService: AuthenticationService) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean> | Promise<boolean> | boolean {
		if (this.authenticationService.isAuthenticated()) {
			this.router.navigate(['/dashboard']);
			return false;
		}

		return true;
	}
}
