import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from '@/_services';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { auth } from '@/_config/config';
@Component({
	selector: 'lock',
	templateUrl: './lock.component.html',
	styleUrls: ['./lock.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class LockComponent implements OnInit {
	private _returnUrl: string;
	public sessionConfigTxt = auth.sessionExpired;
	/**
	 * Constructor
	 *
	 * @param {FuseConfigService} _fuseConfigService
	 * @param {Title} _titleService
	 * @param {AuthenticationService} _authenticationService
	 * @param {Router} _router
	 * @param {ActivatedRoute} _route
	 */
	constructor(
		private _fuseConfigService: FuseConfigService,
		private _titleService: Title,
		private _authenticationService: AuthenticationService,
		private _router: Router,
		private _route: ActivatedRoute,
		private shared: SharedFunctions
	) {
		this._fuseConfigService.config = this.shared.fuseConfig();
	}

	public ngOnInit(): void {
		this._titleService.setTitle(`Session Expired - Charcoal`);
		this._route.queryParams.subscribe((params: { returnUrl: string }) => {
			this._returnUrl = params.returnUrl;
		});
	}

	public destroySession(): void {
		this._authenticationService.destroySession(false);
		this._router.navigate(['/auth/login'], { queryParams: { returnUrl: this._returnUrl } });
	}

	public refreshSession(): void {
		this._authenticationService.onTokenRefresh().subscribe(() => {
			if (!this._authenticationService.isAuthenticated()) {
				return this._authenticationService.destroySession(false);
			}
			this._router.navigate([this._returnUrl]);
		});
	}
}
