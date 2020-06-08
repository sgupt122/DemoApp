import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { LocalStorage, LocalStorageService } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { IUser } from '@/_interfaces';
import { NotificationService } from '@/_services/notification.service';
import { toolbar } from '@/_config/config';

@Component({
	selector: 'toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit, OnDestroy {
	@LocalStorage() public user: IUser;
	horizontalNavbar: boolean;
	rightNavbar: boolean;
	hiddenNavbar: boolean;
	languages: any;
	navigation: any;
	private readonly _currentConfig: any;
	public notificationCount: number;
	public toolbarConfigTxt = toolbar;
	// Private
	private _unsubscribeAll: Subject<any>;

	/**
	 * Constructor
	 *
	 * @param {FuseConfigService} _fuseConfigService
	 * @param {FuseSidebarService} _fuseSidebarService
	 * @param {LocalStorageService} _localStorageService
	 * @param {NotificationService} _notificationService
	 */
	constructor(
		private _fuseConfigService: FuseConfigService,
		private _fuseSidebarService: FuseSidebarService,
		private _localStorageService: LocalStorageService,
		public _notificationService: NotificationService
	) {
		this._currentConfig = Object.assign({}, this._fuseConfigService.defaultConfig);
		this._setCurrentConfig();
		this.navigation = navigation;
		this._unsubscribeAll = new Subject();
	}

	// -----------------------------------------------------------------------------------------------------
	// @ Lifecycle hooks
	// -----------------------------------------------------------------------------------------------------

	/**
	 * On init
	 */
	public ngOnInit(): void {
		// Subscribe to the config changes
		this._fuseConfigService.config.pipe(takeUntil(this._unsubscribeAll)).subscribe(settings => {
			this.horizontalNavbar = settings.layout.navbar.position === 'top';
			this.rightNavbar = settings.layout.navbar.position === 'right';
			this.hiddenNavbar = settings.layout.navbar.hidden === true;
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

	// -----------------------------------------------------------------------------------------------------
	// @ Public methods
	// -----------------------------------------------------------------------------------------------------

	/**
	 * Toggle sidebar open
	 *
	 * @param key
	 */
	toggleSidebarOpen(key): void {
		this._fuseSidebarService.getSidebar(key).toggleOpen();
	}

	public setAvatar(): string {
		const name = `${this.user.profile.first_name} ${this.user.profile.last_name}`;
		return name.split(/\s/).reduce((initials, currentName) => (initials += currentName.slice(0, 1)), '');
	}

	public changeTheme(theme: string): void {
		this._localStorageService.store('theme', theme);
		this._setCurrentConfig();
	}

	private _setCurrentConfig(): void {
		this._currentConfig.colorTheme = this._localStorageService.retrieve('theme')
			? this._localStorageService.retrieve('theme')
			: 'theme-default';
		this._fuseConfigService.setConfig(this._currentConfig);
	}
}
