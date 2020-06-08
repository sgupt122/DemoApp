import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { IDatatableColumn, IProvider } from '@/_interfaces';
import { FuseUtils } from '@fuse/utils';
import { provider } from '@/_config/config';

@Component({
	selector: 'app-providers-filter',
	templateUrl: './providers-filter.component.html'
})
export class ProvidersFilterComponent implements OnChanges, OnInit {
	@Input() public rows: IProvider[];
	@Output() public tableOffsetReset: EventEmitter<number> = new EventEmitter();
	@Output() public tableRowsUpdated: EventEmitter<IProvider[]> = new EventEmitter();
	public filteredRows: IProvider[];
	public providerFilterConfig = provider.providerFilter;
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
