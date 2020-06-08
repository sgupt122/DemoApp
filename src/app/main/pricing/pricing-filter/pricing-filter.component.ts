import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { IPrice, IDatatableColumn } from '@/_interfaces';
import { FuseUtils } from '@fuse/utils';

@Component({
	selector: 'app-pricing-filter',
	templateUrl: './pricing-filter.component.html'
})
export class PricingFilterComponent implements OnChanges, OnInit {
	@Input() public rows: IPrice[];
	@Output() public tableOffsetReset: EventEmitter<number> = new EventEmitter();
	@Output() public tableRowsUpdated: EventEmitter<IPrice[]> = new EventEmitter();
	public filteredRows: IPrice[];

	constructor() {}

	public ngOnInit(): void {}

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
