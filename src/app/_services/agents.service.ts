import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environment/environment';
import { IApiError, IApiSuccess, IUser, IDatatableColumn } from '@/_interfaces';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class AgentsService {
	private readonly _apiUrl = environment.apiUrl;

	/**
	 * @param {HttpClient} _http
	 */
	constructor(private _http: HttpClient,
		private _user: AuthenticationService) { }

	public getAgents(filters): Observable<IApiSuccess<IUser[]> | IApiError> {
		return this._http.get<IApiSuccess<IUser[]> | IApiError>(`${this._apiUrl}/users`, { params: filters });
	}

	public createAgent(user: IUser): Observable<IApiSuccess<IUser>> {
		return this._http.post<IApiSuccess<IUser>>(`${this._apiUrl}/users`, user);
	}

	public updateAgent(user: IUser): Observable<IApiSuccess<IUser>> {
		const userID = user.id;
		delete user.id;
		return this._http.patch<IApiSuccess<IUser>>(`${this._apiUrl}/users/${userID}`, user);
	}

	public addImpersonateAgent(agent: IUser): Observable<IApiSuccess<IUser>> {
		return this._http.post<IApiSuccess<IUser>>(`${this._apiUrl}/add-impersonate`, agent);
	}

	public exitFromImpersonation(impersonateToken: string): Observable<IApiSuccess<string>> {
		const request = {
			token: impersonateToken
		};
		return this._http.post<IApiSuccess<string>>(`${this._apiUrl}/remove-impersonate`, request);
	}

	public getAgentsColumns(): Observable<any>{
		const user = this._user.getUser();
		return this._http.get(`${this._apiUrl}/user/table-column/${user.id}`);
	}

	public updateAgentsColumns(colarray: IDatatableColumn[]): Observable<any>{
		const data = {
			"json": colarray,
			"type": "agents",
			"user_id": this._user.getUser().id
		};
		return this._http.post(`${this._apiUrl}/user/table-column/update`, data);
	}
}
