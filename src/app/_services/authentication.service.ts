import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

import { environment } from '@environment/environment';
import { User } from '@/_models';
import { IUser } from '@/_interfaces';
import { UserRoles } from '@/main/auth/register/register.component';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json'
	})
};

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	private readonly apiUrl = environment.apiUrl;
	private registerUrl = this.apiUrl + '/auth/register';
	private _loginUrl = this.apiUrl + '/auth/login';

	/**
	 *
	 * @param {LocalStorageService} _localStorage
	 * @param {HttpClient} http
	 * @param {Router} router
	 */
	constructor(private _localStorage: LocalStorageService, private http: HttpClient, private router: Router) {
	}

	public onRegister(user: User): Observable<User> {
		const request = JSON.stringify({
			name: user.name,
			email: user.email,
			password: user.password,
			roleId: user.roleId,
			timezone: user.timezone
		});
		return this.http.post(this.registerUrl, request, httpOptions).pipe(
			map((response: User) => {
				const token: string = response['data']['token'];
				if (token) {
					this.setToken(token);
					this.setUser().subscribe();
				}
				return response;
			}),
			catchError(error => this.handleError(error))
		);
	}

	public onLogin(user: User): Observable<User> {
		const request = JSON.stringify({ email: user.email, password: user.password });
		return this.http.post(this._loginUrl, request, httpOptions).pipe(
			map((response: User) => {
				const token: string = response['data']['token'];
				if (token) {
					this.setToken(token);
					this.setUser().subscribe();
				}
				return response;
			}),
			catchError(error => this.handleError(error))
		);
	}

	public onLogout(redirect: boolean = true): Observable<User> {
		return this.http.post(this.apiUrl + '/auth/logout', httpOptions).pipe(
			tap(() => {
				this.destroySession(redirect);
			}),
			catchError(error => this.handleError(error))
		);
	}

	public onTokenRefresh(): Observable<Object> {
		return this.http.patch(`${this.apiUrl}/auth/refresh`, httpOptions).pipe(
			map((response: User) => {
				const token: string = response['data']['token'];
				if (token) {
					this.setToken(token);
				}
				return response;
			}),
			catchError(error => this.handleError(error))
		);
	}

	public onRememberMe(checked: boolean, credentials: { email: string; password: string }): any {
		if (checked) {
			return this._localStorage.store('credentials', credentials);
		}
		return this._localStorage.clear('credentials');
	}

	public rememberMe(): { email: string; password: string } {
		if (this._localStorage.retrieve('credentials')) {
			return this._localStorage.retrieve('credentials');
		}
		return { email: '', password: '' };
	}

	public setUser(): Observable<User> {
		return this.http.get(this.apiUrl + '/user').pipe(
			tap((user: User) => {
				this._localStorage.store('user', user['data']);
			})
		);
	}

	public isAdmin(): boolean {
		return this.getUser().roles.includes('admin');
	}

	public updateUser(userData: IUser): void {
		this._localStorage.store('user', userData);
	}

	public userChanges(): Observable<any> {
		return this._localStorage.observe('user');
	}

	public getUser(): IUser {
		return this._localStorage.retrieve('user');
	}

	public getToken(): string {
		return this._localStorage.retrieve('token');
	}

	public setToken(token: string): void {
		return this._localStorage.store('token', token);
	}

	public setData(key: string, data: string): void {
		return this._localStorage.store(key, data);
	}

	public isAuthenticated(): boolean {
		const token: string = this.getToken();
		return !!token;
	}

	public getTokenExpirationDate(token: string): Date | null {
		const decoded = jwt_decode(token);

		if (decoded.exp === undefined) return null;

		const date = new Date(0);
		date.setUTCSeconds(decoded.exp);
		return date;
	}

	public isTokenExpired(token?: string): boolean {
		if (!token) token = this.getToken();
		if (!token) return true;

		const date = this.getTokenExpirationDate(token);
		if (date === undefined) return false;
		return !(date.valueOf() > new Date().valueOf());
	}

	public destroySession(redirect: boolean): void {
		this._localStorage.clear('token');
		this._localStorage.clear('user');
		this._localStorage.clear('impersonatetoken');
		this._localStorage.clear('admin');
		this._localStorage.clear('impersonatemsg');
		if (redirect) {
			this.router.navigate(['/auth/login']);
		}
	}

	private handleError(error: HttpErrorResponse): Observable<never> {
		if (error.error instanceof ErrorEvent) {
			console.error('An error occurred:', error.error.message);
		} else {
			if (error.status === 500) {
				this.destroySession(true);
			}
			return throwError(error);
		}
		return throwError('Oops something wrong happened here; please try again later.');
	}

	public getRoles(): Observable<UserRoles> {
		return this.http.get<UserRoles>(`${this.apiUrl}/get-roles`);
	}

	public getResetPasswordToken(token): Observable<any> {
		return this.http.get<any>(`${this.apiUrl}/reset-password/${token}`);
	}

	public setAgentPassword(data): Observable<any> {
		const request = {
			password: data.password,
			token: data.token
		};
		return this.http.post(`${this.apiUrl}/change-password/`, request);
	}

	public forgotPassword(data): Observable<any> {
		const request = {
			email: data.email,
			token: data.token
		};
		return this.http.post(`${this.apiUrl}/forgot-password/`, request);
	}
}
