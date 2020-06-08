import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { IDatatableColumn, IProvider } from '@/_interfaces';
import { COLUMNS } from '@/_config';
import * as fromProviders from '@/main/providers/store';
import { Store } from '@ngrx/store';
import { commonInfo } from '@/_config/config';
@Component({
	selector: 'app-providers-table',
	templateUrl: './providers-table.component.html'
})
export class ProvidersTableComponent implements OnChanges, OnInit {
	@Input() public filteredRows;
	@Input() public selectedProvider;
	@Input() public errorMessage;
	@Input() public providersColumns;
	@Output() public selectedUpdated: EventEmitter<IProvider | null> = new EventEmitter();
	public selected: IProvider[] = [];
	public errorConfig = commonInfo.error;
	constructor(private _store: Store<fromProviders.ProvidersState>) { }

	public ngOnInit(): void {
		this._setSelected();
	}

	public ngOnChanges(changes: SimpleChanges): void {
		if (changes.selectedProvider) {
			this._setSelected();
		}
		if (this.providersColumns.length > 0){
			COLUMNS.providers = this.providersColumns;
		}else {
			this.providersColumns = COLUMNS.providers;
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
		if (this.selectedProvider && this.selectedProvider.id) {
			this.selected.push(this.selectedProvider);
		}
	}
	public clickOutside(): void {
		return this._store.dispatch(new fromProviders.ClearCurrentProviderID());
	}
}
