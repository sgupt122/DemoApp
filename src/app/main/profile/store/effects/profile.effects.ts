import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { ProfileService } from '@/_services';
import { IApiSuccess, ITextingPreferences } from '@/_interfaces';
import * as fromProfile from '@/main/profile/store';

@Injectable()
export class ProfileEffects {
	constructor(private _actions$: Actions, private _profileService: ProfileService) {}

	@Effect()
	loadTextingPreferences$: Observable<Action> = this._actions$.pipe(
		ofType(fromProfile.ProfileActionTypes.LoadTextingPreferences),
		mergeMap((action: fromProfile.LoadTextingPreferences) =>
			this._profileService.getTextingPreferences().pipe(
				map(
					(textingPreferences: IApiSuccess<ITextingPreferences>) =>
						new fromProfile.LoadTextingPreferencesSuccess(textingPreferences)
				),
				catchError(err => of(new fromProfile.LoadTextingPreferencesFail(err.error.message)))
			)
		)
	);

	@Effect()
	updateTextingPreferences$: Observable<Action> = this._actions$.pipe(
		ofType(fromProfile.ProfileActionTypes.UpdateTextingPreferences),
		map((action: fromProfile.UpdateTextingPreferences) => action.payload),
		mergeMap((textingPreferences: ITextingPreferences) =>
			this._profileService.updateTextingPreferences(textingPreferences).pipe(
				map(response => new fromProfile.UpdateTextingPreferencesSuccess(response)),
				catchError(err => of(new fromProfile.UpdateTextingPreferenceFail(err.error.message)))
			)
		)
	);

	@Effect()
	createTextingPreferences$: Observable<Action> = this._actions$.pipe(
		ofType(fromProfile.ProfileActionTypes.CreateTextingPreferences),
		map((action: fromProfile.CreateTextingPreferences) => action.payload),
		mergeMap((textingPreferences: ITextingPreferences) =>
			this._profileService.saveTextingPreferences(textingPreferences).pipe(
				map(response => new fromProfile.CreateTextingPreferencesSuccess(response)),
				catchError(err => of(new fromProfile.CreateTextingPreferenceFail(err.error.message)))
			)
		)
	);
}
