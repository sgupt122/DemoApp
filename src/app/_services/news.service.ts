import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@environment/environment';
import { IApiError, IApiSuccess, INews } from '@/_interfaces';

@Injectable({
	providedIn: 'root'
})
export class NewsService {
	private readonly _apiUrl = environment.apiUrl;

	/**
	 * Constructor
	 *
	 * @param {HttpClient} _http
	 */
	constructor(private _http: HttpClient) {}

	public getNews(): Observable<IApiSuccess<INews[]> | IApiError> {
		return this._http.get<IApiSuccess<INews[]> | IApiError>(`${this._apiUrl}/news`).pipe(tap());
	}

	public createNews(faq: INews): Observable<IApiSuccess<INews> | IApiError> {
		return this._http.post<IApiSuccess<INews> | IApiError>(`${this._apiUrl}/news`, faq);
	}

	public updateNews(faq: INews): Observable<IApiSuccess<INews> | IApiError> {
		return this._http.patch<IApiSuccess<INews> | IApiError>(`${this._apiUrl}/news/${faq.id}`, faq);
	}
}
