import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '@environment/environment';
import { AuthenticationService } from '@/_services/authentication.service';
import {
	IApiGeneric,
	IApiError,
	IApiSuccess,
	ITextingPreferences,
	IUser,
	IUserTextingPreferences
} from '@/_interfaces';
import { LocalStorage } from 'ngx-webstorage';

@Injectable({
	providedIn: 'root'
})
export class ProfileService {
	@LocalStorage() private impersonateMsg: string;
	@LocalStorage() private admin: string;
	@LocalStorage() private impersonateToken: string;
	private readonly _apiUrl = environment.apiUrl;
	private readonly _user: IUser;

	/**
	 *
	 * @param {AuthenticationService} _authenticationService
	 * @param {HttpClient} _http
	 */
	constructor(private _authenticationService: AuthenticationService, private _http: HttpClient) {
		this._user = this._authenticationService.getUser();
	}

	public save(profileData: IUser): Observable<Object> {
		return this._http.patch(`${this._apiUrl}/users/${this._authenticationService.getUser().id}`, profileData).pipe(
			map((response) => {
				if (response) {
					if (this.impersonateToken) {
						this.changeImpersonateMessage(response);
					}
					return response;
				}
			}));
	}

	public updateUser(userData: IUser): void {
		this._authenticationService.updateUser(userData);
	}

	public updatePassword(passwordData: {
		password: string;
		confirm_password?: string;
	}): Observable<IApiSuccess<any> | IApiError> {
		return this._http.post<IApiSuccess<any> | IApiError>(
			`${this._apiUrl}/users/${this._authenticationService.getUser().id}/updatePassword`,
			passwordData
		);
	}

	public getTextingPreferences(): Observable<IUserTextingPreferences> {
		return this._http.get<IUserTextingPreferences>(`${this._apiUrl}/users-texting-preferences/${this._authenticationService.getUser().id}`);
	}

	public saveTextingPreferences(formData: ITextingPreferences): Observable<IApiGeneric> {
		return this._http.post<IApiGeneric>(`${this._apiUrl}/users-texting-preferences/${this._authenticationService.getUser().id}`, formData);
	}

	public updateTextingPreferences(formData: ITextingPreferences): Observable<IApiGeneric> {
		return this._http.patch<IApiGeneric>(`${this._apiUrl}/users-texting-preferences/${this._authenticationService.getUser().id}`, formData);
	}

	private changeImpersonateMessage(userResponse): void {
		if (userResponse) {
			const profileData = userResponse['data']['profile'];
			this.impersonateMsg = this.admin + ' is logged in as ' + `${profileData.first_name} ${profileData.last_name}`
		}
	}
}
