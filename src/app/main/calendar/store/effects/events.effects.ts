import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of, Observable } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { EventsService } from '@/_services';
import { IApiSuccess, IClientDisposition, CalendarEventModel } from '@/_interfaces';
import * as fromEvents from '@/main/calendar/store';
import { Action } from '@ngrx/store';
@Injectable()
export class EventsEffects {
	constructor(private _actions$: Actions, private _eventsService: EventsService) { }
	@Effect()
	createUserEvents$: Observable<Action> = this._actions$.pipe(
		ofType(fromEvents.EventsActionTypes.CreateUserEvents),
		map((action: fromEvents.CreateUserEvents) => action.payload),
		mergeMap((event: CalendarEventModel) =>
			this._eventsService.createUserEvents(event).pipe(
				map(response => new fromEvents.CreateUserEventsSuccess(response)),
				catchError(err => of(new fromEvents.CreateUserEventsFail(err.error.errors)))
			)
		)
	);

	@Effect()
	updateUserEvent$ = this._actions$.pipe(
		ofType(fromEvents.EventsActionTypes.UpdateEvent),
		map((action: fromEvents.UpdateEvent) => action.payload),
		mergeMap((event: CalendarEventModel) =>
			this._eventsService.updateUserEvent(event).pipe(
				map(updatedEvent => new fromEvents.UpdateEventSuccess(updatedEvent)),
				catchError(err => of(new fromEvents.UpdateEventFail(err.error.message)))
			)
		)
	);

	@Effect()
	loadClientDispositions = this._actions$.pipe(
		ofType(fromEvents.EventsActionTypes.LoadClientDispositions),
		mergeMap((action: fromEvents.LoadClientDispositions) =>
			this._eventsService.getClientDispositions().pipe(
				map((response: IApiSuccess<IClientDisposition[]>) => new fromEvents.LoadClientDispositionsSuccess(response)),
				catchError(err => of(new fromEvents.LoadClientDispositionsFail(err.error.message)))
			)
		)
	);

	@Effect()
	loadEvents$ = this._actions$.pipe(
		ofType(fromEvents.EventsActionTypes.Load),
		mergeMap((action: fromEvents.Load) =>
			this._eventsService.getEvents().pipe(
				map((response: IApiSuccess<CalendarEventModel[]>) => new fromEvents.LoadSuccess(response)),
				catchError(err => of(new fromEvents.LoadFail(err.error.message)))
			)
		)
	);
}
