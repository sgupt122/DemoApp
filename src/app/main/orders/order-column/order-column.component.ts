import { Component, OnInit } from '@angular/core';
import * as fromOrders from '@/main/orders/store';
import { COLUMNS } from '@/_config';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-order-column',
  templateUrl: './order-column.component.html',
  styleUrls: ['./order-column.component.scss']
})
export class OrderColumnComponent implements OnInit {

  public orderHeaderColumns = COLUMNS.orders ;

  constructor(
  private _store: Store<fromOrders.OrdersState>,
      public dialogRef: MatDialogRef<OrderColumnComponent>
      ) { }

  ngOnInit(): void {
  }

  public changeColumnName(selectColumn, updateColumn): void {
    COLUMNS.orders.filter(n => {
      if (n.name === selectColumn){
        n.name = updateColumn
      }
    });
      this._store.dispatch(new fromOrders.UpdateColumns(COLUMNS.orders));
      this.dialogRef.close(true);
  }
}
