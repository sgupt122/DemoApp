import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@environment/environment';
import { IApiError, IApiSuccess, ICustomer, IDatatableColumn } from '@/_interfaces';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class CustomersService {
	private readonly _apiUrl = environment.apiUrl;

	/**
	 * Constructor
	 *
	 * @param {HttpClient} _http
	 */
	constructor(private _http: HttpClient, private _user: AuthenticationService) {}

	public getCustomers(filters): Observable<IApiSuccess<ICustomer[]> | IApiError> {
		return this._http
			.get<IApiSuccess<ICustomer[]> | IApiError>(`${this._apiUrl}/customers`, { params: filters })
			.pipe(tap());
	}

	public updateCustomer(customer: ICustomer): Observable<IApiSuccess<ICustomer>> {
		return this._http.patch<IApiSuccess<ICustomer>>(`${this._apiUrl}/customers/${customer.id}`, customer);
	}

	public getCustomerColumns(): Observable<any>{
		const user = this._user.getUser();
		return this._http.get(`${this._apiUrl}/user/table-column/${user.id}`);
	}

	public updateCustomerColumns(colarray: IDatatableColumn[]): Observable<any>{
		const data = {
			"json": colarray,
			"type": "customer",
			"user_id": this._user.getUser().id
		};
		return this._http.post(`${this._apiUrl}/user/table-column/update`, data);
	}
}
