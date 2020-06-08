import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ITransactionsFilter } from '@/_interfaces';
import { transaction, commonBtn } from '@/_config/config';

@Component({
	selector: 'app-transactions-filter',
	templateUrl: './transactions-filter.component.html'
})
export class TransactionsFilterComponent {
	@Input() public filters;
	@Output() public formResetClicked = new EventEmitter<boolean>();
	@Output() public filterButtonClicked = new EventEmitter<ITransactionsFilter>();
	public transactionConfig = {
		commonBtn: commonBtn,
		transaction: transaction
	}
	constructor() { }

	public resetForm(form: NgForm): void {
		const filters = { ...form.value, page: 1 };
		this.filterButtonClicked.emit(filters);
		this.formResetClicked.emit(true);
	}

	public filter(form: NgForm): void {
		const filters = { ...form.value, page: 1 };
		this._replaceNullValues(filters);
		this.filterButtonClicked.emit(filters);
		this.formResetClicked.emit(true);
	}

	private _replaceNullValues(filters: ITransactionsFilter): void {
		Object.keys(filters).forEach(filter => {
			if (!filters[filter]) {
				filters[filter] = '';
			}
		});
	}
}
