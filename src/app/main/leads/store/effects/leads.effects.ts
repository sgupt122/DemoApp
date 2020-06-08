import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { LeadsService } from '@/_services';
import { ILead, IApiSuccess, ILeadFilter, IClientDisposition, IDisputeReason, IDisputeLead } from '@/_interfaces';
import * as fromLeads from '@/main/leads/store';
import { COLUMNS } from '@/_config';

@Injectable()
export class LeadsEffects {
	constructor(private _actions$: Actions, private _leadsService: LeadsService) { }

	@Effect()
	loadLeads$ = this._actions$.pipe(
		ofType(fromLeads.LeadsActionTypes.LoadLeads),
		map((action: fromLeads.LoadLeads) => action.payload),
		mergeMap((filters: ILeadFilter) =>
			this._leadsService.getLeads(filters).pipe(
				map((leads: IApiSuccess<ILead[]>) => new fromLeads.LoadLeadsSuccess(leads)),
				catchError(err => of(new fromLeads.LoadLeadsFail(err.error.message)))
			)
		)
	);

	@Effect()
	updateLead$ = this._actions$.pipe(
		ofType(fromLeads.LeadsActionTypes.UpdateLead),
		map((action: fromLeads.UpdateLead) => action.payload),
		mergeMap((lead: ILead) =>
			this._leadsService.updateLead(lead).pipe(
				map(updatedLead => new fromLeads.UpdateLeadSuccess(updatedLead)),
				catchError(err => of(new fromLeads.UpdateLeadFail(err.error.message)))
			)
		)
	);

	@Effect()
	loadClientDispositions = this._actions$.pipe(
		ofType(fromLeads.LeadsActionTypes.LoadClientDispositions),
		mergeMap((action: fromLeads.LoadClientDispositions) =>
			this._leadsService.getClientDispositions().pipe(
				map((response: IApiSuccess<IClientDisposition[]>) => new fromLeads.LoadClientDispositionsSuccess(response)),
				catchError(err => of(new fromLeads.LoadClientDispositionsFail(err.error.message)))
			)
		)
	);

	@Effect()
	loadDisputeReason = this._actions$.pipe(
		ofType(fromLeads.LeadsActionTypes.LoadDisputeReason),
		mergeMap((action: fromLeads.LoadDisputeReason) =>
			this._leadsService.getDisputeReasons().pipe(
				map((response: IApiSuccess<IDisputeReason[]>) => new fromLeads.LoadDisputeReasonSuccess(response)),
				catchError(err => of(new fromLeads.LoadDisputeReasonFail(err.error.message)))
			)
		)
	);

	@Effect()
	createDisputeLead = this._actions$.pipe(
		ofType(fromLeads.LeadsActionTypes.CreateDisputeLead),
		mergeMap((action: fromLeads.CreateDisputeLead) =>
			this._leadsService.createDisputeLead(action.payload).pipe(
				map((response: IApiSuccess<IDisputeLead>) => new fromLeads.CreateDisputeLeadSuccess(response)),
				catchError(err => of(new fromLeads.CreateDisputeLeadFail(err.error.message)))
			)
		)
	);
	@Effect()
	getCurrentDisputeLead = this._actions$.pipe(
		ofType(fromLeads.LeadsActionTypes.GetCurrentDisputeLead),
		mergeMap((action: fromLeads.GetCurrentDisputeLead) =>
			this._leadsService.getCurrentDisputeLead(action.payload).pipe(
				map((response: IApiSuccess<IDisputeLead>) => new fromLeads.GetCurrentDisputeLeadSuccess(response)),
				catchError(err => of(new fromLeads.GetCurrentDisputeLeadFail(err.error.message)))
			)
		)
	);
	@Effect()
	loadColumns = this._actions$.pipe(
		ofType(fromLeads.LeadsActionTypes.LoadColumns),
		mergeMap((action: fromLeads.LoadColumns) =>
			this._leadsService.getLeadColumns().pipe(
			map((response: any) => new fromLeads.LoadColumnsSuccess(response)),
			catchError(err => of(new fromLeads.LoadColumnsFail(err.error.message)))
			)
		)
	);
	
	@Effect()
	updateColumns$ = this._actions$.pipe(
		ofType(fromLeads.LeadsActionTypes.UpdateColumns),
		map((action: fromLeads.UpdateColumns) => action.payload),
		mergeMap(() =>
			this._leadsService.updateLeadColumns(COLUMNS.leads).pipe(
				map(updatedLead => new fromLeads.UpdateColumnsSuccess(updatedLead)),
				catchError(err => of(new fromLeads.UpdateColumnsFail(err.error.message)))
			)
		)
	);

}
