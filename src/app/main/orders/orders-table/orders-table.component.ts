import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IDatatableColumn, IOrder } from '@/_interfaces';
import { COLUMNS } from '@/_config';
import { order, commonInfo } from '@/_config/config';

@Component({
	selector: 'app-orders-table',
	templateUrl: './orders-table.component.html',
})
export class OrdersTableComponent implements OnChanges, OnInit {
	@Input() public rows: IOrder;
	@Input() private selectedOrder: IOrder;
	@Input() public errorMessage: string;
	@Input() public loading: boolean;
	@Output() private selectedUpdated = new EventEmitter<IOrder>();
	@Output() private requestLoading = new EventEmitter<boolean>();
	public selected: IOrder[] = [];
	@Input() public orderColumns: IDatatableColumn[];
	@Output() public deselectRow = new EventEmitter();
	public orderTable = {
		orderTB: order.orderTable,
		error: commonInfo.error
	}
	constructor() { }

	public ngOnInit(): void {
		this._setSelected();
	}
	/** on clicking outside the table */
	public clickOutside(): void {
		this.selected = [];
		this.deselectRow.emit(false);
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.selectedOrder) {
			this._setSelected();
		}
		if (changes.rows && !changes.rows.firstChange) {
			this.loading = false;
			this.requestLoading.emit(this.loading);
		}
		if (this.orderColumns){
			COLUMNS.orders = this.orderColumns;
		}else {
			this.orderColumns = COLUMNS.orders;
		}
	}
	/** returning boolean on row select */
	public singleSelectCheck(row: IOrder): boolean {
		return this.selected.indexOf(row) === -1;
	}

	/** on selecting row from table */
	public onSelect(): void {
		if (this.selected.length === 0) {
			this.clickOutside();
			return this.selectedUpdated.emit(null);
		}
		this.selectedUpdated.emit(this.selected[0]);
		this.deselectRow.emit(true);
	}

	/** push the selected order */
	private _setSelected(): void {
		this.selected = [];
		if (this.selectedOrder && this.selectedOrder.id) {
			this.selected.push(this.selectedOrder);
		}
	}
}
