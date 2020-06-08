import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationStart } from '@angular/router';
import { LocalStorage } from 'ngx-webstorage';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { IApiSuccess, IOrder, IOrderType, IDatatableColumn } from '@/_interfaces';
import * as fromOrders from '@/main/orders/store';
import { OrdersService } from '@/_services';
import { COLUMNS } from '@/_config';

@Component({
	selector: 'app-orders',
	templateUrl: './orders.component.html',
	styleUrls: ['./orders.component.scss'],
	animations: fuseAnimations,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None
})
export class OrdersComponent implements OnInit {
	@LocalStorage() public user;
	public rows$: Observable<IOrder[]>;
	public errorMessage$: Observable<any>;
	public selectedOrder$: Observable<IOrder>;
	public orderTypes$: Observable<IApiSuccess<IOrderType[]>>;
	public orderColumns$: Observable<IDatatableColumn[]>;
	public loading: boolean = true;
	public show: boolean;
	constructor(
		private _store: Store<fromOrders.OrdersState>,
		private _titleService: Title,
		private _router: Router,
		private _ordersService: OrdersService,
	) {
		this._router.events.subscribe((val) => {
			if (this._router.url === '/orders/add' || this._router.url === '/orders/edit') {
				return this.selectedOrder$;
			}
			else if (this._router.url !== '/orders') {
				this._store.dispatch(new fromOrders.ClearCurrentOrderID());
			}
		});
	}

	public ngOnInit(): void {
		this._titleService.setTitle(`Orders - Charcoal`);
		this._store.dispatch(new fromOrders.Load());
		this.rows$ = this._store.pipe(select(fromOrders.getOrders));
		this.errorMessage$ = this._store.pipe(select(fromOrders.getError));
		this.selectedOrder$ = this._store.pipe(select(fromOrders.getCurrentOrder));
		this.orderTypes$ = this._ordersService.orderTypes();
		this.selectedOrder$.subscribe(ele => {
			this.show = (ele !== null) ? true : false;
		});
		this._store.dispatch(new fromOrders.LoadColumns());
		this.orderColumns$ = this._store.pipe(select(fromOrders.getOrderColumns));
	}

	public newOrder(orderTypeID: number): void {
		this._store.dispatch(new fromOrders.InitializeOrderTypeID(orderTypeID));
		this._store.dispatch(new fromOrders.InitializeCurrentOrderID());
		this._router.navigate(['/orders/add']);
	}

	public updateSelected(order: IOrder): void {
		if (!order) {
			return this._store.dispatch(new fromOrders.ClearCurrentOrderID());
		}
		this._store.dispatch(new fromOrders.SetCurrentOrderID(order));
	}

	public updateOrder(order: IOrder): void {
		this.loading = true;
		this._store.dispatch(new fromOrders.UpdateOrder(order));
	}

	public loadingRequest(loading: boolean): void {
		this.loading = loading;
	}
	public deselectRow(value): void {
		this.show = value;
	}
}
