import { Component, OnInit } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { AuthenticationService, AgentsService } from '@/_services';
import { Router } from '@angular/router';
import { IUser } from '@/_interfaces';
import { footer } from '@/_config/config'

@Component({
	selector: 'footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
	@LocalStorage() impersonateMsg: string;
	@LocalStorage() user: IUser;
	@LocalStorage() impersonateToken: string;
	public isShow: boolean = true;
	public showHideText: string = 'Hide';
	public footerConfigTxt = footer;
	/**
	 * Constructor
	 */
	constructor(private _authService: AuthenticationService,
		private _localStorage: LocalStorageService,
		private _agentService: AgentsService,
		private router: Router) { }

	public onShowHideBtn(): void {
		this.isShow = !this.isShow;
		if (this.isShow === true) {
			this.showHideText = 'Hide'
		} else {
			this.showHideText = 'Show'
		}
	}

	public exitImpersonateAgent(): void {
		this._agentService.exitFromImpersonation(this.impersonateToken).subscribe(response => {
			const token = response['data']['token'];
			this._authService.setToken(token);
			this._authService.setUser().subscribe();
			this.router.navigateByUrl('/dashboard')
		});
		this._localStorage.clear('impersonatetoken');
		this._localStorage.clear('admin');
		this._localStorage.clear('impersonatemsg');
	}
}
