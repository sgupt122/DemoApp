import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { IPrice, IDatatableColumn } from '@/_interfaces';
import { COLUMNS } from '@/_config';
import * as fromPricing from '@/main/pricing/store';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-pricing-table',
	templateUrl: './pricing-table.component.html'
})
export class PricingTableComponent implements OnChanges, OnInit {
	@Input() public filteredRows;
	@Input() public selectedPrice;
	@Input() public errorMessage;
	@Input() public pricingColumns: IDatatableColumn[];

	@Output() public selectedUpdated: EventEmitter<IPrice | null> = new EventEmitter();
	public selected: IPrice[] = [];

	constructor(private _store: Store<fromPricing.PricingState>) { }

	public ngOnInit(): void {
		this._setSelected();
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.selectedPrice) {
			this._setSelected();
		}
		if (this.pricingColumns.length > 0){
			COLUMNS.pricing = this.pricingColumns;
		}else {
			this.pricingColumns = COLUMNS.pricing;
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
		if (this.selectedPrice && this.selectedPrice.id) {
			this.selected.push(this.selectedPrice);
		}
	}
	public clickOutside(): void {
		return this._store.dispatch(new fromPricing.ClearCurrentPriceID());
	}
}
