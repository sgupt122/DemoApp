import { Component, OnInit } from '@angular/core';
import { COLUMNS } from '@/_config';
import { Store } from '@ngrx/store';
import * as fromCustomers from '@/main/customers/store';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-customers-column',
  templateUrl: './customers-column.component.html',
  styleUrls: ['./customers-column.component.scss']
})
export class CustomersColumnComponent implements OnInit {
  
  public customerHeaderColumns = COLUMNS.customers ;

  constructor(
      private _store: Store<fromCustomers.CustomersState>,
      public dialogRef: MatDialogRef<CustomersColumnComponent>
      ) { }

  ngOnInit(): void {
  }

  public changeColumnName(selectColumn, updateColumn): void {
    COLUMNS.customers.filter(n => {
      if (n.name === selectColumn){
        n.name = updateColumn
      }
    });
      this._store.dispatch(new fromCustomers.UpdateColumns(COLUMNS.customers));
      this.dialogRef.close(true);
  }


}
