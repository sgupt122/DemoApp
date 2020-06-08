import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PricingActions, PricingActionTypes } from '@/main/pricing/store';
import { IApiSuccess, IPrice, ILeadType, IProvider, IDatatableColumn } from '@/_interfaces';
import { IAppState } from '@/app.state';
import { COLUMNS } from '@/_config';

export interface PricingState extends IAppState {
	pricing: IPricingState;
}

export interface IPricingState {
	currentPriceID: number | null;
	pricing: IApiSuccess<IPrice[]>;
	error: string;
	providers: IApiSuccess<IProvider[]>;
	leadTypes: IApiSuccess<ILeadType[]>;
	loadColumns: IDatatableColumn[];
	updateColumns: any;
}

const initialPricingState: IPricingState = {
	currentPriceID: null,
	pricing: { data: [], meta: {} },
	error: '',
	providers: { data: [], meta: {} },
	leadTypes: { data: [], meta: {} },
	loadColumns: [],
	updateColumns: {
		user_id: 0,
		type: 'pricing',
		json: []
	}
};
const getPricingFeatureState = createFeatureSelector<IPricingState>('pricing');

export const getCurrentPriceID = createSelector(
	getPricingFeatureState,
	state => state.currentPriceID
);
export const getCurrentPrice = createSelector(
	getPricingFeatureState,
	getCurrentPriceID,
	(state, currentPriceID) => {
		if (currentPriceID === 0) {
			return {
				name: '',
				code: '',
				billing_code: '',
				activated_date: null,
				active: 0
			};
		}
		return currentPriceID ? state.pricing.data.find(c => c.id === currentPriceID) : null;
	}
);
export const getPricing = createSelector(
	getPricingFeatureState,
	state => state.pricing.data
);
export const getProviders = createSelector(
	getPricingFeatureState,
	state => state.providers.data
);
export const getLeadTypes = createSelector(
	getPricingFeatureState,
	state => state.leadTypes.data
);
export const getError = createSelector(
	getPricingFeatureState,
	state => state.error
);
export const getPricingColumns = createSelector(
	getPricingFeatureState,
	state => {
		return state.loadColumns
	}
);
export function reducer(state = initialPricingState, action: PricingActions): IPricingState {
	switch (action.type) {
		case PricingActionTypes.SetCurrentPriceID:
			return {
				...state,
				currentPriceID: action.payload.id
			};
		case PricingActionTypes.ClearCurrentPriceID:
			return {
				...state,
				currentPriceID: null
			};
		case PricingActionTypes.InitializeCurrentPriceID:
			return {
				...state,
				currentPriceID: 0
			};
		case PricingActionTypes.LoadPricingSuccess:
			return {
				...state,
				pricing: action.payload,
				error: ''
			};
		case PricingActionTypes.LoadPricingFail:
			return {
				...state,
				pricing: { data: [], meta: {} },
				error: action.payload
			};
		case PricingActionTypes.UpdatePriceSuccess:
			const updatedPricingResponse = state.pricing;
			const updatedPricing = state.pricing.data.map(price =>
				action.payload.data.id === price.id ? action.payload.data : price
			);
			updatedPricingResponse.data = updatedPricing;
			return {
				...state,
				pricing: updatedPricingResponse,
				currentPriceID: action.payload.data.id,
				error: ''
			};
		case PricingActionTypes.UpdatePriceFail:
			return {
				...state,
				error: action.payload
			};
		case PricingActionTypes.CreatePriceSuccess:
			const createdPricingResponse = state.pricing;
			const createdPricing = [...state.pricing.data, action.payload.data];
			createdPricingResponse.data = createdPricing;
			return {
				...state,
				pricing: createdPricingResponse,
				currentPriceID: action.payload.data.id,
				error: ''
			};
		case PricingActionTypes.CreatePriceFail:
			return {
				...state,
				error: action.payload
			};
		case PricingActionTypes.LoadProvidersSuccess:
			return {
				...state,
				providers: action.payload,
				error: ''
			};
		case PricingActionTypes.LoadProvidersFail:
			return {
				...state,
				providers: { data: [], meta: {} },
				error: action.payload
			};
		case PricingActionTypes.LoadLeadTypesSuccess:
			return {
				...state,
				leadTypes: action.payload,
				error: ''
			};
		case PricingActionTypes.LoadLeadTypesFail:
			return {
				...state,
				leadTypes: { data: [], meta: {} },
				error: action.payload
			};
			case PricingActionTypes.LoadColumnsSuccess:
				return {
					...state,
					loadColumns: action.payload.data.pricing
			};

			case PricingActionTypes.LoadColumnsFail:
				return {
					...state,
					error: action.payload
			};

			case PricingActionTypes.UpdateColumnsSuccess:
				return {
					...state,
					loadColumns: COLUMNS.pricing,
					updateColumns: action.payload
			};

			case PricingActionTypes.UpdateColumnsFail:
				return {
					...state,
					error: action.payload
				};
		default:
			return state;
	}
}
