import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@environment/environment';
import { IApiError, IApiGeneric, IApiSuccess, IClientDisposition, ILead, IDisputeReason, IDisputeLead, ICampaign, IDatatableColumn } from '@/_interfaces';
import { IStatus } from '@/_interfaces/lead';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class LeadsService {
	private readonly _apiUrl = environment.apiUrl;

	/**
	 * Constructor
	 *
	 * @param {HttpClient} _http
	 */
	constructor(
		private _http: HttpClient,
		private _user: AuthenticationService
		) { }

	public getLeads(filters): Observable<IApiSuccess<ILead[]> | IApiError> {
		return this._http.get<IApiSuccess<ILead[]> | IApiError>(`${this._apiUrl}/leads`, { params: filters }).pipe(tap());
	}

	public updateLead(lead: ILead): Observable<IApiSuccess<ILead>> {
		return this._http.patch<IApiSuccess<ILead>>(`${this._apiUrl}/leads/${lead.id}`, lead);
	}

	public getClientDispositions(): Observable<IApiSuccess<IClientDisposition[]>> {
		return this._http.get<IApiSuccess<IClientDisposition[]>>(`${this._apiUrl}/client-dispositions`).pipe(tap());
	}

	public getDisputeReasons(): Observable<IApiSuccess<IDisputeReason[]>> {
		return this._http.get<IApiSuccess<IDisputeReason[]>>(`${this._apiUrl}/dispute-reasons`);
	}

	public createDisputeLead(disputeData: IDisputeLead): Observable<IApiSuccess<IDisputeLead>> {
		return this._http.post<IApiSuccess<IDisputeLead>>(`${this._apiUrl}/leads-dispute`, disputeData);
	}

	public getCurrentDisputeLead(leadData): Observable<IApiSuccess<IDisputeLead>> {
		return this._http.get<IApiSuccess<IDisputeLead>>(`${this._apiUrl}/get-leads-dispute/${leadData.id}/${leadData.user.id}`);
	}

	/* Lead Actions Group */

	public callLead(numbers: { agent: string; lead: string }): Observable<IApiGeneric> {
		return this._http.get<IApiGeneric>(`${this._apiUrl}/call`, { params: numbers }).pipe(tap());
	}

	public dispositionLead(data: {
		lead_id: number;
		agent_id: number;
		client_disposition_id: number;
		start_date_time?: Date;
		end_date_time?: Date;
		notes?: string,
		title?: string,
		location?: string,
		impersonateToken?: string
	}): Observable<IApiGeneric> {
		return this._http
			.patch<IApiGeneric>(`${this._apiUrl}/leads/disposition/${data.lead_id}`, { params: data })
			.pipe(tap());
	}

	public emailLead(email: { agent: string; lead: string; message: string }): Observable<IApiGeneric> {
		return this._http.get<IApiGeneric>(`${this._apiUrl}/email`, { params: email }).pipe(tap());
	}

	public textLead(numbers: { agent: string; lead: string; message: string }): Observable<IApiGeneric> {
		return this._http.get<IApiGeneric>(`${this._apiUrl}/text`, { params: numbers }).pipe(tap());
	}

	public getProviders(): Observable<IApiSuccess<ICampaign[]>> {
		return this._http.get<IApiSuccess<ICampaign[]>>(`${this._apiUrl}/campaigns`);
	}

	public getAllStatus(): Observable<IApiSuccess<IStatus[]>> {
		return this._http.get<IApiSuccess<IStatus[]>>(`${this._apiUrl}/getAllStatuses`);
	}

	public getLeadColumns(): Observable<any>{
		const user = this._user.getUser();
		return this._http.get(`${this._apiUrl}/user/table-column/${user.id}`);
	}

	public updateLeadColumns(colarray: IDatatableColumn[]): Observable<any>{
		const data = {
			"json": colarray,
			"type": "prospect",
			"user_id": this._user.getUser().id
		};
		return this._http.post(`${this._apiUrl}/user/table-column/update`, data);
	}
}
