import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { IDatatableColumn, ICustomer, IApiSuccess, ICustomerFilter } from '@/_interfaces';
import { COLUMNS, PROSPECTSTATUS } from '@/_config';

@Component({
	selector: 'app-customers-table',
	templateUrl: './customers-table.component.html',
	styleUrls: ['./customer-table.component.scss']
})
export class CustomersTableComponent implements OnChanges, OnInit {
	@Input() public customersResponse: IApiSuccess<ICustomer>;
	@Input() public selectedCustomer: ICustomer;
	@Input() public customerFilters: ICustomerFilter;
	@Input() public customerColumns: IDatatableColumn[];
	@Output() public selectedUpdated = new EventEmitter<ICustomer | null>();
	@Output() public pageSet = new EventEmitter<{ offset: number }>();
	public loadingIndicator: boolean = true;
	public selected: ICustomer[] = [];
	public statuses: any = PROSPECTSTATUS;
	@Output() public deselectRow = new EventEmitter();


	constructor() { }

	public ngOnInit(): void {
		this.setPage({ offset: this.customersResponse.meta.pagination.current_page - 1 });
		this._setSelected();
	}
	public clickOutside(): void {
		this.selected = [];
		this.deselectRow.emit(true);
	}
	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.customersResponse) {
			this.loadingIndicator = false;
		}
		if (changes.selectedCustomer) {
			this._setSelected();
		}
		if (this.customerColumns.length > 0){
			COLUMNS.customers = this.customerColumns;
		}else {
			this.customerColumns = COLUMNS.customers;
		}
	}

	public setPage(pageInfo): void {
		this.loadingIndicator = true;
		this.customerFilters.page = pageInfo.offset + 1;
		this.pageSet.emit(this.customerFilters);
	}

	public singleSelectCheck(row: any): boolean {
		return this.selected.indexOf(row) === -1;
	}

	public onSelect(): void {
		if (this.selected.length === 0) {
			return this.selectedUpdated.emit(null);
		}
		this.selectedUpdated.emit(this.selected[0]);
		this.deselectRow.emit(false);
	}

	private _setSelected(): void {
		this.selected = [];
		if (this.selectedCustomer && this.selectedCustomer.id) {
			this.selected.push(this.selectedCustomer);
		}
	}
}
