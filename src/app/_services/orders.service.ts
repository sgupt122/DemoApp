import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@environment/environment';
import {
	IApiError,
	IApiSuccess,
	ICampaign,
	ILeadType,
	IOrder,
	IOrderDistributionType,
	IOrderType,
	IDatatableColumn
} from '@/_interfaces';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class OrdersService {
	private readonly _apiUrl = environment.apiUrl;

	/**
	 *
	 * @param {HttpClient} _http
	 */
	constructor(
		private _http: HttpClient,
		private _user: AuthenticationService
		) {}

	public retrieve(): Observable<IApiSuccess<IOrder[]>> {
		return this._http.get<IApiSuccess<IOrder[]>>(`${this._apiUrl}/orders`).pipe(tap());
	}

	public create(order: IOrder): Observable<IApiSuccess<IOrder>> {
		return this._http.post<IApiSuccess<IOrder>>(`${this._apiUrl}/orders`, order);
	}

	public update(order: IOrder): Observable<IApiSuccess<IOrder>> {
		return this._http.patch<IApiSuccess<IOrder>>(`${this._apiUrl}/orders/${order.id}`, order);
	}

	public orderTypes(): Observable<IApiSuccess<IOrderType[]>> {
		return this._http.get<IApiSuccess<IOrderType[]>>(`${this._apiUrl}/order-types`).pipe(tap());
	}

	public orderDistributionTypes(): Observable<IApiSuccess<IOrderDistributionType[]>> {
		return this._http
			.get<IApiSuccess<IOrderDistributionType[]>>(`${this._apiUrl}/order-distribution-types`)
			.pipe(tap());
	}

	public getLeadTypes(): Observable<IApiSuccess<ILeadType[]> | IApiError> {
		return this._http.get<IApiSuccess<ILeadType[]> | IApiError>(`${this._apiUrl}/lead-types`).pipe(tap());
	}

	public getCampaigns(leadTypeIDs: number[]): Observable<IApiSuccess<ICampaign[]>> {
		let params = new HttpParams();
		leadTypeIDs.forEach((leadTypeID: number) => {
			params = params.append(`leadTypeIDs[]`, leadTypeID.toString());
		});
		return this._http.get<IApiSuccess<ICampaign[]>>(`${this._apiUrl}/campaigns`, { params: params }).pipe(tap());
	}

	public getOrderColumns(): Observable<any>{
		const user = this._user.getUser();
		return this._http.get(`${this._apiUrl}/user/table-column/${user.id}`);
	}

	public updateOrderColumns(colarray: IDatatableColumn[]): Observable<any>{
		const data = {
			"json": colarray,
			"type": "orders",
			"user_id": this._user.getUser().id
		};
		return this._http.post(`${this._apiUrl}/user/table-column/update`, data);
	}
}
