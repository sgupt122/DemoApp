import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LocalStorage } from 'ngx-webstorage';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { ITextingPreferences, IUser } from '@/_interfaces';
import * as fromProfile from '@/main/profile/store';
import { profile } from '@/_config/config';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	animations: fuseAnimations,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
	@LocalStorage() public user: IUser;
	public preferences$: Observable<ITextingPreferences>;
	public textingPreferencesExist$: Observable<boolean>;
	public profileConfig = profile.profile;
	constructor(private _store: Store<fromProfile.ProfileState>, private _titleService: Title) { }

	public ngOnInit(): void {
		this._titleService.setTitle(`Profile - Charcoal`);
		this._store.dispatch(new fromProfile.LoadTextingPreferences());
		this.preferences$ = this._store.pipe(select(fromProfile.getTextingPreferences));
		this.textingPreferencesExist$ = this._store.pipe(select(fromProfile.getTextingPreferencesExist));
	}

	public textingPreferencesUpdated(preferences: ITextingPreferences): void {
		this._store.dispatch(new fromProfile.UpdateTextingPreferences(preferences));
	}

	public textingPreferencesCreated(preferences: ITextingPreferences): void {
		this._store.dispatch(new fromProfile.CreateTextingPreferences(preferences));
	}
}
