import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ICampaign, IDatatableColumn } from '@/_interfaces';
import { COLUMNS } from '@/_config';
import * as fromCampaigns from '@/main/campaigns/store';
import { Store } from '@ngrx/store';
import { commonInfo } from '@/_config/config';
@Component({
	selector: 'app-campaings-table',
	templateUrl: './campaings-table.component.html'
})
export class CampaingsTableComponent implements OnChanges, OnInit {
	@Input() public filteredRows;
	@Input() public selectedCampaign;
	@Input() public errorMessage;
	@Input() public campaignsColumns;
	@Output() public selectedUpdated: EventEmitter<ICampaign | null> = new EventEmitter();
	public selected: ICampaign[] = [];
	public errorConfig = commonInfo.error;
	constructor(private _store: Store<fromCampaigns.CampaignsState>) { }

	public ngOnInit(): void {
		this._setSelected();
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.selectedCampaign) {
			this._setSelected();
		}
		if (this.campaignsColumns){
			COLUMNS.campaigns = this.campaignsColumns;
		}else{
			this.campaignsColumns = COLUMNS.campaigns;
		}
	}

	public singleSelectCheck(row: any): boolean {
		return this.selected.indexOf(row) === -1;
	}

	public onSelect(): void {
		if (this.selected.length === 0) {
			return this.selectedUpdated.emit(null);
		}
		this.selectedUpdated.emit(this.selected[0]);
	}

	private _setSelected(): void {
		this.selected = [];
		if (this.selectedCampaign && this.selectedCampaign.id) {
			this.selected.push(this.selectedCampaign);
		}
	}
	public clickOutside(): void {
		return this._store.dispatch(new fromCampaigns.ClearCurrentCampaignID());
	}
}
