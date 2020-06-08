import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromCustomers from '@/main/customers/store'
import { ICustomer } from '@/_interfaces';
import { PROSPECTSTATUS } from '@/_config';
import { customer, commonInfo } from '@/_config/config';
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {

  constructor(private _store: Store<fromCustomers.CustomersState>) { }
  public currentCustomerData: ICustomer;
  public statUses: any = PROSPECTSTATUS;
  customerConfigTxt = {
    details: customer.customerDetails,
    custId: customer.custId,
    name: commonInfo.name,
    campaign: commonInfo.campaign
  }
  ngOnInit(): void {
    this._store.pipe(select(fromCustomers.getCustomerDataById)).subscribe((response) => {
      this.currentCustomerData = response[0];
    });
  }

}
