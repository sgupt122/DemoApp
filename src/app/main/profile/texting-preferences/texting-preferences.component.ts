import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ITextingPreferences } from '@/_interfaces';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { LocalStorage } from 'ngx-webstorage';
import { profile, commonBtn } from '@/_config/config';

@Component({
	selector: 'app-texting-preferences',
	templateUrl: './texting-preferences.component.html',
	styleUrls: ['./texting-preferences.component.scss']
})
export class TextingPreferencesComponent implements OnInit {
	@LocalStorage() private impersonateToken: string;
	@Input() public preferences: ITextingPreferences;
	@Input() public textingPreferencesExist: boolean;
	@Output() public createTextingPreferences = new EventEmitter<ITextingPreferences>();
	@Output() public updateTextingPreferences = new EventEmitter<ITextingPreferences>();
	private formKeys = [];
	public textPreferencesConfig = {
		textPreferencesLb: profile.textPreferences,
		save: commonBtn.save
	}
	constructor(private shared: SharedFunctions) { }

	ngOnInit(): void {
		this.formKeys = Object.keys(this.preferences);
	}
	public save(formData: ITextingPreferences): void {
		this.shared._snackbarMessage('Texting Preferences Saved.', 3000);
		// formData = this._refactorFormData(formData);
		formData = { ...formData, impersonateToken: this.impersonateToken }
		if (this.textingPreferencesExist) {
			return this.updateTextingPreferences.emit(formData);
		}

		this.createTextingPreferences.emit(formData);
	}

	// private _refactorFormData(formData: ITextingPreferences): ITextingPreferences {
	// 	Object.keys(formData).forEach((time: string) => {
	// 		let timeValue = formData[time];
	// 		if (formData[time] && formData[time].length === 5) {
	// 			timeValue = timeValue + ':00';
	// 		}
	// 		formData[time] = timeValue;
	// 	});
	// 	return formData;
	// }

	public deleteRecord(day: string): void {
		this.formKeys.map(value => {
			if (value.includes(day)) {
				this.preferences[`${value}`] = null;
			}
		});
		this.shared._snackbarMessage('Texting Preferences Deleted.', 1000);
	}
	public copyRecord(startTime, endTime, day): void {
		this.formKeys.map((value, i) => {
			if (value.includes(day)) {
				if (value.includes('start_time')) {
					this.preferences[`${value}`] = startTime;
				} else {
					this.preferences[`${value}`] = endTime;
				}
			}
			this.shared._snackbarMessage('Texting Preferences Copied.', 1000)
		});
	}

	deleteAll(): void {
		this.formKeys.map(value => {
			this.preferences[`${value}`] = null;
		});
	}

	isDisablePreference(): boolean {
		if (!((this.preferences.sunday_start_time && this.preferences.sunday_end_time)
			|| (this.preferences.monday_start_time && this.preferences.monday_end_time) || (this.preferences.tuesday_start_time && this.preferences.tuesday_end_time)
			|| (this.preferences.wednesday_start_time && this.preferences.wednesday_end_time) || (this.preferences.thursday_start_time && this.preferences.thursday_end_time)
			|| (this.preferences.friday_start_time && this.preferences.friday_end_time) || (this.preferences.saturday_start_time && this.preferences.saturday_end_time))) {
			return true;
		} else {
			return false;
		}
	}
}
