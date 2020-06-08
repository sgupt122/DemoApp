import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { TransactionsService } from '@/_services';
import { ITransaction, IApiSuccess, ITransactionsFilter } from '@/_interfaces';
import * as fromTransactions from '@/main/transactions/store';
import { COLUMNS } from '@/_config';

@Injectable()
export class TransactionsEffects {
	constructor(private _actions$: Actions, private _transactionsService: TransactionsService) {}

	@Effect()
	loadTransactions$ = this._actions$.pipe(
		ofType(fromTransactions.TransactionsActionTypes.Load),
		map((action: fromTransactions.Load) => action.payload),
		mergeMap((filters: ITransactionsFilter) =>
			this._transactionsService.getTransactions(filters).pipe(
				map((transactions: IApiSuccess<ITransaction[]>) => new fromTransactions.LoadSuccess(transactions)),
				catchError(err => of(new fromTransactions.LoadFail(err.error.message)))
			)
		)
	);

	@Effect()
	loadColumns = this._actions$.pipe(
		ofType(fromTransactions.TransactionsActionTypes.LoadColumns),
		mergeMap((action: fromTransactions.LoadColumns) =>
			this._transactionsService.getTransactionColumns().pipe(
			map((response: any) => new fromTransactions.LoadColumnsSuccess(response)),
			catchError(err => of(new fromTransactions.LoadColumnsFail(err.error.message)))
			)
		)
	);
	
	@Effect()
	updateColumns$ = this._actions$.pipe(
		ofType(fromTransactions.TransactionsActionTypes.UpdateColumns),
		map((action: fromTransactions.UpdateColumns) => action.payload),
		mergeMap((action: fromTransactions.UpdateColumns) =>
			this._transactionsService.updateTransactionColumns(COLUMNS.transactions).pipe(
				map(updatedTransaction => new fromTransactions.UpdateColumnsSuccess(updatedTransaction)),
				catchError(err => of(new fromTransactions.UpdateColumnsFail(err.error.message)))
			)
		)
	);
}
