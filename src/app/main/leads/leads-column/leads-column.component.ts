import { Component, OnInit } from '@angular/core';
import { commonBtn, leads } from '@/_config/config';
import { MatDialogRef } from '@angular/material';
import { COLUMNS } from '@/_config';
import { Store } from '@ngrx/store';
import * as fromLeads from '@/main/leads/store';

@Component({
selector: 'app-leads-column',
templateUrl: './leads-column.component.html',
styleUrls: ['./leads-column.component.scss']
})
export class LeadsColumnComponent implements OnInit {
    public leadCreditText = {
        commonBtn: commonBtn,
        commonLb: leads.leadCredit
    }
    public leadsHeaderColumns = COLUMNS.leads ;

    constructor(
		private _store: Store<fromLeads.LeadsState>,
        public dialogRef: MatDialogRef<LeadsColumnComponent>
        ) { }

    ngOnInit(): void {
    }

    public changeColumnName(selectColumn, updateColumn): void {
        COLUMNS.leads.filter(n => {
            if (n.name === selectColumn){
              n.name = updateColumn
            }
          });
		this._store.dispatch(new fromLeads.UpdateColumns(COLUMNS.leads));
        this.dialogRef.close(true);
    }

}