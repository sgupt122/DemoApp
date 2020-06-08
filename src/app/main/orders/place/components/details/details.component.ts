import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOrder } from '@/_interfaces';
import * as fromOrders from '@/main/orders/store';
import { Store } from '@ngrx/store';
import { OrderFakeData } from '@/_models/order-fake-data';
import { order, commonBtn } from '@/_config/config';
import { LocalStorage } from 'ngx-webstorage';

@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
	@LocalStorage() public user;
	@Input() public detailsFormGroup: FormGroup;
	@Input() public order: IOrder;
	public fakeData = [];
	public orderAddConfig = {
		commonBtn: commonBtn,
		commonLb: order.orderDetailAdd
	}
	constructor(private _store: Store<fromOrders.OrdersState>) {
		this.fakeData = OrderFakeData.details;
	}

	onCancel(): void {
		this._store.dispatch(new fromOrders.ClearCurrentOrderID());
	}

	addFakeData(): void {
		const value = this.fakeData[Math.floor(Math.random() * this.fakeData.length)];
		Object.keys(value).forEach(key => {
			this.detailsFormGroup.controls[key].setValue(value[key]);
		});
	}
}
