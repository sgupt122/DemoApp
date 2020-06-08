import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRoot from '@/app.state';
import { FaqsActions, FaqsActionTypes } from '../actions/faq.actions';
import { IApiSuccess, IFaq } from '@/_interfaces';

export interface IFaqsState {
	currentFaqID: number | null;
	faqs: IApiSuccess<IFaq[]>;
	error: string;
}

export interface State extends fromRoot.IAppState {
	Faqs: IFaqsState;
}

const initialState: IFaqsState = {
	currentFaqID: null,
	faqs: { data: [] },
	error: ''
};
const getFaqFeatureState = createFeatureSelector<IFaqsState>('faqs');

export const getCurrentFaqID = createSelector(
	getFaqFeatureState,
	state => state.currentFaqID
);
export const getCurrentFaq = createSelector(
	getFaqFeatureState,
	getCurrentFaqID,
	(state, currentFaqID) => {
		if (currentFaqID === 0) {
			return {
				question: '',
				answer: '',
				category: 0,
				order: 0,
				active: 0
			};
		}
		return currentFaqID ? state.faqs.data.find(p => p.id === currentFaqID) : null;
	}
);
export const getFaqs = createSelector(
	getFaqFeatureState,
	state => state.faqs.data
);
export const getError = createSelector(
	getFaqFeatureState,
	state => state.error
);
export function reducer(state = initialState, action: FaqsActions): IFaqsState {
	switch (action.type) {
		case FaqsActionTypes.SetCurrentFaqID:
			return {
				...state,
				currentFaqID: action.payload.id
			};
		case FaqsActionTypes.ClearCurrentFaqID:
			return {
				...state,
				currentFaqID: null
			};
		case FaqsActionTypes.InitializeCurrentFaqID:
			return {
				...state,
				currentFaqID: 0
			};
		case FaqsActionTypes.LoadSuccess:
			return {
				...state,
				faqs: action.payload,
				error: ''
			};
		case FaqsActionTypes.LoadFail:
			return {
				...state,
				faqs: { data: [] },
				error: action.payload
			};
		case FaqsActionTypes.UpdateFaqsSuccess:
			const updatedFaqsResponse = state.faqs;
			const updatedFaqs = state.faqs.data.map(Faq => (action.payload.data.id === Faq.id ? action.payload.data : Faq));
			updatedFaqsResponse.data = updatedFaqs;
			return {
				...state,
				faqs: updatedFaqsResponse,
				currentFaqID: action.payload.data.id,
				error: ''
			};
		case FaqsActionTypes.UpdateFaqFail:
			return {
				...state,
				error: action.payload
			};
		case FaqsActionTypes.CreateFaqsSuccess:
			const createdFaqsResponse = state.faqs;
			const createdFaqs = [...state.faqs.data, action.payload.data];
			createdFaqsResponse.data = createdFaqs;
			return {
				...state,
				faqs: createdFaqsResponse,
				currentFaqID: action.payload.data.id,
				error: ''
			};
		case FaqsActionTypes.CreateFaqFail:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
}
