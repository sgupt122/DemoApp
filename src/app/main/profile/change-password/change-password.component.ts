import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '@/_services';
import { IApiError, IApiSuccess } from '@/_interfaces';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { LocalStorage } from 'ngx-webstorage';
import { commonInfo, profile } from '@/_config/config';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
	@LocalStorage() private impersonateToken: string;
	public changePasswordForm: FormGroup;
	public changePwdConfig = {
		password: commonInfo.commonFormLabels,
		errorTxt: commonInfo.errorTxt,
		changePwdBtn: profile.changePassword
	}
	/**
	 * Constructor
	 *
	 * @param {ProfileService} _profileService
	 * @param {FormBuilder} _formBuilder
	 */
	constructor(
		private _profileService: ProfileService,
		private _formBuilder: FormBuilder,
		private shared: SharedFunctions
	) { }

	public ngOnInit(): void {
		this.changePasswordForm = this._formBuilder.group({
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required]
		});
	}

	public updatePassword(formValues: { password: string; confirmPassword: string; impersonateToken: string }): void {
		formValues = { ...formValues, impersonateToken: this.impersonateToken }
		this._profileService.updatePassword(formValues).subscribe(
			(response: IApiSuccess<any> & IApiError) => {
				this.shared._snackbarMessage(response.message, 3000);
			},
			() => {
				this.shared._snackbarMessage('An error has occurred. Please try again.', 3000);
			}
		);
	}
}
