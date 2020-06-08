import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IApiSuccess, IOrder, IOrderType } from '@/_interfaces';
import { fuseAnimations } from '@fuse/animations';
import { OrderTypeDialogComponent } from '@/main/orders/order-type-dialog/order-type-dialog.component';
import { SharedFunctions } from '@/shared/sharedFunctions';

@Component({
	selector: 'app-orders-add-edit',
	templateUrl: './orders-add-edit.component.html',
	styleUrls: ['../orders.component.scss'],
	animations: fuseAnimations
})
export class OrdersAddEditComponent {
	@Input() public selectedOrder: IOrder;
	@Input() public orderTypes: IApiSuccess<IOrderType[]>;
	@Input() public show: boolean;
	@Input() public flatBtn:boolean;
	@Output() public newOrderClicked = new EventEmitter<number>();

	constructor(private shared: SharedFunctions) { }

	/** on creating new Order */
	public newOrder(): void {
		this.shared.modalPopup(OrderTypeDialogComponent, '300px', this.orderTypes.data)
			.afterClosed()
			.subscribe((result: number) => {
				if (result) {
					this.newOrderClicked.emit(result);
				}
			});
	}
}
