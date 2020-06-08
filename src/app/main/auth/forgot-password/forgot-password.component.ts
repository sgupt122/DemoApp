import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { auth, commonInfo } from '@/_config/config'

@Component({
	selector: 'forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class ForgotPasswordComponent implements OnInit {
	forgotPasswordForm: FormGroup;
	public forgotPwdConfigTxt = {
		goBackToLogin: auth.backToLogin,
		forgotPwd: auth.forgotPwd,
		commonInfoLb: commonInfo.commonFormLabels,
		errorTxt: commonInfo.errorTxt
	}
	/**
	 * Constructor
	 *
	 * @param {FuseConfigService} _fuseConfigService
	 * @param {Title} _titleService
	 * @param {FormBuilder} _formBuilder
	 */
	constructor(
		private _fuseConfigService: FuseConfigService,
		private _titleService: Title,
		private _formBuilder: FormBuilder,
		private _authService: AuthenticationService,
		private _router: Router,
		private shared: SharedFunctions
	) {
		// Configure the layout
		this._fuseConfigService.config = this.shared.fuseConfig();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this._titleService.setTitle(`Forgot Password - Charcoal`);
		this.forgotPasswordForm = this._formBuilder.group({
			email: ['', [Validators.required, Validators.email]]
		});
	}

	/**
	 * forgot password form submit
	 */
	forgotPassword(): void {
		this._authService.forgotPassword(this.forgotPasswordForm.value).subscribe(
			(response) => {
				if (response.status_code == 200) {
					this.shared._snackbarMessage(response.message, 2000).afterDismissed().subscribe(() => {
						this._router.navigate(['/login']);
					});
				}
			}, () => {
			});
	}
}
