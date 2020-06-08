import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export type HandleError = <T>(operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

@Injectable({
	providedIn: 'root'
})
export class ErrorInterceptor {
	constructor() {}

	createHandleError = (serviceName = '') => <T>(operation = 'operation', result = {} as T) =>
		this.handleError(serviceName, operation, result);

	public handleError<T>(
		serviceName = '',
		operation = 'operation',
		result = {} as T
	): (response: HttpErrorResponse) => Observable<T> {
		return (response: HttpErrorResponse): Observable<T> => {
			const message = this._getMessage(response);
			return of(result);
		};
	}

	private _getMessage(response: HttpErrorResponse): string {
		return response.error instanceof ErrorEvent
			? response.error.message
			: `server returned code ${response.status} with body "${response.error.error}"`;
	}
}
