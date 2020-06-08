import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { COLUMNS } from '@/_config';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { fuseAnimations } from '@fuse/animations';
import { IApiSuccess, ITransaction, ITransactionsFilter, IDatatableColumn } from '@/_interfaces';
import * as fromTransactions from '@/main/transactions/store';
import { commonBtn, transaction } from '@/_config/config';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { TransactionsColumnComponent } from './transactions-column/transactions-column.component';

@Component({
	selector: 'app-transactions',
	templateUrl: './transactions.component.html',
	styleUrls: ['./transactions.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class TransactionsComponent implements OnInit {
	public transactionsResponse$: Observable<IApiSuccess<ITransaction[]>>;
	public filters$: Observable<ITransactionsFilter>;
	public error$: Observable<string>;
	public isSaveBtnDisabled: boolean;
	public copyTransactionColumn: any;
	public transactionColumns$: Observable<IDatatableColumn[]>;
	public transactionConfig = {
		commonBtn: commonBtn,
		transaction: transaction
	}

	/**
	 * Constructor
	 *
	 * @param {Store} _store
	 * @param {Title} _titleService
	 * @param {FuseConfigService} _fuseConfigService
	 * @param {FuseSidebarService} _fuseSidebarService
	 */
	constructor(
		private _store: Store<fromTransactions.TransactionsState>,
		private _titleService: Title,
		private _fuseConfigService: FuseConfigService,
		private _fuseSidebarService: FuseSidebarService,
		private shared: SharedFunctions
	) { }

	public ngOnInit(): void {
		this._titleService.setTitle('Transactions - Charcoal');
		this.transactionsResponse$ = this._store.pipe(select(fromTransactions.getTransactions));
		this.filters$ = this._store.pipe(select(fromTransactions.getTransactionsFilters));
		this.error$ = this._store.pipe(select(fromTransactions.getError));
		this._store.dispatch(new fromTransactions.LoadColumns());
		this.transactionColumns$ = this._store.pipe(select(fromTransactions.getTransactionColumns));
		this.transactionColumns$.subscribe(res => {
			this.copyTransactionColumn = JSON.parse(JSON.stringify(res));
		});
		this.isSaveBtnDisabled = true;
	}

	public setPage(filters: ITransactionsFilter): void {
		this._store.dispatch(new fromTransactions.SetTransactionsFilters(filters));
		this._store.dispatch(new fromTransactions.Load(filters));
	}

	public toggleSidebarOpen(key): void {
		this._fuseSidebarService.getSidebar(key).toggleOpen();
	}

	public setFilters(filters: ITransactionsFilter): void {
		this._store.dispatch(new fromTransactions.SetTransactionsFilters(filters));
		this._store.dispatch(new fromTransactions.Load(filters));
		this.toggleSidebarOpen('transactionsFilter');
	}

	public formReset(): void {
		this._store.dispatch(new fromTransactions.ResetTransactionsFilters());
	}

	public changeColumnName(): void {
		this.shared.modalPopup(TransactionsColumnComponent, '600px', '');
	}

	public changeColumnFlag(checked, i): void {
		this.isSaveBtnDisabled = false;
		this.copyTransactionColumn[i].flag = checked ? true : false;
	}

	public saveColumnHideShow(): void {
		COLUMNS.transactions = [...this.copyTransactionColumn];
		this._store.dispatch(new fromTransactions.UpdateColumns(COLUMNS.transactions));
		this.isSaveBtnDisabled = true;
		this.toggleSidebarOpen('transactionsColumn');
	}
}
