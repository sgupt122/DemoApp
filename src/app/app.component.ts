import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { LocalStorage } from 'ngx-webstorage';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';

import { IUser, INavigation } from '@/_interfaces';
import { AuthenticationService, NavigationService } from '@/_services';
import { NAVIGATION_OPTION } from '@/_config/navigation';


@Component({
	selector: 'app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
	@LocalStorage() public user: IUser;
	fuseConfig: any;
	navigation: any;
	navigationOption: INavigation[];
	// Private
	private _unsubscribeAll: Subject<any>;

	/**
	 * Constructor
	 *
	 * @param {DOCUMENT} document
	 * @param {FuseConfigService} _fuseConfigService
	 * @param {FuseNavigationService} _fuseNavigationService
	 * @param {FuseSidebarService} _fuseSidebarService
	 * @param {FuseSplashScreenService} _fuseSplashScreenService
	 * @param {AuthenticationService} _authenticationService
	 * @param {NavigationService} _navigationService
	 * @param {Platform} _platform
	 */
	constructor(
		@Inject(DOCUMENT) private document: any,
		private _fuseConfigService: FuseConfigService,
		private _fuseNavigationService: FuseNavigationService,
		private _fuseSidebarService: FuseSidebarService,
		private _fuseSplashScreenService: FuseSplashScreenService,
		private _authenticationService: AuthenticationService,
		private _navigationService: NavigationService,
		private _platform: Platform
		,
	) {
		this.navigationOption = [...NAVIGATION_OPTION.role];
		// this.navigation = this._navigationService.retrieveUserNavigation(this.user);
		// this._fuseNavigationService.register('main', this.navigation);
		// this._fuseNavigationService.setCurrentNavigation('main');

		if (!this.user) {
			this.navigation = this._navigationService.retrieveUserNavigation(this.user);
			this._fuseNavigationService.register('main', this.navigation);
			this._fuseNavigationService.setCurrentNavigation('main');
		} else {
			this._navigationService.getSingleNavigation().subscribe(res => {
				this.navigation = [];
				this.navigation = this._navigationService.filterNavigation(res);
				// this.navigationOption.filter(opt => {
				// 	if (res['data'][0]['navigation'][opt.id] === true) {
				// 		this.navigation.push(opt);
				// 	}
				// });
				this._fuseNavigationService.register('main', this.navigation);
				this._fuseNavigationService.setCurrentNavigation('main');
			})
		}
		// Add is-mobile class to the body if the platform is mobile
		if (this._platform.ANDROID || this._platform.IOS) {
			this.document.body.classList.add('is-mobile');
		}

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
		this._authenticationService.userChanges().subscribe(() => {
			this._setNavigation();
		});
		this._fuseConfigService.config
			.pipe(takeUntil(this._unsubscribeAll))
			.subscribe(config => this._setAppConfig(config));
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

	private _setNavigation(): void {
		if (!this.user) {
			this.navigation = this._navigationService.retrieveUserNavigation(this.user);
			this._fuseNavigationService.unregister('main');
			this._fuseNavigationService.register('main', this.navigation);
			this._fuseNavigationService.setCurrentNavigation('main');
		} else {
			this._navigationService.getSingleNavigation().subscribe(res => {
				this.navigation = [];
				this.navigation = this._navigationService.filterNavigation(res);
				// this.navigationOption.filter(opt => {
				// 	if (res['data'][0]['navigation'][opt.id] === true) {
				// 		this.navigation.push(opt);
				// 	}
				// });
				this._fuseNavigationService.unregister('main');
				this._fuseNavigationService.register('main', this.navigation);
				this._fuseNavigationService.setCurrentNavigation('main');
			})
		}
		// this.navigation = this._navigationService.retrieveUserNavigation(this.user);
		// this._fuseNavigationService.unregister('main');
		// this._fuseNavigationService.register('main', this.navigation);
		// this._fuseNavigationService.setCurrentNavigation('main');
	}

	private _setAppConfig(config): void {
		this.fuseConfig = config;
		this.document.body.classList.add('boxed');
		if (this.fuseConfig.layout.width !== 'boxed') {
			this.document.body.classList.remove('boxed');
		}
		for (let i = 0; i < this.document.body.classList.length; i++) {
			const className = this.document.body.classList[i];
			if (className.startsWith('theme-')) {
				this.document.body.classList.remove(className);
			}
		}
		this.document.body.classList.add(this.fuseConfig.colorTheme);
	}
}
