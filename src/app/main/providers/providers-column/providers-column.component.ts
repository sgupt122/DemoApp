import { Component, OnInit } from '@angular/core';
import { COLUMNS } from '@/_config';
import * as fromProviders from '@/main/providers/store';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-providers-column',
  templateUrl: './providers-column.component.html',
  styleUrls: ['./providers-column.component.scss']
})
export class ProvidersColumnComponent implements OnInit {

  public providersHeaderColumns = COLUMNS.providers ;

  constructor(
      private _store: Store<fromProviders.ProvidersState>,
      public dialogRef: MatDialogRef<ProvidersColumnComponent>
      ) { }

  ngOnInit(): void {
  }

  public changeColumnName(selectColumn, updateColumn): void {
    COLUMNS.providers.filter(n => {
      if (n.name === selectColumn){
        n.name = updateColumn
      }
    });
      this._store.dispatch(new fromProviders.UpdateColumns(COLUMNS.providers));
      this.dialogRef.close(true);
  }

}
