import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IAppState } from '@/app.state';
import { ProfileActions, ProfileActionTypes } from '@/main/profile/store';
import { ITextingPreferences } from '@/_interfaces';

export interface IProfileState {
	textingPreferencesExist: boolean;
	textingPreferences: ITextingPreferences;
	error: string;
}

export interface ProfileState extends IAppState {
	profile: IProfileState;
}

const initialState: IProfileState = {
	textingPreferencesExist: false,
	textingPreferences: {
		sunday_start_time: null,
		sunday_end_time: null,
		monday_start_time: null,
		monday_end_time: null,
		tuesday_start_time: null,
		tuesday_end_time: null,
		wednesday_start_time: null,
		wednesday_end_time: null,
		thursday_start_time: null,
		thursday_end_time: null,
		friday_start_time: null,
		friday_end_time: null,
		saturday_start_time: null,
		saturday_end_time: null
	},
	error: ''
};
const getProfileFeatureState = createFeatureSelector<IProfileState>('profile');

export const getTextingPreferences = createSelector(
	getProfileFeatureState,
	state => state.textingPreferences
);
export const getTextingPreferencesExist = createSelector(
	getProfileFeatureState,
	state => state.textingPreferencesExist
);
export const getError = createSelector(
	getProfileFeatureState,
	state => state.error
);
export function reducer(state = initialState, action: ProfileActions): IProfileState {
	switch (action.type) {
		case ProfileActionTypes.LoadTextingPreferencesSuccess:
			return {
				...state,
				textingPreferences: action.payload.data ? action.payload.data : state.textingPreferences,
				textingPreferencesExist: !!action.payload.data,
				error: ''
			};
		case ProfileActionTypes.LoadTextingPreferencesFail:
			return {
				...state,
				error: action.payload
			};
		case ProfileActionTypes.UpdateTextingPreferencesSuccess:
			return {
				...state,
				error: ''
			};
		case ProfileActionTypes.UpdateTextingPreferenceFail:
			return {
				...state,
				error: action.payload
			};
		case ProfileActionTypes.CreateTextingPreferencesSuccess:
			return {
				...state,
				error: ''
			};
		case ProfileActionTypes.CreateTextingPreferenceFail:
			return {
				...state,
				error: action.payload
			};
		default:
			return state;
	}
}
