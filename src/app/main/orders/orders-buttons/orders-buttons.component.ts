import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { IOrder, IUser, IDatatableColumn } from '@/_interfaces';
import { OrderDetailsComponent } from '@/main/orders/order-details/order-details.component';
import { Router } from '@angular/router';
import { commonBtn } from '@/_config/config';
import * as fromOrders from '@/main/orders/store';
import { Store } from '@ngrx/store';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { LocalStorage } from 'ngx-webstorage';
import { OrderTypeDialogComponent } from '../order-type-dialog/order-type-dialog.component';
import { OrderColumnComponent } from '../order-column/order-column.component';
import { COLUMNS } from '@/_config';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

@Component({
	selector: 'app-orders-buttons',
	templateUrl: './orders-buttons.component.html'
})
export class OrdersButtonsComponent implements OnInit, OnChanges {
	@LocalStorage() impersonateToken: string;
	@Input() public selectedOrder: IOrder;
	@Input() public user: IUser;
	@Input() public show: boolean;
	@Input() public orderColumns: IDatatableColumn[];
	@Output() public updateStatus = new EventEmitter<IOrder>();
	public commonBtn = commonBtn;
	public isSaveBtnDisabled: boolean;
	public copyOrdersColumn: any;


	constructor(private shared: SharedFunctions, 
		private _fuseSidebarService: FuseSidebarService,
		private _router: Router, 
		private _store: Store<fromOrders.OrdersState>) { }

	public ngOnInit(): void {
		this.isSaveBtnDisabled = true;
	}

	public ngOnChanges(changes: SimpleChanges): void {
		//Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
		//Add '${implements OnChanges}' to the class.
		this.copyOrdersColumn = this.orderColumns;
	}

	/** on clicking pause button */
	public pause(): void {
		const order: IOrder = { ...this.selectedOrder, status_id: 2, modifier_id: this.user.id };
		this.updateStatus.emit(order);
	}

	/** on clicking resume button */
	public resume(): void {
		const order: IOrder = { ...this.selectedOrder, status_id: 1, modifier_id: this.user.id };
		this.updateStatus.emit(order);
	}

	/** on clicking cancel button */
	public cancel(): void {
		const order: IOrder = { ...this.selectedOrder, status_id: 0, modifier_id: this.user.id, active: 0, impersonateToken: this.impersonateToken };
		this.updateStatus.emit(order);
		this.shared._snackbarMessage('Order Cancelled!', 1500)
			.afterDismissed()
			.subscribe(() => {
				this._store.dispatch(new fromOrders.ClearCurrentOrderID());
				this._store.dispatch(new fromOrders.Load());
				this._router.navigate(['/orders']);
			});
	}

	/** on clicking details button */
	public viewOrderDetails(): void {
		this.shared.modalPopup(OrderDetailsComponent, '600px', '');
	}

	public changeColumnName(): void{
		this.shared.modalPopup(OrderColumnComponent, '600px', '');
	}

	public changeColumnFlag(checked, i): void {
		this.isSaveBtnDisabled = false;
		this.copyOrdersColumn[i].flag = checked ? true : false;
	}
	public toggleSidebarOpen(key): void {
		this._fuseSidebarService.getSidebar(key).toggleOpen();
	}

	public saveColumnHideShow(): void {
		COLUMNS.orders = [...this.copyOrdersColumn];
		this._store.dispatch(new fromOrders.UpdateColumns(COLUMNS.orders));
		this.toggleSidebarOpen('orderColumn');
	}

}
