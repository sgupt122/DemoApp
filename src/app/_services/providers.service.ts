import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@environment/environment';
import { IApiSuccess, IProvider, IDatatableColumn } from '@/_interfaces';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class ProvidersService {
	private readonly _apiUrl = environment.apiUrl;

	/**
	 *
	 * @param {HttpClient} _http
	 */
	constructor(private _http: HttpClient, private _user: AuthenticationService) {}

	public getProviders(): Observable<IApiSuccess<IProvider[]>> {
		return this._http.get<IApiSuccess<IProvider[]>>(`${this._apiUrl}/providers`).pipe(tap());
	}

	public createProvider(provider: IProvider): Observable<IApiSuccess<IProvider>> {
		return this._http.post<IApiSuccess<IProvider>>(`${this._apiUrl}/providers`, provider);
	}

	public updateProvider(provider: IProvider): Observable<IApiSuccess<IProvider>> {
		return this._http.patch<IApiSuccess<IProvider>>(`${this._apiUrl}/providers/${provider.id}`, provider);
	}


	public getProvidersColumns(): Observable<any>{
		const user = this._user.getUser();
		return this._http.get(`${this._apiUrl}/user/table-column/${user.id}`);
	}

	public updateProvidersColumns(colarray: IDatatableColumn[]): Observable<any>{
		const data = {
			"json": colarray,
			"type": "providers",
			"user_id": this._user.getUser().id
		};
		return this._http.post(`${this._apiUrl}/user/table-column/update`, data);
	}
}
