import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LocalStorage } from 'ngx-webstorage';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IApiError, IApiSuccess, ILeadType, IOrder, IOrderDistributionType, IUser } from '@/_interfaces';
import { OrdersService } from '@/_services';
import * as fromOrders from '@/main/orders/store';

@Component({
	selector: 'app-place-order-shell',
	templateUrl: './place-order-shell.component.html',
	providers: [OrdersService],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceOrderShellComponent implements OnInit {
	@LocalStorage() public user: IUser;
	public order$: Observable<IOrder>;
	public errors$: Observable<string[]>;
	public leadTypes$: Observable<IApiSuccess<ILeadType[]> | IApiError>;
	public distributionTypes$: Observable<IApiSuccess<IOrderDistributionType[]>>;
	public action: string;
	public isEditMode: boolean = false;

	/**
	 * Constructor
	 *
	 * @param {Store} _store
	 * @param {Route} _route
	 * @param {Title} _titleService
	 * @param {OrdersService} _ordersService
	 */
	constructor(
		private _store: Store<fromOrders.OrdersState>,
		private _route: ActivatedRoute,
		private _titleService: Title,
		private _ordersService: OrdersService
	) { }

	public ngOnInit(): void {
		this._titleService.setTitle(`Providers - Charcoal Data`);
		this.order$ = this._store.pipe(select(fromOrders.getCurrentOrder));
		this.errors$ = this._store.pipe(select(fromOrders.getError));
		this.leadTypes$ = this._ordersService.getLeadTypes();
		this.distributionTypes$ = this._ordersService.orderDistributionTypes();
		this._route.params.subscribe((params: { action: string }) => {
			this.action = params.action;
			if (this.action == "edit") {
				this.isEditMode = true;
			}
		});
	}
}
