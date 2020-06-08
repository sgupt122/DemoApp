import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environment/environment';
import { IApiError, IApiSuccess, ICampaign, ILeadType, IProvider, IDatatableColumn } from '@/_interfaces';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class CampaignsService {
	private readonly _apiUrl = environment.apiUrl;

	/**
	 * @param {HttpClient} _http
	 */
	constructor(private _http: HttpClient,
		private _user: AuthenticationService) {}

	public getCampaigns(): Observable<IApiSuccess<ICampaign[]> | IApiError> {
		return this._http.get<IApiSuccess<ICampaign[]> | IApiError>(`${this._apiUrl}/campaigns`);
	}

	public createCampaign(campaign: ICampaign): Observable<IApiSuccess<ICampaign>> {
		return this._http.post<IApiSuccess<ICampaign>>(`${this._apiUrl}/campaigns`, campaign);
	}

	public updateCampaign(campaign: ICampaign): Observable<IApiSuccess<ICampaign>> {
		return this._http.patch<IApiSuccess<ICampaign>>(`${this._apiUrl}/campaigns/${campaign.id}`, campaign);
	}

	public saveCampaign(campaignValues: ICampaign, campaignID: number | null = null): Observable<Object> {
		if (!campaignID) {
			return this._http.post(`${this._apiUrl}/campaigns`, campaignValues);
		}
		return this._http.patch(`${this._apiUrl}/campaigns/${campaignID}`, campaignValues);
	}

	public getProviders(): Observable<IApiSuccess<IProvider[]> | IApiError> {
		return this._http.get<IApiSuccess<IProvider[]> | IApiError>(`${this._apiUrl}/providers`);
	}

	public getLeadTypes(): Observable<IApiSuccess<ILeadType[]> | IApiError> {
		return this._http.get<IApiSuccess<ILeadType[]> | IApiError>(`${this._apiUrl}/lead-types`);
	}

	public getCampaignsColumns(): Observable<any>{
		const user = this._user.getUser();
		return this._http.get(`${this._apiUrl}/user/table-column/${user.id}`);
	}

	public updateCampaignsColumns(colarray: IDatatableColumn[]): Observable<any>{
		const data = {
			"json": colarray,
			"type": "campaigns",
			"user_id": this._user.getUser().id
		};
		return this._http.post(`${this._apiUrl}/user/table-column/update`, data);
	}
}
