import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { PricingService } from '@/_services';
import { IPrice, IApiSuccess, ILeadType, IProvider } from '@/_interfaces';
import * as fromPricing from '@/main/pricing/store';
import { COLUMNS } from '@/_config';

@Injectable()
export class PricingEffects {
	constructor(private _actions$: Actions, private _pricingService: PricingService) {}

	@Effect()
	loadPricing$ = this._actions$.pipe(
		ofType(fromPricing.PricingActionTypes.LoadPricing),
		mergeMap((action: fromPricing.LoadPricing) =>
			this._pricingService.getPricing().pipe(
				map((pricing: IApiSuccess<IPrice[]>) => new fromPricing.LoadPricingSuccess(pricing)),
				catchError(err => of(new fromPricing.LoadPricingFail(err.error.message)))
			)
		)
	);

	@Effect()
	updatePrice$ = this._actions$.pipe(
		ofType(fromPricing.PricingActionTypes.UpdatePrice),
		map((action: fromPricing.UpdatePrice) => action.payload),
		mergeMap((price: IPrice) =>
			this._pricingService.updatePrice(price).pipe(
				map(updatedPrice => new fromPricing.UpdatePriceSuccess(updatedPrice)),
				catchError(err => of(new fromPricing.UpdatePriceFail(err.error.message)))
			)
		)
	);

	@Effect()
	createPrice$: Observable<Action> = this._actions$.pipe(
		ofType(fromPricing.PricingActionTypes.CreatePrice),
		map((action: fromPricing.CreatePrice) => action.payload),
		mergeMap((price: IPrice) =>
			this._pricingService.createPrice(price).pipe(
				map(newPrice => new fromPricing.CreatePriceSuccess(newPrice)),
				catchError(err => of(new fromPricing.CreatePriceFail(err.error.message)))
			)
		)
	);

	@Effect()
	loadProviders$ = this._actions$.pipe(
		ofType(fromPricing.PricingActionTypes.LoadProviders),
		mergeMap((action: fromPricing.LoadProviders) =>
			this._pricingService.getProviders().pipe(
				map((providers: IApiSuccess<IProvider[]>) => new fromPricing.LoadProvidersSuccess(providers)),
				catchError(err => of(new fromPricing.LoadProvidersFail(err.error.message)))
			)
		)
	);

	@Effect()
	loadLeadTypes$ = this._actions$.pipe(
		ofType(fromPricing.PricingActionTypes.LoadLeadTypes),
		mergeMap((action: fromPricing.LoadLeadTypes) =>
			this._pricingService.getLeadTypes().pipe(
				map((leadTypes: IApiSuccess<ILeadType[]>) => new fromPricing.LoadLeadTypesSuccess(leadTypes)),
				catchError(err => of(new fromPricing.LoadLeadTypesFail(err.error.message)))
			)
		)
	);

	@Effect()
	loadColumns = this._actions$.pipe(
		ofType(fromPricing.PricingActionTypes.LoadColumns),
		mergeMap((action: fromPricing.LoadColumns) =>
			this._pricingService.getPricingColumns().pipe(
			map((response: any) => new fromPricing.LoadColumnsSuccess(response)),
			catchError(err => of(new fromPricing.LoadColumnsFail(err.error.message)))
			)
		)
	);
	
	@Effect()
	updateColumns$ = this._actions$.pipe(
		ofType(fromPricing.PricingActionTypes.UpdateColumns),
		map((action: fromPricing.UpdateColumns) => action.payload),
		mergeMap(() =>
			this._pricingService.updatePricingColumns(COLUMNS.pricing).pipe(
				map(updated => new fromPricing.UpdateColumnsSuccess(updated)),
				catchError(err => of(new fromPricing.UpdateColumnsFail(err.error.message)))
			)
		)
	);
}
