import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from '@/_services';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { commonInfo, auth } from '@/_config/config'

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations,
	providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
	public loginForm: FormGroup;
	public error: string = '';
	public rememberMe: boolean = false;
	private _returnUrl: string = '/dashboard';
	public loginConfigTxt = {
		login: auth.login,
		loginBtn: auth.loginBtn,
		commonLb: commonInfo.commonFormLabels,
		errorTxt: commonInfo.errorTxt
	}

	/**
	 * Constructor
	 *
	 * @param {FuseConfigService} _fuseConfigService
	 * @param {Title} _titleService
	 * @param {FormBuilder} _formBuilder
	 * @param {AuthenticationService} _authenticationService
	 * @param {Router} _router
	 * @param {ActivatedRoute} _route
	 */
	constructor(
		private _fuseConfigService: FuseConfigService,
		private _titleService: Title,
		private _formBuilder: FormBuilder,
		private _authenticationService: AuthenticationService,
		private _router: Router,
		private _route: ActivatedRoute,
		public shared: SharedFunctions
	) {
		this._fuseConfigService.config = this.shared.fuseConfig();
	}

	public ngOnInit(): void {
		this._titleService.setTitle(`Login - Charcoal`);
		if (this._authenticationService.isAuthenticated()) {
			this._authenticationService.onLogout(false).subscribe();
		}
		this._route.queryParams.subscribe((params: { returnUrl: string }) => {
			if (params.returnUrl) {
				this._returnUrl = params.returnUrl;
			}
		});
		this._buildLoginForm();
	}

	public login(credentials: { email: string; password: string }): void {
		this._authenticationService
			.onLogin(credentials)
			.pipe(first())
			.subscribe(
				() => {
					this._authenticationService.onRememberMe(this.rememberMe, credentials);
					this._router.navigate([this._returnUrl]);
				},
				(error) => {
					if (error) {
						if (error.error.message === "401 Unauthorized") {
							this.error = 'Your email and/or password do not match.';
						}
						else {
							this.shared._snackbarMessage(error.error.message, 3000);
						}
					}
				}
			);
	}

	private _buildLoginForm(): void {
		const userRemembered: { email: string; password: string } = this._authenticationService.rememberMe();
		this.rememberMe = userRemembered.email !== '';
		this.loginForm = this._formBuilder.group({
			email: [userRemembered.email || '', [Validators.required, Validators.email]],
			password: [userRemembered.password || '', Validators.required]
		});
	}
}
