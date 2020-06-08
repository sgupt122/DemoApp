import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProvidersActions, ProvidersActionTypes } from '@/main/providers/store';
import { IApiSuccess, IProvider, IProviderFormErrors, IDatatableColumn } from '@/_interfaces';
import { IAppState } from '@/app.state';
import { COLUMNS } from '@/_config';

export interface ProvidersState extends IAppState {
	providers: IProvidersState;
}

export interface IProvidersState {
	currentProviderID: number | null;
	providers: IApiSuccess<IProvider[]>;
	error: IProviderFormErrors | null;
	loadColumns: IDatatableColumn[];
	updateColumns: any;
}

const initialProviderState: IProvidersState = {
	currentProviderID: null,
	providers: { data: [], meta: {} },
	error: null,
	loadColumns: [],
	updateColumns: {
		user_id: 0,
		type: 'providers',
		json: []
	}
};
const getProviderFeatureState = createFeatureSelector<IProvidersState>('providers');

export const getCurrentProviderID = createSelector(
	getProviderFeatureState,
	state => state.currentProviderID
);
export const getCurrentProvider = createSelector(
	getProviderFeatureState,
	getCurrentProviderID,
	(state, currentProviderID) => {
		if (currentProviderID === 0) {
			return {
				name: '',
				code: '',
				description: '',
				active: 0
			};
		}
		return currentProviderID ? state.providers.data.find(p => p.id === currentProviderID) : null;
	}
);
export const getProviders = createSelector(
	getProviderFeatureState,
	state => state.providers.data
);
export const getError = createSelector(
	getProviderFeatureState,
	state => state.error
);
export const getProvidersColumns = createSelector(
	getProviderFeatureState,
	state => {
		return state.loadColumns
	}
);
export function reducer(state = initialProviderState, action: ProvidersActions): IProvidersState {
	switch (action.type) {
		case ProvidersActionTypes.SetCurrentProviderID:
			return {
				...state,
				currentProviderID: action.payload.id
			};
		case ProvidersActionTypes.ClearCurrentProviderID:
			return {
				...state,
				currentProviderID: null
			};
		case ProvidersActionTypes.InitializeCurrentProviderID:
			return {
				...state,
				currentProviderID: 0
			};
		case ProvidersActionTypes.LoadProvidersSuccess:
			return {
				...state,
				providers: action.payload,
				error: null
			};
		case ProvidersActionTypes.LoadProvidersFail:
			return {
				...state,
				providers: { data: [], meta: {} },
				error: action.payload
			};
		case ProvidersActionTypes.UpdateProviderSuccess:
			const updatedProvidersResponse = state.providers;
			const updatedProviders = state.providers.data.map(provider =>
				action.payload.data.id === provider.id ? action.payload.data : provider
			);
			updatedProvidersResponse.data = updatedProviders;
			return {
				...state,
				providers: updatedProvidersResponse,
				currentProviderID: action.payload.data.id,
				error: null
			};
		case ProvidersActionTypes.UpdateProviderFail:
			return {
				...state,
				error: action.payload
			};
		case ProvidersActionTypes.CreateProviderSuccess:
			const createdProvidersResponse = state.providers;
			const createdProviders = [...state.providers.data, action.payload.data];
			createdProvidersResponse.data = createdProviders;
			return {
				...state,
				providers: createdProvidersResponse,
				currentProviderID: action.payload.data.id,
				error: null
			};
		case ProvidersActionTypes.CreateProviderFail:
			return {
				...state,
				error: action.payload
			};
		case ProvidersActionTypes.LoadColumnsSuccess:
				return {
					...state,
					loadColumns: action.payload.data.providers
			};

		case ProvidersActionTypes.LoadColumnsFail:
				return {
					...state,
				error: action.payload
			};

		case ProvidersActionTypes.UpdateColumnsSuccess:
				return {
					...state,
					loadColumns: COLUMNS.providers,
					updateColumns: action.payload
			};

		case ProvidersActionTypes.UpdateColumnsFail:
				return {
					...state,
					error: action.payload
				};
		default:
			return state;
	}
}
