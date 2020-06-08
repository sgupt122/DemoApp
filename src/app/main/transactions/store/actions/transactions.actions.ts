import { Action } from '@ngrx/store';

import { IApiSuccess, ITransaction, ITransactionsFilter } from '@/_interfaces';

export enum TransactionsActionTypes {
	SetCurrentTransactionID = '[Transactions] Set Current Transaction ID',
	ClearCurrentTransactionID = '[Transactions] Clear Current Transaction ID',
	SetTransactionsFilters = '[Transactions] Set Transactions Filters',
	ResetTransactionsFilters = '[Transactions] Reset Transactions Filters',
	Load = '[Transactions] Transactions Load',
	LoadSuccess = '[Transactions] Load Transactions Success',
	LoadFail = '[Transactions] Load Transactions Fail',
	LoadColumns = '[Transactions] Load Columns',
	LoadColumnsSuccess = '[Transactions] Load Columns Success',
	LoadColumnsFail = '[Transactions] Load Columns Fail',
	UpdateColumns = '[Transactions] Update Columns',
	UpdateColumnsSuccess = '[Transactions] Update Columns Success',
	UpdateColumnsFail = '[Transactions] Update Columns Fail'
}
export class SetCurrentTransactionID implements Action {
	public readonly type = TransactionsActionTypes.SetCurrentTransactionID;

	constructor(public payload: ITransaction) {}
}

export class ClearCurrentTransactionID implements Action {
	public readonly type = TransactionsActionTypes.ClearCurrentTransactionID;
}

export class SetTransactionsFilters implements Action {
	public readonly type = TransactionsActionTypes.SetTransactionsFilters;

	constructor(public payload: ITransactionsFilter) {}
}

export class ResetTransactionsFilters implements Action {
	public readonly type = TransactionsActionTypes.ResetTransactionsFilters;
}

export class Load implements Action {
	public readonly type = TransactionsActionTypes.Load;

	constructor(public payload: ITransactionsFilter) {}
}

export class LoadSuccess implements Action {
	public readonly type = TransactionsActionTypes.LoadSuccess;

	constructor(public payload: IApiSuccess<ITransaction[]>) {}
}

export class LoadFail implements Action {
	public readonly type = TransactionsActionTypes.LoadFail;

	constructor(public payload: string) {}
}
export class LoadColumns implements Action {
	public readonly type = TransactionsActionTypes.LoadColumns;
}

export class LoadColumnsSuccess implements Action {
public readonly type = TransactionsActionTypes.LoadColumnsSuccess;

constructor(public payload: any) { }
}

export class LoadColumnsFail implements Action {
public readonly type = TransactionsActionTypes.LoadColumnsFail;

constructor(public payload: any) { }
}

export class UpdateColumns implements Action {
	public readonly type = TransactionsActionTypes.UpdateColumns;

	constructor(public payload: any) { }
}

export class UpdateColumnsSuccess implements Action {
public readonly type = TransactionsActionTypes.UpdateColumnsSuccess;

constructor(public payload: any) { }
}

export class UpdateColumnsFail implements Action {
public readonly type = TransactionsActionTypes.UpdateColumnsFail;

constructor(public payload: any) { }
}

export type TransactionsActions =
	| SetCurrentTransactionID
	| ClearCurrentTransactionID
	| SetTransactionsFilters
	| ResetTransactionsFilters
	| Load
	| LoadSuccess
	| LoadFail
	| LoadColumns
	| LoadColumnsSuccess
	| LoadColumnsFail
	| UpdateColumns
	| UpdateColumnsSuccess
	| UpdateColumnsFail;
