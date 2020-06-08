import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ProvidersService } from '@/_services';
import { IApiSuccess, IProvider } from '@/_interfaces';
import * as fromProviders from '@/main/providers/store';
import { COLUMNS } from '@/_config';

@Injectable()
export class ProvidersEffects {
	constructor(private _actions$: Actions, private _providersService: ProvidersService) {}

	@Effect()
	loadProviders$ = this._actions$.pipe(
		ofType(fromProviders.ProvidersActionTypes.LoadProviders),
		mergeMap((action: fromProviders.LoadProviders) =>
			this._providersService.getProviders().pipe(
				map((providers: IApiSuccess<IProvider[]>) => new fromProviders.LoadProvidersSuccess(providers)),
				catchError(err => of(new fromProviders.LoadProvidersFail(err.error.message)))
			)
		)
	);

	@Effect()
	updateProvider$ = this._actions$.pipe(
		ofType(fromProviders.ProvidersActionTypes.UpdateProvider),
		map((action: fromProviders.UpdateProvider) => action.payload),
		mergeMap((provider: IProvider) =>
			this._providersService.updateProvider(provider).pipe(
				map(updatedProvider => new fromProviders.UpdateProviderSuccess(updatedProvider)),
				catchError(err => of(new fromProviders.UpdateProviderFail(err.error.errors)))
			)
		)
	);

	@Effect()
	createProvider$: Observable<Action> = this._actions$.pipe(
		ofType(fromProviders.ProvidersActionTypes.CreateProvider),
		map((action: fromProviders.CreateProvider) => action.payload),
		mergeMap((provider: IProvider) =>
			this._providersService.createProvider(provider).pipe(
				map(newProvider => new fromProviders.CreateProviderSuccess(newProvider)),
				catchError(err => of(new fromProviders.CreateProviderFail(err.error.errors)))
			)
		)
	);

	@Effect()
	loadColumns = this._actions$.pipe(
		ofType(fromProviders.ProvidersActionTypes.LoadColumns),
		mergeMap((action: fromProviders.LoadColumns) =>
			this._providersService.getProvidersColumns().pipe(
			map((response: any) => new fromProviders.LoadColumnsSuccess(response)),
			catchError(err => of(new fromProviders.LoadColumnsFail(err.error.message)))
			)
		)
	);
	
	@Effect()
	updateColumns$ = this._actions$.pipe(
		ofType(fromProviders.ProvidersActionTypes.UpdateColumns),
		map((action: fromProviders.UpdateColumns) => action.payload),
		mergeMap(() =>
			this._providersService.updateProvidersColumns(COLUMNS.providers).pipe(
				map(updated => new fromProviders.UpdateColumnsSuccess(updated)),
				catchError(err => of(new fromProviders.UpdateColumnsFail(err.error.message)))
			)
		)
	);
}
