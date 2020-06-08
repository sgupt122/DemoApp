import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@environment/environment';
import { IApiError, IApiSuccess, ITransaction, IDatatableColumn } from '@/_interfaces';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class TransactionsService {
	private readonly _apiUrl = environment.apiUrl;

	/**
	 * Constructor
	 *
	 * @param {HttpClient} _http
	 */
	constructor(private _http: HttpClient, private _user: AuthenticationService) {}

	public getTransactions(filters): Observable<IApiSuccess<ITransaction[]> | IApiError> {
		return this._http
			.get<IApiSuccess<ITransaction[]> | IApiError>(`${this._apiUrl}/transactions`, { params: filters })
			.pipe(tap());
	}

	public getTransactionColumns(): Observable<any>{
		const user = this._user.getUser();
		return this._http.get(`${this._apiUrl}/user/table-column/${user.id}`);
	}

	public updateTransactionColumns(colarray: IDatatableColumn[]): Observable<any>{
		const data = {
			"json": colarray,
			"type": "account",
			"user_id": this._user.getUser().id
		};
		return this._http.post(`${this._apiUrl}/user/table-column/update`, data);
	}
}
