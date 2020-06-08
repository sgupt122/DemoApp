import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ICampaign, IDatatableColumn } from '@/_interfaces';
import { FuseUtils } from '@fuse/utils';
import { campaign } from '@/_config/config';

@Component({
	selector: 'app-campaings-filter',
	templateUrl: './campaings-filter.component.html'
})
export class CampaingsFilterComponent implements OnChanges, OnInit {
	@Input() public rows: ICampaign[];
	@Output() public tableOffsetReset: EventEmitter<number> = new EventEmitter();
	@Output() public tableRowsUpdated: EventEmitter<ICampaign[]> = new EventEmitter();
	public filteredRows: ICampaign[];
	public campaignFilterLb = campaign.campaignFilterLb;
	constructor() { }

	public ngOnInit(): void { }

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.rows) {
			this.tableRowsUpdated.emit(this.rows);
		}
	}

	public updateFilter(searchString: string): void {
		if (searchString === '') {
			return this.tableRowsUpdated.emit(this.rows);
		}
		this.filteredRows = FuseUtils.filterArrayByString(this.rows, searchString);
		this.tableRowsUpdated.emit(this.filteredRows);
		this.tableOffsetReset.emit(0);
	}
}
