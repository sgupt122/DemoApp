import { Injectable } from '@angular/core';

import { NAVIGATION, NAVIGATION_OPTION } from '@/_config/navigation';
import { INavigation, IRoleNavigation, IUser } from '@/_interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
	providedIn: 'root'
})
export class NavigationService {
	private _navigation: IRoleNavigation = NAVIGATION;
	private _navigationOption: INavigation[] = [...NAVIGATION_OPTION.role];
	private readonly _apiUrl = environment.apiUrl;

	constructor(
		private _http: HttpClient,
		private _authenticationService: AuthenticationService
	) { }

	// for get all role navigation
	public getNavigation(): Observable<{}> {
		return this._http.get(`${this._apiUrl}/navigation`).pipe(tap())
	}

	// for get single role navigation
	public getSingleNavigation(): Observable<{}> {
		return this._http.get(`${this._apiUrl}/navigation/${this._authenticationService.getUser().id}`).pipe(tap())
	}

	// for update navigation
	public updateSingleNavigation(role_id, navigation): Observable<{}> {
		return this._http.post(`${this._apiUrl}/navigation/${this._authenticationService.getUser().id}`, { role_id: role_id, navigation: navigation }).pipe(tap())
	}

	public retrieveUserNavigation(user: IUser): INavigation[] {
		return this._navigation.auth;
	}

	public filterNavigation(navJson): INavigation[] {
		const filterNavigationArray: INavigation[] = [];

		this._navigationOption.filter(opt => {
			if (opt.id === "reports"){
				if (navJson['data'] && navJson['data'][0]['navigation'][opt.id]['isreport'] === true) {
					filterNavigationArray.push(opt);
				}
				if (!navJson['data'] && navJson[opt.id]['isreport']) {
					filterNavigationArray.push(opt);
				}
			}
			else {
				if (navJson['data'] && navJson['data'][0]['navigation'][opt.id] === true) {
					filterNavigationArray.push(opt);
				}
				if (!navJson['data'] && navJson[opt.id]) {
					filterNavigationArray.push(opt);
				}
			}
		});
		return filterNavigationArray;
	}


}
