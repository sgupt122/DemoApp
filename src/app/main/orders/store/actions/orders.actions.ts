import { Action } from '@ngrx/store';

import { IApiSuccess, IOrder } from '@/_interfaces';

export enum OrdersActionTypes {
	SetCurrentOrderID = '[Orders] Set Current Order ID',
	ClearCurrentOrderID = '[Orders] Clear Current Order ID',
	InitializeCurrentOrderID = '[Orders] Initialized Current Order ID',
	InitializeOrderTypeID = '[Orders] Initialize Order Type ID',
	Load = '[Orders] Load',
	LoadSuccess = '[Orders] Load Success',
	LoadFail = '[Orders] Load Fail',
	UpdateOrder = '[Orders] Update Order',
	UpdateOrderSuccess = '[Orders] Update Order Success',
	UpdateOrderFail = '[Orders] Update Order Fail',
	CreateOrder = '[Orders] Create Order',
	CreateOrderSuccess = '[Orders] Create Order Success',
	CreateOrderFail = '[Orders] Create Order Fail',
	LoadColumns = '[Orders] Load Columns',
	LoadColumnsSuccess = '[Orders] Load Columns Success',
	LoadColumnsFail = '[Orders] Load Columns Fail',
	UpdateColumns = '[Orders] Update Columns',
	UpdateColumnsSuccess = '[Orders] Update Columns Success',
	UpdateColumnsFail = '[Orders] Update Columns Fail',
}
export class SetCurrentOrderID implements Action {
	public readonly type = OrdersActionTypes.SetCurrentOrderID;

	constructor(public payload: IOrder) {}
}

export class ClearCurrentOrderID implements Action {
	public readonly type = OrdersActionTypes.ClearCurrentOrderID;
}

export class InitializeCurrentOrderID implements Action {
	public readonly type = OrdersActionTypes.InitializeCurrentOrderID;
}

export class InitializeOrderTypeID implements Action {
	public readonly type = OrdersActionTypes.InitializeOrderTypeID;

	constructor(public payload: number) {}
}

export class Load implements Action {
	public readonly type = OrdersActionTypes.Load;
}

export class LoadSuccess implements Action {
	public readonly type = OrdersActionTypes.LoadSuccess;

	constructor(public payload: IApiSuccess<IOrder[]>) {}
}

export class LoadFail implements Action {
	public readonly type = OrdersActionTypes.LoadFail;

	constructor(public payload: any) {}
}

export class UpdateOrder implements Action {
	public readonly type = OrdersActionTypes.UpdateOrder;

	constructor(public payload: IOrder) {}
}

export class UpdateOrderSuccess implements Action {
	public readonly type = OrdersActionTypes.UpdateOrderSuccess;

	constructor(public payload: IApiSuccess<IOrder>) {}
}

export class UpdateOrderFail implements Action {
	public readonly type = OrdersActionTypes.UpdateOrderFail;

	constructor(public payload: any) {}
}

export class CreateOrder implements Action {
	public readonly type = OrdersActionTypes.CreateOrder;

	constructor(public payload: IOrder) {}
}

export class CreateOrderSuccess implements Action {
	public readonly type = OrdersActionTypes.CreateOrderSuccess;

	constructor(public payload: IApiSuccess<IOrder>) {}
}

export class CreateOrderFail implements Action {
	public readonly type = OrdersActionTypes.CreateOrderFail;

	constructor(public payload: any) {}
}

export class LoadColumns implements Action {
	public readonly type = OrdersActionTypes.LoadColumns;
}

export class LoadColumnsSuccess implements Action {
public readonly type = OrdersActionTypes.LoadColumnsSuccess;

constructor(public payload: any) { }
}

export class LoadColumnsFail implements Action {
public readonly type = OrdersActionTypes.LoadColumnsFail;

constructor(public payload: any) { }
}

export class UpdateColumns implements Action {
	public readonly type = OrdersActionTypes.UpdateColumns;

	constructor(public payload: any) { }
}

export class UpdateColumnsSuccess implements Action {
public readonly type = OrdersActionTypes.UpdateColumnsSuccess;

constructor(public payload: any) { }
}

export class UpdateColumnsFail implements Action {
public readonly type = OrdersActionTypes.UpdateColumnsFail;

constructor(public payload: any) { }
}

export type OrdersActions =
	| SetCurrentOrderID
	| ClearCurrentOrderID
	| InitializeCurrentOrderID
	| InitializeOrderTypeID
	| Load
	| LoadSuccess
	| LoadFail
	| UpdateOrder
	| UpdateOrderSuccess
	| UpdateOrderFail
	| CreateOrder
	| CreateOrderSuccess
	| CreateOrderFail
	| LoadColumns
	| LoadColumnsSuccess
	| LoadColumnsFail
	| UpdateColumns
	| UpdateColumnsSuccess
	| UpdateColumnsFail;
