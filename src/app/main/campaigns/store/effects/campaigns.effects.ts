import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { CampaignsService } from '@/_services';
import { ICampaign, IApiSuccess, ILeadType, IProvider } from '@/_interfaces';
import * as fromCampaigns from '@/main/campaigns/store';
import { COLUMNS } from '@/_config';

@Injectable()
export class CampaignsEffects {
	constructor(private _actions$: Actions, private _campaignsService: CampaignsService) {}

	@Effect()
	loadCampaigns$ = this._actions$.pipe(
		ofType(fromCampaigns.CampaignsActionTypes.LoadCampaigns),
		mergeMap((action: fromCampaigns.LoadCampaigns) =>
			this._campaignsService.getCampaigns().pipe(
				map((campaigns: IApiSuccess<ICampaign[]>) => new fromCampaigns.LoadCampaignsSuccess(campaigns)),
				catchError(err => of(new fromCampaigns.LoadCampaignsFail(err.error.message)))
			)
		)
	);

	@Effect()
	updateCampaign$ = this._actions$.pipe(
		ofType(fromCampaigns.CampaignsActionTypes.UpdateCampaign),
		map((action: fromCampaigns.UpdateCampaign) => action.payload),
		mergeMap((campaign: ICampaign) =>
			this._campaignsService.updateCampaign(campaign).pipe(
				map(updatedCampaign => new fromCampaigns.UpdateCampaignSuccess(updatedCampaign)),
				catchError(err => of(new fromCampaigns.UpdateCampaignFail(err.error.message)))
			)
		)
	);

	@Effect()
	createCampaign$: Observable<Action> = this._actions$.pipe(
		ofType(fromCampaigns.CampaignsActionTypes.CreateCampaign),
		map((action: fromCampaigns.CreateCampaign) => action.payload),
		mergeMap((campaign: ICampaign) =>
			this._campaignsService.createCampaign(campaign).pipe(
				map(newCampaign => new fromCampaigns.CreateCampaignSuccess(newCampaign)),
				catchError(err => of(new fromCampaigns.CreateCampaignFail(err.error.message)))
			)
		)
	);

	@Effect()
	loadProviders$ = this._actions$.pipe(
		ofType(fromCampaigns.CampaignsActionTypes.LoadProviders),
		mergeMap((action: fromCampaigns.LoadProviders) =>
			this._campaignsService.getProviders().pipe(
				map((providers: IApiSuccess<IProvider[]>) => new fromCampaigns.LoadProvidersSuccess(providers)),
				catchError(err => of(new fromCampaigns.LoadProvidersFail(err.error.message)))
			)
		)
	);

	@Effect()
	loadLeadTypes$ = this._actions$.pipe(
		ofType(fromCampaigns.CampaignsActionTypes.LoadLeadTypes),
		mergeMap((action: fromCampaigns.LoadLeadTypes) =>
			this._campaignsService.getLeadTypes().pipe(
				map((leadTypes: IApiSuccess<ILeadType[]>) => new fromCampaigns.LoadLeadTypesSuccess(leadTypes)),
				catchError(err => of(new fromCampaigns.LoadLeadTypesFail(err.error.message)))
			)
		)
	);

	@Effect()
	loadColumns = this._actions$.pipe(
		ofType(fromCampaigns.CampaignsActionTypes.LoadColumns),
		mergeMap((action: fromCampaigns.LoadColumns) =>
			this._campaignsService.getCampaignsColumns().pipe(
			map((response: any) => new fromCampaigns.LoadColumnsSuccess(response)),
			catchError(err => of(new fromCampaigns.LoadColumnsFail(err.error.message)))
			)
		)
	);
	
	@Effect()
	updateColumns$ = this._actions$.pipe(
		ofType(fromCampaigns.CampaignsActionTypes.UpdateColumns),
		map((action: fromCampaigns.UpdateColumns) => action.payload),
		mergeMap(() =>
			this._campaignsService.updateCampaignsColumns(COLUMNS.campaigns).pipe(
				map(updated => new fromCampaigns.UpdateColumnsSuccess(updated)),
				catchError(err => of(new fromCampaigns.UpdateColumnsFail(err.error.message)))
			)
		)
	);
}
