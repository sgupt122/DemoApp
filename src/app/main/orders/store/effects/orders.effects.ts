import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { OrdersService } from '@/_services';
import { IApiSuccess, IOrder } from '@/_interfaces';
import * as fromOrders from '@/main/orders/store';
import { COLUMNS } from '@/_config';

@Injectable()
export class OrdersEffects {
	constructor(private _actions$: Actions, private _ordersService: OrdersService) {}

	@Effect()
	loadOrders$ = this._actions$.pipe(
		ofType(fromOrders.OrdersActionTypes.Load),
		mergeMap((action: fromOrders.Load) =>
			this._ordersService.retrieve().pipe(
				map((response: IApiSuccess<IOrder[]>) => new fromOrders.LoadSuccess(response)),
				catchError(err => of(new fromOrders.LoadFail(err.error.message)))
			)
		)
	);

	@Effect()
	updateOrder$ = this._actions$.pipe(
		ofType(fromOrders.OrdersActionTypes.UpdateOrder),
		map((action: fromOrders.UpdateOrder) => action.payload),
		mergeMap((order: IOrder) =>
			this._ordersService.update(order).pipe(
				map(response => new fromOrders.UpdateOrderSuccess(response)),
				catchError(err => of(new fromOrders.UpdateOrderFail(err.error.errors)))
			)
		)
	);

	@Effect()
	createOrder$: Observable<Action> = this._actions$.pipe(
		ofType(fromOrders.OrdersActionTypes.CreateOrder),
		map((action: fromOrders.CreateOrder) => action.payload),
		mergeMap((order: IOrder) =>
			this._ordersService.create(order).pipe(
				map(response => new fromOrders.CreateOrderSuccess(response)),
				catchError(err => of(new fromOrders.CreateOrderFail(err.error.errors)))
			)
		)
	);

	@Effect()
	loadColumns = this._actions$.pipe(
		ofType(fromOrders.OrdersActionTypes.LoadColumns),
		mergeMap((action: fromOrders.LoadColumns) =>
			this._ordersService.getOrderColumns().pipe(
			map((response: any) => new fromOrders.LoadColumnsSuccess(response)),
			catchError(err => of(new fromOrders.LoadColumnsFail(err.error.message)))
			)
		)
	);
	
	@Effect()
	updateColumns$ = this._actions$.pipe(
		ofType(fromOrders.OrdersActionTypes.UpdateColumns),
		map((action: fromOrders.UpdateColumns) => action.payload),
		mergeMap(() =>
			this._ordersService.updateOrderColumns(COLUMNS.orders).pipe(
				map(updatedLead => new fromOrders.UpdateColumnsSuccess(updatedLead)),
				catchError(err => of(new fromOrders.UpdateColumnsFail(err.error.message)))
			)
		)
	);
}
