import { Action } from '@ngrx/store';

import { IApiSuccess, IClientDisposition, CalendarEventModel } from '@/_interfaces';

export enum EventsActionTypes {
	SetCurrentEventID = '[Events] Set User Event ID',
	ClearCurrentEventID = '[Events] Clear User Event ID',
	LoadClientDispositions = '[Events] Load Client Dispositions',
	LoadClientDispositionsSuccess = '[Events] Load Client Dispositions Success',
	LoadClientDispositionsFail = '[Events] Load Client Dispositions Fail',
	CreateUserEvents = '[Events] Create User Events',
	CreateUserEventsSuccess = '[Events] Create User Events Success',
	CreateUserEventsFail = '[Events] Create User Events Fail',
	Load = '[Events] Load User Events',
	LoadSuccess = '[Events] Load User Events Success',
	LoadFail = '[Events] Load User Events Fail',
	UpdateEvent = '[Events] Update User Events',
	UpdateEventSuccess = '[Events] Update User Events Success',
	UpdateEventFail = '[Events] Update User Events Fail'
}

export class SetCurrentEventID implements Action {
	public readonly type = EventsActionTypes.SetCurrentEventID;

	constructor(public payload: CalendarEventModel) { }
}

export class ClearCurrentEventID implements Action {
	public readonly type = EventsActionTypes.ClearCurrentEventID;
}

export class LoadClientDispositions implements Action {
	public readonly type = EventsActionTypes.LoadClientDispositions;
}

export class LoadClientDispositionsSuccess implements Action {
	public readonly type = EventsActionTypes.LoadClientDispositionsSuccess;

	constructor(public payload: IApiSuccess<IClientDisposition[]>) { }
}

export class LoadClientDispositionsFail implements Action {
	public readonly type = EventsActionTypes.LoadClientDispositionsFail;

	constructor(public payload: string) { }
}

export class CreateUserEvents implements Action {
	public readonly type = EventsActionTypes.CreateUserEvents;

	constructor(public payload: CalendarEventModel) { }
}

export class CreateUserEventsSuccess implements Action {
	public readonly type = EventsActionTypes.CreateUserEventsSuccess;

	constructor(public payload: IApiSuccess<CalendarEventModel>) { }
}

export class CreateUserEventsFail implements Action {
	public readonly type = EventsActionTypes.CreateUserEventsFail;

	constructor(public payload: string) { }
}

export class Load implements Action {
	public readonly type = EventsActionTypes.Load;
}

export class LoadSuccess implements Action {
	public readonly type = EventsActionTypes.LoadSuccess;

	constructor(public payload: IApiSuccess<CalendarEventModel[]>) { }
}

export class LoadFail implements Action {
	public readonly type = EventsActionTypes.LoadFail;

	constructor(public payload: any) { }
}

export class UpdateEvent implements Action {
	public readonly type = EventsActionTypes.UpdateEvent;

	constructor(public payload: CalendarEventModel) { }
}
export class UpdateEventSuccess implements Action {
	public readonly type = EventsActionTypes.UpdateEventSuccess;

	constructor(public payload: IApiSuccess<CalendarEventModel>) { }
}
export class UpdateEventFail implements Action {
	public readonly type = EventsActionTypes.UpdateEventFail;

	constructor(public payload: any) { }
}
export type EventsActions =
	| LoadClientDispositions
	| LoadClientDispositionsSuccess
	| LoadClientDispositionsFail
	| CreateUserEvents
	| CreateUserEventsSuccess
	| CreateUserEventsFail
	| Load
	| LoadSuccess
	| LoadFail
	| UpdateEvent
	| UpdateEventSuccess
	| UpdateEventFail
	| SetCurrentEventID
	| ClearCurrentEventID;
