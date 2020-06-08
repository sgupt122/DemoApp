import { Component, OnInit } from '@angular/core';
import { COLUMNS } from '@/_config';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material';
import * as fromCampaigns from '@/main/campaigns/store';

@Component({
  selector: 'app-campaigns-column',
  templateUrl: './campaigns-column.component.html',
  styleUrls: ['./campaigns-column.component.scss']
})
export class CampaignsColumnComponent implements OnInit {

  public campaignsHeaderColumns = COLUMNS.campaigns ;

  constructor(
      private _store: Store<fromCampaigns.CampaignsState>,
      public dialogRef: MatDialogRef<CampaignsColumnComponent>
      ) { }

  ngOnInit(): void {
  }

  public changeColumnName(selectColumn, updateColumn): void {
    COLUMNS.campaigns.filter(n => {
      if (n.name === selectColumn){
        n.name = updateColumn
      }
    });
      this._store.dispatch(new fromCampaigns.UpdateColumns(COLUMNS.campaigns));
      this.dialogRef.close(true);
  }


}
