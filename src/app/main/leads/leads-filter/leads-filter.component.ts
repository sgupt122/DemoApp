import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ILeadFilter, ICustomerFilter } from '@/_interfaces';
import * as moment from 'moment';
import { commonBtn, commonInfo, leads } from '@/_config/config';
import { OrdersService, LeadsService } from '@/_services';
import { Router } from '@angular/router';

@Component({
	selector: 'app-leads-filter',
	templateUrl: './leads-filter.component.html',
	styleUrls: ['./leads-filter.component.scss']
})
export class LeadsFilterComponent implements OnInit {
	@Input() public leadFilters;
	@Output() public formResetClicked = new EventEmitter<boolean>();
	@Output() public filterButtonClicked = new EventEmitter<ILeadFilter>();
	private leadFilterData = [];
	public leadFilterConfigTxt = {
		commonBtn: commonBtn,
		commonLb: commonInfo,
		leadFilter: leads.leadFilter,
	};
	public leadTypes = [];
	public providers = [];
	public statuses = [];
	private filters: ILeadFilter;
	private count: number = 1;
	constructor(private _orderService: OrdersService, private _leadService: LeadsService, private router: Router) { }

	ngOnInit(): void {
		this.router.events.subscribe((val) => {
			if (this.router.url === '/leads') {
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
			campaignID: "",
			email: "",
			firstName: "",
			fromDate: "",
			lastName: "",
			leadID: "",
			page: 1,
			providerID: "",
			status: "",
			toDate: "",
			offset: 0
		}
		this.filterButtonClicked.emit(this.filters);
		this.formResetClicked.emit(true);
	}

	public filter(form: NgForm): any {
		this.filters = { ...form.value, page: 1 };
		const start = moment(this.filters.fromDate, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss');
		const end = moment(this.filters.toDate, 'YYYY-MM-DD hh:mm:ss').format('YYYY-MM-DD hh:mm:ss');

		if (this.filters.fromDate !== "" && this.filters.toDate !== "") {
			this.filters.fromDate = start;
			this.filters.toDate = end;
		}
		const keys = Object.keys(this.filters);
		keys.map(ele => {
			if (this.filters[`${ele}`] === null || this.filters[`${ele}`] === undefined) {
				this.filters[`${ele}`] = ""
			}
		});
		this.filterButtonClicked.emit(this.filters);
		return '2'
	}
}
