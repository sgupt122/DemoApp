import { Action } from '@ngrx/store';

import { IApiGeneric, IApiSuccess, ITextingPreferences } from '@/_interfaces';

export enum ProfileActionTypes {
	LoadTextingPreferences = '[Profile] Load Texting Preferences',
	LoadTextingPreferencesSuccess = '[Profile] Load Texting Preferences Success',
	LoadTextingPreferencesFail = '[Profile] Load Texting Preferences Fail',
	UpdateTextingPreferences = '[Profile] Update Texting Preferences',
	UpdateTextingPreferencesSuccess = '[Profile] Update Texting Preference Success',
	UpdateTextingPreferenceFail = '[Profile] Update Texting Preference Fail',
	CreateTextingPreferences = '[Profile] Create Texting Preferences',
	CreateTextingPreferencesSuccess = '[Profile] Create Texting Preference Success',
	CreateTextingPreferenceFail = '[Profile] Create Texting Preference Fail'
}
export class LoadTextingPreferences implements Action {
	public readonly type = ProfileActionTypes.LoadTextingPreferences;
}

export class LoadTextingPreferencesSuccess implements Action {
	public readonly type = ProfileActionTypes.LoadTextingPreferencesSuccess;

	constructor(public payload: IApiSuccess<ITextingPreferences>) {}
}

export class LoadTextingPreferencesFail implements Action {
	public readonly type = ProfileActionTypes.LoadTextingPreferencesFail;

	constructor(public payload: string) {}
}

export class UpdateTextingPreferences implements Action {
	public readonly type = ProfileActionTypes.UpdateTextingPreferences;

	constructor(public payload: ITextingPreferences) {}
}

export class UpdateTextingPreferencesSuccess implements Action {
	public readonly type = ProfileActionTypes.UpdateTextingPreferencesSuccess;

	constructor(public payload: IApiGeneric) {}
}

export class UpdateTextingPreferenceFail implements Action {
	public readonly type = ProfileActionTypes.UpdateTextingPreferenceFail;

	constructor(public payload: string) {}
}

export class CreateTextingPreferences implements Action {
	public readonly type = ProfileActionTypes.CreateTextingPreferences;

	constructor(public payload: ITextingPreferences) {}
}

export class CreateTextingPreferencesSuccess implements Action {
	public readonly type = ProfileActionTypes.CreateTextingPreferencesSuccess;

	constructor(public payload: IApiGeneric) {}
}

export class CreateTextingPreferenceFail implements Action {
	public readonly type = ProfileActionTypes.CreateTextingPreferenceFail;

	constructor(public payload: string) {}
}
export type ProfileActions =
	| LoadTextingPreferences
	| LoadTextingPreferencesFail
	| LoadTextingPreferencesSuccess
	| UpdateTextingPreferences
	| UpdateTextingPreferenceFail
	| UpdateTextingPreferencesSuccess
	| CreateTextingPreferences
	| CreateTextingPreferenceFail
	| CreateTextingPreferencesSuccess;
