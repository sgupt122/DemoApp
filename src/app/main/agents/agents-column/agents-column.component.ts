import { Component, OnInit } from '@angular/core';
import { COLUMNS } from '@/_config';
import { Store } from '@ngrx/store';
import * as fromAgents from '@/main/agents/store';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-agents-column',
  templateUrl: './agents-column.component.html',
  styleUrls: ['./agents-column.component.scss']
})
export class AgentsColumnComponent implements OnInit {
  
  public agentsHeaderColumns = COLUMNS.agents ;

  constructor(
      private _store: Store<fromAgents.AgentsState>,
      public dialogRef: MatDialogRef<AgentsColumnComponent>
      ) { }

  ngOnInit(): void {
  }

  public changeColumnName(selectColumn, updateColumn): void {
      COLUMNS.agents.filter(n => {
        if (n.name === selectColumn){
          n.name = updateColumn
        }
      });
      this._store.dispatch(new fromAgents.UpdateColumns(COLUMNS.agents));
      this.dialogRef.close(true);
  }

}
