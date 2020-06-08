import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@environment/environment';
import { IApiGeneric } from '@/_interfaces';

@Injectable({
	providedIn: 'root'
})
export class DashboardService {
	private readonly _apiUrl = environment.apiUrl;

	/**
	 * @param {HttpClient} _http
	 */
	constructor(private _http: HttpClient) {}

	public getDashboardData(): Observable<IApiGeneric> {
		return this._http.get<IApiGeneric>(`${this._apiUrl}/dashboard`).pipe(tap());
	}
}
