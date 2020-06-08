import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { IPrice, ILeadType, IProvider } from '@/_interfaces';
import * as fromPricing from '@/main/pricing/store';

@Component({
	selector: 'app-pricing-form-shell',
	templateUrl: './pricing-form-shell.component.html'
})
export class PricingFormShellComponent implements OnInit {
	public price$: Observable<IPrice>;
	public providers$: Observable<IProvider[]>;
	public leadTypes$: Observable<ILeadType[]>;
	public error$: Observable<string>;
	public action: string;

	/**
	 * Constructor
	 *
	 * @param {Store} _store
	 * @param {Title} _titleService
	 * @param {ActivatedRoute} _route
	 */
	constructor(
		private _store: Store<fromPricing.PricingState>,
		private _titleService: Title,
		private _route: ActivatedRoute
	) {}

	public ngOnInit(): void {
		this._titleService.setTitle(`Pricing Form - Charcoal`);
		this._route.params.subscribe((params: { action: string }) => {
			this.action = params.action;
		});
		this._store.dispatch(new fromPricing.LoadProviders());
		this._store.dispatch(new fromPricing.LoadLeadTypes());
		this.price$ = this._store.pipe(select(fromPricing.getCurrentPrice));
		this.providers$ = this._store.pipe(select(fromPricing.getProviders));
		this.leadTypes$ = this._store.pipe(select(fromPricing.getLeadTypes));
		this.error$ = this._store.pipe(select(fromPricing.getError));
	}

	public create(price: IPrice): void {
		this._store.dispatch(new fromPricing.CreatePrice(price));
	}

	public update(price: IPrice): void {
		this._store.dispatch(new fromPricing.UpdatePrice(price));
	}
}
