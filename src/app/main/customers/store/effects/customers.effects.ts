import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { CustomersService } from '@/_services';
import { ICustomer, IApiSuccess, ICustomerFilter } from '@/_interfaces';
import * as fromCustomers from '@/main/customers/store';
import { COLUMNS } from '@/_config';

@Injectable()
export class CustomersEffects {
	constructor(private _actions$: Actions, private _customersService: CustomersService) {}

	@Effect()
	loadCustomers$ = this._actions$.pipe(
		ofType(fromCustomers.CustomersActionTypes.LoadCustomers),
		map((action: fromCustomers.LoadCustomers) => action.payload),
		mergeMap((filters: ICustomerFilter) =>
			this._customersService.getCustomers(filters).pipe(
				map((customers: IApiSuccess<ICustomer[]>) => new fromCustomers.LoadCustomersSuccess(customers)),
				catchError(err => of(new fromCustomers.LoadCustomersFail(err.error.message)))
			)
		)
	);

	@Effect()
	updateCustomer$ = this._actions$.pipe(
		ofType(fromCustomers.CustomersActionTypes.UpdateCustomer),
		map((action: fromCustomers.UpdateCustomer) => action.payload),
		mergeMap((customer: ICustomer) =>
			this._customersService.updateCustomer(customer).pipe(
				map(updatedCustomer => new fromCustomers.UpdateCustomerSuccess(updatedCustomer)),
				catchError(err => of(new fromCustomers.UpdateCustomerFail(err.error.message)))
			)
		)
	);

	@Effect()
	loadColumns = this._actions$.pipe(
		ofType(fromCustomers.CustomersActionTypes.LoadColumns),
		mergeMap((action: fromCustomers.LoadColumns) =>
			this._customersService.getCustomerColumns().pipe(
			map((response: any) => new fromCustomers.LoadColumnsSuccess(response)),
			catchError(err => of(new fromCustomers.LoadColumnsFail(err.error.message)))
			)
		)
	);
	
	@Effect()
	updateColumns$ = this._actions$.pipe(
		ofType(fromCustomers.CustomersActionTypes.UpdateColumns),
		map((action: fromCustomers.UpdateColumns) => action.payload),
		mergeMap(() =>
			this._customersService.updateCustomerColumns(COLUMNS.customers).pipe(
				map(updatedLead => new fromCustomers.UpdateColumnsSuccess(updatedLead)),
				catchError(err => of(new fromCustomers.UpdateColumnsFail(err.error.message)))
			)
		)
	);
}
