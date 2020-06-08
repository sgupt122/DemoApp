import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { IDatatableColumn } from '@/_interfaces';
import { COLUMNS } from '@/_config';

@Component({
	selector: 'app-transactions-table',
	templateUrl: './transactions-table.component.html'
})
export class TransactionsTableComponent implements OnChanges, OnInit {
	@Input() public transactionsResponse;
	@Input() public filters;
	@Input() public error;
	@Input() public transactionColumns: IDatatableColumn[];
	@Output() public pageSet = new EventEmitter<{ offset: number }>();
	public loading: boolean = true;

	constructor() {}

	public ngOnInit(): void {
		this.setPage({ offset: this.transactionsResponse.meta.pagination.current_page - 1 });
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.transactionsResponse) {
			this.loading = false;
		}
		if (this.transactionColumns.length > 0){
			COLUMNS.transactions = this.transactionColumns;
		}else {
			this.transactionColumns = COLUMNS.transactions;
		}
	}

	public setPage(pageInfo): void {
		this.loading = true;
		const filters = { ...this.filters, page: pageInfo.offset + 1 };
		this.pageSet.emit(filters);
	}
}
