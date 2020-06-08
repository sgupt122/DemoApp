import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromPricing from '@/main/pricing/store';
import { COLUMNS } from '@/_config';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-pricing-column',
  templateUrl: './pricing-column.component.html',
  styleUrls: ['./pricing-column.component.scss']
})
export class PricingColumnComponent implements OnInit {

  public pricingHeaderColumns = COLUMNS.pricing ;

  constructor(
      private _store: Store<fromPricing.PricingState>,
      public dialogRef: MatDialogRef<PricingColumnComponent>
      ) { }

  ngOnInit(): void {
  }

  public changeColumnName(selectColumn, updateColumn): void {
      COLUMNS.pricing.filter(n => {
        if (n.name === selectColumn){
          n.name = updateColumn
        }
      });
      this._store.dispatch(new fromPricing.UpdateColumns(COLUMNS.pricing));
      this.dialogRef.close(true);
  }


}
