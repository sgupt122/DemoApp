import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { IProvider, IDatatableColumn } from '@/_interfaces';
import * as fromProviders from '@/main/providers/store';
import { AuthenticationService } from '@/_services';
import { provider } from '@/_config/config';
import { ProvidersColumnComponent } from './providers-column/providers-column.component';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { COLUMNS } from '@/_config';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
	selector: 'app-providers',
	templateUrl: './providers.component.html',
	styleUrls: ['./providers.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations,
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProvidersComponent implements OnInit {
	public rows$: Observable<IProvider[]>;
	public errorMessage$: Observable<any>;
	public selectedProvider$: Observable<IProvider>;
	public providersColumns$: Observable<IDatatableColumn[]>;
	public filteredRows: IProvider[];
	public isAdmin: boolean = false;
	public providersConfig = provider.providers;
	public isSaveBtnDisabled: boolean;
	public copyProvidersColumn: any;
	/**
	 * Constructor
	 *
	 * @param {Store} _store
	 * @param {Title} _titleService
	 * @param {AuthenticationService} _authService
	 */
	constructor(
		private _store: Store<fromProviders.ProvidersState>,
		private _titleService: Title,
		private _authService: AuthenticationService,
		private shared: SharedFunctions,
		private _fuseSidebarService: FuseSidebarService,
	) { }

	public ngOnInit(): void {
		this._titleService.setTitle(`Providers - Charcoal`);
		this.isAdmin = this._authService.isAdmin();
		this.selectedProvider$ = this._store.pipe(select(fromProviders.getCurrentProvider));
		this.errorMessage$ = this._store.pipe(select(fromProviders.getError));
		this._store.dispatch(new fromProviders.LoadProviders());
		this.rows$ = this._store.pipe(select(fromProviders.getProviders));
		this._store.dispatch(new fromProviders.LoadColumns());
		this.providersColumns$ = this._store.pipe(select(fromProviders.getProvidersColumns));
		this.providersColumns$.subscribe(res => {
			this.copyProvidersColumn = JSON.parse(JSON.stringify(res));
		});
		this.isSaveBtnDisabled = true;
	}

	public newProvider(): void {
		this._store.dispatch(new fromProviders.InitializeCurrentProviderID());
	}

	public updateTableOffset(offset: number): void { }

	public updateTableRows(providers: IProvider[]): void {
		this.filteredRows = [...providers];
	}

	public updateSelectedProvider (provider : IProvider | null): void {
		if (!provider) {
			return this._store.dispatch(new fromProviders.ClearCurrentProviderID());
		}
		this._store.dispatch(new fromProviders.SetCurrentProviderID(provider));
	}

	public changeColumnName(): void{
		this.shared.modalPopup(ProvidersColumnComponent, '600px', '');
	}

	public toggleSidebarOpen(key): void {
		this._fuseSidebarService.getSidebar(key).toggleOpen();
	}

	public changeColumnFlag(checked, i): void {
		this.isSaveBtnDisabled = false;
		this.copyProvidersColumn[i].flag = checked ? true : false;
	}

	public saveColumnHideShow(): void {
		COLUMNS.providers = [...this.copyProvidersColumn];
		this._store.dispatch(new fromProviders.UpdateColumns(COLUMNS.providers));
		this.isSaveBtnDisabled = true;		
		this.toggleSidebarOpen('providersColumn');
	}
}
