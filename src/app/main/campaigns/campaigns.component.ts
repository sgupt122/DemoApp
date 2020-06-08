import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { ICampaign, IDatatableColumn } from '@/_interfaces';
import * as fromCampaigns from '@/main/campaigns/store';
import { AuthenticationService } from '@/_services';
import { campaign } from '@/_config/config';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { CampaignsColumnComponent } from './campaigns-column/campaigns-column.component';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { COLUMNS } from '@/_config';

@Component({
	selector: 'app-campaigns',
	templateUrl: './campaigns.component.html',
	styleUrls: ['./campaigns.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class CampaignsComponent implements OnInit {
	@ViewChild('table') public table: any;
	public rows$: Observable<ICampaign[]>;
	public errorMessage$: Observable<string>;
	public selectedCampaign$: Observable<ICampaign>;
	public campaignsColumns$: Observable<IDatatableColumn[]>;
	public filteredRows: ICampaign[];
	public isAdmin: boolean = false;
	public campaigns = campaign.campaigns;
	public isSaveBtnDisabled: boolean;
	public copyCampaignsColumn: any;
	/**
	 * Constructor
	 *
	 * @param {Store} _store
	 * @param {Title} _titleService
	 * @param {AuthenticationService} _authService
	 */
	constructor(
		private _store: Store<fromCampaigns.CampaignsState>,
		private _titleService: Title,
		private _authService: AuthenticationService,
		private shared: SharedFunctions,
		private _fuseSidebarService: FuseSidebarService,
	) { }

	public ngOnInit(): void {
		this._titleService.setTitle(`Campaigns - Charcoal`);
		this.isAdmin = this._authService.isAdmin();
		this.selectedCampaign$ = this._store.pipe(select(fromCampaigns.getCurrentCampaign));
		this.errorMessage$ = this._store.pipe(select(fromCampaigns.getError));
		this._store.dispatch(new fromCampaigns.LoadCampaigns());
		this.rows$ = this._store.pipe(select(fromCampaigns.getCampaigns));
		this._store.dispatch(new fromCampaigns.LoadColumns());
		this.campaignsColumns$ = this._store.pipe(select(fromCampaigns.getCampaignsColumns));
		this.campaignsColumns$.subscribe(res => {
			this.copyCampaignsColumn = JSON.parse(JSON.stringify(res));
		});
		this.isSaveBtnDisabled = true;
	}

	public newCampaign(): void {
		this._store.dispatch(new fromCampaigns.InitializeCurrentCampaignID());
	}

	public updateTableOffset(offset: number): void { }

	public updateTableRows(campaigns: ICampaign[]): void {
		this.filteredRows = [...campaigns];
	}

	public updateSelectedCampaign(campaign: ICampaign | null): void {
		if (!campaign) {
			return this._store.dispatch(new fromCampaigns.ClearCurrentCampaignID());
		}
		this._store.dispatch(new fromCampaigns.SetCurrentCampaignID(campaign));
	}
	public changeColumnName(): void{
		this.shared.modalPopup(CampaignsColumnComponent, '600px', '');
	}

	public toggleSidebarOpen(key): void {
		this._fuseSidebarService.getSidebar(key).toggleOpen();
	}

	public changeColumnFlag(checked, i): void {
		this.isSaveBtnDisabled = false;
		this.copyCampaignsColumn[i].flag = checked ? true : false;
	}

	public saveColumnHideShow(): void {
		COLUMNS.campaigns = [...this.copyCampaignsColumn];
		this._store.dispatch(new fromCampaigns.UpdateColumns(COLUMNS.campaigns));
		this.isSaveBtnDisabled = true;
		this.toggleSidebarOpen('campaignsColumn');
	}
}
