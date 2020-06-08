import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { AgentsService } from '@/_services';
import { IApiSuccess, IUser, IUserFilter } from '@/_interfaces';
import * as fromAgent from '@/main/agents/store';
import { Router } from '@angular/router';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { COLUMNS } from '@/_config';

@Injectable()
export class AgentsEffects {
	private events = new Subject<any>();
	public source$ = this.events.asObservable();
	constructor(private _actions$: Actions,
		private _agentsService: AgentsService,
		private shared: SharedFunctions,
		public _router: Router) { }

	@Effect()
	loadAgents$ = this._actions$.pipe(
		ofType(fromAgent.AgentsActionTypes.LoadAgents),
		map((action: fromAgent.LoadAgents) => action.payload),
		mergeMap((filters: IUserFilter) =>
			this._agentsService.getAgents(filters).pipe(
				map((agents: IApiSuccess<IUser[]>) => new fromAgent.LoadAgentsSuccess(agents)),
				catchError(err => of(new fromAgent.LoadAgentsFail(err.error.message)))
			)
		)
	);

	@Effect()
	updateAgent$ = this._actions$.pipe(
		ofType(fromAgent.AgentsActionTypes.UpdateAgent),
		map((action: fromAgent.UpdateAgent) => action.payload),
		mergeMap((agent: IUser) =>
			this._agentsService.updateAgent(agent).pipe(
				map((updatedAgent: IApiSuccess<IUser>) => this.updateAgent(updatedAgent)),
				catchError(err => of(new fromAgent.UpdateAgentFail(err.error.message)))
			)
		)
	);

	@Effect()
	createAgent$: Observable<any> = this._actions$.pipe(
		ofType(fromAgent.AgentsActionTypes.CreateAgent),
		map((action: fromAgent.CreateAgent) => action.payload),
		mergeMap((agent: IUser) =>
			this._agentsService.createAgent(agent).pipe(
				map((newAgent: IApiSuccess<IUser>) => this.successData(newAgent)),
				catchError(err => of(new fromAgent.CreateAgentFail(err.error.message)))
			)
		)
	);

	@Effect()
	loadColumns = this._actions$.pipe(
		ofType(fromAgent.AgentsActionTypes.LoadColumns),
		mergeMap((action: fromAgent.LoadColumns) =>
			this._agentsService.getAgentsColumns().pipe(
			map((response: any) => new fromAgent.LoadColumnsSuccess(response)),
			catchError(err => of(new fromAgent.LoadColumnsFail(err.error.message)))
			)
		)
	);
	
	@Effect()
	updateColumns$ = this._actions$.pipe(
		ofType(fromAgent.AgentsActionTypes.UpdateColumns),
		map((action: fromAgent.UpdateColumns) => action.payload),
		mergeMap(() =>
			this._agentsService.updateAgentsColumns(COLUMNS.agents).pipe(
				map(updated => new fromAgent.UpdateColumnsSuccess(updated)),
				catchError(err => of(new fromAgent.UpdateColumnsFail(err.error.message)))
			)
		)
	);
	//start - Success Agent API response
	successData(newAgentObj): Action {
		let message: string;
		if (!newAgentObj.message) {
			message = 'New Agent ' + newAgentObj.data.profile.first_name + " " + newAgentObj.data.profile.last_name + ' created Successfully!';
		} else {
			message = newAgentObj.message;
		}
		this.shared._snackbarMessage(message, 3000).afterDismissed().subscribe(() => {
			this._router.navigate(['/agents']);
		});
		return new fromAgent.CreateAgentSuccess(newAgentObj);
	}
	//end - Success Agent API response


	/** when agent updated successfully */
	updateAgent(newUpdateAgent): Action {
		this.shared._snackbarMessage('Agent Updated Successfully!', 3000).afterDismissed().subscribe(() => {
			this._router.navigate(['/agents']);
		});

		return new fromAgent.UpdateAgentSuccess(newUpdateAgent);
	}
	
}
