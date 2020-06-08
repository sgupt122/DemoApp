import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '@environment/environment';
import { IApiSuccess, IFaq } from '@/_interfaces';

@Injectable({
	providedIn: 'root'
})
export class FaqsService {
	private readonly _apiUrl = environment.apiUrl;

	/**
	 * @param {HttpClient} _http
	 */
	constructor(private _http: HttpClient) {}

	public getFaqs(): Observable<IApiSuccess<IFaq[]>> {
		return this._http.get<IApiSuccess<IFaq[]>>(`${this._apiUrl}/faqs`).pipe(tap());
	}

	public createFaq(faq: IFaq): Observable<IApiSuccess<IFaq>> {
		return this._http.post<IApiSuccess<IFaq>>(`${this._apiUrl}/faqs`, faq);
	}

	public updateFaq(faq: IFaq): Observable<IApiSuccess<IFaq>> {
		return this._http.patch<IApiSuccess<IFaq>>(`${this._apiUrl}/faqs/${faq.id}`, faq);
	}
}
