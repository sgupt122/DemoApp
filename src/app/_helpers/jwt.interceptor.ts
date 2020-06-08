import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthenticationService } from '@/_services';

@Injectable({
	providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {
	/**
	 *
	 * @param {MatSnackBar} snackBar
	 * @param {AuthenticationService} _authenticationService
	 */
	constructor(public snackBar: MatSnackBar, private _authenticationService: AuthenticationService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const token = this._authenticationService.getToken();
		if (!token) {
			return next.handle(request);
		}

		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json'
			}
		});

		return next.handle(request).pipe(
			tap(
				() => {},
				(err: any) => {
					if (err instanceof HttpErrorResponse) {
						if ([401].includes(err.status)) {
							this._authenticationService.destroySession(true);
						}
						if ([422].includes(err.status)) {
							Object.keys(err.error.errors).forEach(error => {
								this.snackBar.open(err.error.errors[error], null, { duration: 2000 });
							});
						}
					}
				}
			)
		);
	}
}
