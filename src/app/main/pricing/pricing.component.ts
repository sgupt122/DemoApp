import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';
import { IPrice, IDatatableColumn } from '@/_interfaces';
import * as fromPricing from '@/main/pricing/store';
import { AuthenticationService } from '@/_services';
import { SharedFunctions } from '@/shared/sharedFunctions';
import { PricingColumnComponent } from './pricing-column/pricing-column.component';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { COLUMNS } from '@/_config';

@Component({
	selector: 'app-pricing',
	templateUrl: './pricing.component.html',
	styleUrls: ['./pricing.component.scss'],
	encapsulation: ViewEncapsulation.None,
	animations: fuseAnimations
})
export class PricingComponent implements OnInit {
	@ViewChild('table') public table: any;
	public rows$: Observable<IPrice[]>;
	public errorMessage$: Observable<string>;
	public selectedPrice$: Observable<IPrice>;
	public pricingColumns$: Observable<IDatatableColumn[]>;
	public filteredRows: IPrice[];
	public isAdmin: boolean = false;
	public isSaveBtnDisabled: boolean;
	public copyPricingColumn: any;

	/**
	 * Constructor
	 *
	 * @param {Store} _store
	 * @param {Title} _titleService
	 * @param {AuthenticationService} _authService
	 */
	constructor(
		private _store: Store<fromPricing.PricingState>,
		private _titleService: Title,
		private _authService: AuthenticationService,
		private shared: SharedFunctions,
		private _fuseSidebarService: FuseSidebarService
	) {}

	public ngOnInit(): void {
		this._titleService.setTitle(`Pricing - Charcoal`);
		this.isAdmin = this._authService.isAdmin();
		this.selectedPrice$ = this._store.pipe(select(fromPricing.getCurrentPrice));
		this.errorMessage$ = this._store.pipe(select(fromPricing.getError));
		this._store.dispatch(new fromPricing.LoadPricing());
		this.rows$ = this._store.pipe(select(fromPricing.getPricing));
		this._store.dispatch(new fromPricing.LoadColumns());
		this.pricingColumns$ = this._store.pipe(select(fromPricing.getPricingColumns));
		this.pricingColumns$.subscribe(res => {
			this.copyPricingColumn = JSON.parse(JSON.stringify(res));
		});
		this.isSaveBtnDisabled = true;
	}

	public newPrice(): void {
		this._store.dispatch(new fromPricing.InitializeCurrentPriceID());
	}

	public updateTableOffset(offset: number): void {}

	public updateTableRows(pricing: IPrice[]): void {
		this.filteredRows = [...pricing];
	}

	public updateSelectedPrice(price: IPrice | null): void {
		if (!price) {
			return this._store.dispatch(new fromPricing.ClearCurrentPriceID());
		}
		this._store.dispatch(new fromPricing.SetCurrentPriceID(price));
	}

	public changeColumnName(): void{
		this.shared.modalPopup(PricingColumnComponent, '600px', '');
	}

	public toggleSidebarOpen(key): void {
		this._fuseSidebarService.getSidebar(key).toggleOpen();
	}

	public changeColumnFlag(checked, i): void {
		this.isSaveBtnDisabled = false;
		this.copyPricingColumn[i].flag = checked ? true : false;
	}

	public saveColumnHideShow(): void {
		COLUMNS.pricing = [...this.copyPricingColumn];
		this._store.dispatch(new fromPricing.UpdateColumns(COLUMNS.pricing));
		this.isSaveBtnDisabled = true;
		this.toggleSidebarOpen('pricingColumn');
	}
}
