import { Component, OnInit } from '@angular/core';

import { FuseConfigService } from '@fuse/services/config.service';
import { AuthenticationService } from '@/_services';
import { SharedFunctions } from '@/shared/sharedFunctions';

@Component({
	selector: 'logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
	/**
	 * @param {FuseConfigService} _fuseConfigService
	 * @param {AuthenticationService} _authenticationService
	 */
	constructor(private _fuseConfigService: FuseConfigService, private _authenticationService: AuthenticationService,
		private shared: SharedFunctions) {
		this._fuseConfigService.config = this.shared.fuseConfig();
	}

	public ngOnInit(): void {
		this._authenticationService.onLogout().subscribe();
	}
}
