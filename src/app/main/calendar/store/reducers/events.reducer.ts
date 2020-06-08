import { createFeatureSelector, createSelector } from '@ngrx/store';

import { EventsActions, EventsActionTypes } from '@/main/calendar/store';
import { IApiSuccess, IClientDisposition } from '@/_interfaces';
import { IAppState } from '@/app.state';
import { CalendarEventModel } from '@/_interfaces/user-events';

export interface EventsState extends IAppState {
	events: IEventsState;
}

export interface IEventsState {
	currentEventID: number | null;
	clientDispositions: IClientDisposition[];
	events: IApiSuccess<CalendarEventModel[]>;
	error: string;
}

const initialState: IEventsState = {
	currentEventID: null,
	clientDispositions: [],
	events: { data: [], meta: {} },
	error: ''
};
const getEventsFeatureState = createFeatureSelector<IEventsState>('events');

export const getClientDispositions = createSelector(
	getEventsFeatureState,
	(state) =>
		state.clientDispositions
);
export const getUserEvents = createSelector(
	getEventsFeatureState,
	state => state.events.data
);
export const getCurrentEventID = createSelector(
	getEventsFeatureState,
	state => state.currentEventID
);
export const getCurrentEvent = createSelector(
	getEventsFeatureState,
	getCurrentEventID,
	(state, currentEventID) => {
		if (currentEventID === 0) {
			return {
				disposition: null,
				disposition_id: null,
				location: '',
				notes: '',
				start: '',
				end: '',
				title: '',
				user_id: null,
				allDay: '',
			};
		}
		return currentEventID ? state.events.data.find(p => p.id === currentEventID) : null;
	}
);

export function reducer(state = initialState, action: EventsActions): IEventsState {
	switch (action.type) {
		case EventsActionTypes.SetCurrentEventID:
			return {
				...state,
				currentEventID: action.payload.id
			};
		case EventsActionTypes.LoadClientDispositionsSuccess:
			return {
				...state,
				clientDispositions: action.payload.data
			};
		case EventsActionTypes.LoadClientDispositionsFail:
			return {
				...state,
				clientDispositions: [],
				error: action.payload
			};
		case EventsActionTypes.CreateUserEventsSuccess:
			const createduserEventResponse = state.events;
			const createdEvent = [...state.events.data, action.payload.data];
			createduserEventResponse.data = createdEvent;
			return {
				...state,
				events: createduserEventResponse,
				error: null
			};
		case EventsActionTypes.CreateUserEventsFail:
			return {
				...state,
				events: { data: [], meta: {} },
				error: action.payload
			};
		case EventsActionTypes.LoadSuccess:
			return {
				...state,
				events: action.payload,
				error: null
			}
		case EventsActionTypes.LoadFail:
			return {
				...state,
				events: { data: [], meta: {} },
				error: action.payload
			};
		case EventsActionTypes.UpdateEventSuccess:
			const updatedEventResponse = state.events;
			const updatedEvent = state.events.data.map(event =>
				action.payload.data.id === event.id ? action.payload.data : event
			);
			updatedEventResponse.data = updatedEvent;
			return {
				...state,
				events: updatedEventResponse,
				currentEventID: action.payload.data.id,
				error: null
			};
		case EventsActionTypes.UpdateEventFail:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
}
