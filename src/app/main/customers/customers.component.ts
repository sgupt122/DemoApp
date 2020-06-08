import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { fuseAnimations } from '@fuse/animations';
import { IApiSuccess, ICustomer, ICustomerFilter, IDatatableColumn } from '@/_interfaces';
import * as fromCustomers from '@/main/customers/store';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { Router } from '@angular/router';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { customer, commonBtn } from '@/_config/config';
import { CustomersColumnComponent } from './customers-column/customers-column.component';
import { COLUMNS } from '@/_config';

@Component({
	selector: 'app-customers',
	templateUrl: './customers.component.html',
	styleUrls: ['./customers.component.scss'],
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: fuseAnimations
})
export class CustomersComponent implements OnInit {
	public customersResponse$: Observable<IApiSuccess<ICustomer[]>>;

	public selectedCustomer$: Observable<ICustomer>;
	public customerFilters$: Observable<ICustomerFilter>;
	public customerColumns$: Observable<IDatatableColumn[]>;
	public isCustomerSelected: boolean = true;
	public show: boolean;
	public i: number = 1;
	public customers = {
		customer: customer.customers,
		commonBtn: commonBtn
	}
	public isSaveBtnDisabled: boolean;
	public copyCustomerColumn: any;

	/**
	 * Constructor
	 *
	 * @param {Store} _store
	 * @param {Title} _titleService
	 * @param {FuseConfigService} _fuseConfigService
	 * @param {FuseSidebarService} _fuseSidebarService
	 */
	constructor(
		private _store: Store<fromCustomers.CustomersState>,
		private _titleService: Title,
		private _fuseConfigService: FuseConfigService,
		private _fuseSidebarService: FuseSidebarService,
		private _router: Router,
		private shared: SharedFunctions

	) {
		this._router.events.subscribe((val) => {
			if (this._router.url !== '/customers') {
				this._store.dispatch(new fromCustomers.ClearCurrentCustomerID());
			}
		});
	}

	public ngOnInit(): void {
		this._titleService.setTitle(`Customers - Charcoal Data`);
		this.customersResponse$ = this._store.pipe(select(fromCustomers.getCustomers));
		this.selectedCustomer$ = this._store.pipe(select(fromCustomers.getCurrentCustomer));
		this.customerFilters$ = this._store.pipe(select(fromCustomers.getCustomerFilters));
		this._store.dispatch(new fromCustomers.LoadColumns());
		this.customerColumns$ = this._store.pipe(select(fromCustomers.getCustomerColumns));

		this.customerColumns$.subscribe(res => {
			this.copyCustomerColumn = JSON.parse(JSON.stringify(res));
		});
		this.isSaveBtnDisabled = true;
	}

	public setPage(customerFilters: ICustomerFilter): void {
		this._store.dispatch(new fromCustomers.SetCustomerFilters(customerFilters));
		this._store.dispatch(new fromCustomers.LoadCustomers(customerFilters));
	}

	public updateSelectedCustomer(cust: ICustomer | null): void {
		this.isCustomerSelected = false;
		if (!cust) {
			this.isCustomerSelected = true;
			return this._store.dispatch(new fromCustomers.ClearCurrentCustomerID());
		}
		this._store.dispatch(new fromCustomers.SetCurrentCustomerID(cust));
	}

	public toggleSidebarOpen(key): void {
		this._fuseSidebarService.getSidebar(key).toggleOpen();
	}

	public setFilters(filters: ICustomerFilter): void {
		this._store.dispatch(new fromCustomers.SetCustomerFilters(filters));
		this._store.dispatch(new fromCustomers.LoadCustomers(filters));
		// this.toggleSidebarOpen('customersFilter');
		if (this.i !== 1){
			this.toggleSidebarOpen('customersFilter');
		}
		this.i++;
	}

	public formReset(): void {
		this._store.dispatch(new fromCustomers.ResetCustomerFilters());
	}

	public viewCustomerDetails(): void {
		this.shared.modalPopup(CustomerDetailsComponent, '600px', '');
	}
	public deselectRow(value): void {
		this.show = value;
	}
	public changeColumnName(): void{
		this.shared.modalPopup(CustomersColumnComponent, '600px', '');
	}
	public changeColumnFlag(checked, i): void {
		this.isSaveBtnDisabled = false;
		this.copyCustomerColumn[i].flag = checked ? true : false;
	}

	public saveColumnHideShow(): void {
		COLUMNS.customers = [...this.copyCustomerColumn];
		this._store.dispatch(new fromCustomers.UpdateColumns(COLUMNS.customers));
		this.toggleSidebarOpen('customerColumn');
	}
}
