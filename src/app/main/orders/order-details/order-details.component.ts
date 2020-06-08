import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromOrders from '@/main/orders/store'
import { IOrder } from '@/_interfaces';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { order, commonInfo } from '@/_config/config';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(private _store: Store<fromOrders.OrdersState>, private shared: SharedFunctions) { }
  public currentOrderData: IOrder;
  public days: string[] = this.shared.days;
  public orderDetailConfigText = {
    orderDetails: order.orderDetails,
    commonLb: commonInfo
  }
  ngOnInit(): void {
    this._store.pipe(select(fromOrders.getOrderDataById)).subscribe((response) => {
      this.currentOrderData = response[0];
    });
  }

}
