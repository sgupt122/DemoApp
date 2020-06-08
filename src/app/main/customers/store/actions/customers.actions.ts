import { Action } from '@ngrx/store';

import { IApiSuccess, ICustomer, ICustomerFilter } from '@/_interfaces';

export enum CustomersActionTypes {
	SetCurrentCustomerID = '[Customers] Set Current Customer ID',
	ClearCurrentCustomerID = '[Customers] Clear Current Customer ID',
	SetCustomerFilters = '[Customers] Set Customer Filters',
	ResetCustomerFilters = '[Customers] Reset Customer Filters',
	LoadCustomers = '[Customers] Customers Load',
	LoadCustomersSuccess = '[Customers] Load Customers Success',
	LoadCustomersFail = '[Customers] Load Customers Fail',
	UpdateCustomer = '[Customers] Update Customer',
	UpdateCustomerSuccess = '[Customers] Update Customer Success',
	UpdateCustomerFail = '[Customers] Update Customer Fail',
	LoadColumns = '[Customers] Load Columns',
	LoadColumnsSuccess = '[Customers] Load Columns Success',
	LoadColumnsFail = '[Customers] Load Columns Fail',
	UpdateColumns = '[Customers] Update Columns',
	UpdateColumnsSuccess = '[Customers] Update Columns Success',
	UpdateColumnsFail = '[Customers] Update Columns Fail',
}
export class SetCurrentCustomerID implements Action {
	public readonly type = CustomersActionTypes.SetCurrentCustomerID;

	constructor(public payload: ICustomer) {}
}

export class ClearCurrentCustomerID implements Action {
	public readonly type = CustomersActionTypes.ClearCurrentCustomerID;
}

export class SetCustomerFilters implements Action {
	public readonly type = CustomersActionTypes.SetCustomerFilters;

	constructor(public payload: ICustomerFilter) {}
}

export class ResetCustomerFilters implements Action {
	public readonly type = CustomersActionTypes.ResetCustomerFilters;
}

export class LoadCustomers implements Action {
	public readonly type = CustomersActionTypes.LoadCustomers;

	constructor(public payload: ICustomerFilter) {}
}

export class LoadCustomersSuccess implements Action {
	public readonly type = CustomersActionTypes.LoadCustomersSuccess;

	constructor(public payload: IApiSuccess<ICustomer[]>) {}
}

export class LoadCustomersFail implements Action {
	public readonly type = CustomersActionTypes.LoadCustomersFail;

	constructor(public payload: string) {}
}

export class UpdateCustomer implements Action {
	public readonly type = CustomersActionTypes.UpdateCustomer;

	constructor(public payload: ICustomer) {}
}

export class UpdateCustomerSuccess implements Action {
	public readonly type = CustomersActionTypes.UpdateCustomerSuccess;

	constructor(public payload: IApiSuccess<ICustomer>) {}
}

export class UpdateCustomerFail implements Action {
	public readonly type = CustomersActionTypes.UpdateCustomerFail;

	constructor(public payload: string) {}
}
export class LoadColumns implements Action {
	public readonly type = CustomersActionTypes.LoadColumns;
}

export class LoadColumnsSuccess implements Action {
public readonly type = CustomersActionTypes.LoadColumnsSuccess;

constructor(public payload: any) { }
}

export class LoadColumnsFail implements Action {
public readonly type = CustomersActionTypes.LoadColumnsFail;

constructor(public payload: any) { }
}

export class UpdateColumns implements Action {
	public readonly type = CustomersActionTypes.UpdateColumns;

	constructor(public payload: any) { }
}

export class UpdateColumnsSuccess implements Action {
public readonly type = CustomersActionTypes.UpdateColumnsSuccess;

constructor(public payload: any) { }
}

export class UpdateColumnsFail implements Action {
public readonly type = CustomersActionTypes.UpdateColumnsFail;

constructor(public payload: string) { }
}

export type CustomersActions =
	| SetCurrentCustomerID
	| ClearCurrentCustomerID
	| SetCustomerFilters
	| ResetCustomerFilters
	| LoadCustomers
	| LoadCustomersSuccess
	| LoadCustomersFail
	| UpdateCustomer
	| UpdateCustomerSuccess
	| UpdateCustomerFail
	| LoadColumns
	| LoadColumnsSuccess
	| LoadColumnsFail
	| UpdateColumns
	| UpdateColumnsSuccess
	| UpdateColumnsFail;
