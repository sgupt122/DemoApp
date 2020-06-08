import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '@/_services';
import { IApiError, IApiSuccess, IUser } from '@/_interfaces';
import { STATES, TIMEZONES } from '@/_config';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { LocalStorage } from 'ngx-webstorage';
import { commonInfo, commonBtn } from '@/_config/config';

@Component({
	selector: 'app-basic-info',
	templateUrl: './basic-info.component.html',
	styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
	@LocalStorage() private impersonateToken: string;
	@Input() public user: IUser;
	public states = STATES;
	public timezones = TIMEZONES;
	public profileForm: FormGroup;
	public basicInfoconfig = {
		commonFg: commonInfo.commonFormLabels,
		errorTxt: commonInfo.errorTxt,
		save: commonBtn.save
	}

	/**
	 *
	 * @param {FormBuilder} _formBuilder
	 * @param {ProfileService} _profileService
	 */
	constructor(
		private _formBuilder: FormBuilder,
		private _profileService: ProfileService,
		private shared: SharedFunctions
	) { }

	public ngOnInit(): void {
		this._buildBasicInfoForm();
	}

	public save(userData: IUser): void {
		const oldUser = this.user.profile;
		const objKeys = Object.keys(this.user.profile);
		objKeys.map(key => {
			if (oldUser[key] === userData[key]) {
				userData[key] = null;
			}
		});

		userData = { ...userData, impersonateToken: this.impersonateToken }
		this._profileService.save(userData).subscribe((response: IApiSuccess<IUser> & IApiError) => {
			if (response) {
				this.shared._snackbarMessage('Success!', 2000);
				return this._profileService.updateUser(response.data);
			} else {
				this.shared._snackbarMessage('Failed! Please try again..', 2000);
			}

		});
	}

	private _buildBasicInfoForm(): void {
		this.profileForm = this._formBuilder.group({
			first_name: [this.user.profile.first_name || '', Validators.required],
			last_name: [this.user.profile.last_name || '', Validators.required],
			address: [this.user.profile.address || ''],
			address_2: [this.user.profile.address_2 || ''],
			email: [this.user.email, Validators.required],
			phone: [this.user.profile.phone || '', Validators.required],
			business_phone: [this.user.profile.business_phone || ''],
			state: [this.user.profile.state || ''],
			city: [this.user.profile.city || ''],
			county: [this.user.profile.county || ''],
			birthdate: [this.user.profile.birthdate || ''],
			postal_code: [this.user.profile.postal_code || ''],
			timezone: [this.user.profile.timezone || '', Validators.required]
		});
	}

	public _keyPress(event: any): void {
		this.shared._keyPress(event);
	}
}