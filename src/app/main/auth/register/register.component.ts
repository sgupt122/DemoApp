import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { TIMEZONES } from '@/_config';
import { auth, commonInfo } from '@/_config/config';

export interface UserRoles {
	data: {
		id: number,
		name: string,
		display_name: string,
		description: string,
		created_at: string
		updated_at: string
	}
}

@Component({
	selector: 'register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class RegisterComponent implements OnInit, OnDestroy {
	public registerForm: FormGroup;
	public userRoles: Array<UserRoles> = [];
	public error: string;
	public timezones = TIMEZONES;
	public registerConfigTxt = {
		register: auth.register,
		loginBtn: auth.loginBtn,
		commonLb: commonInfo.commonFormLabels,
		errorTxt: commonInfo.errorTxt,
		name: commonInfo.name
	}
	// Private
	private _unsubscribeAll: Subject<any>;

	constructor(
		private _fuseConfigService: FuseConfigService,
		private _titleService: Title,
		private _formBuilder: FormBuilder,
		private _authenticationService: AuthenticationService,
		private router: Router,
		public shared: SharedFunctions
	) {
		// Configure the layout
		this._fuseConfigService.config = this.shared.fuseConfig();

		// Set the private defaults
		this._unsubscribeAll = new Subject();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	ngOnInit(): void {
		this._authenticationService.getRoles().subscribe(response => {
			this.userRoles = JSON.parse(JSON.stringify(response.data));
		});

		this._titleService.setTitle(`Create Account - Charcoal`);
		this.registerForm = this._formBuilder.group({
			name: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
			roleId: ['', [Validators.required]],
			timezone: ['', Validators.required],
			isTermsAndConditionChecked: ['', Validators.required]
		});

		// Update the validity of the 'passwordConfirm' field
		// when the 'password' field changes
		this.registerForm
			.get('password')
			.valueChanges.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(() => {
				this.registerForm.get('passwordConfirm').updateValueAndValidity();
			});
	}

	/**
	 * On destroy
	 */
	ngOnDestroy(): void {
		// Unsubscribe from all subscriptions
		this._unsubscribeAll.next();
		this._unsubscribeAll.complete();
	}

	public onRegister(): void {
		this._authenticationService.onRegister(this.registerForm.value).pipe().subscribe(
			() => {
				this.shared._snackbarMessage('User Registered Successfully!', 1500).afterDismissed()
					.subscribe(() => {
						this.router.navigate(['/login']);
					});
			},
			() => {
				this.shared._snackbarMessage('Email Already exist!!', 1500).afterDismissed()
					.subscribe(() => {
						this.router.navigate(['/auth/register']);
					});

			}
		)
	}
}
/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	if (!control.parent || !control) {
		return null;
	}

	const password = control.parent.get('password');
	const passwordConfirm = control.parent.get('passwordConfirm');

	if (!password || !passwordConfirm) {
		return null;
	}

	if (passwordConfirm.value === '') {
		return null;
	}

	if (password.value === passwordConfirm.value) {
		return null;
	}

	return { passwordsNotMatching: true };
};
