import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environment/environment';
import { IApiError, IApiSuccess, IPrice, ILeadType, IProvider, IDatatableColumn } from '@/_interfaces';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class PricingService {
	private readonly _apiUrl = environment.apiUrl;

	/**
	 * @param {HttpClient} _http
	 */
	constructor(private _http: HttpClient, private _user: AuthenticationService) {}

	public getPricing(): Observable<IApiSuccess<IPrice[]> | IApiError> {
		return this._http.get<IApiSuccess<IPrice[]> | IApiError>(`${this._apiUrl}/pricing`);
	}

	public createPrice(price: IPrice): Observable<IApiSuccess<IPrice>> {
		return this._http.post<IApiSuccess<IPrice>>(`${this._apiUrl}/pricing`, price);
	}

	public updatePrice(price: IPrice): Observable<IApiSuccess<IPrice>> {
		return this._http.patch<IApiSuccess<IPrice>>(`${this._apiUrl}/pricing/${price.id}`, price);
	}

	public savePrice(priceValues: IPrice, priceID: number | null = null): Observable<Object> {
		if (!priceID) {
			return this._http.post(`${this._apiUrl}/pricing`, priceValues);
		}
		return this._http.patch(`${this._apiUrl}/pricing/${priceID}`, priceValues);
	}

	public getProviders(): Observable<IApiSuccess<IProvider[]> | IApiError> {
		return this._http.get<IApiSuccess<IProvider[]> | IApiError>(`${this._apiUrl}/providers`);
	}

	public getLeadTypes(): Observable<IApiSuccess<ILeadType[]> | IApiError> {
		return this._http.get<IApiSuccess<ILeadType[]> | IApiError>(`${this._apiUrl}/lead-types`);
	}

	public getPricingColumns(): Observable<any>{
		const user = this._user.getUser();
		return this._http.get(`${this._apiUrl}/user/table-column/${user.id}`);
	}

	public updatePricingColumns(colarray: IDatatableColumn[]): Observable<any>{
		const data = {
			"json": colarray,
			"type": "pricing",
			"user_id": this._user.getUser().id
		};
		return this._http.post(`${this._apiUrl}/user/table-column/update`, data);
	}
}
