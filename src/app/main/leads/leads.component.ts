import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { fuseAnimations } from '@fuse/animations';
import { IApiSuccess, IClientDisposition, ILead, ILeadFilter, IDatatableColumn } from '@/_interfaces';
import * as fromLeads from '@/main/leads/store';
import { LeadDetailsComponent } from './lead-details/lead-details.component';
import { LeadCreditComponent } from './lead-credit/lead-credit.component';
import { Router } from '@angular/router';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { leads, commonBtn, commonInfo } from '@/_config/config';
import { LeadsService } from '@/_services';
import { LeadsColumnComponent } from './leads-column/leads-column.component';
import { COLUMNS } from '@/_config';

@Component({
	selector: 'app-leads',
	templateUrl: './leads.component.html',
	styleUrls: ['./leads.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: fuseAnimations
})
export class LeadsComponent implements OnInit {
	public leadsResponse$: Observable<IApiSuccess<ILead[]>>;
	public selectedLead$: Observable<ILead>;
	public leadFilters$: Observable<ILeadFilter>;
	public leadsColumns$: Observable<IDatatableColumn[]>;
	public clientDispositions$: Observable<IClientDisposition[]>;
	public isLeadSelected: boolean = true;
	public show: boolean;
	public i: number = 1;
	public leadTableText = {
		commonBtn: commonBtn,
		commonLb: leads.leadMain,
		error: commonInfo.error
	}
	public statuses = [];
	public isSaveBtnDisabled: boolean;
	public copyLeadsColumn: any;
	/**
	 * Constructor
	 *
	 * @param {Store} _store
	 * @param {Title} _titleService
	 * @param {FuseConfigService} _fuseConfigService
	 * @param {FuseSidebarService} _fuseSidebarService
	 */
	constructor(
		private _store: Store<fromLeads.LeadsState>,
		private _titleService: Title,
		private _fuseConfigService: FuseConfigService,
		private _fuseSidebarService: FuseSidebarService,
		private _router: Router,
		private shared: SharedFunctions,
		private _leadService: LeadsService,
	) {
		this._router.events.subscribe((val) => {
			if (this._router.url !== '/leads') {
				this._store.dispatch(new fromLeads.ClearCurrentLeadID());
			}
		});
	}

	public ngOnInit(): void {
		this._leadService.getAllStatus().subscribe(status => {
			this.statuses = status['data'];
		});
		this._titleService.setTitle(`Leads - Charcoal`);
		this._store.dispatch(new fromLeads.LoadClientDispositions());
		this.leadsResponse$ = this._store.pipe(select(fromLeads.getLeads));
		this.selectedLead$ = this._store.pipe(select(fromLeads.getCurrentLead));
		this.leadFilters$ = this._store.pipe(select(fromLeads.getLeadFilters));
		this.clientDispositions$ = this._store.pipe(select(fromLeads.getClientDispositions));

		this._store.dispatch(new fromLeads.LoadColumns());
		this.leadsColumns$ = this._store.pipe(select(fromLeads.getLeadColumns));

		this.leadsColumns$.subscribe(res => {
			this.copyLeadsColumn = JSON.parse(JSON.stringify(res));
		});
		this.isSaveBtnDisabled = true;
	}

	public setPage(leadFilters: ILeadFilter): void {
		this._store.dispatch(new fromLeads.SetLeadFilters(leadFilters));
		this._store.dispatch(new fromLeads.LoadLeads(leadFilters));
	}

	public updateSelectedLead(lead: ILead | null): void {
		this.isLeadSelected = false;
		if (!lead) {
			this.isLeadSelected = true;
			return this._store.dispatch(new fromLeads.ClearCurrentLeadID());
		}
		this._store.dispatch(new fromLeads.SetCurrentLeadID(lead));
	}

	public toggleSidebarOpen(key): void {
		this._fuseSidebarService.getSidebar(key).toggleOpen();
	}

	public setFilters(filters: ILeadFilter): void {
		this._store.dispatch(new fromLeads.SetLeadFilters(filters));
		this._store.dispatch(new fromLeads.LoadLeads(filters));
		// this.toggleSidebarOpen('leadsFilter');
		if (this.i !== 1){
			this.toggleSidebarOpen('leadsFilter');
		}
		this.i++;
	}

	public formReset(): void {
		this._store.dispatch(new fromLeads.ResetLeadFilters());
	}

	public updateLead(lead: ILead): void {
		this._store.dispatch(new fromLeads.UpdateLead(lead));
	}

	public viewLeadDetails(): void {
		this.shared.modalPopup(LeadDetailsComponent, '600px', {});
	}

	public leadCredit(): void {
		this.shared.modalPopup(LeadCreditComponent, '600px', '');
	}

	public changeColumnName(): void{
		this.shared.modalPopup(LeadsColumnComponent, '600px', '');
	}

	public deselectRow(value): void {
		this.show = value;
	}

	public changeColumnFlag(checked, i): void {
		this.isSaveBtnDisabled = false;
		this.copyLeadsColumn[i].flag = checked ? true : false;
	}

	public saveColumnHideShow(): void {
		COLUMNS.leads = [...this.copyLeadsColumn];
		this._store.dispatch(new fromLeads.UpdateColumns(COLUMNS.leads));
		this.toggleSidebarOpen('leadsColumn');
	}
}
