import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ICustomerFilter, IProvider, ICampaign, ILeadType } from '@/_interfaces';
import { commonBtn, commonInfo, customer } from '@/_config/config';
import { OrdersService, LeadsService } from '@/_services';
import { Router } from '@angular/router';
import { IStatus } from '@/_interfaces/lead';

@Component({
	selector: 'app-customers-filter',
	templateUrl: './customers-filter.component.html',
	styleUrls: ['./customers-filter.component.scss']
})
export class CustomersFilterComponent implements OnInit {
	@Input() public customerFilters;
	@Output() public formResetClicked = new EventEmitter<boolean>();
	@Output() public filterButtonClicked = new EventEmitter<ICustomerFilter>();
	public customerFilterConfig = {
		commonBtn: commonBtn,
		commonInfo: commonInfo.commonFormLabels,
		custId: customer.custId
	}
	public leadTypes: ILeadType[] = [];
	public providers: ICampaign[] = [];
	public statuses: IStatus[] = [];
	private filters: ICustomerFilter;
	private count = 1;
	constructor(private _orderService: OrdersService, private _leadService: LeadsService, private router: Router) { }

	ngOnInit(): void {
		this.router.events.subscribe((val) => {
			if (this.router.url === '/customers') {
				if (this.count === 1) {
					this.resetForm();
				}
				this.count++;
			}
		});
		this._orderService.getLeadTypes().subscribe(types => {
			this.leadTypes = types['data'];
		});

		this._leadService.getProviders().subscribe(providers => {
			this.providers = providers['data'];
		});

		this._leadService.getAllStatus().subscribe(status => {
			this.statuses = status['data'];
		});
	}

	public resetForm(): void {
		this.filters = {
			customerID: "",
			email: "",
			firstName: "",
			lastName: "",
			leadID: "",
			page: 1,
			providerID: "",
			status: "",
			offset: 0
		}
		this.formResetClicked.emit(true);
		this.filterButtonClicked.emit(this.filters);
	}

	public filter(form: NgForm): void {
		this.filters = { ...form.value, page: 1 };
		const keys = Object.keys(this.filters);
		keys.map(ele => {
			if (this.filters[`${ele}`] === null || this.filters[`${ele}`] === undefined) {
				this.filters[`${ele}`] = ""
			}
		});
		this.filterButtonClicked.emit(this.filters);
	}
}
