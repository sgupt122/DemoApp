import { Component, OnInit } from '@angular/core';
import { COLUMNS } from '@/_config';
import { Store } from '@ngrx/store';
import * as fromTransactions from '@/main/transactions/store';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-transactions-column',
  templateUrl: './transactions-column.component.html',
  styleUrls: ['./transactions-column.component.scss']
})
export class TransactionsColumnComponent implements OnInit {
  
  public transactionHeaderColumns = COLUMNS.transactions ;

  constructor(
      private _store: Store<fromTransactions.TransactionsState>,
      public dialogRef: MatDialogRef<TransactionsColumnComponent>
      ) { }

  ngOnInit(): void {
  }

  public changeColumnName(selectColumn, updateColumn): void {
    COLUMNS.transactions.filter(n => {
      if (n.name === selectColumn){
        n.name = updateColumn
      }
    });
    this._store.dispatch(new fromTransactions.UpdateColumns(COLUMNS.transactions));
    this.dialogRef.close(true);
  }

}
